<template>
  <div>
    Feha publish

    <div v-show="currentStep === steps.STEP_ONE" class="step-1">
      Step 1

      <h2>Odaberite kategoriju oglasa</h2>
      <div>
        <Categories @selected-category="handleSelectedCategory"/>
      </div>

      <h2>Odaberite vrstu objave</h2>
      <div>
        <PublishRadioButton :options="listingTypes" v-model="listingType"></PublishRadioButton>
      </div>

      <button @click="nextStep">Next</button>
    </div>

    <div v-show="currentStep === steps.STEP_TWO" class="step-2">
      Step 2

      <button @click="prevStep">Prev</button>
      <button @click="nextStep">Next</button>
    </div>

    <div v-show="currentStep === steps.STEP_THREE" class="step-3">
      Step 3

      <button @click="prevStep">Prev</button>
      <button @click="nextStep">Submit</button>
    </div>

  </div>
</template>

<script>
import { Component, Watch, Vue} from "nuxt-property-decorator";
import Categories from "@/components/publishInputs/Categories";

@Component({
  components: {
    Categories
  },
  layout() { return "publish" },
  async asyncData(ctx) {
    let attributes = [];
    let listingTypes = [];

    try {
      let response = await ctx.app.$axios.get('/attributes')
      attributes = response.data.data;
    } catch(e) {
      console.log(e)
    }

    try {
      let res = await ctx.app.$axios.get('/listing_types');
      listingTypes = res.data.data;
    } catch(e) {
      console.log(e)
    }

    return {
      globalAttributes: attributes,
      listingTypes: listingTypes
    }
  }
})
export default class Publish extends Vue {

  created() {
    console.log(this.globalAttributes, 'globali');
  }

  // Stepping logic
  steps = {
    STEP_ONE: 1,
    STEP_TWO: 2,
    STEP_THREE: 3,
    TOTAL_STEPS: 3
  }

  currentStep = this.steps.STEP_ONE;

  nextStep() {
    if (this.currentStep === this.steps.TOTAL_STEPS) {
      // @TODO: Objava
    } else {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Category logic
  currentCategory = null;

  @Watch('currentCategory', {
    deep: true,
  })
  handleCategoryChange(newCategory, oldCategory) {
    if (newCategory) {
      this.fetchAttributesByCategory();
    }
  }

  handleSelectedCategory(e) {
    this.currentCategory = e;
  }

  // Attribute Logic
  categoryAttributes = []
  listingTypeAttributes = []

  async fetchAttributesByCategory() {
    try {
      let response = await this.$axios.get('/category/' + this.category.id + '/attributes');
      this.categoryAttributes = response.data.data;
    } catch(e) {
      console.log(e)
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


  // Listing type logic
  listingType = null;

  @Watch('listingType', {
    deep: true
  })
  handleListingTypeChange(newVal, oldVal) {
    console.log(newVal, 'novi listing tip');
  }
}
</script>

<style scoped lang="scss">

</style>
