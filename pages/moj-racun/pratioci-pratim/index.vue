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
    <ul>
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
        <div v-if="followers.length" class="user-card-grid">
          <UserCard v-for="user in followers" :user="user" label="Otprati"></UserCard>
        </div>
        <div v-else>
          Nemate pratilaca
        </div>
      </div>
      <div v-show="activeTab === 1">
        <div v-if="followed.length">
          <UserCard v-for="user in followed" :user="user"></UserCard>
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
      console.log(this.followed)
    } catch(e) {
      console.log(e)
    }
  }

  async fetchFollowers() {
    try {
      let response = await this.$axios.get('/profile/followed');
      this.followers = response.data.data;
      console.log(this.followers)
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
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

.user-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 32px;
  column-gap: 24px;
}
</style>
