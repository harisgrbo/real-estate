<template>
  <div class="listing-wrapper mx-auto w-full">
    <div v-if="$device.isMobile" class="mobile-topbar">
      <font-awesome-icon icon="angle-left" class="back" @click="$router.go(-1)"></font-awesome-icon>
      <div class="buttons">
      </div>
    </div>
    <div class="listing-content max-w-7xl mx-auto w-ful">
      <div class="listing-content-inner">
        <div class="mb-6">
          <div class="article-title">
            <h2 v-if="listing">{{ listing.title }}</h2>
            <div class="flex flex-row items-center">
              <button type="button" class="mr-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <!-- Heroicon name: solid/plus -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
              <button type="button" class="mr-4 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <!-- Heroicon name: solid/plus -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div v-if="!$device.isMobile" class="grid-container">
          <div class="img-counter">
            <font-awesome-icon icon="images">
            </font-awesome-icon>
            <p>{{ images.length }}</p>
          </div>
          <div :class="'item' + img.id" v-for="(img, index) in images">
            <img :src="img.name" alt="" @click="openGallery(index)">
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
        <div class="listing-content-wrapper flex flex-row">
          <div class="flex flex-col">
            <ul role="list" class="mt-6 border-t border-b border-gray-200 py-6 flex flex-col">
              <li class="flow-root mb-6">
                <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                  <div class="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg bg-gray-100">
                    <!-- Heroicon name: outline/clock -->
                    <svg class="h-6 w-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">
                      <a href="#" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        Lokacija
                      </a>
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">{{ listing.city.name }}</p>
                  </div>
                </div>
              </li>
              <li class="flow-root">
                <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                  <div class="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg bg-gray-100">
                    <!-- Heroicon name: outline/clock -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">
                      <a href="#" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        Vrsta oglasa
                      </a>
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">{{ listing.listing_type.title}}</p>
                  </div>
                </div>
              </li>
              <li class="flow-root">
                <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                  <div class="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg bg-gray-100">
                    <!-- Heroicon name: outline/clock -->
                    <svg class="h-6 w-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">
                      <a href="#" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        Adresa
                      </a>
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">{{ sliceAddress(listing.address) }}</p>
                  </div>
                </div>
              </li>
              <li class="flow-root">
                <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                  <div class="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg bg-gray-100">
                    <!-- Heroicon name: outline/clock -->
                    <svg class="h-6 w-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">
                      <a href="#" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        Datum objave
                      </a>
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">{{ $moment(listing.createdAt).format('LL') }}</p>
                  </div>
                </div>
              </li>
              <li class="flow-root">
                <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
                  <div class="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg bg-gray-800">
                    <!-- Heroicon name: outline/clock -->
                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">
                      <a href="#" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        Cijena
                      </a>
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">{{ parseInt(listing.price) }} KM</p>
                  </div>
                </div>
              </li>
            </ul>
            <div class="separator"></div>
            <div>
              <h2 class="text-lg font-medium text-gray-900">
                Detaljne informacije
              </h2>
              <ul role="list" class="mt-6 border-t border-b border-gray-200 py-6 grid grid-cols-3 gap-6">
                <li class="flow-root" v-for="info in normalAttributes">
                  <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">

                    <div>
                      <h3 class="text-sm font-medium text-gray-900">
                        <a href="#" class="focus:outline-none">
                          <span class="absolute inset-0" aria-hidden="true"></span>
                          {{ info.name }}
                        </a>
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">{{ info.value }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="mt-6">
              <h2 class="text-lg font-medium text-gray-900">
                Nekretnina posjeduje
              </h2>
              <ul role="list" class="mt-6 border-t border-b border-gray-200 py-6 grid grid-cols-3 gap-6">
                <li class="flow-root" v-for="(info, index) in checkboxAttributes" :key="index">
                  <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">

                    <div>
                      <h3 class="text-sm font-medium text-gray-900">
                        <a href="#" class="focus:outline-none">
                          <span class="absolute inset-0" aria-hidden="true"></span>
                          {{ info.name }}
                        </a>
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">{{ attrTranslate(info.value) }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="separator"></div>
            <h2 class="heading">Detaljni opis</h2>
            <p class="description">{{ listing.description }}</p>
            <div class="separator"></div>
            <h2 class="heading">U blizini nekretnine</h2>
            <div class="places">
              <div class="flex flex-row items-center justify-start">
                <ActionButton class="mr-4" v-if="cafes.length" placeholder="Kafići" @action="showMoreCafes = !showMoreCafes"></ActionButton>
                <ActionButton class="mr-4" v-if="restaurants.length" placeholder="Restorani" @action="showMoreRestaurants = !showMoreRestaurants"></ActionButton>
                <ActionButton class="mr-4" v-if="schools.length" placeholder="Škole i vrtići" @action="showMoreSchools = !showMoreSchools"></ActionButton>
                <ActionButton class="mr-4" v-if="atms.length" placeholder="Banke i bankomati" @action="showMoreAtms = !showMoreAtms"></ActionButton>
                <ActionButton class="mr-4" v-if="malls.length" placeholder="Šoping centri" @action="showMoreMalls = !showMoreMalls"></ActionButton>
              </div>
              <div class="places-grid" v-if="showMoreCafes">
                <div class="places-heading">
                  <h1>Kafići</h1>
                </div>
                <ul :class="[showMoreCafes ? 'extend' : '']">
                  <li v-for="(cafe, index) in cafes" :key="index">
                    <p>{{ cafe.name }}</p>
                  </li>
                </ul>
              </div>
              <div class="places-grid" v-if="showMoreRestaurants">
                <div class="places-heading">
                  <h1>Restorani</h1>
                </div>
                <ul :class="[ showMoreRestaurants ? 'extend' : '']">
                  <li v-for="(restaurant, index) in restaurants" :key="index">
                    <p>{{ restaurant.name }}</p>
                  </li>
                </ul>
                <button @click="showMoreRestaurants = !showMoreRestaurants">{{ showMoreRestaurants ? 'Prikaži manje' : 'Prikaži više' }}</button>
              </div>
              <div class="places-grid" v-if="showMoreSchools">
                <div class="places-heading">
                  <h1>Škole i vrtići</h1>
                </div>
                <ul :class="[ showMoreSchools ? 'extend' : '']">
                  <li v-for="(school, index) in schools" :key="index">
                    <p>{{ translateSchool(school.name, 'school') }}</p>
                  </li>
                </ul>
                <button @click="showMoreSchools = !showMoreSchools">{{ showMoreSchools ? 'Prikaži manje' : 'Prikaži više' }}</button>
              </div>
              <div class="places-grid" v-if="showMoreAtms">
                <div class="places-heading">
                  <h1>Banke i bankomati</h1>
                </div>
                <ul :class="[ showMoreAtms ? 'extend' : '']">
                  <li v-for="(atm, index) in atms" :key="index">
                    <p>{{ translateSchool(atm.name, 'atm') }}</p>
                  </li>
                </ul>
                <button @click="showMoreAtms = !showMoreAtms">{{ showMoreAtms ? 'Prikaži manje' : 'Prikaži više' }}</button>
              </div>
              <div class="places-grid" v-if="showMoreMalls">
                <div class="places-heading">
                  <h1>Šoping centri</h1>
                </div>
                <ul :class="[ showMoreMalls ? 'extend' : '']>
                <li v-for="(mall, index) in malls" :key="index">
                <p>{{ mall.name }}</p>
                </li>
                </ul>
                <button @click="showMoreMalls = !showMoreMalls">{{ showMoreMalls ? 'Prikaži manje' : 'Prikaži više' }}</button>
              </div>
            </div>
            <div class="separator"></div>
            <h2 class="heading">Lokacija nekretnine</h2>
            <RealEstateLocationMap v-if="listing" :location="listing.location"></RealEstateLocationMap>
            <div class="separator" v-if="questions.length"></div>
            <h2 class="heading question" v-if="questions.length">Pitanja</h2>
            <div class="separator" v-if="questions.length"></div>
            <h2 class="heading" v-if="listing.questions_disabled === true">
              Korisnik je zabranio javna pitanja
            </h2>
            <SingleQuestion v-if="questions.length" v-for="question in questions" :message="question" :key="question.id" :owner="owner"></SingleQuestion>
            <div class="question-create" v-if="$auth.user && listing.questions_disabled === false && owner === false">
              <textarea v-model="questionTerm"></textarea>
              <ActionButton placeholder="Postavi pitanje" @action="askQuestion"></ActionButton>
            </div>
          </div>
          <div class="user-wrap">
            <UserProfile :id="listing.id" :user="listing.user" :followed="isFollowed" :is-rent="listing.is_rent" :type="listing.user.user_type"></UserProfile>
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

@Component({
  components: {
    ActionButton,
    Snackbar,
    UserProfile,
    SingleQuestion,
    RealEstateLocationMap
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
  async asyncData(ctx) {
    let listing = null;
    let user = null
    let isFollowed = false;
    let isSaved = false;
    let listingSaved = false;

    try {
      let response = await ctx.app.$axios.get('/listings/' + ctx.params.id);
      listing = response.data.data;
      listingSaved = response.data.meta.saved;
      user = listing.user;
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
      listingSaved
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
  swiperOption = {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true
    }
  }
  images = [
    {
      name: '/test/img1.jpg',
      id: 1,
    },
    {
      name: '/test/img1.jpg',
      id: 2,
    },
    {
      name: '/test/img1.jpg',
      id: 3,
    },
    {
      name: '/test/img1.jpg',
      id: 4,
    },
    {
      name: '/test/img1.jpg',
      id: 5,
    },
  ]
  cafes = [];
  atms = [];
  malls = [];
  schools = [];
  restaurants = [];

  async fetchPlaces() {
    try {
      let res = await this.$axios.get('/listings/' + this.listing.id + '/places');
      this.cafes = res.data.cafe.results;
      this.atms = res.data.atm.results;
      this.malls = res.data.shopping_mall.results;
      this.schools = res.data.school.results;
      this.restaurants = res.data.restaurant.results;

      console.log(this.cafes)

    } catch(e) {
      console.log(e)
    }
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
          src: item.name,
          thumb: item.name,
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

  sliceAddress(address) {
    return address.slice(0,20)
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
          text: "Uspjšsno ste otpratili " + this.user.name,
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
    console.log(this.listing)
    await this.fetchPlaces();
    await this.getQuestions();
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

    min-height: 100%;

    @include for-phone-only {
      border-radius: 0;
    }
  }
}
.item2 {
  grid-area: small2;
  img {
    border-top-right-radius: 10px;
    @include for-phone-only {
      border-radius: 0;
    }
  }
}
.item3 {
  grid-area: small1;
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

.item4 {
  grid-area: small4;
  img {
    border-bottom-right-radius: 10px;

    @include for-phone-only {
      border-radius: 0;
    }
  }
}

.grid-container {
  position: relative;
  display: grid;
  grid-template-areas:
  'main main main small1 small2'
  'main main main small3 small4';
  grid-gap: 8px;
  min-height: 500px;

  .img-counter {
    position: absolute;
    left: 12px !important;
    top: 12px;
    display: flex;
    flex-direction: row;
    width: fit-content;
    height: 30px;
    border-radius: 5px;
    padding: 0 12px;
    color: #fff;
    background: #000;
    align-items: center;

    @include for-phone-only {
      bottom: 12px;
      top: inherit;
      background: #0006;
      font-size: 13px;
      padding: 0 8px;
    }

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
    min-height: 100%;
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
          font-weight: 600 !important;
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
      font-family: 'Raleway', sans-serif;
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
  width: 33%;
  margin-left: 24px;

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
  border-radius: 10px !important;

  @include for-phone-only {
    border-radius: 0 !important;
  }
}

::v-deep .vue-lb-arrow {
  width: 60px !important;
  border-radius: 30px!important;
  border: 1px solid #fff!important;
  height: 60px!important;

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
    font-family: 'Raleway', sans-serif;
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
    display: flex;
    flex-direction: column;

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

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-column-gap: 12px;
    margin-bottom: 24px;
    overflow: hidden;
    max-height: 70px;

    @include for-phone-only {
      max-height: 150px;
    }

    &.extend {
      max-height: fit-content;
    }
    li {
      height: fit-content;
      padding: 12px 8px;
      transition: 0.3s all ease;
      border-radius: 10px;

      p {
        white-space: nowrap;
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &:hover {
        position: relative;
        cursor: pointer;
        p {
          position: absolute;
          overflow: visible;
          box-shadow: 0 0px 12px 0 rgba(0, 0, 0, 0.1);
          z-index: 10;
          background: #fff;
          min-width: fit-content;
          width: fit-content;
          height: fit-content;
          border-radius: 8px;
          padding: 12px 8px;
          top: 0;
          left: 0;
          right: inherit;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          box-sizing: border-box;
        }
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
    font-family: 'Raleway', sans-serif;
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

</style>

