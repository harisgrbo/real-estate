<template>
  <div class="preview-wrapper-inner w-full mx-auto">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Pratim/pratioci</p>
      </li>
    </ul>
    <div class="saved-content w-full">
      <div>
        <div class="grid grid-cols-5 gap-6 mobile-grid w-full" v-if="blockedUsers.length">
          <UserCard v-for="user in blockedUsers" :id="user.id" :user="user"/>
        </div>
        <div v-else class="no-image">
          <img src="/nodata.jpeg" alt="no-image">
          <p>Nemate blokiranih korisnika</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

import UserCard from "@/components/UserCard";

@Component({
  components: {
    UserCard,
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
})

export default class blokiraniKorisnici extends Vue {

  blockedUsers = [];

  async created() {
    await this.fetchBlockedUsers();
  }

  async fetchBlockedUsers() {
    try {
      let response = await this.$axios.get('/profile/users/blocked');
      this.blockedUsers = response.data.data;
      console.log(response.data.data)
    } catch(e) {
      console.log(e)
    }
  }

  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else {
      return 'Korisnik'
    }
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.preview-wrapper-inner {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 4px;
  padding: 24px;
}

.cw-ul {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 36px;
  border-bottom: 1px solid #f1f1f1 !important;
  margin-top: 24px;

  li {
    font-size: 14px !important;
    line-height: 26px !important;
    margin-right: 24px;
    padding-bottom: 8px;
    height: 40px;
    position: relative;
    cursor: pointer;
    font-weight:500;
    color: #727272;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      font-weight: 500;
      color: #000;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #000;
      }
    }
  }
}

.user-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 32px;
  column-gap: 24px;
}

h1 {
  color: rgb(72, 72, 72) !important;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    height: 400px;

    @include for-phone-only {
      height: 250px;
    }
  }

  p {
    font-size: 20px;
    font-weight: 500;
    margin-top: 24px;
  }
}

.mobile-grid {
  @include for-phone-only {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

.saved-content {
  margin-top: 36px;
}
</style>
