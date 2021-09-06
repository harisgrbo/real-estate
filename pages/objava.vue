<template>
  <div class="publish-wrapper-inner">
      <div class="left">
        <nuxt-link class="absolute top-6 z-10 left-6 bg-white cursor-pointer h-10 w-10 rounded-md flex items-center justify-center back-to-index" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </nuxt-link>
        <h2 v-if="currentStep === steps.STEP_ONE" class="test">
          Izaberite kategoriju oglasa
        </h2>
        <h2 class="test" v-if="currentStep === steps.STEP_TWO">
          Šta želite uraditi sa vašom nekretninom?
        </h2>
        <h2 class="test" v-if="currentStep === steps.STEP_THREE">
          Naselje i adresa nekretnine
        </h2>
        <h2 class="test" v-if="currentStep === steps.STEP_FOUR">
          Unesite cijenu nekretnine
        </h2>
        <h2 class="test" v-if="currentStep === steps.STEP_FIVE">
          Pomjerite pin na tačnu lokaciju nekretnine
        </h2>
        <h2 class="test" v-if="currentStep === steps.STEP_SIX">
          Opišite vašu nekretninu
        </h2>
        <h2 class="test" v-if="currentStep === steps.STEP_SEVEN">
          Označite polja koja vaša nekretnina posjeduje
        </h2>
      </div>
      <div class="content-wrapper">
        <div class="loader-wrapper">
          <div
            :style="{ backgroundColor: '#002F34', width: stepPercentage + '%' }"
            class="loader"
          >
            .
          </div>
        </div>
        <div v-show="currentStep === steps.STEP_ONE" class="step-1 test">
          <div class="inner">
            <Categories @selected-category="handleSelectedCategory" />
          </div>
          <div class="button-wrapper">
            <button @click="nextStep">Dalje
              <i class="material-icons">chevron_right</i>
            </button>
          </div>
        </div>

        <div v-show="currentStep === steps.STEP_TWO" class="step-2 test">
          <div class="inner">
            <PublishRadioButton :options="listingTypes" v-model="listingType" :error="errors.listingType.error" :error-message="errors" @input="nextStep"></PublishRadioButton>
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

        <div v-show="currentStep === steps.STEP_THREE" class="step-3 test">
          <div class="inner">
            <PublishTextInput type="text" title="Adresa" v-model="address" @input.native="showAddressAutocomplete"></PublishTextInput>
          </div>
          <ul v-if="recommendedAddresses.length">
            <li v-for="item in recommendedAddresses" @click="handleSelectedAddress(item)">
              {{ item.description }}
            </li>
          </ul>

          <div>
            <PublishTextInput type="text" title="Naselje" v-model="district" class="mb-6"></PublishTextInput>
            <div v-if="city" @click="city = null;">
              <span>{{ city.name }}</span>
            </div>
            <PublishDropdown v-else :placeholder="'Pretražite lokacije'" @select-option="handleSelectedCity" :class="['relative z-10 publish-drop', city !== null ? 'move-top' : '']"></PublishDropdown>
            <PublishTextInput type="text" title="ZIP" v-model="zip_code"></PublishTextInput>
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

        <div v-show="currentStep === steps.STEP_FOUR" class="step-4 test">
          <div class="inner">
            <PublishTextInput type="number" title="Cijena" v-model="price" :currency="true" :square="price_per_square"></PublishTextInput>
              <label class="cursor-pointer w-full flex justify-between items-center font-medium text-lg mb-4 pdv">PDV uključen u cijenu
                <input type="checkbox" v-model="vat_included" />
              </label>
              <label class="cursor-pointer w-full flex justify-between items-center font-medium text-lg">Cijena po kvadratu
                <input type="checkbox" v-model="price_per_square" />
              </label>
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

        <div v-show="currentStep === steps.STEP_FIVE" class="step-5 test relative h-full">
          <div v-if="city !== null" class="map-wrapper">
            <PublishMap :location="city" @latlng="handleLatLng"></PublishMap>
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

        <div v-show="currentStep === steps.STEP_SIX" class="step-6 test">
          <div class="inner">
            <PublishDescriptionInput title="Opis" v-model="description"></PublishDescriptionInput>
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

        <div v-show="currentStep === steps.STEP_SEVEN" class="step-7 test">
          <div class="inner pt-20 pb-52">
            <div v-for="attr in ordinaryGlobalAttributes" :key="attr.id">
              <InputError :error="errors.attributes[attr.id]" />
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

        <div v-show="currentStep === steps.STEP_EIGHT" class="step-8 test">
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

        <div v-show="currentStep === steps.STEP_NINE" class="step-9 test">
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
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'objava.vue',

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
export default class Objava extends Vue {
  lat = 43;
  lng = 42;
  show = false;
  price_per_square = false;
  vat_included = false;

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

  get stepPercentage() {
    return (1.0 / 8) * 100 * this.currentStep + 1;
  }

  async created() {
    await this.fetchSponsorship()
  }

  selectAdvertisment(o) {
    this.selectedAdvertisment = o.id;
  }

  get allAttributes() {
    return this.globalAttributes.merge(this.categoryAttributes).merge(this.listingTypeAttributes);
  }

  // Errors
  errors = {
    'sponsorship': {
      'error': false,
      'message': "Select sponsorship"
    },
    'district': {
      'error': false,
      'message': "district needs to be two words"
    },
    'description': {
      'error': false,
      'message': "required"
    },
    'address': {
      'error': false,
      'message': "required"
    },
    'zipCode': {
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

  snackbarValidationError(param = false) {
    this.$snackbar.show({
      text: param || "Imate greske",
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
    STEP_FIVE: 5,
    STEP_SIX: 6,
    STEP_SEVEN: 7,
    STEP_EIGHT: 8,
    STEP_NINE: 9,
    TOTAL_STEPS: 9
  }

  currentStep = this.steps.STEP_ONE;
  recommendedAddresses = []

  async publish() {

    const payload = {
      district: this.district,
      description: this.description,
      address: this.address,
      zip_code: this.zip_code,
      price: this.price,
      price_per_square: this.price_per_square,
      vat_included: this.vat_included,
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

      if (this.advertising_options.length) {
        this.selectedAdvertisment = this.advertising_options[0].id;
      }
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
          if(! this.validateMany(['category'])) {
            this.snackbarValidationError("Niste odabrali kategoriju");

            return
          }

          break;

        case this.steps.STEP_TWO:
          if(! this.validateMany(['listingType'])) {
            this.snackbarValidationError("Niste odabrali tip objave");

            return;
          }

          break;

        case this.steps.STEP_THREE:
          if(! this.validateMany(['district', 'address', 'city', 'zipCode'])) {
            this.snackbarValidationError("Niste popunili sve obavezne podatke");

            return;
          }

          break;

        case this.steps.STEP_FOUR:
          if(! this.validateMany(['price'])) {
            this.snackbarValidationError("Niste popunili cijenu");

            return;
          }

          break;

        case this.steps.STEP_FIVE:
          if(! this.validateMany(['city'])) {
            this.snackbarValidationError("Niste postavili pin");

            return;
          }

          break;

        case this.steps.STEP_SIX:
          if(! this.validateMany(['description'])) {
            this.snackbarValidationError("Niste popunili opis");

            return;
          }

          break;

        case this.steps.STEP_SEVEN:
          if(! this.validateAttributes()) {
            this.snackbarValidationError("Niste popunili obavezna polja");

            return;
          }

          break;
        case this.steps.STEP_NINE:
          if(! this.validateMany(['sponsorship'])) {
            this.snackbarValidationError("Niste odabrali plan objave");

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

    this.nextStep();
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

  validateAttributes() {
    let allAttributes = this.globalAttributes.concat(this.categoryAttributes).concat(this.listingTypeAttributes);
    let flag = true;

    allAttributes.forEach(item => {
      console.log(item)

      if (item.required) {
        const val = this.attributePayload[item.id];

        console.log(val)

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
  zip_code = null;

  handleSelectedCity(f) {
    this.city = f;

    this.lat = f.location.lat;
    this.lng = f.location.lng;

    this.errors.city.error = false;

  }

  async handleSelectedAddress(item) {
    try {
      let res = await this.$axios.get('/address/details/' + item.place_id)

      this.address = res.data.address;
      this.city = res.data.city;
      this.district = res.data.district;
      this.lat = res.data.location.lat;
      this.lng = res.data.location.lng;
      this.zip_code = res.data.zip_code;

      if (this.city && this.lat && this.lng) {
        this.city.location.lat = this.lat;
        this.city.location.lng = this.lng;
      }

      if (this.address && this.city && this.district && this.zip_code && this.lat && this.lng) {
        this.nextStep();
      }
    } catch (e) {
      console.log(e)
    }
  }

  // Basic info
  district = null;
  address = null;
  price = null;
  description = null;

  @Watch('district')
  handledistrictChange(newVal, oldVal) {
    this.errors.district.error = false;
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

  @Watch('selectedAdvertisment')
  handleSelectedAdvertismentChange(newVal, oldVal) {
    this.errors.sponsorship.error = false;
  }

  validateSponsorship() {
    return this.selectedAdvertisment !== null;
  }

  validateDistrict() {
    return this.district !== null && this.district !== '';
  }

  validateDescription() {
    return this.description !== null && this.description !== '';
  }

  validateAddress() {
    return this.address !== null && this.address !== '';
  }

  validateZipCode() {
    return this.zip_code !== null && this.zip_code !== '';
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

  validateMany(props) {
    let flag = true;

    props.forEach((item) => {
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
    width: 100%;
    margin: 0 auto;
    flex-direction: row;
    height: 100vh;

    @include for-phone-only {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 12px;
      box-sizing: border-box;
    }

    .content-wrapper {
      display: flex;
      box-sizing: border-box;
      position: relative;
      width: 100%;

      .step-1,
      .step-2,
      .step-3,
      .step-4,
      .step-5,
      .step-6,
      .step-7,
      .step-8
      {
        min-height: 100%;
        width: 100%;
        height: calc(100vh - 80px);
        overflow-y: scroll;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;

        .inner {
          max-width: 600px;
          margin: auto;
          width: 600px;
        }


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
            font-family: 'Raleway', sans-serif;
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
    grid-template-columns: repeat(2, 1fr);
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
    font-size: 18px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 24px;
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
      font-family: 'Raleway', sans-serif;
      font-size: 16px;
      line-height: 26px;
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
  position: absolute;
  top: -24px;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100vh - 80px);


  ::v-deep #map {
    margin-top: 0;
    height: 100% !important;
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

@keyframes fadein {
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
}
@-moz-keyframes fadein { /* Firefox */
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
}
@-webkit-keyframes fadein { /* Safari and Chrome */
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
}
@-o-keyframes fadein { /* Opera */
  from {
    opacity:0;
  }
  to {
    opacity: 1;
  }
}
.test {
  animation: fadein 2s;
  -moz-animation: fadein 2s; /* Firefox */
  -webkit-animation: fadein 2s; /* Safari and Chrome */
  -o-animation: fadein 2s; /* Opera */
}

.left {
  background-image: url(/login2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 50% !important;
  min-width: 50%;
  display: flex;
  align-items: flex-start;
  position: relative;
  padding: 24px;
  padding-top: 200px;

  &::after {
    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,0.53125) 0%, rgba(255,255,255,0) 100%);
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
    height: 80%;
  }


  h2 {
    font-size: 52px;
    font-weight: bold;
    color: white;
    position: relative;
    z-index: 1;
    line-height: 65px;
  }
}

.loader-wrapper {
  position: absolute;
  width: 100%;
  bottom: 80px;
  right: 0;
  z-index: 10;
  transition: 0.3s all ease;
  height: 3px;
  color: transparent;

  .loader {
    height: 3px;
  }
}

.move-top {
  margin-top: -65%;
  box-shadow: rgb(0 0 0 / 12%) 0px 0px 0px 8px;
  border-radius: 10px;
}

.publish-drop {
  transition: 0.3s all ease;
}

.pdv {
  border-top: 1px solid #f1f1f1;
  padding-top: 24px;
  margin-top: 24px;
}

</style>
