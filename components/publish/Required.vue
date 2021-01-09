<template>
  <div class="required-wrapper">
    <h2>Odaberite kategoriju oglasa</h2>
    <div>
      <Categories @selected-category="handleSelectedCategory"/>
    </div>
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
      <PublishTextInput type="text" title="Naslov" v-model="title" @blur="emitData" :error="errorBag.title"></PublishTextInput>
      <PublishTextInput type="text" title="Adresa" v-model="address" @focusout="emitData"></PublishTextInput>
      <PublishTextInput type="number" title="Cijena" v-model="price" @focusout="emitData"></PublishTextInput>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import PublishTextInput from "@/components/publishInputs/PublishTextInput";
import PublishRadioButton from "@/components/publishInputs/PublishRadioButton";
import PublishDropdown from "@/components/publishInputs/PublishDropdown";
import PublishMap from "@/components/publish/PublishMap";
import Categories from "@/components/publishInputs/Categories";

@Component({
  components: {Categories, PublishMap, PublishDropdown, PublishRadioButton, PublishTextInput},
})
export default class Required extends Vue {

  value = null;
  listingTypes = []
  selectedLocation = null
  selectedCategory = {}
  cityId = ''
  title = ''
  address = ''
  price = ''
  listingType = ''
  errorBag = {}


  async created() {
    await this.fetchListingTypes()
  }

  handleSelectedOptions(e) {
    console.log(e)
  }

  handleSelectedCategory(e) {
    this.selectedCategory = e;

    this.emitData();
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

    this.emitData();
  }

  emitData() {
    if(this.runValidate()) {
      this.$emit('data', this.buildQuery())

      return true;
    }

    return false;
  }

  runValidate() {
    let flag = true;

    flag = flag && this.validateTitle(this.title);
    flag = flag && this.validateAddress(this.address);

    return flag
  }

  validateTitle(title) {
    if(title.length < 4 || title.trim().indexOf(' ') === -1) {
      this.errorBag.title = 'Los naslov';

      return false
    }
    this.errorBag.title = null;

    return true;
  }

  validateAddress(address) {
    if(address.length < 4 || address.trim().indexOf(' ') === -1) {
      this.errorBag.address = 'Losa adresa';

      return false
    }

    return true;
  }


  buildQuery() {
    let obj = {
      title: this.title,
      address: this.address,
      price: this.price,
      location: this.selectedLocation,
      listing_type: this.value,
      category: this.selectedCategory,
    }
    console.log(obj)

    return obj;

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
