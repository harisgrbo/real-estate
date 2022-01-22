<template>
  <div>
    <button v-for="country in countries" @click="handleSelectedCountry(country)" :class="[selectedIds.indexOf(country.id) !== -1 ? 'active': '']">{{ country.name }}</button>
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

<style scoped>
.active {
  color: red;
}
</style>
