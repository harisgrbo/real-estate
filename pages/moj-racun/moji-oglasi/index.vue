<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Moji oglasi</p>
      </li>
    </ul>
    <h1 class="heading" v-if="!$device.isMobile">
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
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',
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
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.account-wrapper {
  @include for-phone-only {
    padding: 0 12px 120px 12px;
    box-sizing: border-box;
    width: 100%;
  }
}
.content {
  display: flex;
  flex-direction: column;

  .grid-cards {
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(240px, 1fr) );
    column-gap: 16px;
    row-gap: 32px;
    padding-bottom: 36px;

    @include for-phone-only {
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      grid-column-gap: 12px;
    }
  }
}

h1 {
  color: rgb(72, 72, 72) !important;
}
</style>
