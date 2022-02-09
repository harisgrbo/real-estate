<template>
  <div class="upravljanje-wrapper w-full" v-if="initialListingsLoaded">
    <div class="grid-cols-4 grid gap-4 mobile-grid" v-if="listings.length">
      <ListingCard v-for="listing in listings" :listing="listing" :from="true" @remove-listing="handleRemoveListingModal(listing.id)" @finish-listing="handleFinishListing($event)" @edit-listing="handleEditListing($event)" action_text="Opcije oglasa" :key="listing.id"/>
    </div>
    <div class="no-image" v-else>
      <img src="/nodata.jpeg" alt="no-image">
      <NotFound v-if="listings.length === 0" src="/realestatenoresults.svg" text="Nemate objavljenih oglasa"></NotFound>
    </div>
    <modal @before-open="beforeOpen" @before-close="beforeClose" name="delete-listing" :adaptive="true" height="100%">
      <div class="modal-inner">
        <div class="modal-header">
          <h2>Brisanje oglasa</h2>
          <i class="material-icons" @click="$modal.hide('delete-listing')">close</i>
        </div>
        <div class="modal-content">
          <h3 class="text-md">Jeste li sigurni da želite izbrisati oglas? Izbrisan oglas nije moguće vratiti</h3>
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
            <action-button :style-options="{ color: '#fff', width: '100%', background: 'red', marginRight: '6px' }" class="mt-4" placeholder="Da" @action="handleRemoveListing" :loading="loading"></action-button>
            <action-button :style-options="{ color: '#fff', width: '100%', marginLeft: '6px' }" class="mt-4" placeholder="Ne" @action="$modal.hide('delete-listing')" :loading="loading"></action-button>
          </div>
        </div>
      </div>
    </modal>
  </div>
  <div v-else>
    <LoadingBar :override="true"></LoadingBar>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ListingCard from "@/components/listingCard/ListingCard";
import ListingOptionsModal from "@/components/ListingOptionsModal"
import NotFound from "../../../components/global/NotFound";
import LoadingBar from "../../../components/LoadingBar";

@Component({
  components: {
    LoadingBar,
    NotFound,
    ListingCard,
    ListingOptionsModal
  },
})

export default class UpravljanjeOglasima extends Vue {
  listings = [];
  listingIdToBeRemoved = null;
  initialListingsLoaded = false

  async created() {
    await this.fetchUserListings();
  }

  async fetchUserListings() {
    this.initialListingsLoaded = false;
    try {
      let res = await this.$axios.get('/profile/listings');

      this.listings = res.data.data;

      this.initialListingsLoaded = true;
    } catch(e)  {
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

}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.upravljanje-wrapper {
  display: flex;
  flex-direction: column;

  @include for-phone-only {
    padding: 0;
    margin: 0;
  }

  .mobile-grid {
    @include for-phone-only {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding-top: 20px;
    }
  }

  h2 {
    font-size: 20px;
    font-weight:500;
    margin-bottom: 24px;

  }
}

.grid-layout {
  padding: 0 !important;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 80px;

  img {
    height: 400px;

    @include for-phone-only {
      height: 250px;
    }
  }

  p {
    font-size: 20px;
    font-weight: 500;
    margin-top: 0px;
  }
}
</style>
