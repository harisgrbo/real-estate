<template>
  <div class="upravljanje-wrapper">
    <h2>Aktivni oglasi</h2>
    <div class="grid-layout">
      <ListingCard v-for="listing in listings" :listing="listing" :from="true" :key="listing.id"/>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ListingCard from "@/components/listingCard/ListingCard";

@Component({
  components: {
    ListingCard
  },
})

export default class UpravljanjeOglasima extends Vue {
  listings = [];

  async created() {
    await this.fetchUserListings();
  }

  async fetchUserListings() {
    try {
      let res = await this.$axios.get('/profile/listings');

      this.listings = res.data.data;
    } catch(e)  {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.upravljanje-wrapper {
  display: flex;
  flex-direction: column;
  padding-top: 36px;
  box-sizing: border-box;

  h2 {
    font-size: 20px;
    font-weight:500;
    margin-bottom: 24px;

  }
}

.grid-layout {
  padding: 0 !important;
}
</style>
