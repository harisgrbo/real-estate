<template>
  <div class="modal-inner">
    <div class="modal-header">
      <h2>Opcije oglasa</h2>
      <i class="material-icons" @click="$modal.hide('listing-options')">close</i>
    </div>
    <div class="modal-content">
      <div class="w-full flex items-center justify-between">
        <action-button placeholder="Uredi oglas" :style-options="{ width: '100%', marginRight: '6px'}" @action="editListing()" :loading="loading"></action-button>
<!--        <action-button placeholder="Sponzoriši oglas" :style-options="{ width: '100%', marginLeft: '6px'}" @action="$router.push('/sponzorisanje/' + listing_id)" :loading="loading"></action-button>-->
      </div>
      <action-button class="mt-4" placeholder="Izbriši oglas" @action="removeListing()" :style-options="{ background: 'red', width: '100%'}" :loading="loading"></action-button>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {
  },
})

export default class ListingOptionsModal extends Vue {
  @Prop() listing_id;

  editListing() {
    this.$router.push('/artikal/uredjivanje/' + this.listing_id);

    this.$modal.hide('listing-options')
  }
}
</script>

<style scoped>

</style>
