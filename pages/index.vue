<template>
  <div class="homepage-wrap">
    <h1>Objavljeno {{ listings.length }} nekretnina</h1>
    <div class="grid-layout">
      <ListingCard v-for="listing in listings" :listing="listing" :key="listing.id"/>
    </div>
  </div>
</template>

<script>
  import { Component, Vue} from "nuxt-property-decorator";
  import ListingCard from "@/components/listingCard/ListingCard";
  import Categories from "~/components/publishInputs/Categories";

  @Component({
    components: {
      Categories,
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
.homepage-wrap {
  display: flex;
  flex-direction: column;
  padding-bottom: 120px;

  h1 {
    margin: 24px 0;
    font-size: 23px;
    font-weight: 400;
    padding-left: 80px;
  }

}
.container {
  background: black;
}

.grid-layout {
  padding: 16px 80px;
}
</style>
