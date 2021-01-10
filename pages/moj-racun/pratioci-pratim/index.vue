<template>
  <div class="saved-wrapper">
    <ul>
      <li v-for="(tab, index) in tabs"
          :key="index"
          @click="activeTab = index"
          :class="activeTab === index? 'active-tab' : ''"
      >
        {{ tab }}
      </li>
    </ul>
    <div class="saved-content">
      <div v-show="activeTab === 0">
        <div v-if="followers.length">
          <SavedUserCard v-for="user in followers" :user="user"></SavedUserCard>
        </div>
        <div v-else>
          Nemate pratilaca
        </div>
      </div>
      <div v-show="activeTab === 1">
        <div v-if="followed.length">
          <SavedUserCard v-for="user in followed" :user="user"></SavedUserCard>
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

import SavedUserCard from "@/components/SavedUserCard"

@Component({
  components: {
    SavedUserCard
  },
  layout() { return "account" }
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
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    li {
      margin-right: 36px;
      &:last-child {
        margin-right: 0;
      }
      &.active-tab {
        font-weight: bold;
      }
    }
  }
</style>
