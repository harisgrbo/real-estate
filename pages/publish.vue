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

      <p>Globalni obicni attributi</p>
      <component
        v-for="(attr, index) in ordinaryGlobalAttributes"
        :attr="attr"
        :options="attr"
        :is="filterFor(attr)"
        @changed="handleChangedAttribute"
      />

      <p>Globalni cekboxi</p>
      <TermInput
        v-for="(attr, index) in termGlobalAttributes"
        @changed="handleChangedAttribute"
        :attr="attr"
      />

      <p>Kategorija obicni attributi</p>
      <component
        v-for="(attr, index) in ordinaryCategoryAttributes"
        :attr="attr"
        :options="attr"
        :is="filterFor(attr)"
        @changed="handleChangedAttribute"
      />

      <p>Kategorija cekboxi</p>
      <TermInput
        v-for="(attr, index) in termCategoryAttributes"
        @changed="handleChangedAttribute"
        :attr="attr"
      />

      <p>Listing tip obicni attributi</p>
      <component
        v-for="(attr, index) in ordinaryListingTypeAttributes"
        :attr="attr"
        :options="attr"
        :is="filterFor(attr)"
        @changed="handleChangedAttribute"
      />

      <p>Listing tip cekboxi</p>
      <TermInput
        v-for="(attr, index) in termListingTypeAttributes"
        @changed="handleChangedAttribute"
        :attr="attr"
      />

      <button @click="prevStep">Prev</button>
      <button @click="nextStep">Next</button>
    </div>

    <div v-show="currentStep === steps.STEP_THREE" class="step-3">
      Step 3

      Bice slikica nakon deploya obecavam reha

      <button @click="prevStep">Prev</button>
      <button @click="nextStep">Submit</button>
    </div>

  </div>
</template>

<script>
import { Component, Watch, Vue} from "nuxt-property-decorator";
import Categories from "@/components/publishInputs/Categories";

import TermsInput from "@/components/inputs/TermsInput"
import TermInput from "@/components/inputs/TermInput"
import RangeInput from "@/components/inputs/RangeInput"

@Component({
  components: {
    Categories, TermsInput, TermInput, RangeInput
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
    'attributes': {}
  }

  // Util
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Stepping logic
  steps = {
    STEP_ONE: 1,
    STEP_TWO: 2,
    STEP_THREE: 3,
    TOTAL_STEPS: 3
  }

  currentStep = this.steps.STEP_ONE;

  async publish() {
    const payload = {
      title: this.title,
      description: 'Description',
      address: this.address,
      price: this.price,
      listing_type_id: this.listingType.id,
      category_id: this.category.id,
      city_id: this.city.id,
      lat: 42,
      lng: 43,
      attributes: this.prepareAttributes()
    }

    try {
      let response = await this.$axios.post('/listings', payload);

      await this.$router.push('/artikal/' + response.data.data.id)
    } catch (e) {
      console.log(e)
    }
  }

  nextStep() {
    if (this.currentStep === this.steps.TOTAL_STEPS) {
      // @TODO: Objava
      this.publish();
    } else {
      switch (this.currentStep) {
        case this.steps.STEP_ONE:
          if(! this.validateStepOne())
            return

          break;

        case this.steps.STEP_TWO:
          if(! this.validateStepTwo())
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
  filterFor(attr) {
    return `${this.capitalize(attr.attr_type)}Input`;
  }

  categoryAttributes = []
  listingTypeAttributes = []

  attributePayload = {};

  prepareAttributes() {
    let result = []

    Object.values(this.attributePayload).forEach(item => {
      result.push({
        name: item.name,
        value: item.value
      })
    })

    return result;
  }

  handleChangedAttribute(e) {
    this.attributePayload[e.id] = e;
    console.log(this.attributePayload, 'attr payloadare');
  }

  get ordinaryGlobalAttributes() {
    return this.globalAttributes.filter(item => item.attr_type !== 'term');
  }

  get termGlobalAttributes() {
    return this.globalAttributes.filter(item => item.attr_type === 'term');
  }

  get ordinaryCategoryAttributes() {
    return this.categoryAttributes.filter(item => item.attr_type !== 'term');
  }

  get termCategoryAttributes() {
    return this.categoryAttributes.filter(item => item.attr_type === 'term');
  }

  get ordinaryListingTypeAttributes() {
    return this.listingTypeAttributes.filter(item => item.attr_type !== 'term');
  }

  get termListingTypeAttributes() {
    return this.listingTypeAttributes.filter(item => item.attr_type === 'term');
  }

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

  validateStepTwo() {
    let allAttributes = this.ordinaryGlobalAttributes;
    let flag = true;

    allAttributes.forEach(item => {
      if (item.required) {
        flag = this.attributePayload[item.id] !== null;

        if (! flag) {
          this.errors.attributes[item.id] = true;
        }
      }
    })

    return flag;
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
      const firstToUpper = this.capitalize(item)
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
