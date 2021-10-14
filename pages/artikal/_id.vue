<template>
  <div class="listing-wrapper mx-auto w-full">
    <div v-if="$device.isMobile" class="mobile-topbar">
      <font-awesome-icon icon="angle-left" class="back" @click="$router.go(-1)"></font-awesome-icon>
      <div class="buttons">
      </div>
    </div>
    <div class="listing-content mt-12 max-w-7xl mx-auto w-full">
      <div class="listing-content-inner">
        <div class="listing-content-wrapper flex flex-row">
          <div class="flex flex-col w-full">
            <div class="grid-container" v-if="images.length > 1">
              <div class="img-counter">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>{{ images.length }}</p>
              </div>
              <div :class="'item' + (index + 1)" v-for="(img, index) in images.slice(0, 4)" @click="openGallery(index)">
                <img :src="img.url" alt="">
                <div class="more" v-if="index === 3">
                 {{ images.length - 3 + '+ slika' }}
                </div>
              </div>
              <client-only>
                <light-box
                  ref="lightbox"
                  :media="lightboxImages"
                  :show-light-box="false"
                  :show-thumbs="true"
                  close-text="function() {
                  return 'Zatvori galeriju'
                  }"
                />
              </client-only>
            </div>
            <div v-else class="no-image-grid">
              <img src="/noimage.jpeg" alt="">
            </div>

            <div class="mb-6">
              <div class="article-title">
                <h2 v-if="listing">{{ listing.title }}</h2>
                <div class="flex flex-row items-center">
                  <button type="button" class="mr-4 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <!-- Heroicon name: solid/plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  <button @click="toggleSaveListing()" type="button" class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300">
                    <!-- Heroicon name: solid/plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :fill="[ listingSaved ? '#023246' : 'none']" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex flex-row items-center justify-start mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="yellow" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <p class="pl-2 font-semibold">
                  4.8
                </p>
                <nuxt-link class="pl-2 underline text-sm font-medium" to="/">
                  (54 dojmova)
                </nuxt-link>
              </div>
            </div>

            <ul role="list" class="main-info">
              <li>
                <p>Lokacija</p>
                <p class="mt-1 text-md text-black font-medium">{{ listing.city.name }}</p>
              </li>
              <li>
                <p>Vrsta oglasa</p>
                <p class="mt-1 text-md text-black font-medium">{{ listing.listing_type.title}}</p>
              </li>
              <li>
                <p>Adresa</p>
                <p class="mt-1 text-md text-black font-medium">{{ listing.address }}</p>
              </li>
              <li>
                <p>Datum objave</p>
                <p class="mt-1 text-md text-black font-medium">{{ $moment(listing.createdAt).format('LL') }}</p>
              </li>
            </ul>
            <div class="separator"></div>
            <div>
              <h2 class="text-xl font-medium text-gray-900">
                Detaljne informacije
              </h2>
              <ul role="list" class="mt-6 border-t border-b border-gray-200 py-6 grid grid-cols-4 gap-6">
                <li class="flow-root" v-for="info in normalAttributes">
                  <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">

                    <div>
                      <h3 class="text-sm font-medium text-gray-900">
                        <a href="#" class="focus:outline-none">
                          <span class="absolute inset-0" aria-hidden="true"></span>
                          {{ info.name }}
                        </a>
                      </h3>
                      <p class="mt-1 text-sm text-gray-500 font-semibold">{{ info.value }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="mt-6">
              <h2 class="text-xl font-medium text-gray-900">
                Nekretnina posjeduje
              </h2>
              <ul role="list" class="mt-6 border-t border-b border-gray-200 py-6 grid grid-cols-4 gap-6">
                <li class="flow-root" v-for="(info, index) in checkboxAttributes" :key="index">
                  <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">

                    <div>
                      <h3 class="text-sm font-medium text-gray-900">
                        <a href="#" class="focus:outline-none">
                          <span class="absolute inset-0" aria-hidden="true"></span>
                          {{ info.name }}
                        </a>
                      </h3>
                      <p class="mt-1 text-sm text-gray-500 font-semibold">{{ attrTranslate(info.value) }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="separator"></div>
            <h2 class="text-xl font-medium text-gray-900 mb-6">Detaljni opis</h2>
            <p class="description">{{ listing.description }}</p>
            <div class="separator"></div>
            <h2 class="text-xl font-medium text-gray-900 mb-6">Pogledajte šta se nalazi u blizini nekretnine</h2>
            <div class="places">
              <ul class="flex flex-row items-center justify-start places-ul bg-gray-50 rounded-md p-2">
                <li v-for="(place, index) in places" @click="selectPlace(place.results, index)" :class="[ 'cursor-pointer', index === x ? 'active-place bg-white shadow-sm rounded-md' : '']">{{ translatePlaces(index) }}</li>
              </ul>
              <div class="mt-3">
                <div class="places-grid bg-gray-50" v-if="selectedPlace !== null">
                  <div v-for="p in selectedPlace" class="flex flex-row items-center justify-start">
                    <img :src="p.icon" :alt="p.name" class="mr-2">
                    {{ p.name }}</div>
                </div>
              </div>
            </div>
            <div class="separator"></div>
            <h2 class="text-xl font-medium text-gray-900 mb-6">Lokacija</h2>
            <RealEstateLocationMap v-if="listing" :location="listing.location"></RealEstateLocationMap>
<!--            <div class="separator" v-if="questions.length"></div>-->
<!--            <h2 class="heading question" v-if="questions.length">Pitanja</h2>-->
<!--            <div class="separator" v-if="questions.length"></div>-->
<!--            <h2 class="heading" v-if="listing.questions_disabled === true">-->
<!--              Korisnik je zabranio javna pitanja-->
<!--            </h2>-->
<!--            <SingleQuestion v-if="questions.length" v-for="question in questions" :message="question" :key="question.id" :owner="owner"></SingleQuestion>-->
<!--            <div class="question-create" v-if="$auth.user && listing.questions_disabled === false && owner === false">-->
<!--              <textarea v-model="questionTerm"></textarea>-->
<!--              <ActionButton placeholder="Postavi pitanje" @action="askQuestion"></ActionButton>-->
<!--            </div>-->
            <div class="separator"></div>
            <div>
              <h2 class="text-xl font-medium text-gray-900 mb-6">Dojmovi</h2>
              <div class="my-20">
                <TextField type="text" placeholder="opis" v-model="review_description"></TextField>
                <TextField type="number" placeholder="Rating" v-model="review_rating"></TextField>
                <button @click="submitReview()">ostavi review</button>
              </div>
              <div v-if="listing_reviews.length" class="bg-white">
                <div>
                  <h2 class="sr-only">Customer Reviews</h2>

                  <div v-for="review in listing_reviews" class="-my-10">
                    <div class="flex text-sm text-gray-500 space-x-4">
                      <div class="flex-none py-10">
                        <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="" class="w-10 h-10 bg-gray-100 rounded-full">
                      </div>
                      <div class="flex-1 py-10">
                        <h3 class="font-medium text-gray-900">{{ review.user ? review.user.name : 'Username' }}</h3>
                        <p><time datetime="2021-07-16">{{ $moment(review.created_at).format('DD.MM.YYYY') }}</time></p>

                        <div class="flex items-center mt-4">
                          <!--
                            Heroicon name: solid/star

                            Active: "text-yellow-400", Default: "text-gray-300"
                          -->
                          <svg v-for="i in review.rating" class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>

                          <!-- Heroicon name: solid/star -->
                        </div>

                        <div class="mt-4 prose prose-sm max-w-none text-gray-500">
                          <p>{{ review.review }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="user-wrap">
            <UserProfile :vat="listing.vat_included" :price="listing.price" :id="listing.id" :user="listing.user" :followed="isFollowed" :is-rent="listing.is_rent" :is-booking="listing.is_booking" :type="listing.user.user_type"></UserProfile>
          </div>
        </div>
      </div>
    </div>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton";
import Snackbar from "@/components/global/Snackbar";
import UserProfile from "@/components/UserProfile"
import SingleQuestion from "@/components/SingleQuestion"
import RealEstateLocationMap from "@/components/RealEstateLocationMap";
import TextField from "../../components/inputs/TextField";

@Component({
  components: {
    TextField,
    ActionButton,
    Snackbar,
    UserProfile,
    SingleQuestion,
    RealEstateLocationMap
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
  async asyncData(ctx) {
    let listing = null;
    let images = []
    let user = null
    let isFollowed = false;
    let isSaved = false;
    let listingSaved = false;

    try {
      let response = await ctx.app.$axios.get('/listings/' + ctx.params.id);
      listing = response.data.data;
      listingSaved = response.data.meta.saved;
      user = listing.user;
      images = listing.images;
      isFollowed = response.data.meta.followed;
      isSaved = response.data.meta.saved;
    } catch(e) {
      console.log(e)
    }

    return {
      listing,
      user,
      isFollowed,
      isSaved,
      listingSaved,
      images
    }
  }
})
export default class Artikal extends Vue {
  types = {
    rent: 'Iznajmljivanje',
    sell: 'Prodaja',
    buy: 'Potraznja'
  }
  showMoreCafes = false;
  showMoreRestaurants = false;
  showMoreMalls = false;
  showMoreSchools = false;
  showMoreAtms = false;
  loading = false;
  questionTerm = '';
  questions = [];
  isUserFollowed = false;
  review_rating = 0;
  review_description = '';
  selectedPlace = null;
  listing_reviews = [];
  swiperOption = {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true
    }
  }
  images = []
  places = []
  x = 0

  translatePlaces(key) {
    if(key === 'atm') {
      return key = 'Bankomati'
    } else if(key === 'school') {
      return key = 'Škole'
    } else if(key === 'cafe') {
      return key = 'Kafići'
    } else if(key === 'restaurant') {
      return key = 'Restorani'
    } else if(key === 'shopping_mall') {
      return key = 'Šoping centri'
    }
  }

  async fetchPlaces() {
    try {
      let res = await this.$axios.$get('/listings/' + this.listing.id + '/places');
      this.places = res;

      this.selectedPlace = this.places[0]
    } catch(e) {
      console.log(e)
    }
  }

  selectPlace(p, i) {
    this.selectedPlace = p;
    this.x = i;

    console.log(this.selectedPlace, i)
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  translateSchool(n, type) {
    if(type === 'school') {
      let str = n;
      let res = str.replace('Elementary School', 'Osnovna škola')

      return res;
    } else if(type === 'atm') {
      let str = n;
      let res = str.replace('ATM', 'Bankomat')

      return res;
    }
  }

  submitReview() {
    try {
      let res = this.$axios.post(`/listings/${this.$route.params.id}/rent_reviews`, {
        review: this.review_description,
        rating: this.review_rating,
      })

      this.listing_reviews.push(res);
    } catch(e) {
      console.log(e)
    }
  }

  async fetchReviews() {
    try {
      let res = await this.$axios.get(`/listings/${this.$route.params.id}/rent_reviews`);

      this.listing_reviews = res.data.data;
    } catch(e) {
      console.log(e)
    }
  }

  get normalAttributes() {
    return this.listing.attributes.filter(item => item.value !== true && item.value !== false);
  }

  get checkboxAttributes() {
    return this.listing.attributes.filter(item => ! (item.value !== true && item.value !== false));
  }

  get lightboxImages() {
    if(this.images.length) {
      return this.images.map((item) => {
        return {
          src: item.url,
          thumb: item.url,
        };
      });
    }
  }

  async getQuestions() {
    try {
      let res = await this.$axios.get('/listings/' + this.$route.params.id + '/questions');
      this.questions = res.data.data;

    } catch(e) {
      console.log(e)
    }
  }


  openGallery(index) {
    this.$refs.lightbox.showImage(index);
  }

  async toggleSaveListing() {
    try {
      if(!this.listingSaved) {
        await this.$axios.post('/listings/' + this.listing.id + '/save');

        this.$snackbar.show({
          text: "Uspješno ste spasili oglas " + this.listing.title,
          timeout: 1000,
          type: "success"
        });

        this.listingSaved = true;
      } else {
        await this.$axios.delete('/listings/' + this.listing.id + '/save');

        this.$snackbar.show({
          text: "Uspješno ste izbrisali oglas " + this.listing.title + " iz spašenih",
          timeout: 1000,
          type: "success"
        });

        this.listingSaved = false;
      }

    } catch(e)  {
      console.log(e)
    }
  }


  async handleFollow() {
    try {
      if(this.isFollowed) {
        await this.$axios.delete('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "uspješno ste otpratili " + this.user.name,
          timeout: 1000,
          type: "success"
        });

        this.isFollowed = false;
      } else {
        await this.$axios.post('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "Uspješno ste zapratili " + this.user.name,
          timeout: 1000,
          type: "success"
        });

        this.isFollowed = true;
      }

    } catch(e)  {
      console.log(e)
    }
  }

  get owner() {
    if(this.$auth.user) {
      return this.listing.user.id === this.$auth.user.id;
    }
  }

  attrTranslate(attr) {
    if(attr === true) {
      return 'Da'
    } else if(attr === false){
      return 'Ne'
    } else {
      return attr;
    }
  }

  async askQuestion() {
    try {
      let response = await this.$axios.post('/listings/' + this.$route.params.id + '/questions', {
        question: this.questionTerm
      });

      this.questions.unshift(response.data.data);

      this.questionTerm = ''
    } catch(e) {
      console.log(e)
    }
  }

  async created() {
    await this.fetchPlaces();
    await this.selectPlace(this.places[0])
    await this.fetchReviews();
    this.isUserFollowed = this.isFollowed;
  }

  get listingType() {
    return this.types[this.listing.listing_type];
  }
}
</script>

<style scoped lang="scss">

@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.item1 {
  grid-area: main;

  img {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 400px;
    cursor: pointer;

    @include for-phone-only {
      border-radius: 0;
    }
  }
}
.item2 {
  grid-area: small1;
  img {
    border-top-right-radius: 10px;
    @include for-phone-only {
      border-radius: 0;
    }
  }
}
.item3 {
  grid-area: small2;
  img {
    border-radius: 0px;

    @include for-phone-only {
      border-radius: 0;
    }
  }
}
.item4 {
  grid-area: small3;
  img {
    border-top-right-radius: 0px;

  }

  @include for-phone-only {
    border-radius: 0;
  }
}

.no-image-grid {
  height: 400px;
  border-radius: 7px;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}


.grid-container {
  position: relative;
  display: grid;
  grid-template-areas:
  'main main small1 small1 small1'
  'main main small2 small2 small2'
  'main main small3 small3 small3';
  grid-gap: 2px;
  height: 400px;

  .img-counter {
    position: absolute;
    left: 12px !important;
    top: 12px;
    display: flex;
    flex-direction: row;
    width: fit-content;
    border-radius: 5px;
    padding: 4px 8px;
    color: #fff;
    background: rgba(0, 0, 0, 0.41);
    align-items: center;

    svg {
      margin-right: 8px;
    }

    &.show-more {
      bottom: 23px;
      top: inherit;
      cursor: pointer;
    }
  }

  img {
    object-fit: cover;
    max-width: 100%;
  }
}

.item1 img {
  width: 100%;
}

.item2, .item3, .item4 {
  cursor: pointer;
  img {
    height: 132px;
    width: 100%;
  }

  .more {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}

.item4 {
  position: relative;
  border-bottom-right-radius: 10px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(9px);
    z-index: 1;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
  }

}


.listing-wrapper {
  display: flex;
  flex-direction: row;
  max-width: 1180px;

  .profile-content {
    width: 20%;
    height: fit-content;
  }
  .listing-content {

    @include for-phone-only {
      width: 100%;
    }

    .listing-content-inner {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: relative;

      @include for-phone-only {
        flex-direction: column;
        padding: 0 12px;
        box-sizing: border-box;
        padding-bottom: 120px;
      }
      .listing-content-wrapper {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding-bottom: 32px;

        @include for-phone-only {
          width: 100%;
        }
      }
      .article-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;

        > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        h2 {
          color: #000 !important;
          font-size: 25px;
          font-weight: 500 !important;
          padding: 0px !important;
          display: inline !important;
        }
      }
      h4 {
        font-size: 14px;
        color: #066450;
      }
      h2.heading {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 32px;

        &.question {
          margin-bottom: 0 !important;
        }
      }
      .detailed-informations {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .description {
        line-height: 21px;
        line-break: anywhere;
      }

    }
  }
}

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

.modal-inner {
  display: flex;
  flex-direction: column;
  padding: 0 24px;


  .modal-content {
    padding: 24px 0;
    textarea {
      height: 200px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: 'Lato', sans-serif;
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

.separator {
  border-top: 1px solid #ECECEC;
  margin: 32px 0;
  height: 1px;
  width: 100%;
}

::v-deep .user-profile {
  margin-right: 0;
}

.vhd__datepicker.vhd__datepicker--open {
  display: flex !important;
}

::v-deep .vhd__datepicker {
  position: absolute;
  top: 3em;
  z-index: 999;
  transition: all .2s ease-in-out;
  background-color: #fff;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif !Important;
  line-height: .875em;
  overflow: hidden;
  right: 0 !important;
  border-radius: 10px !important;
}

.user-wrap {
  width: fit-content;

  @include for-phone-only {
    margin-left: 0;
    width: 100%;
  }

  ::v-deep .user-content-wrapper{
    @include for-phone-only {
      marign-left: 0 !important;
      box-shadow: none;
      border: 1px solid #dcdcdc;
    }
  }
}

.detailed-info {
  padding: 0 8px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background: rgb(241 239 239 / 53%);
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);

  @include for-phone-only {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }
  span {
    font-size: 14px;
    margin: 5px 0;

    @include for-phone-only {
      font-size: 13px;
    }
    &:last-child {
      font-weight: 500;
      font-size: 16px;

      @include for-phone-only {
        font-size: 14px;
      }
    }
  }
  &.exchange {
    font-weight: 600;
    font-size: 16px;
    display: flex;
    justify-content: center;
    span {
      margin: 0;
      display: flex;
      align-items: center;
    }
  }
  &.price {
    background: #151b38 !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    font-weight: 600;
    font-size: 18px !important;
    height: 50px;
    div {
      display: flex;
      align-items: center;
    }
    svg {
      color: #fff;
    }
    span {
      color: #fff;
      &:last-child {
        margin-left: 12px;

        @include for-phone-only {
          margin-left: 0;
        }
      }
    }
  }
  &.exchange-for {
    background: #757B9A !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    span {
      color: #fff;
      display: flex;
      align-items: center;
      i {
        margin-left: 8px;
      }
    }
  }
}

.grid-layout {
  padding: 0;
  grid-template-columns: repeat( auto-fill, minmax(220px, 1fr) );
  grid-row-gap: 12px;

  @include for-phone-only {
    &.important {
      grid-template-columns: repeat( 1, 1fr);
    }
  }

  &.detailed {
    grid-template-columns: repeat( 2, 1fr);
  }
}

::v-deep img.vue-lb-modal-image {
  border-radius: 7px !important;

  @include for-phone-only {
    border-radius: 0 !important;
  }
}

::v-deep .vue-lb-arrow {
  width: 30px !important;
  border-radius: 30px!important;
  border: 1px solid #fff!important;
  height: 30px!important;

  ::v-deep svg {
    color: #444!important;
  }

  @include for-phone-only {
    width: 25px !important;
    height: 25px !important;
    padding: 0 !important;
    top: 53% !important;

    ::v-deep svg {
      color: #444!important;
      font-size: 20px !important;
    }
  }
}

.question-create {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-top: 24px;

  ::v-deep button {
    margin-top: 12px;
    background: #0B8489;
  }

  textarea {
    background: #fff;
    border: 1px solid #dcdcdc;
    height: 100px;
    padding: 12px;
    border-radius: 5px;
    font-family: 'Lato', sans-serif;
    &:focus {
      outline: none;
    }
  }
}

.mobile-topbar {
  background: #fff;
  display: flex;
  position: sticky;
  top: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 60px;
  min-height: 60px;
  z-index: 3;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;

  svg.back {
    font-size: 22px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: fit-content;

    button {
      margin-right: 8px;
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 6px 12px;
      border-radius: 5px;
      background: none;
      border: none;
      cursor: pointer;
      svg {
        color: #444;
        height: 16px;
        margin-right: 8px;
      }
      &:last-child {
        margin-right: 0;
      }

      &:hover {
        background: rgb(247, 247, 247) !important;
        text-decoration: underline;
      }

      &:focus {
        outline: none;
      }

      &.listing-saved {
        svg {
          color: red;
        }
      }
    }
  }
}

@include for-phone-only {
  .mobile-img {
    height: 400px;
    max-height: 400px;
  }

  .swiper-container {
    max-height: 400px;
  }

  .swiper-slide {
    max-height: 400px;
  }

  .swiper-slide img {
    max-height: 400px;
  }

  ::v-deep button svg {
    height:15px !important;
  }
}

::v-deep .vue-lb-container {
  @include for-phone-only {
    padding: 0 !important;
  }
}

.scroller-position {
  height: 60px;
}

.places {
  display: flex;
  flex-direction: column;

  .places-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 32px;
    padding: 16px;
    border-radius: 8px;

    > div {
      line-height: 20px;
      font-size: 14px;

      img {
        height: 20px;
        max-height: 20px;
      }
    }

    .places-heading {
      display: flex;
      align-items: center;
      justfiy-content: flex-start;
      margin-bottom: 12px;
      padding-bottom: 24px;
      border-bottom: 1px solid #f1f1f1;

      h1 {
        margin-left: 12px;
        font-size: 17px;
        font-weight: 500;
        color: #444;
      }

      svg {
        font-sizee: 20px;
        color: #444;
        padding: 12px;
        background: #f1f1f1;
        border-radius: 8px;
      }
    }
  }

  button {
    border: 1px solid #444;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 24px;
    background: transparent;
    color: #000 !important;

    &:focus {
      outline: none;
    }
  }
}

.svg-inline--fa {
  font-size: 20px;
}

.main-info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 12px;

  li {
    width: fit-content;
    min-width: fit-content;
    max-width: fit-content;
    border: 1px solid #f1f1f1;
    margin-right: 12px;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 12px 16px;

    p {
      &:first-child {
        font-size: 14px;
      }

      &:last-child {
        font-size: 15px;
        margin-top: 16px;
        font-weight: 600;
      }
    }
  }
}

.places-ul {
  display: flex;

  li {
    width: fit-content;
    margin-right: 10px;
    padding: 8px;
    font-size: 14px;
    font-weight: 500;

    &:last-child {
      margin-right: 0;
    }
  }
}

.active-place {
  font-weight: 500;
}

</style>

