<template>
  <div class="publish-wrapper-inner">
      <div v-if="!$device.isMobile" class="progress-wrapper mt-6">
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
          <div class="rounded-md bg-blue-50 p-4 mb-6 mt-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <!-- Heroicon name: solid/information-circle -->
                <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3 flex-1 md:flex md:justify-between">
                <p class="text-sm text-blue-700">
                  Unošenjem što više informacija o Vašem oglasu, omogućujete da on bude vidljiviji većem broju korisnika. Oglasi sa preko 80% popunjenih informacija ulaze u listu najpregledavanijih na sajtu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-wrapper my-6">
        <div v-show="currentStep === steps.STEP_ONE" class="step-1">
          <h1 class="heading">
            Osnovne informacije oglasa
          </h1>

          <h2>Kategorija oglasa*</h2>
          <div>
            <Categories @selected-category="handleSelectedCategory" />
          </div>

          <h2>Vrsta objave</h2>
          <div class="publishing-type">
            <PublishRadioButton :options="listingTypes" v-model="listingType" :error="errors.listingType.error" :error-message="errors"></PublishRadioButton>
          </div>

          <div class="grid-filters">
            <PublishTextInput type="text" title="Naselje" v-model="neighbourhood"></PublishTextInput>

            <PublishTextInput type="text" title="Adresa" v-model="address" @input.native="showAddressAutocomplete"></PublishTextInput>
            <ul v-if="recommendedAddresses.length">
              <li v-for="item in recommendedAddresses" @click="address = item.description; recommendedAddresses = []">
                {{ item.description }}
              </li>
            </ul>

            <PublishTextInput type="number" title="Cijena" v-model="price" :currency="true"></PublishTextInput>
          </div>
          <h2>Lokacija</h2>

          <div v-if="city !== null">
            <p>{{ city.name }}</p>
          </div>

          <PublishDropdown placeholder="Pretrazite lokacije" @select-option="handleSelectedCity"></PublishDropdown>

          <div v-if="city !== null" class="map-wrapper">
            <PublishMap :location="city" @latlng="handleLatLng"></PublishMap>
          </div>
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

          <div class="button-wrapper">
            <button @click="prevStep" class="back">Nazad
              <i class="material-icons">chevron_left</i>
            </button>
            <button @click="nextStep">Dalje
              <i class="material-icons">chevron_right</i>
            </button>
          </div>
        </div>

        <div v-show="currentStep === steps.STEP_THREE" class="step-3">
          <h2 class="info">Objava prvih 8 slika je besplatna. Kako biste objavili dodatne slike pretplatite se na jedan od premium paketa ili doplatite dodanu sliku kreditom.</h2>
          <div class="img-upload-wrapper">
            <div class="upload-btn">
              <font-awesome-icon icon="cloud-upload-alt"></font-awesome-icon>
              <p>ili</p>
              <ActionButton placeholder="Dodaj slike"></ActionButton>
            </div>
            <div class="uploaded-images">
              <div class="uploaded-grid">
                <img src="/stan.jpg" alt="">
                <img src="/stan.jpg" alt="">
                <img src="/stan.jpg" alt="">
                <img src="/stan.jpg" alt="">
              </div>
            </div>
          </div>

          <div class="button-wrapper">
            <button @click="prevStep" class="back">Nazad
              <i class="material-icons">chevron_left</i>
            </button>
            <button @click="nextStep">Dalje
              <i class="material-icons">chevron_right</i>
            </button>
          </div>
        </div>

        <!-- izdvajanje -->

        <div v-show="currentStep === steps.STEP_FOUR" class="step-3">
          <h1 class="heading">
            Promocija oglasa
          </h1>
          <div class="advertising-options-wrapper">
            <div class="advertising-options">
              <ul>
                <li v-for="(option, index) in advertising_options" :key="index" @click="selectAdvertisment(option)" :class="[selectedAdvertisment === option.id ? 'selected' : '']">
                  <img :src="selectedAdvertisment === option.id ? '/GreenCheck.svg' : '/EmptyCheck.svg'" alt="">
                  <img src="/IzdvojenaKategorija.svg" alt="mainoption" class="main">
                  <div class="text-wrapper">
                    <p>{{ option.title }}</p>
                    <p>{{ option.description }}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="advertising-calculator">
              <div class="inner">
                test
              </div>
              <ActionButton placeholder="Dopuni kredit"></ActionButton>
            </div>
          </div>

          <div class="button-wrapper">
            <button @click="prevStep" class="back">Nazad
              <i class="material-icons">chevron_left</i>
            </button>
            <button @click="nextStep">Završi
              <i class="material-icons">chevron_right</i>
            </button>
          </div>
        </div>
      </div>
    <Snackbar />

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
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'publish',

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
  lat = 43;
  lng = 42;

  // Completion
  completedAttributes = 0
  selectedAdvertisment = null;
  advertising_options = [
    // {
    //   id: 1,
    //   text: 'Standardna vidljivost',
    //   description: 'Oglas nije promovisan',
    //   img: '/StandardnaObjava.svg',
    // },
    // {
    //   id: 2,
    //   text: 'Promocija u kategoriji oglasa',
    //   description: 'Oglas promovisan na pretrazi u kategoriji oglasa',
    //   img: '/IzdvojenaKategorija.svg'
    // },
    // {
    //   id: 3,
    //   text: 'Promovisanje u kategoriji oglasa i na početnoj stranici',
    //   description: 'Oglas promovisan na pretrazi u kategoriji oglasa i na početnoj stranici sa drugom bojom',
    //   img: '/IzdvojenaKategorijaNaslovna.svg'
    // },
  ]

  async created() {
    await this.fetchSponsorship()
  }

  selectAdvertisment(o) {
    this.selectedAdvertisment = o.id;
  }

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
      type: "danger"
    });
  }

  // Stepping logic
  steps = {
    STEP_ONE: 1,
    STEP_TWO: 2,
    STEP_THREE: 3,
    STEP_FOUR: 4,
    TOTAL_STEPS: 4
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
      lat: this.lat,
      lng: this.lng,
      attributes: this.prepareAttributes(),
      sponsorship_id: this.selectedAdvertisment,
    }


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

  async fetchSponsorship() {
    try {
      let res = await this.$axios.get('/sponsorship/packages');
      this.advertising_options = res.data.data;

      console.log(this.advertising_options, 'packages')
    } catch(e) {
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

  async showAddressAutocomplete() {
    try {
      let res = await this.$axios.get('/address/autocomplete/' + this.address);
      this.recommendedAddresses = res.data.predictions;

      console.log(res)

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
        id: item.id,
        name: item.name,
        value: item.value
      })
    })

    return result;
  }

  handleLatLng(e) {
    this.lat = e.lat
    this.lng = e.lng;
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

    this.lat = f.location.lat;
    this.lng = f.location.lng;

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

    @include for-phone-only {
      padding-top: 12px;
      box-sizing: border-box;
    }
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

        @include for-phone-only {
          height: calc(100vh - 75px);
          padding-bottom: 120px;
        }

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
          justify-content: space-between;

          @include for-phone-only {
            padding: 0;
            justify-content: space-between;
          }


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
            background: #1B1E31 !important;
            color: #fff;
            font-weight: 500 !important;
            transition: 0.3s all ease;
            margin-bottom: 0;
            font-family: 'Montserrat', sans-serif;
            cursor: pointer;

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

    @include for-phone-only {
      grid-template-columns: repeat(2, 1fr);

    }
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
  margin-top: 24px;

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

  @include for-phone-only {
    font-size: 18px !important;
    padding-bottom: 12px !important;
    margin-top: 12px !important;
    margin-bottom: 12px !important;
  }

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

.img-upload-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 36px 0;

  @include for-phone-only {
    flex-direction: column;
  }

  .upload-btn {
    display: flex;
    flex: 1;
    border: 2px dashed #dcdcdc;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    height: fit-content;
    flex-direction: column;
    padding: 48px 0;

    svg {
      font-size: 56px;
      color: #dcdcdc;
    }
    p {
      margin-top: 24px;
    }
  }

  .uploaded-images {
    display: flex;
    flex: 2;
    flex-direction: column;
    margin-left: 24px;
    box-sizing: border-box;

    @include for-phone-only {
      margin-left: 0;
      margin-top: 24px;
    }


    .uploaded-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 12px;
      grid-row-gap: 12px;

      @include for-phone-only {
        grid-template-columns: repeat(3, 1fr);

      }

      img {
        border-radius: 10px;
        height: 100%;
        width: 100%;
      }
    }
  }
}

h2.info {
  background-color: #f1f1f1;
  color: #444;
  font-size: 16px;
  padding: 12px;
  border-radius: 10px;
  margin-top: 36px !important;
  font-weight: 500 !important;
  line-height: 22px;
}

.advertising-options-wrapper {
  display: flex;
  justify-content: space-between;

  @include for-phone-only {
    flex-direction: column;
  }

  .advertising-options {
    display: flex;
    flex: 3;
    display: flex;
    flex-direction: column;
    height: fit-content;
    padding: 0px 0 48px 0;

    ul {
      display: flex;
      width: 100%;
      flex-direction: column;

      @include for-phone-only {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 12px;
        grid-row-gap: 12px;
      }

      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        height: 100px;
        cursor: pointer;
        padding: 12px;

        @include for-phone-only {
          height: fit-content;
          flex-direction: column;
        }

        img {
          margin-right: 24px;
          height: 30px;

          @include for-phone-only {
            margin-right: 0;
          }

          &.main {
            height: 100px;

            @include for-phone-only {
              height: 60px;
              margin-bottom: 0;
            }
          }

        }

        &.selected {
          background: #f1f1f1;
          border-radius: 10px;
        }
      }
    }

    svg {
      font-size: 56px;
      color: #dcdcdc;
    }
    .text-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: flex-start;

      @include for-phone-only {
        align-items: center;
      }

      p {
        &:first-child {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 12px;

          @include for-phone-only {
            font-size: 16px;
            text-align: left;
            margin-bottom: 12px;
            margin-top: 12px;
            line-height: 20px;
            text-align: center;
          }
        }

        &:last-child {
          font-size: 15px;
          font-weight: 400;

          @include for-phone-only {
            font-size: 14px;
            line-height: 20px;
            text-align: center;

          }
        }
      }
    }
  }

  .advertising-calculator {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: fit-content;
    margin-left: 24px;

    @include for-phone-only {
      margin-left: 0;
    }

    .inner {
      border: 1px solid #dcdcdc;
      border-radius: 10px;
      padding: 12px;
      box-sizing: border-box;
    }

    ::v-deep button{
      width: 100%;
    }

  }
}

h2.info {
  background-color: #f1f1f1;
  color: #444;
  font-size: 16px;
  padding: 12px;
  border-radius: 10px;
  margin-top: 36px !important;
  font-weight: 500 !important;
  line-height: 22px;
}

::v-deep body {
  height: 100%;
}
</style>
