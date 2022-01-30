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
          <ListingCard v-for="listing in listings" :listing="listing" :from="true" @remove-listing="handleRemoveListingModal($event)" @finish-listing="handleFinishListing($event)" @edit-listing="handleEditListing($event)" action_text="Opcije oglasa" :key="listing.id"/>
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
    <modal @before-open="beforeOpen" @before-close="beforeClose" name="delete-listing" :adaptive="true" height="100%">
      <div class="modal-inner">
        <div class="modal-header">
          <h2>Brisanje oglasa</h2>
          <i class="material-icons" @click="$modal.hide('delete-listing')">close</i>
        </div>
        <div class="modal-content">
          <div class="rounded-md bg-yellow-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <!-- Heroicon name: solid/exclamation -->
                <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-yellow-800">
                  Pažnja
                </h3>
                <div class="mt-2 text-sm text-yellow-700">
                  <p>
                    Jeste li sigurni da želite izbrisati oglas? Izbrisan oglas nije moguće vratiti
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full items-center flex flex-row">
            <action-button :style-options="{ color: '#1F2937', width: '100%', background: 'transparent', marginRight: '6px', border: '2px solid #1F2937' }" class="mt-4" placeholder="Da" @action="handleRemoveListing" :loading="loading"></action-button>
            <action-button :style-options="{ color: '#1F2937', width: '100%', background: 'transparent', marginLeft: '6px', border: '2px solid #1F2937' }" class="mt-4" placeholder="Ne" @action="$modal.hide('delete-listing')" :loading="loading"></action-button>
          </div>
        </div>
      </div>
    </modal>
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
  listingIdToBeRemoved = null;


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

  async handleFinishListing(l) {
    try {
      await this.$axios.post('/listings/' + l + '/complete');

      let index = this.listings.findIndex(item => item.id === l)

      this.listings.splice(index, 1)

      this.$toast.open({
        message: 'Oglas završen',
        type: 'success',
        duration: 5000
      });

      l.completed_at = 'sad';
    } catch(e) {
      console.log(e)
    }
  }

  handleRemoveListingModal(id) {
    console.log('test')
    this.listingIdToBeRemoved = id;
    this.$modal.show('delete-listing');
  }

  async handleRemoveListing() {
    let id = null;

    if (this.listingIdToBeRemoved) {
      id = this.listingIdToBeRemoved;
      this.listingIdToBeRemoved = null;
    } else {
      return;
    }

    try {
      await this.$axios.delete('/listings/' + id);

      let index = this.listings.findIndex(item => item.id === id)

      this.listings.splice(index, 1)

      this.$modal.hide('delete-listing')

      this.$toast.open({
        message: 'Uspješno ste izbrisali oglas',
        type: 'success',
        duration: 5000
      });
    } catch(e) {
      console.log(e)
    }
  }

  handleEditListing(id) {
    this.$router.push('/artikal/uredjivanje/' + id);
  }

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
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
  border-radius: 6px;
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
