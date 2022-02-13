<template>
  <div class="flex flex-col">
    <label>
      Izaberite državu
    </label>
    <div class="options-wrap">
      <button v-for="country in countries" @click="handleSelectedCountry(country)" :class="[selectedIds.indexOf(country.id) !== -1 ? 'active': '']">{{ country.name }}</button>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({})
export default class CountriesMultipleSelect extends Vue {
  @Prop({ type: Array, default: () => [] }) initialCountryIds;

  countries = [];

  selectedIds = [];

  async created() {
    this.selectedIds = this.initialCountryIds;

    await this.fetchCountries();
  }

  async fetchCountries() {
    try {
      const res = await this.$axios.get('/countries');

      this.countries = res.data.data;
    } catch (e) {
      console.log(e)
    }
  }

  handleSelectedCountry(country) {
    let id = country.id;

    let index = this.selectedIds.indexOf(id);

    if (index === -1) {
      this.selectedIds.push(id);
    } else {
      this.selectedIds.splice(index, 1);
    }

    this.$emit('countries', this.selectedIds);
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

label {
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 12px;
  margin-top: 24px;
}

.options-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 16px;
  grid-column-gap: 16px;

@include for-phone-only {
  grid-template-columns: repeat(2, 1fr);
}


button {
  background: #f3f4f5;
  border-radius: 4px;
  box-shadow: none;
  box-sizing: border-box;
  height: 48px;
  line-height: .733rem;
  margin: initial;
  overflow: hidden;
  padding: 1px 2px;
  white-space: normal;
  width: 100%;
  font-size: 14px;

&:focus {
   outline: none;
 }

&.active {
   background: #cacdd2;

 }
}
}
</style>
