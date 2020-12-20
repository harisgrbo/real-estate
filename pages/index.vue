<template>
  <div class="grid-layout">
    <ListingCard v-for="listing in listings" :title="listing.title" :price="listing.price" :address="listing.address" :key="listing.id" :type="listing.listing_type" :updated="listing.published_at"/>
  </div>
</template>

<script>
  import { Component, Vue} from "nuxt-property-decorator";
  import ListingCard from "@/components/listingCard/ListingCard";

  @Component({
    components: {
      ListingCard
    },
    layout() { return "home" }
  })

  export default class Homepage extends Vue {
    listings = [];

    async fetchListings() {
      try {
        let response = await this.$axios.get('/listings/home');
        this.listings = response.data.data;
      } catch(e) {
        console.log(e)
      }
    }

    async created() {
      console.log(this.$auth.user, 'auth')
      await this.fetchListings();
    }
  }
</script>

<style lang="scss">
.container {
  background: black;
}
</style>
