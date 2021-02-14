<template>
  <div class="publish-wrapper-inner">
    <Snackbar />
    <div class="progress-wrapper">
        <p>Postotak objave: {{ completion.toFixed() }} %</p>
        <client-only>
          <radial-progress-bar :diameter="200"
                               :animateSpeed="300"
                               :completed-steps="completion"
                               :total-steps="100"
                               startColor="#757B9A"
                               endColor="#757B9A"
                               :strokeWidth="20"
                               :innerStrokeWidth="20"
                               innerStrokeColor="#f1f1f1"
          />
        </client-only>
      </div>

      <div class="content-wrapper">
        <div v-show="currentStep === steps.STEP_ONE" class="step-1">
          <h1 class="heading">
            Osnovne informacije oglasa
          </h1>

          <h2>Kategorija oglasa*</h2>
          <div>
            <InputError :error="errors.category" />
            <Categories @selected-category="handleSelectedCategory" />
          </div>

          <h2>Vrsta objave</h2>
          <div class="publishing-type">
            <InputError :error="errors.listingType" />
            <PublishRadioButton :options="listingTypes" v-model="listingType" :error="errors.listingType.error" :error-message="errors"></PublishRadioButton>
          </div>

          <div class="grid-filters">
            <InputError :error="errors.title" />
            <PublishTextInput type="text" title="Naslov" v-model="title"></PublishTextInput>

            <InputError :error="errors.address" />
            <PublishTextInput type="text" title="Adresa" v-model="address"></PublishTextInput>

            <InputError :error="errors.price" />
            <PublishTextInput type="number" title="Cijena" v-model="price"></PublishTextInput>
          </div>
          <InputError :error="errors.description" />
          <PublishDescriptionInput title="Opis" v-model="description"></PublishDescriptionInput>
          <div class="grid-filters location">
            <InputError :error="errors.city" />
            <PublishDropdown placeholder="Pretrazite lokacije" title="Lokacija" @select-option="handleSelectedCity"></PublishDropdown>
          </div>

          <div v-if="city !== null">
            <PublishMap :location="city"></PublishMap>
          </div>
          <div class="button-wrapper">
            <button @click="nextStep">Dalje
              <i class="material-icons">chevron_right</i>
            </button>
          </div>
        </div>

        <div v-show="currentStep === steps.STEP_TWO" class="step-2">
          <h1 class="heading">
            Detaljne informacije oglasa
          </h1>

          <p class="global-heading">Globalni obicni attributi</p>

          <div v-for="attr in ordinaryGlobalAttributes" :key="attr.id">
            <InputError :error="errors.attributes[attr.id]" />
            <component
              :attr="attr"
              :options="attr"
              :is="filterFor(attr)"
              @changed="handleChangedAttribute"
            />

          </div>

          <h1 class="heading-checkbox">Nekretnina posjeduje</h1>
          <div class="checkbox-grid">
            <TermInput
              v-for="attr in termGlobalAttributes"
              @changed="handleChangedAttribute"
              :attr="attr"
              :key="attr.id"
            />
          </div>

          <p class="global-heading">Kategorija obicni attributi</p>
          <div v-for="attr in ordinaryCategoryAttributes" :key="attr.id">
            <InputError :error="errors.attributes[attr.id]" />
            <component
              :attr="attr"
              :options="attr"
              :is="filterFor(attr)"
              @changed="handleChangedAttribute"
            />
          </div>

          <p class="global-heading">Kategorija cekboxi</p>
          <TermInput
            v-for="attr in termCategoryAttributes"
            @changed="handleChangedAttribute"
            :attr="attr"
            :key="attr.id"
          />

          <p class="global-heading">Listing tip obicni attributi</p>
          <div v-for="attr in ordinaryListingTypeAttributes" :key="attr.id">
            <InputError :error="errors.attributes[attr.id]" />
            <component
              :attr="attr"
              :options="attr"
              :is="filterFor(attr)"
              @changed="handleChangedAttribute"
            />
          </div>

          <p class="global-heading">Listing tip cekboxi</p>
          <TermInput
            v-for="attr in termListingTypeAttributes"
            @changed="handleChangedAttribute"
            :attr="attr"
            :key="attr.id"
          />
          <div class="button-wrapper">
            <button @click="prevStep" class="back">Nazad
              <i class="material-icons">chevron_left</i>
            </button>
            <button @click="nextStep">Next
              <i class="material-icons">chevron_right</i>
            </button>
          </div>
        </div>

        <div v-show="currentStep === steps.STEP_THREE" class="step-3">
          Step 3

          Bice slikica nakon deploya obecavam reha

          <button @click="prevStep">Prev</button>
          <button @click="nextStep">Submit</button>
        </div>
      </div>
  </div>
</template>

<script>
import { Component, Watch, Vue} from "nuxt-property-decorator";
import Categories from "@/components/publishInputs/Categories";
import TermsInput from "@/components/inputs/TermsInput"
import TermInput from "@/components/inputs/TermInput"
import RangeInput from "@/components/inputs/RangeInput"
import InputError from "@/components/inputs/InputError"
import Snackbar from "@/components/global/Snackbar";

@Component({
  components: {
    Categories, TermsInput, TermInput, RangeInput, InputError, Snackbar
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
  // Completion
  completedAttributes = 0

  get completion() {
    const max = this.stepOneValidationProps.length + this.globalAttributes.length + this.categoryAttributes.length + this.listingTypeAttributes.length;

    let real = 0;

    this.stepOneValidationProps.forEach(item => {
      if (this[item]) {
        const prop = this[item];

        if (typeof prop === 'string' && prop.length) {
          real++;
        }

        if (typeof prop === 'object') {
          real++;
        }
      }
    })

    real += this.completedAttributes;

    return real/max * 100;
  }

  get allAttributes() {
    return this.globalAttributes.merge(this.categoryAttributes).merge(this.listingTypeAttributes);
  }

  // Errors
  errors = {
    'title': {
      'error': false,
      'message': "Title needs to be two words"
    },
    'description': {
      'error': false,
      'message': "required"
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

  snackbarValidationError() {
    this.$snackbar.show({
      text: "Imate greske",
      timeout: 1000,
      type: "error"
    });
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
      description: this.description,
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
      this.publish();
    } else {
      switch (this.currentStep) {
        case this.steps.STEP_ONE:
          if(! this.validateStepOne()) {
            this.snackbarValidationError();

            return
          }

          break;

        case this.steps.STEP_TWO:
          if(! this.validateStepTwo()) {
            this.snackbarValidationError();

            return;
          }

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

    if (e) {
      this.completedAttributes = Object.keys(this.attributePayload).length

      this.$set(this.errors.attributes, e.id, {
        error: false
      })
    }
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
        const val = this.attributePayload[item.id];

        flag = (val !== null) && (val !== undefined);

        if (! flag) {
          this.$set(this.errors.attributes, item.id, {
            error: true,
            message: 'Required'
          })
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
    console.log(this.city, 'hahaha')

    this.errors.city.error = false;
  }

  // Basic info
  title = null;
  address = null;
  price = null;
  description = null;

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

  @Watch('description')
  handleDescriptionChange(newVal, oldVal) {
    this.errors.description.error = false;
  }

  // Step 1 validation
  stepOneValidationProps = [
    'title', 'description', 'address', 'price', 'city', 'category', 'listingType'
  ]

  validateTitle() {
    return this.title !== null && this.title !== '';
  }

  validateDescription() {
    return this.description !== null && this.description !== '';
  }

  validateAddress() {
    return this.address !== null && this.address !== '';
  }

  validatePrice() {
    return this.price !== null && this.price !== '';
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
      const result = this['validate' + this.capitalize(item)]();

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
  .publish-wrapper-inner {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 1280px;
    margin: 0 auto;

    .progress-wrapper {
      display: flex;
      flex: 2;
      background: #fff;
      padding: 24px;
      box-sizing: border-box;
      flex-direction: column;

      p {
        font-weight: 500;
        font-size: 18px;
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 24px;
        margin-bottom: 24px;
      }

      ::v-deep .radial-progress-container {
        height: 200px;
        width: 100%;
        min-width: 100%;
        display: flex;
        justify-content: center;
      }
    }

    .content-wrapper {
      display: flex;
      flex: 8;
      padding: 24px;
      background: #fff;
      margin-left: 24px;
      box-sizing: border-box;
      position: relative;
      border-left: 1px solid #f1f1f1;

      .step-1,
      .step-2,
      .step-3 {
        width: 100%;
        height: calc(100vh - 152px);
        overflow-y: scroll;
        padding-bottom: 84px;
        box-sizing: border-box;

        .heading {
          font-size: 20px;
          font-weight: 400;
          border-bottom: 1px solid #f1f1f1;
          padding-bottom: 24px;
          margin-bottom: 36px;

        }

        h2 {
          margin-top: 36px;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 12px;

          &:first-child {
            margin-top: 0;
          }
        }

        .button-wrapper {
          height: 60px;
          width: 100%;
          display: flex;
          align-items: center;
          border-top: 1px solid #f1f1f1;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          padding: 0 24px;
          box-sizing: border-box;
          background: #fff;
          justify-content: flex-end;


          button {
            padding: 0 12px;
            height: 50px;
            width: fit-content;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            border-radius: 8px;
            outline: none;
            border: none;
            background: #757b9a !important;
            color: #fff;
            font-weight: 500 !important;
            transition: 0.3s all ease;

            &.back {
              margin-right: 24px;
            }
            i {
              margin-left: 8px;
            }

            &:hover {
              box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px !important;
            }
          }
        }
      }

    }
  }

  .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 24px;
    grid-column-gap: 24px;
  }

  .global-heading {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 12px;
    margin-top: 24px;
  }

  .publishing-type {
    margin-bottom: 32px;
  }

  .location {
    margin-top: 32px;
  }

  ::v-deep .categories-list-wrap {
      height: fit-content !important;
  }

  .heading-checkbox {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 12px;
    margin-top: 24px;
  }

</style>
