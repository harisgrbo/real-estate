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

      <h2>Izaberite lokaciju nekretnine</h2>
      <div class="grid-filters">
        <PublishDropdown placeholder="Pretrazite lokacije" title="Lokacija" @select-option="handleSelectedCity"></PublishDropdown>
      </div>

      <div v-if="city !== null">
        <PublishMap :location="city"></PublishMap>
      </div>

      <h2>Unesite osnovne informacije</h2>
      <div class="grid-filters">
        <PublishTextInput type="text" title="Naslov" v-model="title"></PublishTextInput>
        <PublishTextInput type="text" title="Adresa" v-model="address"></PublishTextInput>
        <PublishTextInput type="number" title="Cijena" v-model="price"></PublishTextInput>
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
  // Errors
  errors = {
    'title': {
      'error': false,
      'message': "Title needs to be two words"
    },
    'address': {
      'error': false,
      'message': "required"
    },
    'price': {
      'error': false,
      'message': "required"
    },
    'city': {
      'error': false,
      'message': "required"
    },
    'category': {
      'error': false,
      'message': "required"
    },
    'listingType': {
      'error': false,
      'message': "required"
    },
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
      switch (this.currentStep) {
        case this.steps.STEP_ONE:
          let validation = this.validateStepOne();

          if(! validation)
            return

          break;
      }

      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Category logic
  category = null;

  @Watch('category', {
    deep: true,
  })
  handleCategoryChange(newCategory, oldCategory) {
    this.errors.category.error = false;

    if (newCategory) {
      this.fetchAttributesByCategory();
    }
  }

  handleSelectedCategory(e) {
    this.category = e;
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
    this.errors.listingType.error = false;

    if (newVal) {
      this.fetchAttributesByListingType();
    }
  }

  // City location
  city = null;

  handleSelectedCity(f) {
    this.city = f;

    this.errors.city.error = false;
  }

  // Basic info
  title = null;
  address = null;
  price = null;

  @Watch('title')
  handleTitleChange(newVal, oldVal) {
    this.errors.title.error = false;
  }

  @Watch('address')
  handleAddressChange(newVal, oldVal) {
    this.errors.address.error = false;
  }

  @Watch('price')
  handlePriceChange(newVal, oldVal) {
    this.errors.price.error = false;
  }

  // Step 1 validation
  stepOneValidationProps = [
    'title', 'address', 'price', 'city', 'category', 'listingType'
  ]

  validateTitle() {
    return this.title !== null;
  }

  validateAddress() {
    return this.address !== null;
  }

  validatePrice() {
    return this.price !== null;
  }

  validateCity() {
    return this.city !== null;
  }

  validateCategory() {
    return this.category !== null;
  }

  validateListingType() {
    return this.listingType !== null;
  }

  validateStepOne() {
    let flag = true;

    this.stepOneValidationProps.forEach((item) => {
      const firstToUpper = item.charAt(0).toUpperCase() + item.slice(1);
      const result = this['validate' + firstToUpper]();

      if (! result) {
        flag = false;

        this.errors[item].error = true;
      }
    })

    return flag;
  }
}
</script>

<style scoped lang="scss">

</style>
