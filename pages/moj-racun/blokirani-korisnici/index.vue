<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Blokirani korisnici</p>
      </li>
    </ul>
    <div class="content-wrapper">
      <div class="saved-content">
        <div>
          <div class="grid-layout" v-if="blockedUsers.length > 0">
           blokirani korisnici
          </div>
          <div v-else class="no-image">
            <img src="/noimg.jpg" alt="no-image">
            <p>Nemate blokiranih korisnika</p>
          </div>
        </div>
      </div>
    </div>
    <snackbar></snackbar>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ListingCard from "@/components/listingCard/ListingCard";
import SavedUserCard from "@/components/UserCard"
import Snackbar from "@/components/global/Snackbar";

@Component({
  components: {
    Snackbar
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
})

export default class BlokiraniKorisnici extends Vue {
  blockedUsers = [];
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.account-wrapper {
  width: 1180px;
}

.saved-wrapper {
  ul {
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 36px;

    li {
      display: flex;
      height: 40px;
      line-height: 40px;
      align-items: center;
      justify-content: flex-start;
      font-weight: 500;
      margin-right: 32px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      &.active {
        font-weight: 600 !important;
        color: #012F34 !important;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          border-bottom: 2px solid #54E0C7;

        }
      }
    }
  }
}

.grid-layout {
  padding: 0;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 36px 0px 24px 0px;
  box-sizing: border-box;

  ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 36px;

    li {
      font-size: 16px !important;
      line-height: 26px !important;
      margin-right: 24px;
      padding-bottom: 8px;
      position: relative;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      &.active {
        font-weight: 600;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          border-bottom: 1px solid #D63946;
        }
      }
    }
  }
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

</style>
