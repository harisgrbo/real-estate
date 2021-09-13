<template>
  <div class="account-wrapper max-w-7xl mx-auto w-full">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Moji oglasi</p>
      </li>
    </ul>
    <div class="content">
      <div v-if="listings.length" class="grid-cards">
        <ListingCard v-for="listing in listings" :listing="listing" :key="listing.id"/>
      </div>
      <div v-else class="no-image">
        <img src="/noimg.jpg" alt="no-image">
        <p>Nemate spšenih pretraga</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
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
  width: 1180px;
}
.content {
  display: flex;
  flex-direction: column;
  margin-top: 36px;

  .grid-cards {
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(260px, 1fr) );
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

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    height: 400px;

    @include for-phone-only {
      height: 250px;
    }
  }

  p {
    font-size: 20px;
    font-weight: 500;
    margin-top: 24px;
  }
}
</style>
