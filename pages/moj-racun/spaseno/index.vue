<template>
  <div class="saved-wrapper">
    <ul>
      <li v-for="(tab, index) in tabs"
          @click="activeTab = index"
      >
        {{ tab }}
      </li>
    </ul>
    <div class="saved-content">
      <div v-show="activeTab === 0">
        <SavedUserCard v-for="user in savedUsers" :user="user"></SavedUserCard>
      </div>
      <div v-show="activeTab === 1">
        pretrage
      </div>
      <div v-show="activeTab === 2">
        nekretnine
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

import SavedUserCard from "@/components/UserCard"

@Component({
  components: {
    SavedUserCard
  },
  layout() { return "account" }
})

export default class spaseno extends Vue {

  tabs = [
    'Korisnici',
    'Pretrage',
    'Nekretnine'
  ]
  savedUsers = [];

  async created() {
    await this.fetchSavedUsers();
  }

  async fetchSavedUsers() {
    try {
      let response = await this.$axios.get('/profile/saved/users');
      this.savedUsers = response.data.data;
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
