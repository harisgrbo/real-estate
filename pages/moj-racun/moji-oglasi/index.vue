<template>
  <div class="preview-wrapper-inner mx-auto w-full">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <p>Moji oglasi</p>
      </li>
    </ul>
    <div class="content">
      <div v-if="listingsLoaded">
        <div class="grid-cards">
          <ListingCard v-for="listing in listings" :listing="listing" :from="true" :key="listing.id"/>
        </div>
        <NotFound v-if="listings.length === 0" src="/realestatenoresults.svg" text="Nemate objavljenih oglasa"></NotFound>
      </div>

      <div v-else class="grid-cards">
        <Skeleton :height="$device.isMobile ? '337px' : '368px'" :width="$device.isMobile ? '165px' : '265px'" v-for="(i, index) in 20" :key="index"></Skeleton>
      </div>

      <Pagination
        v-if="listingMeta !== null && listingMeta.total > 20"
        ref="pagination"
        :current-page="currentPage"
        :total-pages="listingMeta.last_page"
        @page-change="pageChangeHandler" />
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ListingCard from '@/components/listingCard/ListingCard';
import Pagination from "../../../components/pagination";
import NotFound from "../../../components/global/NotFound";

@Component({
  components: {
    NotFound,
    Pagination,
    ListingCard
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
  middleware: ['auth']
})
export default class mojiOglasi extends Vue {
  currentPage = 1;
  listings = []
  listingsLoaded = false;
  listingMeta = {}

  async created() {
    await this.fetchUserListings();
  }

  async fetchUserListings(p = 1) {
    this.listingsLoaded = false;
    try {
      let res = await this.$axios.get(`/profile/listings?page=${p}`);
      this.listings = res.data.data;
      this.listingMeta = res.data.meta;
      this.listingsLoaded = true;
    } catch(e) {
      console.log(e)
    }
  }

  async pageChangeHandler(selectedPage) {
    this.currentPage = selectedPage;
    await this.fetchUserListings(this.currentPage);
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.preview-wrapper-inner {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 4px;
  padding: 24px;
}


.content {
  display: flex;
  flex-direction: column;
  margin-top: 36px;

  .grid-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    padding: 0;

    @include for-phone-only {
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 12px;
      grid-row-gap: 12px;
    }
    ::v-deep a {
      width: 100%;
    }


    ::v-deep .image-wrapper img {
      width: 100%;

      @include for-phone-only {
        height: 254px;
        min-height: 254px;
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
