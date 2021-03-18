<template>
  <div class="publish-wrapper-inner">
    <p class="progress-title" v-if="$device.isMobile">Progres objave</p>
    <div class="horizontal-progress" v-if="$device.isMobile">
      <div class="filler" :style="{ width: completion + '%' }"></div>
    </div>
    <Snackbar />
      <div v-if="!$device.isMobile" class="progress-wrapper">
        <h1 class="heading">Postotak objave:</h1>
        <client-only>
          <radial-progress-bar :diameter="200"
                               :animateSpeed="300"
                               :completed-steps="completion"
                               :total-steps="100"
                               startColor="#0B8489"
                               endColor="#1B1E31"
                               :strokeWidth="10"
                               :innerStrokeWidth="10"
                               innerStrokeColor="#f1f1f1"
          >
            <p class="centered">{{ completion.toFixed() }} %</p>
          </radial-progress-bar>
        </client-only>
        <div class="radial-steps">
          <p>
            Unošenjem što više informacija o Vašem oglasu, omogućujete da on bude vidljiviji većem broju korisnika. Oglasi sa preko 80% popunjenih informacija ulaze u listu najpregledavanijih na sajtu.
          </p>
          <h1 class="heading">Koraci:</h1>
          <ul class="steps-main">
            <li :class="[currentStep === steps.STEP_ONE? 'active' : '']">
              Osnovne informacije
            </li>
            <li :class="[currentStep === steps.STEP_TWO? 'active' : '']">
              Obavezne informacije
            </li>
            <li :class="[currentStep === steps.STEP_THREE? 'active' : '']">
              Slike
            </li>
          </ul>
        </div>
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

          <h2>Lokacija</h2>

          <div v-if="city !== null">
            <p>{{ city.name }}</p>
          </div>

          <ActionButton @action="showModal" :placeholder="city === null? 'Izaberite lokaciju' : 'Promijenite lokaciju'"></ActionButton>

          <div class="grid-filters">
            <InputError :error="errors.neighbourhood" />
            <PublishTextInput type="text" title="Naselje" v-model="neighbourhood"></PublishTextInput>

            <InputError :error="errors.address" />
            <PublishTextInput type="text" title="Adresa" v-model="address" @input.native="showAddressAutocomplete"></PublishTextInput>
            <ul v-if="recommendedAddresses.length">
              <li v-for="item in recommendedAddresses" @click="address = item.description; recommendedAddresses = []">
                {{ item.description }}
              </li>
            </ul>

            <InputError :error="errors.price" />
            <PublishTextInput type="number" title="Cijena" v-model="price"></PublishTextInput>
          </div>
          <InputError :error="errors.description" />
          <PublishDescriptionInput title="Opis" v-model="description"></PublishDescriptionInput>

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

          <div v-for="attr in ordinaryGlobalAttributes" :key="attr.id">
            <InputError v-if="errors.attributes[attr.id]" :error="errors.attributes[attr.id]" />
            <component
              :attr="attr"
              :options="attr"
              :is="filterFor(attr)"
              @changed="handleChangedAttribute"
            />
          </div>

          <div v-for="attr in ordinaryCategoryAttributes" :key="attr.id">
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
            <TermInput
              v-for="attr in termCategoryAttributes"
              @changed="handleChangedAttribute"
              :attr="attr"
              :key="attr.id"
            />
          </div>



<!--          <p class="global-heading">Listing tip obicni attributi</p>-->
<!--          <div v-for="attr in ordinaryListingTypeAttributes" :key="attr.id">-->
<!--            <InputError :error="errors.attributes[attr.id]" />-->
<!--            <component-->
<!--              :attr="attr"-->
<!--              :options="attr"-->
<!--              :is="filterFor(attr)"-->
<!--              @changed="handleChangedAttribute"-->
<!--            />-->
<!--          </div>-->

<!--          <h2>Nekretnina posjeduje</h2>-->
<!--          <TermInput-->
<!--            v-for="attr in termListingTypeAttributes"-->
<!--            @changed="handleChangedAttribute"-->
<!--            :attr="attr"-->
<!--            :key="attr.id"-->
<!--          />-->
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
    <client-only>
      <modal name="location" :adaptive="true" height="100%">
        <div class="modal-inner">
          <div class="modal-header">
            <h2>Izaberite lokaciju</h2>
            <i class="material-icons" @click="$modal.hide('location')">close</i>
          </div>
          <div class="modal-content">
              <div v-if="city !== null" class="map-wrapper">
                <PublishMap :location="city"></PublishMap>
              </div>
              <InputError :error="errors.city" />
              <PublishDropdown placeholder="Pretrazite lokacije" title="Lokacija" @select-option="handleSelectedCity"></PublishDropdown>
          </div>
        </div>
      </modal>
    </client-only>
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
import ActionButton from "@/components/actionButtons/ActionButton"

@Component({
  components: {
    Categories, TermsInput, TermInput, RangeInput, InputError, Snackbar, ActionButton
  },
  middleware: ['auth'],
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
    'neighbourhood': {
      'error': false,
      'message': "neighbourhood needs to be two words"
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

  showModal() {
    this.$modal.show('location');
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
  recommendedAddresses = []

  async publish() {

    const payload = {
      neighbourhood: this.neighbourhood,
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

    console.log(payload, 'pejload')

    try {
      let response = await this.$axios.post('/listings', payload);

      await this.$router.push('/artikal/' + response.data.data.id)
    } catch (e) {
      console.log(e)
    }
  }

  get fullTitle() {
    return this.city_id + this.category_id + this.neighborhood
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

  async showAddressAutocomplete() {
    try {
      let res = await this.$axios.get('/address/autocomplete/' + this.address);
      this.recommendedAddresses = res.data.predictions;

      console.log(this.recommendedAddresses)
    } catch(e) {
      console.log(e)
    }
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
      let response = await this.$axios.get('/categories/' + this.category.id + '/attributes');
      this.categoryAttributes = response.data.data;
      console.log(response, 'atributi kategorije')
    } catch(e) {
      console.log(e)
    }
  }

  async fetchAttributesByListingType() {
    try {
      let response = await this.$axios.get('/listing_types/' + this.listingType.id + '/attributes')
      this.listingTypeAttributes = response.data.data;
      console.log(response)
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

    this.errors.city.error = false;

  }

  // Basic info
  neighbourhood = null;
  address = null;
  price = null;
  description = null;

  @Watch('neighbourhood')
  handleNeighbourhoodChange(newVal, oldVal) {
    this.errors.neighbourhood.error = false;
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
    'neighbourhood', 'description', 'address', 'price', 'city', 'category', 'listingType'
  ]

  validateNeighbourhood() {
    return this.neighbourhood !== null && this.neighbourhood !== '';
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

@mixin for-laptop {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}
@mixin for-desktop-up {
  @media (min-width: 1200px) {
    @content;
  }
}
@mixin for-big-desktop-up {
  @media (min-width: 1800px) {
    @content;
  }
}
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
  .progress-title {
    padding-bottom: 12px;
    font-weight: 500;
    font-size: 17px;
  }

  .horizontal-progress {
    background: #f1f1f1;
    position: relative;
    height: 10px;
    width: 100%;
    border-radius: 5px;



    .filler {
      position: absolute;
      left: 0;
      background: red;
      transition: 0.3s all ease;
      top: 0;
      bottom: 0;
      height: 10px;
      border-radius: 5px;
      z-index:5;
    }
  }
  .publish-wrapper-inner {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 1280px;
    margin: 0 auto;

    @include for-phone-only {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 12px;
      box-sizing: border-box;
    }

    .progress-wrapper {
      display: flex;
      flex: 2;
      background: #fff;
      padding: 24px;
      padding-top: 0;
      box-sizing: border-box;
      flex-direction: column;
      padding-right: 0;

      p.main {
        font-weight: 500;
        font-size: 18px;
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 24px;
        margin-bottom: 24px;

        position: relative;
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 24px;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50px;
          border-bottom: 1px solid #0B8489;
        }
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
      padding: 0 24px;
      background: #fff;
      margin-left: 32px;
      box-sizing: border-box;
      position: relative;
      border-left: 1px solid #f1f1f1;

      @include for-phone-only {
        margin-left: 0;
        border-left: none;
        padding: 0;
        padding-top: 24px;
      }

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
          height: 80px;
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
            padding: 0 24px;
            height: 50px;
            width: fit-content;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            border-radius: 4px;
            outline: none;
            border: none;
            background: #D63946 !important;
            color: #fff;
            font-weight: 500 !important;
            transition: 0.3s all ease;
            margin-bottom: 0;
            font-family: 'Montserrat', sans-serif;

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
    grid-column-gap: 46px;
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

  ::v-deep .categories-list-wrap {
      height: fit-content !important;

    ul li {
      @include for-phone-only {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex: 1;
        padding-bottom: 0;
        height: 50px;
        line-height: 21px;
      }

      .img-wrapper {

        @include for-phone-only {
          margin-bottom: 0;
          border-radius: 5px;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            @include for-phone-only {
              height: 25px;
              width: 25px;
            }
          }
        }

      }

    }
  }

  .heading-checkbox {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 12px;
    margin-top: 24px;
  }

.modal-inner {
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  height: fit-content;
  .modal-header {
    display: flex;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #dcdcdc;
    justify-content: space-between;

    h2 {
      font-size: 17px;
      font-weight: 500;
    }

    svg {
      cursor: pointer;
    }
  }

  .modal-content {
    padding: 24px 0;
    textarea {
      height: 200px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      line-height: 21px;
      box-sizing: border-box;
      padding: 24px;

      &:focus {
        outline: none;

      }
    }
  }
}

::v-deep button {
  margin-bottom: 24px;
  width: fit-content;
}

.map-wrapper {
  margin-bottom: 24px;

  ::v-deep #map {
    margin-top: 0;
  }
}

.steps-main li {
  &.active {
    font-weight: 600;
  }
}

.radial-steps {
  p {
    padding-top: 24px;
    margin-top: 24px;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 22px !important;
    margin-bottom: 24px;
    background: #f9f9f9;
    border-radius: 5px;
    padding: 16px;
    box-sizing: border-box;
    border-top: none;
  }

  h1 {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 24px;
    position: relative;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 24px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      border-bottom: 1px solid #0B8489;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    li {
      height: 40px;
      display: flex;
      align-items: center
    }
  }
}

h1.heading {
  color: #484848 !important;
  font-weight: 500 !important;
  padding-bottom: 24px;
  font-size: 22px !important;
  border-bottom: 1px solid #EBEBEB !important;
  position: relative;
  margin-top: 24px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 80px;
    height: 1px;
    background: #0B8489;
  }
}

::v-deep .terms-wrapper .option-wrapper button {
  width: 100% !important;
  margin-bottom: 0;
}

.centered {
  font-weight: 500;
  font-size: 22px;
}
</style>
