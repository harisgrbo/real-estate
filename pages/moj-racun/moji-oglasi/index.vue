<template>
  <div class="w-full">
    <h1 class="heading">
      Moji oglasi
    </h1>
    <div class="content">
      <div class="grid-cards">
        <ListingCard v-for="listing in listings" :listing="listing" :key="listing.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout() { return "account" }
})

export default class mojiOglasi extends Vue {
  listings = []

  async created() {
    await this.fetchProfileListings();
  }

  async fetchProfileListings() {
    try {
      let res = await this.$axios.get('/profile/listings');

      this.listings = res.data.data;
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;

  .grid-cards {
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(270px, 1fr) );
    column-gap: 24px;
    row-gap: 32px;
    padding-bottom: 36px;
  }
}
</style>
