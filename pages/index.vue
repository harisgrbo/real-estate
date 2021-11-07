<template>
  <div :class="['homepage-wrap', this.$route.name === 'index' ? 'no-padding' : '']">
<!--    <ul class="categories-mobile mx-5" v-if="$device.isMobile">-->
<!--      <li v-for="(cat, index) in categories" :id="index" @click="selectCategory(cat)"-->
<!--          :class="[ selectedCategory !== null? (cat.id === selectedCategory.id? 'selected': ''): null ]"-->
<!--      >-->
<!--        <div class="img-wrapper">-->
<!--          <img :src="cat.icon" alt="cat">-->
<!--        </div>-->
<!--        <p>{{cat.title}}</p>-->
<!--      </li>-->
<!--    </ul>-->
    <div class="publish mb-24 p-8">
      <div class="quick-search">
        <ul class="w-full">
          <li v-for="(tab, index) in tabs" :key="index" @click="handleSelectedType(index)" :class="['quick-tab', quickSearchTab === index ? 'active' : '']">{{ tab }}</li>
        </ul>
        <div class="flex flex-row items-center w-full inputs">
          <div class="search-inputs">
            <label>Lokacija</label>
            <PublishDropdown placeholder="Pretražite lokacije" class="location" @select-option="handleSelectedCity"></PublishDropdown>
          </div>
          <div>
            <label>Kategorija</label>
<!--            <TextField type="text" placeholder="Izaberite kategoriju npr. stan"></TextField>-->
            <fieldset class="w-full">
              <label for="language" class="sr-only">Language</label>
              <div class="relative">
                <select id="language" name="language" class="cat-select appearance-none block w-full bg-none bg-white rounded-md py-2 h-12 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="selectedCategory">
                  <option class="font-medium text-sm" v-for="(category, index) in categories" :key="index" :value="category">{{ category.title }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                  <!-- Heroicon name: solid/chevron-down -->
                  <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="price-label">
            <label>Cijena</label>
            <div class="w-full flex items-center justify-between">
              <TextField type="number" :currency="true" placeholder="Od" v-model="priceFrom"></TextField>
              <p class="mx-2">-</p>
              <TextField type="number" :currency="true" placeholder="Do" v-model="priceTo"></TextField>
            </div>
          </div>
          <button @click="search" class="px-4 search">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Pretraži
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:px-20 xl:px-20 mt-8 up:px-20 mx-auto w-full mb-12 lg:mb-16 xl:mb-16 up:mb-16">
      <MultipleSelect></MultipleSelect>
      <h2 class="section-title">
        Najtraženije lokacije
      </h2>

      <ul v-if="locationsLoaded" role="list" class="most-visited sm:mt-4 lg:mt-6 xl:mt-6 up:mt-6 flex flex-row border-t border-b border-gray-200 overflow-x-scroll max-w-full">
        <li class="flow-root justify-between flex flex-col items-center text-center relative" v-for="(city, index) in top_locations" :key="index"
            :style="{ backgroundImage: 'url(' + city.background_image + ')' }"
        >
          <div class="overlay-searched"></div>
          <div>
            <h3 class="font-semibold searched-h3">
                {{ city.title }}
            </h3>
            <p class="mt-1 text-lg text-white searched-h3 km">{{ Number.parseFloat(city.price_per_square).toFixed(2) }} KM/m2</p>
          </div>
          <button @click="searchLocation(city.city.id)" type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Pogledaj više
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </li>
      </ul>

      <div v-else role="list" class="pl-5 most-visited mt-5 sm:mt-4 lg:mt-6 xl:mt-6 up:mt-6 flex flex-row border-t border-b border-gray-200 overflow-x-scroll max-w-full">
        <div class="mr-5 justify-between flex relative min-h-full mobile-skeleton" v-for="i in 6">
          <skeleton height="262px" width="440px"></skeleton>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mb-4 lg:px-20 xl:px-20 up:px-20">
      <h2 class="section-title">Prodaja</h2>
      <div class="flex flex-row items-center mr-5">
        <nuxt-link class="more" :to="`/pretraga?q=[${searchSell}]`">Pogledaj više</nuxt-link>
        <div class="flex flex-row items-center mt-6" v-if="!$device.isMobile">
          <div
            class="swiper-button-prev swiper-button-white mx-4"
            slot="button-prev"
          ></div>
          <div
            class="swiper-button-next swiper-button-white"
            slot="button-next"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mb-4 lg:px-20 xl:px-20 up:px-20" v-if="!$device.isMobile">
      <client-only v-if="sellLoaded">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="listing in listings_sell" :key="listing.id">
            <ListingCard :listing="listing" :type="listing.user.user_type"/>
          </swiper-slide>
        </swiper>
      </client-only>
      <client-only v-else>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="i in 6">
            <skeleton height="370px" width="240px"></skeleton>
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
    <div class="lg:px-20 xl:px-20 up:px-20 mx-auto mb-8 w-full mobile" v-else>
      <div v-if="sellLoaded" class="flex flex-row overflow-y-scroll ml-5">
        <div v-for="listing in listings_sell" :key="listing.id" class="mr-5">
          <ListingCard :action="true" :listing="listing" :type="listing.user.user_type"/>
        </div>
      </div>
      <div v-else class="flex flex-row overflow-y-scroll mx-5">
        <div  v-for="i in 5" class="skeleton-wrap mr-5">
          <skeleton height="232px" width="240px"></skeleton>
        </div>
      </div>
    </div>
    <div class="flex flex-col mb-16 mt-8 popular">
      <div class="w-full flex items-center justify-between lg:px-20 up:px-20 xl:px-20 mx-auto mb-4">
        <h2 class="section-title popular-cats">Popularne kategorije</h2>
        <div class="flex flex-row items-center" v-if="!$device.isMobile">
          <nuxt-link class="more" to="/pretraga">Više kategorija</nuxt-link>
          </div>
      </div>
      <ul role="list" class="most-visited-cats mt-6 flex flex-row border-t border-b border-gray-200">
        <li class="flow-root justify-between flex flex-col" v-for="(cat, index) in most_visited_cats" :key="index"
            :style="{ backgroundImage: 'url(' + cat.img + ')' }"
        >
          <div class="relative overlay-out">
            <div class="overlay"></div>
            <h3 class="font-medium">
              {{ cat.name }}
            </h3>
            <p class="mt-1 text-lg text-white" v-if="!$device.isMobile">{{ cat.text + ' oglasa u kategoriji ' + cat.name }}</p>
          </div>
          <button @click="searchCategory(cat)" type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Pretraži
          </button>
        </li>

      </ul>
    </div>

    <div class="flex items-center justify-between mb-4 lg:px-20 xl:px-20 up:px-20">
      <h2 class="section-title">Iznajmljivanje</h2>
      <div class="flex flex-row items-center mr-5">
        <nuxt-link class="more" :to="`/pretraga?q=[${searchRent}]`">Pogledaj više</nuxt-link>
        <div class="flex flex-row items-center mt-6" v-if="!$device.isMobile">
          <div
            class="swiper-button-prev rent swiper-button-white mx-4"
            slot="button-prev"
          ></div>
          <div
            class="swiper-button-next rent swiper-button-white"
            slot="button-next"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mb-4 lg:px-20 xl:px-20 up:px-20" v-if="!$device.isMobile">
      <client-only v-if="rentLoaded">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="listing in listings_rent" :key="listing.id">
            <ListingCard :listing="listing" :type="listing.user.user_type"/>
          </swiper-slide>
        </swiper>
      </client-only>
      <client-only v-else>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="i in 6">
            <skeleton height="370px" width="240px"></skeleton>
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
    <div class="pl-5 lg:px-20 xl:px-20 up:px-20 mb-8 mobile" v-else>
      <div v-if="rentLoaded" class="flex flex-row overflow-y-scroll">
        <div v-for="listing in listings_rent" :key="listing.id" class="mr-5">
          <ListingCard :action="true" :listing="listing" :type="listing.user.user_type"/>
        </div>
      </div>
      <div v-else class="flex flex-row overflow-y-scroll">
        <div  v-for="i in 5" class="skeleton-wrap mr-5">
          <skeleton height="232px" width="240px"></skeleton>
        </div>
      </div>
    </div>
    <div class="agency-wrap">
      <h2>Želite pomoć pri prodaji ili kupovini nekretnine?</h2>
      <p>Pogledajte listu agencija na našoj web stranici i kontaktirajte jednu od njih</p>
      <nuxt-link to="/agencije" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Lista agencija
      </nuxt-link>r
    </div>
    <div class="flex items-center justify-between mb-4 lg:px-20 xl:px-20 up:px-20">
      <h2 class="section-title">Izdavanje na dan</h2>
      <div class="flex flex-row items-center mr-5">
        <nuxt-link class="more" :to="`/pretraga?q=[${searchRentDay}]`">Pogledaj više</nuxt-link>
        <div class="flex flex-row items-center mt-6" v-if="!$device.isMobile">
          <div
            class="swiper-button-prev swiper-button-white mx-4"
            slot="button-prev"
          ></div>
          <div
            class="swiper-button-next swiper-button-white"
            slot="button-next"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mb-4 lg:px-20 xl:px-20 up:px-20" v-if="!$device.isMobile">
      <client-only v-if="rentPerDayLoaded">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="listing in listings_rent_for_a_day" :key="listing.id">
            <ListingCard :listing="listing" :action="false" type="rent"/>
          </swiper-slide>
        </swiper>
      </client-only>
      <client-only v-else>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="i in 6">
            <skeleton height="370px" width="240px"></skeleton>
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
    <div class="lg:px-20 xl:px-20 up:px-20 mb-8 mobile" v-else>
      <div v-if="rentPerDayLoaded" class="flex flex-row overflow-y-scroll ml-5">
        <div v-for="listing in listings_rent_for_a_day" :key="listing.id" class="mr-5">
          <ListingCard :action="false" :listing="listing" :type="listing.user.user_type"/>
        </div>
      </div>
      <div v-else class="flex flex-row overflow-y-scroll ml-5">
        <div  v-for="i in 5" class="skeleton-wrap mr-5">
          <skeleton height="232px" width="240px"></skeleton>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mb-4 lg:px-20 xl:px-20 up:px-20 mt-8">
      <h2 class="section-title">Agencije</h2>
      <nuxt-link class="more mr-5" to="/agencije">Pogledaj više</nuxt-link>
    </div>
    <div class="flex items-center justify-start mb-4 lg:px-20 xl:px-20 up:px-20 flex-row overflow-x-scroll w-full agencija">
      <UserCard class="mr-5" v-for="(agency, index) in agencies" :key="index" :user="agency"/>
    </div>
  </div>
</template>

<script>
  import { Component, Vue} from "nuxt-property-decorator";
  import ListingCard from "@/components/listingCard/ListingCard";
  import Categories from "~/components/publishInputs/Categories";
  import PublishShortcut from "@/components/publish/PublishShortcut";
  import MostVisitedCard from "@/components/MostVisitedCard"
  import PremiumAgency from "@/components/PremiumAgency"
  import UserCard from "../components/UserCard";
  import TextField from "@/components/inputs/TextField";
  import { buildCategory, buildType, buildCity, buildTitle, buildPrice } from "@/util/search";
  import skeleton from "../components/skeleton";
  import skeletonlocation from "../components/skeletonlocation";
  import CitiesMultipleSelect from "../components/global/CitiesMultipleSelect";

  @Component({
    components: {
      MultipleSelect: CitiesMultipleSelect,
      TextField,
      UserCard,
      Categories,
      ListingCard,
      PublishShortcut,
      MostVisitedCard,
      PremiumAgency,
      skeleton,
      skeletonlocation
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',
  })

  export default class Homepage extends Vue {
    tabs = [
      'Najnovije',
      'Oglasi iz agencija',
      'Novogradnja'
    ]
    priceFrom = null;
    priceTo = null;
    activeTab = 0;
    categories = []
    selectedCity = null;
    selectedCategory = null;
    selectedType = {
      id: 1
    };
    sellLoaded = false;
    rentLoaded = false;
    rentPerDayLoaded = false;
    quickSearchTab = 0;
    most_visited_cats = [
      {
        id: 1,
        name: 'Stanovi',
        img: '/flat.jpeg',
        text: 'Preko 2000'
      },
      {
        id: 2,
        name: 'Kuće',
        img: '/house.jpg',
        text: 'Preko 2000'
      },
      {
        id: 4,
        name: 'Garaže',
        img: '/garage.jpg',
        text: 'Preko 2000'
      },
      {
        id: 6,
        name: 'Apartmani',
        img: '/rooms.jpg',
        text: 'Preko 2000'
      },
    ]

    tabs = [
      'Prodaja',
      'Iznajmljivanje',
      'Stan na dan'
    ]

    swiperOption = {
      spaceBetween: 16,
      // centeredSlides: true,
      // slidesOffsetBefore: '100px',
      // slidesOffsetAfter: '100px',
      // slidesOffsetBefore: '0px',
      loop: true,
      autoplay: {
        delay: 7000,
      },
      slidesPerView: 6,
      touchRatio: 0.2,
      slideToClickedSlide: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 'auto',
          spaceBetween: 20,
          simulateTouch: true,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 'auto',
          spaceBetween: 16
        }
      }
    }
    listings = []
    agency_listings = []
    meta = null
    page = 1
    agency_meta = null
    locationsLoaded = false;
    agency_page = 1
    top_locations = []
    listings_sell = []
    listings_rent = []
    listings_rent_for_a_day = []
    agencies = []

    swiperOptionSpecial = {
      spaceBetween: 0,
      // centeredSlides: true,
      // slidesOffsetBefore: '100px',
      // slidesOffsetAfter: '100px',
      // slidesOffsetBefore: '0px',
      loop: true,
      autoplay: {
        delay: 7000,
      },
      slidesPerView: 1,
      touchRatio: 0.2,
      slideToClickedSlide: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
    }


    created() {
      this.fetchCategories()
      this.fetchHomeListings();
      this.fetchSelling();
      this.fetchRenting();
      this.fetchRentingPerDay();
      this.fetchAgencies();
      this.fetchTopLocations();
    }


    async fetchHomeListings() {
      try {
        let res = await this.$axios.get('/listings/home')
        this.listings = res.data.data
        this.meta = res.data.meta
        this.page = 2
      } catch (e) {
        console.log(e)
      }

    }

    async fetchSelling() {
      this.sellLoaded = false;
      try {
        let res = await this.$axios.get('/listings/sell')
        this.listings_sell = res.data.data;

        this.sellLoaded = true;
      } catch (e) {
        console.log(e)
      }

    }

    async fetchRenting() {
      this.rentLoaded = false;
      try {
        let res = await this.$axios.get('/listings/rent')
        this.listings_rent = res.data.data;

        this.rentLoaded = true;
      } catch (e) {
        console.log(e)
      }
    }

    async fetchRentingPerDay() {
      this.rentPerDayLoaded = false;
      try {
        let res = await this.$axios.get('/listings/booking')
        this.listings_rent_for_a_day = res.data.data;

        this.rentPerDayLoaded = true;
      } catch (e) {
        console.log(e)
      }
    }


    async fetchAgencies() {
      try {
        let res = await this.$axios.get('/agencies')
        this.agencies = res.data.data;

      } catch (e) {
        console.log(e)
      }
    }

    infiniteHandler($state) {
      this.$axios.get('/listings/home', {
        params: {
          page: this.page,
        },
      }).then(({ data }) => {
        if (data.data.length) {
          this.page++;
          this.listings = this.listings.concat(data.data)
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    }

    async fetchCategories() {
      this.loading = true;
      try {
        let response = await this.$axios.get('/categories');
        this.categories = response.data.data;

        if (this.categories.length) {
          this.selectCategory(this.categories[0])
        }

        this.loading = false;
      } catch(e) {
        console.log(e)
      }
    }

    async fetchTopLocations() {
      this.locationsLoaded = false;
      try {
        let res = await this.$axios.get('/top/locations')
        this.top_locations = res.data.data;

        this.locationsLoaded = true;

        console.log(res.data.data);

      } catch (e) {
        console.log(e)
      }

    }

    selectCategory(c) {
      this.selectedCategory = c;
      this.$emit('selected-category', c);
    }

    handleSelectedType(index) {
      this.quickSearchTab = index;

      this.selectedType = {
        id: index === 0 ? 1: index + 2
      }
    }

    handleSelectedCity(val) {
      this.selectedCity = val;
    }

    get searchSell() {
      return buildType({id: 1});
    }

    get searchRent() {
      return buildType({id: 3});
    }

    get searchRentDay() {
      return buildType({id: 4});
    }

    searchLocation(cityId) {
      let cityFilter = JSON.stringify({
        type: 'term',
        name: 'city_id',
        value: cityId
      });

      this.$router.push(`/pretraga?q=[${cityFilter}]`);
    }

    searchCategory(cat) {
      this.$router.push(`/pretraga?q=[${buildCategory(cat)}]`);
    }

    search() {
      let filters  = [];

      filters.push(buildTitle(this.selectedCategory ? this.selectedCategory.singular: "Stan"));

      if (this.selectedCategory) {
        filters.push(buildCategory(this.selectedCategory));
      }

      if (this.selectedType) {
        filters.push(buildType(this.selectedType));
      }

      if (this.selectedCity) {
        filters.push(buildCity(this.selectedCity))
      }

      if (this.priceFrom || this.priceTo) {
        filters.push(buildPrice(this.priceFrom, this.priceTo))
      }

      if (filters.length) {
        this.focused = false;

        this.$router.push(`/pretraga?q=[${filters.join(',')}]`);
      }
    }
  }
</script>

<style lang="scss" scoped>
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

.homepage-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;


  @include for-phone-only {
    padding: 0px;
    padding-bottom: 90px;
  }

  ::v-deep .listing-card-wrapper {
    @include for-phone-only {
      max-width: 240px;
    }
  }

  h1 {
    word-wrap: break-word !important;
    font-size: 20px !important;
    font-weight: 500 !important;
    line-height: 1.125em !important;
    color: #484848 !important;
    margin-bottom: 36px !important;
    margin-top: 32px;

    @include for-phone-only {
      margin-left: 12px;
      margin-top: 24px;
    }
  }

}
.container {
  background: black;
}

.grid-layout {
  padding: 0px;
  grid-column-gap: 16px !important;

  @include for-phone-only {
    padding: 0px;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-column-gap: 12px !important;

  }
}

.mobile-grid-most {
  @include for-phone-only {
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: scroll;
    height: fit-content;
    padding: 8px 0;
    overflow-y: hidden;

    //::v-deep .most-visited-card {
    //  min-width: 280px;
    //  width: 280px;
    //}
  }
}

.most-visited-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 12px;
  grid-row-gap: 42px;
  width: 100%;
  justify-content: center;
  box-sizing: border-box;

  &.agencies {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-column-gap: 24px;
    grid-row-gap: 24px;

    @include for-phone-only {
      grid-template-columns: repeat(2, 1fr);
      box-sizing: border-box;
      grid-column-gap: 12px;
      grid-row-gap: 12px;
    }
  }
}

h2.heading {
  margin-top: 42px;
  color: rgb(72, 72, 72) !important;
  font-weight: 500 !important;
  padding-bottom: 24px;
  font-size: 22px !important;
  border-bottom: 1px solid #EBEBEB !important;
  position: relative;

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

  @include for-phone-only {
    margin-top: 32px;
    color: #484848 !important;
    font-weight: 500 !important;
    padding-bottom: 13px;
    font-size: 18px !important;
    border-bottom: 1px solid #EBEBEB !important;
    position: relative;
    margin-bottom: 26px !important;
  }
}

.loader-index {
  height: 30px;
  margin: 36px 0;
}

.loader-msg {
  margin: 48px 0;
  font-size: 18px;
  font-weight: 400;
}

.categories-mobile {
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  max-width: 100%;
  overflow-x: scroll;
  padding: 12px 0px;
  height: fit-content;
  box-sizing: border-box;
  margin-bottom: 24px;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-radius: 4px;
    margin-right: 12px;
    height: 40px;
    min-width: fit-content;
    padding: 12px;
    box-sizing: border-box;
    background: #f9f9f9;
    border: 1px solid #f1f1f1;

    img {
      height: 25px;
      margin-right: 8px;
    }

    p {
      text-align: center;
      font-size: 12px;
    }
  }
}

.agencije ::v-deep .swiper-container {
  padding: 24px 0 !important;
}

@include for-phone-only {
  ::v-deep .swiper-container {
  }
}

.flow-root {
  min-width: 440px;
  min-height: 262px;
  width: 440px;
  height: 262px;
  border-radius: 7px;
  object-fit: cover;
  object-fit: cover;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 24px;
  font-size: 26px;
  line-height: 30px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    width: fit-content;
  }
}

ul.most-visited {
  width: 100%;

  @include for-phone-only {
    padding-left: 16px;
  }
  li {
    margin-right: 16px;
    min-height: 262px;
    min-width: 440px;

    @include for-phone-only {
      margin-right: 16px;
      min-height: 182px;
      min-width: 260px;
      width: 260px;
      height: 182px;
    }
  }

  @include for-phone-only {
    margin-top: 16px;
  }
}

ul.most-visited-cats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  margin: 0 80px;

  @include for-phone-only {
    margin: 0px;
    grid-template-columns: repeat(2, 1fr);
  }
  .flow-root {
    min-width: 100%;
    min-height: 362px;
    width: 100%;
    max-height: 100%;
    height: 362px;
    border-radius: 7px;
    object-fit: cover;
    object-fit: cover;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 24px;
    font-size: 26px;
    line-height: 30px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include for-phone-only {
      min-height: 100px;
      height: 150px;
      max-height: 150px;
      font-size: 18px;
      padding: 16px;
    }

    button {
      width: fit-content;
    }
  }
}

.section-title {
  font-size: 22px !important;
  line-height: 26px !important;
  font-weight: 500 !important;

  @include for-phone-only {
    font-size: 18px !important;
    font-weight: 600 !important;
    margin-left: 16px;
  }

  &.popular-cats {
    margin-left: 0;
  }
}

.more {
  font-weight: 500;
  text-decoration: underline;
  font-size: 14px;

}

.swiper {
  width: 100% !important;

  .swiper-wrapper {
    max-width: 100% !important;
  }

  ::v-deep .swiper-slide {
    width: fit-content !important;

  }
}
.swiper-button-prev, .swiper-button-next {
  position: static !important;
  color: #002F34 !important;
  height: 30px;
  max-height: 30px;
  width: 30px;
  border-radius: 10px;
  padding: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  z-index: 1;


  &::after {
    font-size: 13px !important;
    line-height: 13px !important;
  }
}

.publish {
  background-image: url("/snow.jpg");
  background-repeat: no-repeat;
  height: 640px;
  background-size: cover;
  background-position: right;
  position: relative;

  @include for-phone-only {
    display: none;
  }

  .quick-search {
    position: absolute;
    left: 80px;
    right: 80px;
    bottom: -30px;
    border-radius: 7px;

    ul {
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background-color: #fff;
      border-top-left-radius: 7px;
      border-top-right-radius: 7px;
      height: fit-content;
      overflow: hidden;
      padding: 10px;


      li {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        font-size: 15px;
        cursor: pointer;
        padding: 8px 12px;
        height: 100%;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    select {
      border-radius: 8px !important;
    }

    .inputs {
      border-bottom-left-radius: 7px;
      border-bottom-right-radius: 7px;
      border-top-right-radius: 7px;
      height: fit-content;
      padding: 14px;
      align-items: flex-end;
      background-color: #fff;
      box-shadow: 0px 19px 15px rgba(0,0,0,0.04);


      > div {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-right: 12px;
        padding-right: 12px;

        ::v-deep input {
          border: none;
          padding: 0;
        }

        ::v-deep .input-wrapper {
          border: none;
          padding: 0;
          padding: 0 12px;
          height: 48px;
          max-height: 48px !important;
          min-height: 48px !important;
          border-radius: 8px;
          background: #F3F3F4 !important;
        }

        ::v-deep .input-wrapper input {
          height: 48px;
          max-height: 48px !important;
        }


        &:last-child {
          margin-right: 0;
        }

        label {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
        }
      }
    }

    ::v-deep input, select, .input-wrapper {
      background: #f1f1f1 !important;
    }

    button {
      height: 48px;
      width: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      background: #fff;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
    }
  }
}

.quick-tab {
  display: flex;
  position: relative;
  padding: 10px;


  &.active {
    color: #fff;
    background: #023246;
    font-weight: 500;
    border-radius: 7px;
  }
}

.overlay {
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,0.53125) 0%, rgba(255,255,255,0) 100%);
  position: absolute;
  top: -24px;
  left: -24px;
  right: -24px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 0;
  height: 160px;

  @include for-phone-only {
    height: 85px;
    top: -16px;
    left: -16px;
    right: -16px;
  }
}

.overlay-out {
  h3, p {
    position: relative;
    z-index: 1;
  }
}

.agency-wrap {
  height: 400px;
  display: flex;
  flex-direction: column;
  background-image: url("/agency-new.jpeg");
  position: relative;
  margin: 100px 80px;
  align-items: flex-start;
  justify-content: center;
  padding: 0 80px;
  border-radius: 7px;

  @include for-phone-only {
    padding: 0 16px;
    margin: 48px 0;
    object-fit: contain;
    border-radius: 0px;
    height: 300px;
    margin-top: 24px;
  }

  &::after {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.44);
    backdrop-filter: blur(6px);
    border-radius: 10px;

    @include for-phone-only {
      border-radius: 4px;
    }
  }

  h2 {
    font-size: 48px;
    font-weight: 500;
    color: #fff;
    position: relative;
    z-index: 1;

    @include for-phone-only {
      font-size: 31px;
      line-height: 36px;
    }
  }

  p {
    margin: 32px 0;
    font-size: 24px;
    font-weight: 500;
    color: #fff;
    position: relative;
    z-index: 1;

    @include for-phone-only {
      font-size: 18px;
      line-height: 21px;
    }
  }

  a {
    position: relative;
    z-index: 1;
  }
}

.overlay-searched {
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,0.53125) 0%, rgba(255,255,255,0) 100%);
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  z-index: 0;
  height: 70px;
}

.searched-h3 {
  position: relative;
  z-index: 2;

  &.km {
    background: rgba(0, 0, 0, 0.51);
    border-radius: 4px;
    margin-top: 12px;
    padding: 8px 12px;
  }
}

::v-deep .autocomplete-dropdown {
  border: none !important;
}

.cat-select {
  font-weight: 500;
  padding: 0 12px;
  font-size: 14px;
  border-radius: 10px !important;
}

.price-label ::v-deep input {
  font-weight: 500;
  padding: 0 12px !important;
  font-size: 14px;
  background: #fff;
  border-radius: 10px !important;
  max-height: 48px;
}

.price-label ::v-deep ::placeholder {
  font-size: 14px;
  font-weight: 500;
}

button.search {
  background: #023246 !important;
  color: #fff;
  border-radius: 8px !important;
}

.search-inputs {
  ::v-deep .input-wrapper {
    background: #f1f1f1 !important;
  }

  ::v-deep .bg-white {
    background: #f1f1f1 !important;
  }
}

.mobiile ::v-deep svg {
  width: 240px;
  height: 223px;
}

.skeleton-wrap {
  min-width: 240px;
  width: 240px;
  height: 223px;
}

::v-deep .listing-card-wrapper {
  max-width: 240px;
  min-width: 240px;
  width: 240px;

  img.slider-img {
    max-width: 240px;
    min-width: 240px;
    width: 240px;
  }
}

.mobile-skeleton ::v-deep #skeleton {
  @include for-phone-only {
    height: 182px !important;
    width: 260px !important;
  }
}

.swiper.top {
  position: absolute !important;
}

.popular {
  @include for-phone-only {
    margin: 16px;
  }
}

.agencija {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 16px;
  @include for-phone-only {
    padding: 0 16px;
  }
}

.no-padding {
  @include for-phone-only {
    padding-top: 80px;
  }
}
</style>
