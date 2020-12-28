<template>
  <div class="required-wrapper">
    <h2>Odaberite vrstu objave</h2>
    <div>
      <PublishRadioButton :options="listingTypes" v-model="value"></PublishRadioButton>
    </div>
    <h2>Izaberite lokaciju nekretnine</h2>
    <div class="grid-filters">
      <PublishDropdown placeholder="Pretrazite lokacije" title="Lokacija" @select-option="handleSelectedOption"></PublishDropdown>
    </div>
    <div v-if="selectedLocation !== null">
      <PublishMap :location="selectedLocation"></PublishMap>
    </div>
    <h2>Unesite osnovne informacije</h2>
    <div class="grid-filters">
      <PublishTextInput type="text" title="Naslov"></PublishTextInput>
      <PublishTextInput type="text" title="Adresa"></PublishTextInput>
      <PublishTextInput type="number" title="Cijena"></PublishTextInput>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import PublishTextInput from "@/components/publishInputs/PublishTextInput";
import PublishRadioButton from "@/components/publishInputs/PublishRadioButton";
import PublishDropdown from "@/components/publishInputs/PublishDropdown";
import PublishMap from "@/components/publish/PublishMap";

@Component({
  components: {PublishMap, PublishDropdown, PublishRadioButton, PublishTextInput},
})

export default class Required extends Vue {
  listingTypes = []
  value = null
  selectedLocation = null

  async created() {
    await this.fetchListingTypes()
  }

  handleSelectedOptions(e) {
    console.log(e)
  }

  async fetchListingTypes() {
    try {
      let res = await this.$axios.get('/listing_types');
      this.listingTypes = res.data.data;
    } catch(e) {
      console.log(e)
    }
  }

  handleSelectedOption(f) {
    this.selectedLocation = f;
    console.log(this.selectedLocation)
  }
}
</script>

<style scoped lang="scss">
  .required-wrapper {
    h2 {
      margin: 32px 0;
      font-size: 24px;
      font-weight: 400;
      color: #263D51;
      margin-top: 48px;
      &:first-child {
        margin-top: 32px;
      }
    }
  }
</style>
