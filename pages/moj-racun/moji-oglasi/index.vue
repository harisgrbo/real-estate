<template>
  <div class="account-wrapper mx-auto w-full">
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
  async asyncData(ctx) {
    let listings = [];

    try {
      let res = await ctx.app.$axios.get('/profile/listings');
      listings = res.data.data;
    } catch(e) {
      console.log(e)
    }

    return {
      listings
    }
  }
})
export default class mojiOglasi extends Vue {

}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.account-wrapper {
  width: auto;

  @include for-phone-only {
    width: 100%;
    padding: 16px;
  }
}

.content {
  display: flex;
  flex-direction: column;
  margin-top: 36px;

  .grid-cards {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    padding: 0;

    @include for-phone-only {
      grid-template-columns: repeat(1, 1fr);
      grid-column-gap: 24px;
      grid-row-gap: 24px;
    }
    ::v-deep a {
      width: 100%;
    }


    ::v-deep img {
      width: 100%;

      @include for-phone-only {
        height: 254px;
      }
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

.content {
  @include for-phone-only {
    padding: 0;
  }
}
</style>
