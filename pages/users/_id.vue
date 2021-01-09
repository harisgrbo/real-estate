<template>
  <div class="user-profile-wrapper">
    <UserProfile :user="user"></UserProfile>
    <div class="content-wrapper">
      <ul>
        <li v-for="(tab, index) in tabs" @click="activeTab = index">{{ tab }}</li>
      </ul>
      <div>
        <div v-if="activeTab === 0">
          <ListingCard v-for="listing in listings" :listing="listing"></ListingCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import UserProfile from "@/components/UserProfile";
import ListingCard from "@/components/listingCard/ListingCard";

@Component({
  components: {ListingCard, UserProfile},
  layout() { return "home" }
})

export default class Users extends Vue {

  activeTab = 0
  user = {}
  listings = []
  tabs = [
    "Aktivne nekretnine",
    "Zavrsene nekretnine",
    "Dojmovi"
  ]

  async created() {
    await this.fetchUser(this.$route.params.id)
    await this.fetchUserListings(this.$route.params.id)
  }

  async fetchUser(id) {
    try {
      let response = await this.$axios.get('/users/' + id)
      this.user = response.data.data;
    } catch(e) {
      console.log(e)
    }
  }

  async fetchUserListings(id) {
    try {
      let response = await this.$axios.get('/users/' + id + '/listings')
      this.listings = response.data.data;
      console.log(this.listings)
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.user-profile-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}
</style>
