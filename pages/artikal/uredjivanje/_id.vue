<template>
  <div class="preview-wrapper-inner">
    <Snackbar />
    <div class="content-wrapper w-full" v-if="listingLoaded">
      <div class="step-1">
        <h1 class="heading">
          Osnovne informacije oglasa
        </h1>

        <div class="grid-filters">
          <InputError :error="errors.district" />
          <TextField type="text" label="Naselje" v-model="listing.district"></TextField>

          <InputError :error="errors.address" />
          <TextField type="text" label="Adresa" v-model="listing.address" @input.native="showAddressAutocomplete"></TextField>
          <ul v-if="recommendedAddresses.length">
            <li v-for="item in recommendedAddresses" @click="address = item.description; recommendedAddresses = []">
              {{ item.description }}
            </li>
          </ul>

          <InputError :error="errors.price" />
          <TextField type="number" label="Cijena" v-model="listing.price" :currency="true"></TextField>
          <div class="bg-50 flex flex-col w-full">
            <div class="flex flex-row items-end">
              <TextField type="number" label="Popust na cijenu" v-model="discount" discount="true"></TextField>
              <action-button class="ml-4" @action="addDiscount" v-if="discount.length" placeholder="Potvrdi popust"></action-button>
            </div>
            <div class="mt-3" v-if="discount.length">
              <label class="block text-md font-semibold text-gray-900 mb-2">Period akcije</label>
              <vc-date-picker
                :min-date="new Date()"
                v-model="range"
                :masks="masks"
                is-expanded="true"
                is-range
              >
                <template v-slot="{ inputValue, inputEvents, isDragging }">
                  <div class="flex flex-row justify-start items-center">
                    <div class="relative flex-grow w-full">
                      <svg
                        class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <input
                        class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full date-input"
                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                      />
                    </div>
                    <span class="flex-shrink-0 m-2">
              <svg
                class="w-4 h-4 stroke-current text-gray-600"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
                    <div class="relative flex-grow w-full">
                      <svg
                        class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <input
                        class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full date-input"
                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                        :value="inputValue.end"
                        v-on="inputEvents.end"
                      />
                    </div>
                  </div>
                </template>
              </vc-date-picker>
            </div>
          </div>
        </div>
        <DropdownAutocomplete label="Lokacija" placeholder="Pretrazite lokacije" @select-option="handleSelectedCity"></DropdownAutocomplete>

        <PublishMap :location="listing" @latlng="handleLatLng"></PublishMap>
        <InputError :error="errors.city" />
        <InputError :error="errors.description" />
        <TextAreaField class="mt-4" label="Youtube iframe" type="text" placeholder="https://youtube.com/1wts5" v-model="listing.video_url"></TextAreaField>
        <TextAreaField class="mt-4" label="Opis" v-model="listing.description"></TextAreaField>
      </div>

      <div class="step-2">
        <h1 class="heading">
          Detaljne informacije oglasa
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 up:grid-cols-2 gap-x-5 gap-y-5 grid-flow-row auto-rows-auto">
          <div v-for="attr in ordinaryGlobalAttributes" :key="attr.id">
            <InputError v-if="errors.attributes[attr.id]" :error="errors.attributes[attr.id]" />
            <component
              :attr="attr"
              :options="attr"
              :init="findValueFromListing(attr.id)"
              :is="filterFor(attr)"
              @changed="handleChangedAttribute"
            />
          </div>

          <div v-for="attr in ordinaryCategoryAttributes" :key="attr.id">
            <InputError :error="errors.attributes[attr.id]" />
            <component
              :attr="attr"
              :init="findValueFromListing(attr.id)"
              :options="attr"
              :is="filterFor(attr)"
              @changed="handleChangedAttribute"
            />
          </div>
        </div>


        <h1 class="heading-checkbox">Nekretnina posjeduje</h1>
        <div class="checkbox-grid">
          <TermInput
            v-for="attr in termGlobalAttributes"
            @changed="handleChangedAttribute"
            :attr="attr"
            :init="findValueFromListing(attr.id)"
            :key="attr.id"
          />
          <TermInput
            v-for="attr in termCategoryAttributes"
            @changed="handleChangedAttribute"
            :attr="attr"
            :init="findValueFromListing(attr.id)"
            :key="attr.id"
          />
        </div>
      </div>

      <div class="w-full my-10 flex-col">
        <h1 class="heading">
          Slike
        </h1>
        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md mb-10">
          <label for="upload" class="space-y-1 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="flex flex-col text-sm text-gray-600">
              <label class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600">
                <span>Ubaci slike</span>
                <input type="file" class="hidden" accept="image/*" @change="uploadImages" multiple ref="upload">
              </label>
              <p class="pl-1">ili prenesi ovdje</p>
            </div>
          </label>
        </div>
        <div class="w-full rounded-md mobile-image-grid">
          <div v-for="(image, index) in listing.images" class="img-upload-box">
            <img :src="image.url" width="300" height="200" />
            <button @click="deleteImage(image, index)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <ActionButton @action="saveChanges" :style-options="{ background: 'transparent', border: '2px solid #1F2937', color: '#1F2937', borderRadius: '4px', minHeight: '48px', height: '48px', marginRight: '24px', fontSize: '13px', width: $device.isMobile ? '100%' : 'auto'}" class="mt-6" placeholder="Spasi izmjene"></ActionButton>
    </div>
  </div>
</template>

<script>
import { Component, Watch, Vue} from "nuxt-property-decorator";
import Categories from "@/components/publishInputs/Categories";
import TermsInput from "@/components/inputs/TermsInput"
import TermInput from "@/components/inputs/TermInput"
import TextField from "@/components/inputs/TextField";
import RangeInput from "@/components/inputs/RangeInput"
import InputError from "@/components/inputs/InputError"
import Snackbar from "@/components/global/Snackbar";
import ActionButton from "@/components/actionButtons/ActionButton"
import TextAreaField from "../../../components/inputs/TextAreaField";
import DropdownAutocomplete from "../../../components/inputs/DropdownAutocomplete";

@Component({
  components: {
    DropdownAutocomplete,
    TextAreaField, Categories, TermsInput, TermInput, RangeInput, TextField, InputError, Snackbar, ActionButton
  },
  middleware: ['auth'],
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',

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
export default class ListingEdit extends Vue {
  lat = 43;
  lng = 42;
  completedAttributes = 0
  selectedAdvertisment = null;
  listing = null
  discount = ""

  async fetchListing(id) {
    this.listingLoaded = false;
    try {
      let res = await this.$axios.$get('/listings/' + id);

      this.listing = res.data;

      this.listingLoaded = true;
    } catch(e) {
      console.log(e)
    }
  }

  get transformDiscount() {
    return this.discount / 100;
  }

  async addDiscount() {
    let start = this.$moment(this.range.start);
    let end = this.$moment(this.range.end);

    try {
      let res = await this.$axios.post('/listings/' + this.$route.params.id + '/discount', {
        percentage: this.transformDiscount,
        starts_at: start.format('D-M-Y'),
        ends_at: end.format('D-M-Y')
      });

      this.$snackbar.show({
        text: "Uspješno ste dodali popust na oglas",
        timeout: 3000,
        type: "success"
      });

    } catch(e) {
      console.log(e)
    }
  }

  async created() {
    await this.fetchListing(this.$route.params.id);
    await this.fetchSponsorship();
    await this.fetchAttributesByCategory();
    await this.fetchAttributesByListingType();

    this.lat = this.listing.location.lat;
    this.lng = this.listing.location.lng;
  }

  async uploadImages() {
    let images = this.$refs.upload.files;

    const form = new FormData();

    images.forEach(item => {
      form.append('images[]', item)
    })

    const headers = { 'Content-Type': 'multipart/form-data' };

    try {
      let res = await this.$axios.post('/listings/' + this.listing.id + '/images', form, { headers })

      console.log(res, 'response images')

      this.listing.images = this.listing.images.concat(res.data.data)
    } catch(e) {
      console.log(e)
    }
  }

  async deleteImage(image, index) {
    this.listing.images.splice(index, 1);

    try {
      await this.$axios.delete("/listing_images/" + image.id);
    } catch (e) {
      console.log(e);
    }
  }

  findValueFromListing(id) {
    let item = this.listing.attributes.find(item => item.id === id);

    return item ? item.value: null;
  }

  selectAdvertisment(o) {
    this.selectedAdvertisment = o.id;
  }


  get allAttributes() {
    return this.globalAttributes.merge(this.categoryAttributes).merge(this.listingTypeAttributes);
  }

  // Errors
  errors = {
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
    STEP_FOUR: 4,
    TOTAL_STEPS: 4
  }
  range = {
    start: new Date(),
    end: new Date(),
  }
  currentStep = this.steps.STEP_FOUR;
  recommendedAddresses = []

  async saveChanges() {
    const payload = {
      district: this.listing.district,
      description: this.listing.description,
      address: this.listing.address,
      price: this.listing.price,
      city_id: this.listing.city.id,
      lat: this.lat,
      lng: this.lng,
      attributes: this.prepareAttributes(),
    }

    console.log(payload)

    try {
      let response = await this.$axios.put('/listings/' + this.listing.id, payload);

      this.listing = response.data.data;

      this.$snackbar.show({
        text: "Uspješno ste spasili izmjene",
        timeout: 3000,
        type: "success"
      });

      this.$router.push('/artikal/' + this.listing.id)
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
    let result = this.listing.attributes;

    Object.values(this.attributePayload).forEach(item => {
      let index = result.findIndex(i => i.id === item.id);

      if (index !== -1) {
        result.splice(index, 1);
      }

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
      let response = await this.$axios.get('/categories/' + this.listing.category.id + '/attributes');
      this.categoryAttributes = response.data.data;
      console.log(response, 'atributi kategorije')
    } catch(e) {
      console.log(e)
    }
  }

  async fetchAttributesByListingType() {
    try {
      let response = await this.$axios.get('/listing_types/' + this.listing.listingType.id + '/attributes')
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

  // City location
  city = null;

  handleSelectedCity(f) {

    console.log(f)
    this.city = f;

    this.lat = f.location.lat;
    this.lng = f.location.lng;

    this.errors.city.error = false;

  }

  // Basic info
  district = null;
  address = null;
  price = null;
  description = null;
  listingLoaded = false;

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

  // Step 1 validation
  stepOneValidationProps = [
    'district', 'description', 'address', 'price', 'city', 'category', 'listingType'
  ]

  validatedistrict() {
    return this.district !== null && this.district !== '';
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

.preview-wrapper-inner {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 4px;
  padding: 0 24px 24px 24px;
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
    flex-direction: column;
    padding: 0 24px;
    background: #fff;
    margin-left: 32px;
    box-sizing: border-box;
    position: relative;
    height: 100%;
    width: 70%;
    margin: 0 auto;

    @include for-phone-only {
      margin-left: 0;
      border-left: none;
      padding: 0;
      padding-top: 24px;
      width: 100%;
      padding: 16px;
    }

    .step-3 {
      input {
        padding-right: 16px;
      }
    }

    .step-1,
    .step-2,
    .step-3 {
      width: 100%;
      height: fit-content;
      padding-bottom: 84px;
      box-sizing: border-box;

      @include for-phone-only {
        height: fit-content;
        padding-bottom: 120px;
      }

      .heading {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 36px;

        @include for-phone-only {
          margin-top: 12px;
        }
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
      font-family: 'Outfit', sans-serif;
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
  color: #000 !important;
  font-weight: 600 !important;
  font-size: 19px !important;
  margin-top: 24px;

  @include for-phone-only {
    font-size: 18px !important;
    padding-bottom: 12px !important;
    margin-top: 24px !important;
    margin-bottom: 12px !important;
  }

}

::v-deep .option-wrapper {
  grid-template-columns: repeat(3, 1fr);

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

.upload-images {
  width: 100%;
  height: 100px;
  background: #f1f1f1;
}

.img-upload-box {
  position: relative;

  img {
    height: 150px;
  }

  button {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #1F2937;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    cursor: pointer;

    svg {
      font-size: 13px;
    }
  }
}

.mobile-image-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 14px;

  @include for-phone-only {
    grid-template-columns: repeat(2, 1fr);
  }
}

label {
  font-size: 16px;
}
</style>
