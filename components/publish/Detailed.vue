<template>
  <div>
    <p>Attributi</p>
    <component
      v-for="(attr, index) in ordinalInputs"
      :attr="attr"
      :options="attr"
      :is="filterFor(attr)"
      @changed="handleChanged"
    />
    <div>
      Checkbox
      <TermInput
        v-for="(attr, index) in termInputs"
        @changed="handleChanged"
        :attr="attr"
      />
    </div>
    <p>Attributi listing tipa</p>

    <ul>
      <li v-for="attr in listingTypeAttributes">
        {{ attr.name }}
      </li>
    </ul>
    <p>Attributi kategorije</p>

    <ul>
      <li v-for="attr in categoryAttributes">
        {{ attr.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

import TermsInput from "@/components/inputs/TermsInput"
import TermInput from "@/components/inputs/TermInput"
import RangeInput from "@/components/inputs/RangeInput"

@Component({
  components: {RangeInput, TermsInput, TermInput},
})

export default class Detailed extends Vue {
  @Prop({ type: Object }) category;
  @Prop({ type: Object }) listingType;

  attributes = [];
  listingTypeAttributes = [];
  categoryAttributes = [];
  selectedTermsInputs = {}

  async created() {
    await this.fetchAttributes();
    await this.fetchAttributesByCategory();
    await this.fetchAttributesByListingType();
  }

  async fetchAttributesByCategory() {
    try {
      let response = await this.$axios.get('/category/' + this.category.id + '/attributes');
      this.categoryAttributes = response.data.data;
    } catch(e) {
      console.log(e)
    }
  }

  get termInputs() {
    if(this.attributes) {
      return this.attributes.filter(item => item.attr_type === 'term');
    } else {
      return []
    }
  }

  get ordinalInputs() {
    if(this.attributes) {
      return this.attributes.filter(item => item.attr_type !== 'term');
    } else {
      return []
    }
  }

  async fetchAttributesByListingType() {
    try {
      let response = await this.$axios.get('/listing_type/' + this.listingType.id + '/attributes')
      this.listingTypeAttributes = response.data.data;
    } catch(e) {
      console.log(e)
    }
  }

  async fetchAttributes() {
    try {
      let response = await this.$axios.get('/attributes')
      this.attributes = response.data.data;
      console.log(this.attributes)
    } catch(e) {
      console.log(e)
    }
  }

  handleChanged(e) {
    this.selectedTermsInputs[e.id] = e;
    console.log(this.selectedTermsInputs, 'inputi')
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  filterFor(attr) {
    return `${this.capitalize(attr.attr_type)}Input`;
  }
}
</script>

<style scoped lang="scss">

</style>
