<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Pratim/pratioci</p>
      </li>
    </ul>
    <h1 class="heading">
      Pratim/pratioci
    </h1>
    <ul class="navs">
      <li v-for="(tab, index) in tabs"
          :key="index"
          @click="activeTab = index"
          :class="activeTab === index? 'active' : ''"
      >
        {{ tab }}
      </li>
    </ul>
    <div class="saved-content">
      <div v-show="activeTab === 0">
        <div v-if="followers.length" class="grid-layout">
          <UserCard v-for="user in followers" :user="user" :key="user.id"></UserCard>
        </div>
        <div v-else>
          Nemate pratilaca
        </div>
      </div>
      <div v-show="activeTab === 1">
        <div v-if="followed.length" class="grid-layout">
          <UserCard v-for="user in followed" :user="user" :key="user.id"></UserCard>
        </div>
        <div v-else>
          Ne pratite nikoga
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
  layout() { return "home" }
})

export default class pratioci extends Vue {

  activeTab = 0;
  tabs = [
    'Pratioci',
    'Koga pratim',
  ]
  followed = [];
  followers = [];

  async created() {
    await this.fetchFollowed();
    await this.fetchFollowers()
  }

  async fetchFollowed() {
    try {
      let response = await this.$axios.get('/profile/followed');
      this.followed = response.data.data;
    } catch(e) {
      console.log(e)
    }
  }

  async fetchFollowers() {
    try {
      let response = await this.$axios.get('/profile/followers');
      this.followers = response.data.data;
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
ul.navs {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 36px;
  border-bottom: 1px solid #EBEBEB !important;

  li {
    font-size: 14px !important;
    line-height: 26px !important;
    margin-right: 24px;
    padding-bottom: 8px;
    height: 40px;
    position: relative;
    cursor: pointer;
    text-transform: uppercase;
    font-weight:500;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #0B8489;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #0B8489;
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
</style>
