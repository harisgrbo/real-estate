<template>
  <div class="homepage-wrap">
    <h1>Bilo da kupujete, prodajete ili iznajmljujete, mozemo vam pomoci da napravite prvi korak</h1>
    <div>
      <PublishShortcut></PublishShortcut>
    </div>
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
  import PublishShortcut from "@/components/publish/PublishShortcut";
  @Component({
    components: {
      Categories,
      ListingCard,
      PublishShortcut
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
    word-wrap: break-word !important;
    font-size: 20px !important;
    font-weight: 500 !important;
    line-height: 1.125em !important;
    color: #484848 !important;
    margin-bottom: 36px !important;
    margin-left: 80px;
    margin-top: 32px;
  }

}
.container {
  background: black;
}

.grid-layout {
  padding: 0 80px;
}
</style>
