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
    <button @click="loadMore">Ucitaj jos</button>
<!--    <client-only>-->
<!--      <infinite-loading spinner="circles" direction="bottom" @infinite="infiniteHandler"></infinite-loading>-->
<!--    </client-only>-->
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
    page = 1;
    meta = {}

    async fetchListings() {
      try {
        let response = await this.$axios.get('/listings/home');
        this.listings = response.data.data;
        this.meta = response.data.meta;
      } catch(e) {
        console.log(e)
      }
    }

    async addMoreListings(page) {
      let res = await this.$axios.get('/listings/home?page=' + page);
      this.listings.concat(res.data.data);

      console.log(this.listings, 'listings')
    }

    async loadMore() {
      await this.addMoreListings(this.page++)
    }

    async created() {
      await this.fetchListings();
    }

    // infiniteHandler($state) {
    //   this.$axios.get('/listings/home', {
    //     params: {
    //       page: this.page,
    //     },
    //   }).then(({ data }) => {
    //     if (data.length >= this.meta.total) {
    //       $state.complete();
    //     } else {
    //       this.page += 1;
    //       this.listings.concat(data)
    //       $state.loaded();
    //     }
    //   });
    // }
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
