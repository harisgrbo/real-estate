<template>
    <div class="publish-wrapper-inner relative">
        <div class="left">
            <nuxt-link class="absolute top-6 z-10 left-6 bg-white cursor-pointer h-10 w-10 rounded-md flex items-center justify-center back-to-index" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </nuxt-link>
        </div>
        <div class="content-wrapper flex flex-col">
            <div v-if="$device.isMobile" class="back-to-home">
                <nuxt-link to="/">
                    <img src="/mojkvadratnew.png" alt="">
                </nuxt-link>
            </div>
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
                    <h2 v-if="currentStep === steps.STEP_ONE" class="test">
                        Izaberite kategoriju oglasa
                    </h2>
                    <Categories @selected-category="handleSelectedCategory" />
                </div>
                <div class="button-wrapper">
                    <button @click="prevStep" class="back no-text">
                        .
                    </button>
                    <button @click="nextStep">Dalje
                    </button>
                </div>
            </div>

            <div v-show="currentStep === steps.STEP_TWO" class="step-2 test">
                <div class="inner">
                    <h2 class="test" v-if="currentStep === steps.STEP_TWO">
                        Šta želite uraditi sa vašom nekretninom?
                    </h2>
                    <PublishRadioButton :options="getListingTypesForCategory" v-model="listingType" :error="errors.listingType.error" :error-message="errors" @input="nextStep"></PublishRadioButton>
                </div>

                <div class="button-wrapper">
                    <button @click="prevStep" class="back">
                        Nazad
                    </button>
                    <button @click="nextStep">Dalje
                    </button>
                </div>
            </div>

            <div v-show="currentStep === steps.STEP_THREE" class="step-3 test flex flex-col">
                <div class="inner">
                    <h2 class="test" v-if="currentStep === steps.STEP_THREE">
                        Lokacija nekretnine
                    </h2>
                    <div class="relative w-full flex flex-col mb-6">
                        <DropdownAutocomplete label="Grad" @select-option="handleSelectedCity" placeholder="Npr. Sarajevo - Centar"></DropdownAutocomplete>
                    </div>
                    <TextField type="text" label="Adresa" placeholder="npr. Titova 16" v-model="address" class="mb-6"></TextField>
                    <div class="flex flex-col mt-6">
                        <TextField type="text" label="Naselje" placeholder="npr. Dolac Malta" v-model="district" class="mb-6"></TextField>
                    </div>
                    <div v-if="city !== null" class="map-wrapper">
                        <h2 class="test map" v-if="currentStep === steps.STEP_FIVE">
                            Pomjerite pin na tačnu lokaciju nekretnine
                        </h2>
                        <PublishMap :location="city" @latlng="handleLatLng"></PublishMap>
                    </div>
                </div>

                <div class="button-wrapper">
                    <button @click="prevStep" class="back">Nazad
                    </button>
                    <button @click="nextStep">Dalje
                    </button>
                </div>
            </div>

            <div v-show="currentStep === steps.STEP_FOUR" class="step-4 test">
                <div class="inner checkboxes">
                    <h2 class="test" v-if="currentStep === steps.STEP_FOUR">
                        Unesite cijenu nekretnine
                    </h2>
                    <TextField type="number" :label="listingType !== null && listingType.shortname === 'booking' ? 'Cijena noćenja' : 'Cijena'" placeholder="100000" v-model="price"  :currency="true" :square="price_per_square"></TextField>
                    <div class="flex flex-col xl:flex-row lg:flex-row up:flex-row items-center justify-between pt-4 mt-4">
                        <div class="switch-wrap mr-0 lg:mr-2 xl:mr-2 up:mr-2 lg:mb-0 xp:mb-0 up:mb-0 mb-5">
                            <div class="switch">
                                <input id="switch-1" type="checkbox" v-model="vat_included" class="switch-input" />
                                <label for="switch-1" class="switch-label">Switch</label>
                            </div>
                            PDV uključen u cijenu
                        </div>
                        <div class="switch-wrap ml-0 lg:ml-2 xl:ml-2 up:ml-2" v-show="notRenting">
                            <div class="switch">
                                <input id="switch-2" type="checkbox" v-model="price_per_square" class="switch-input" />
                                <label for="switch-2" class="switch-label">Switch</label>
                            </div>
                            Cijena po kvadratu
                        </div>
                        <div class="switch-wrap ml-0 lg:ml-2 xl:ml-2 up:ml-2" v-show="listingType && listingType.shortname === 'booking'">
                            <div class="switch">
                                <input id="switch-3" type="checkbox" v-model="per_guest" class="switch-input" />
                                <label for="switch-3" class="switch-label">Switch</label>
                            </div>
                            Cijena po osobi
                        </div>
                    </div>
                </div>

                <div class="button-wrapper">
                    <button @click="prevStep" class="back">Nazad
                    </button>
                    <button @click="nextStep">Dalje
                    </button>
                </div>
            </div>

            <div v-show="currentStep === steps.STEP_FIVE" class="step-6 test">
                <div class="inner">
                    <h2 class="test" v-if="currentStep === steps.STEP_FIVE">
                        Opišite vašu nekretninu
                    </h2>
                    <TextAreaField v-model="description"></TextAreaField>
                </div>

                <div class="button-wrapper">
                    <button @click="prevStep" class="back">Nazad
                    </button>
                    <button @click="nextStep">Dalje
                    </button>
                </div>
            </div>

            <div v-show="currentStep === steps.STEP_SIX" class="step-7 test">
                <div class="inner pt-20 pb-52">
                    <h2 class="test" v-if="currentStep === steps.STEP_SIX">
                        Detaljne informacije nekretnine
                    </h2>
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

                    <div v-for="attr in ordinaryListingTypeAttributes" :key="attr.id">
                        <InputError :error="errors.attributes[attr.id]" />
                        <component
                            :attr="attr"
                            :options="attr"
                            :is="filterFor(attr)"
                            @changed="handleChangedAttribute"
                        />
                    </div>

                    <h1 class="heading-checkbox mt-4">Nekretnina posjeduje</h1>
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
                        <TermInput
                            v-for="attr in termListingTypeAttributes"
                            @changed="handleChangedAttribute"
                            :attr="attr"
                            :key="attr.id"
                        />
                    </div>
                    <TextField class="mt-10" label="Youtube iframe (video)" type="text" placeholder="https://youtube.com/1wts5" v-model="video_url"></TextField>
                </div>

                <div class="button-wrapper">
                    <button @click="prevStep" class="back">Nazad
                    </button>
                    <button @click="nextStep">Dalje
                    </button>
                </div>
            </div>

            <div v-show="currentStep === steps.STEP_SEVEN" class="step-8 test">
                <div class="inner">
                    <h2 class="test">
                        Dodajte slike nekretnine
                    </h2>
                    <div class="img-upload-wrapper">
                        <dropzone ref="dropzone" :options="dropzoneOptions" :destroy-dropzone="false" @vdropzone-processing="dropzoneChangeUrl" @vdropzone-sending="sendImages"></dropzone>
                    </div>
                </div>
                <div class="button-wrapper">
                    <button @click="prevStep" class="back">Nazad
                    </button>
                    <button @click="nextStep" :disabled="uploading">Dalje
                    </button>
                </div>
            </div>

            <!-- izdvajanje -->
            <div v-show="currentStep === steps.STEP_EIGHT" class="step-9 test">
                <div class="advertising-options-wrapper">
                    <div class="inner">
                        <Advertising :publishing="true" :id="listingId" :slug="listingSlug"></Advertising>
                        <!--              <div class="advertising-calculator">-->
                        <!--                <ActionButton placeholder="Dopuni kredit" :style-options="{ color: '#fff', height: '48px', marginTop: '36px' }"></ActionButton>-->
                        <!--              </div>-->
                    </div>

                    <div class="button-wrapper">
                        <button @click="prevStep" class="back">Nazad
                        </button>
                        <button @click="nextStep">Dalje
                        </button>
                    </div>
                </div>

                <div class="button-wrapper">
                    <button @click="prevStep" class="back">Nazad
                    </button>
                    <ActionButton :loading="finishLoader" @action="nextStep" placeholder="Završi" :style-options="{ color: '#fff' }"></ActionButton>
                </div>
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
import ActionButton from "@/components/actionButtons/ActionButton"
import Dropzone from "nuxt-dropzone";
import 'nuxt-dropzone/dropzone.css'
import TextField from "../components/inputs/TextField";
import PublishDropdown from "../components/publishInputs/PublishDropdown";
import DropdownAutocomplete from "../components/inputs/DropdownAutocomplete";
import TextAreaField from "@/components/inputs/TextAreaField";
import PublishRadioButton from "@/components/publishInputs/PublishRadioButton";
import PublishMap from "@/components/publish/PublishMap";
import Advertising from "../components/Advertising";
@Component({
    components: {
        Advertising,
        PublishMap,
        PublishRadioButton,
        DropdownAutocomplete,
        PublishDropdown,
        TextAreaField,
        TextField,
        Categories, TermsInput, TermInput, RangeInput, InputError, ActionButton, Dropzone
    },
    middleware: ['auth'],
    layout: 'objava',
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
    showMunicipalities = false;
    listingId = null;
    finishLoader = false;
    dropzoneOptions = {
        url: "http://fakeurl.com",
        addRemoveLinks: true,
        dictDefaultMessage: "<svg xmlns=\"http://www.w3.org/2000/svg\" className=\"h-6 w-6\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n" +
            "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12\" />\n" +
            "</svg>" +
            "<p>Izaberi slike ili ih prenesi ovdje</p>"
    };
    video_url = "";
    lat = 43;
    lng = 42;
    uploading = false;
    show = false;
    price_per_square = false;
    vat_included = false;
    per_guest = false;
    // Completion
    completedAttributes = 0
    selectedAdvertisement = null;
    advertising_options = []
    get stepPercentage() {
        let calc = (1.0 / 10) * 100 * this.currentStep + 1;
        if (calc >= 100) return 100;
        return calc;
    }
    get notRenting() {
        if (this.listingType) {
            return this.listingType.shortname !== 'rent' && this.listingType.shortname !== 'booking';
        }
        return true;
    }
    async created() {
        await this.fetchSponsorship()
    }
    dropzoneChangeUrl() {
        this.uploading = true;
        this.$refs.dropzone.setOption('url', `https://api.mojkvadrat.ba/listings/${this.listingId}/image`);
        this.uploading = false;
    }
    primarySent = false;
    sendImages(file, xhr, formData) {
        if (! this.primarySent) {
            formData.append('primary', 1);
            this.primarySent = true;
        }
        xhr.setRequestHeader('Authorization', this.$auth.getToken('local'));
        formData.append('image', file);
    }
    selectAdvertisement(o) {
        this.selectedAdvertisement = o.id;
    }

    get allAttributes() {
        return this.globalAttributes.merge(this.categoryAttributes).merge(this.listingTypeAttributes);
    }

    categoryListingTypeMap = {
      'stanovi': ['sell', 'rent', 'booking'],
      'kuce': ['sell', 'rent'],
      'poslovni-prostori': ['sell', 'rent'],
      'garaze': ['sell', 'rent'],
      'zemljista': ['sell']
    }

    get getListingTypesForCategory() {
      if (this.category) {
        let types = this.categoryListingTypeMap[this.category.slug];

        return this.listingTypes.filter(item => {
          return types.indexOf(item.shortname) !== -1
        })
      }

      return this.listingTypes;
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
        this.$toast.open({
            message: param || "Imate greške",
            type: 'error',
            duration: 5000
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
        TOTAL_STEPS: 9
    }
    currentStep = this.steps.STEP_ONE;

    async publish() {
        const payload = {
            district: this.district,
            description: this.description,
            address: this.address,
            zip_code: this.zip_code,
            price: this.price,
            per_guest: this.per_guest,
            video_url: this.video_url,
            price_per_square: this.price_per_square,
            vat_included: this.vat_included,
            listing_type_id: this.listingType.id,
            category_id: this.category.id,
            city_id: this.city.id,
            lat: this.lat,
            lng: this.lng,
            attributes: this.prepareAttributes(),
        }
        try {
            let response = await this.$axios.post('/listings', payload);
            this.listingId = response.data.data.id;
            this.listingSlug = response.data.data.slug;
        } catch (e) {
            alert("Objava je neuspjela, pokusajte ponovo");
            // location.reload();
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
                this.selectedAdvertisement = this.advertising_options[0].id;
            }
        } catch(e) {
            console.log(e)
        }
    }
    async finish() {
        if (this.listingSlug) {
            this.finishLoader = true;
            await this.$router.push('/oglas/' + this.listingSlug)
        } else {
            this.snackbarValidationError("Oglas nije objavljen")
        }
    }
    async nextStep() {
        if (this.currentStep >= this.steps.TOTAL_STEPS) {
            await this.finish();
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
                    if(! this.validateMany(['district', 'address', 'city'])) {
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
                    if(! this.validateMany(['description'])) {
                        this.snackbarValidationError("Niste popunili opis");
                        return;
                    }
                    break;
                case this.steps.STEP_SIX:
                    if(! this.validateAttributes()) {
                        this.snackbarValidationError("Niste popunili obavezna polja");
                        return;
                    }
                    await this.publish();
                    break;
                case this.steps.STEP_EIGHT:
                    if(! this.validateMany(['sponsorship'])) {
                        await this.finish();
                        return;
                    }
                    let success = await this.sponsor(this.listingId);
                    if (! success) {
                        this.$toast.open({
                            message: "Nemate dovoljno sredstava na računu",
                            type: 'error',
                            duration: 5000
                        });
                        return;
                    }
                    await this.finish();
                    break;
            }
            this.currentStep++;
        }
    }
    async sponsor(listingId) {
        try {
            await this.$axios.post(`/listings/${listingId}/sponsor`, {
                sponsorship_id: this.selectedAdvertisement
            })
            await this.$auth.fetchUser();
            return true;
        } catch (e) {
            console.log(e);
            return false;
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
        if (e.value == null) {
            delete this.attributePayload[e.id];
        } else {
            this.attributePayload[e.id] = e;
        }
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
        } catch(e) {
            console.log(e)
        }
    }
    async fetchAttributesByListingType() {
        try {
            let response = await this.$axios.get('/listing_types/' + this.listingType.id + '/attributes')
            this.listingTypeAttributes = response.data.data;
        } catch(e) {
            console.log(e)
        }
    }
    validateAttributes() {
        let allAttributes = this.globalAttributes.concat(this.categoryAttributes).concat(this.listingTypeAttributes);
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
    zip_code = null;
    handleSelectedCity(item) {
        this.city = item;
        this.lat = item.location.lat;
        this.lng = item.location.lng;
        this.errors.city.error = false;
    }
    municipalities = [];
    cities = [];
    /*async handleSelectedAddress(item) {
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
          this.addressLocationSet = true;
        }
        if (res.data.municipalities.length) {
          this.city = null;
          this.showMunicipalities = true;
          this.municipalities = res.data.municipalities;
        }
        if (this.address && this.city && this.district && this.zip_code && this.lat && this.lng) {
          this.nextStep();
        }
        this.recommendedAddresses = []
      } catch (e) {
        console.log(e)
      }
    }*/
    // Basic info
    district = null;
    address = null;
    price = null;
    description = null;
    @Watch('district')
    handleDistrictChange(newVal, oldVal) {
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
    @Watch('selectedAdvertisement')
    handleSelectedAdvertisementChange(newVal, oldVal) {
        this.errors.sponsorship.error = false;
    }
    validateSponsorship() {
        return this.selectedAdvertisement !== null;
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
    flex-direction: row-reverse;
    height: 100vh;
    @include for-phone-only {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0;
        box-sizing: border-box;
        height: 100vh;
        overflow-y: hidden;
        @supports not (-webkit-touch-callout: none) {
            height: 100vh;
        }
        @supports (-webkit-touch-callout: none) {
            height: auto !important;
        }
    }
    .content-wrapper {
        display: flex;
        box-sizing: border-box;
        position: relative;
        width: 100%;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        @include for-phone-only {
            overflow-y: hidden !important;
            margin-top: 0px;
            position: relative;
            z-index: 1;
            background: #fff;
            overflow-y: scroll;
            min-height: auto !important;
            padding-bottom: 0 !important;
            @supports not (-webkit-touch-callout: none) {
                height: 100vh;
            }
            @supports (-webkit-touch-callout: none) {
                height: calc(100vh - 80px);
            }
        }
        .step-3 {
            ::v-deep input {
                padding-right: 16px !important;
            }
        }
        h2 {
            font-size: 24px !important;
            font-weight: 600 !important;
            margin-bottom: 18px !important;
            color: #000;
            line-height: 65px;

            @include for-phone-only {
                font-size: 20px !important;
                margin-top: 16px;
                line-height: 24px !important;
            }
            &.map {
                position: absolute;
                top: 76px;
                left: 24px;
                right: 24px;
                z-index: 1;
                border-radius: 8px;
                font-size: 15px;
                text-align: center;
            }
            @include for-phone-only {
                font-size: 30px;
                line-height: 35px;
            }
        }
        .step-1,
        .step-2,
        .step-3,
        .step-4,
        .step-5,
        .step-6,
        .step-7,
        .step-8,
        .step-9
        {
            min-height: 100%;
            width: 100%;
            height: calc(100vh - 80px);
            overflow-y: scroll;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            @include for-phone-only {
                align-items: flex-start;
            }
            @supports not (-webkit-touch-callout: none) {
                height: 100vh !important;
            }
            @supports (-webkit-touch-callout: none) {
                height: calc(100vh - 170px) !important;
                min-height: auto !important;
            }
            .inner {
                max-width: 600px;
                margin: auto;
                width: 600px;
                @include for-phone-only {
                    background: #f9f9f9;
                    width: 100%;
                    max-width: 100%;
                    padding: 36px 16px;
                    overflow-y: scroll;
                    width: 100%;
                    max-width: 100%;
                    padding: 36px 16px;
                    height: 100% !important;
                    overflow-y: scroll;
                    padding-bottom: 120px;
                    padding-top: 106px;
                }
            }
            @include for-phone-only {
                height: 100vh;
                padding-bottom: 0;
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
                margin-bottom: 32px !important;
                &:first-child {
                    margin-top: 0;
                }
            }
            .button-wrapper {
                height: 60px;
                width: 100%;
                display: flex;
                align-items: center;
                border-top: 1px solid #bebebe;
                position: absolute;
                bottom: 0;
                right: 0;
                left: 0;
                padding: 0 12px;
                box-sizing: border-box;
                background: #fff;
                justify-content: space-between;
                @include for-phone-only {
                    padding: 0;
                    justify-content: space-between;
                    z-index: 10;
                }
                button {
                    padding: 0 24px;
                    height: 36px;
                    width: fit-content;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    outline: none;
                    font-weight: 400 !important;
                    transition: 0.3s all ease;
                    margin-bottom: 0;
                    font-family: 'NunitoSans', sans-serif;;
                    cursor: pointer;
                    margin-right: 16px;
                    background: #FF3400;
                    border-radius: 6px;
                    color: #fff;
                    &.back {
                        background: transparent !important;
                        border: none !important;
                        color: #000;
                        text-decoration: underline;
                        font-weight: 600 !important;
                        margin-right: 0;
                        &.no-text {
                            color: #fff;
                            cursor: initial;
                        }
                        &:hover {
                            box-shadow: none !important;
                        }
                        i {
                            margin-left: 0;
                        }
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
        @include for-phone-only {
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
            margin-top: 0px;
            position: relative;
            z-index: 1;
            background: #fff;
            overflow-y: scroll;
            min-height: 100vh;
        }
    }
}
.checkbox-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 24px;
    grid-column-gap: 16px;
    @include for-phone-only {
        grid-template-columns: repeat(2, 1fr);
        grid-row-gap: 32px;
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
.heading-checkbox {
    font-size: 18px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 24px;
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
    @include for-phone-only {
        position: relative;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin-top: 0;
        margin-bottom: 0;
        border-radius: 4px;
        height: 200px;
    }
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
    img {
        min-width: 100% !important;
        min-height: 100% !important;
    }
    .upload-btn {
        display: flex;
        flex: 1;
        border: 2px dashed #dcdcdc;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
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
                border-radius: 6px;
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
    border-radius: 6px;
    margin-top: 36px !important;
    font-weight: 500 !important;
    line-height: 22px;
}
.advertising-options-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    @include for-phone-only {
        flex-direction: column;
    }
    .advertising-options {
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: 100%;
        ul {
            display: flex;
            width: 100%;
            flex-direction: column;
            @include for-phone-only {
                display: grid;
                grid-template-columns: repeat(1, 1fr);
                grid-column-gap: 12px;
                grid-row-gap: 12px;
            }
            li {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                height: fit-content;
                cursor: pointer;
                padding: 12px;
                @include for-phone-only {
                    height: fit-content;
                    flex-direction: row;
                }
                img {
                    margin-right: 24px;
                    height: 30px;
                    @include for-phone-only {
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
                    border-radius: 6px;
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
        flex-direction: column;
        height: fit-content;
        @include for-phone-only {
            margin-left: 0;
        }
        .inner {
            border: 1px solid #dcdcdc;
            border-radius: 6px;
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
    border-radius: 6px;
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
    background-image: url(/publish-img.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 25% !important;
    min-width: 25%;
    display: flex;
    align-items: flex-start;
    position: relative;
    padding: 24px;
    @include for-phone-only {
        display: none;
    }
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
        @include for-phone-only {
            background-color: rgba(19,156,120,16%);
            -webkit-backdrop-filter: blur(0.2em);
            backdrop-filter: blur(9px);
            bottom: 0;
            height: 100%;
        }
    }
}
.loader-wrapper {
    position: absolute;
    width: 100%;
    bottom: 0px;
    right: 0;
    z-index: 10;
    transition: 0.3s all ease;
    height: 8px;
    color: transparent;
    z-index: 14 !important;
    .loader {
        height: 8px;
    }
}
.move-top {
    margin-top: -65%;
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 0px 8px;
    border-radius: 6px;
}
.publish-drop {
    transition: 0.3s all ease;
}
.pdv {
    border-top: 1px solid #f1f1f1;
    padding-top: 24px;
    margin-top: 24px;
}
.address-dropdown {
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    padding: 16px;
    display: flex;
    flex-direction: column;
    background: #fff;
    z-index: 1;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-left: 2px solid #000;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    li {
        height: fit-content;
        padding: 0px;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        margin-bottom: 24px;
        &:hover {
            font-weight: 600;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
}
.checkboxes {
    .switch {
        position: relative;
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-right: 16px;
    }
    .switch-input {
        display: none;
    }
    .switch-label {
        display: block;
        width: 48px;
        height: 24px;
        text-indent: -150%;
        clip: rect(0 0 0 0);
        color: transparent;
        user-select: none;
    }
    .switch-label::before,
    .switch-label::after {
        content: "";
        display: block;
        position: absolute;
        cursor: pointer;
    }
    .switch-label::before {
        width: 50px;
        height: 28px;
        background-color: #dedede;
        border-radius: 9999em;
        -webkit-transition: background-color 0.25s ease;
        transition: background-color 0.25s ease;
    }
    .switch-label::after {
        top: 2px;
        left: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.45);
        -webkit-transition: left 0.25s ease;
        transition: left 0.25s ease;
    }
    .switch-input:checked + .switch-label::before {
        background-color: #1F2937;
    }
    .switch-input:checked + .switch-label::after {
        left: 24px;
    }
}
.switch-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
}
.vue-dropzone {
    border: 2px dashed #f9f9f9;
    padding: 12px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    border-radius: 6px;
    &:hover {
        background: #fff;
        border: 2px dashed #1F2937;
    }
    @include for-phone-only {
        grid-template-columns: repeat(2, 1fr);
    }
}
::v-deep .dropzone .dz-preview {
    margin: 8px !important;
}
::v-deep .dz-remove {
    margin-left: 0 !important;
}
::v-deep .dz-details {
    background-color: rgba(2, 50, 70, 0.52) !important;
}
.step-7 ::v-deep .main-input-wrap {
    margin-bottom: 24px;
}
.step-9 {
    @supports (-webkit-touch-callout: none) {
        overflow-y: hidden;
    }
}
::v-deep .dz-default .dz-message span{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
::v-deep .dz-default svg {
    height: 30px;
    color: #d9d9d9;
    margin: 0 auto;
    margin-bottom: 12px;
}
.step-6 {
    align-items: flex-start;
    .inner{
        height: 100%;
        padding-top: 80px;
        ::v-deep .quillWrapper {
            height: 320px;
            @include for-phone-only {
                height: 300px;
            }
        }
    }
}
.preview-img {
    width: 90px;
    height: fit-content;
}
select {
    min-height: 36px;
    &:focus {
        outline: none;
    }
}
.select-border {
    border: 1px solid #f1f1f1 !important;
}
::v-deep .dz-image img {
    min-width: 100% !important;
    min-height: 100% !important;
}
select {
    background: #fff;
}
.back-to-home {
    position: fixed;
    top: 0px;
    right: 0px;
    left: 0;
    padding: 12px;
    background: #fff;
    z-index: 10;
    border-bottom: 1px solid #ebebeb;
    a {
        font-weight: 600;
        text-decoration: underline;

        img {
            width: auto;
            height: 30px;
        }
    }
}
</style>
