<template>
  <div class="upravljanje-wrapper">
    <div class="grid-cols-6 grid gap-4 mobile-grid">
      <ListingCard v-for="listing in listings" :listing="listing" :from="true" @remove-listing="handleRemoveListingModal(listing.id)" @edit-listing="handleEditListing($event)" action_text="Opcije oglasa" :key="listing.id"/>
    </div>
    <modal @before-open="beforeOpen" @before-close="beforeClose" name="delete-listing" :adaptive="true" height="100%">
      <div class="modal-inner">
        <div class="modal-header">
          <h2>Brisanje oglasa</h2>
          <i class="material-icons" @click="$modal.hide('delete-listing')">close</i>
        </div>
        <div class="modal-content">
          <h3 class="text-md">Jeste li sigurni da želite izbrisati oglas? Izbrisan oglas nije moguće vratiti</h3>
          <div class="w-full items-center flex flex-row">
            <action-button :style-options="{ color: '#fff', width: '100%', background: 'red', marginRight: '6px' }" class="mt-4" placeholder="Da" @action="handleRemoveListing" :loading="loading"></action-button>
            <action-button :style-options="{ color: '#fff', width: '100%', marginLeft: '6px' }" class="mt-4" placeholder="Ne" @action="$modal.hide('delete-listing')" :loading="loading"></action-button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ListingCard from "@/components/listingCard/ListingCard";
import ListingOptionsModal from "@/components/ListingOptionsModal"

@Component({
  components: {
    ListingCard,
    ListingOptionsModal
  },
})

export default class UpravljanjeOglasima extends Vue {
  listings = [];
  listingIdToBeRemoved = null;

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

  handleRemoveListingModal(id) {
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

      this.$snackbar.show({
        text: "Uspješno ste izbrisali oglas",
        timeout: 1000,
        type: "success"
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
  padding-top: 36px;
  box-sizing: border-box;
  width: auto;
  margin: 0 80px;

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
</style>
