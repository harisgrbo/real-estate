<template>
  <div :class="['homepage-wrap', this.$route.name === 'index' ? 'no-padding' : '']">
    <div class="publish mb-24 p-8">
      <img src="/image.webp" alt="" class="image-bg">
      <div class="quick-search">
        <div class="flex flex-col">
          <h3 class="main-title">Sve nekretnine na jednom mjestu</h3>
          <h5 class="main-title sub">U par koraka do vaših kvadrata.</h5>
          <div class="text-white flex flex-row items-center justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="#fff">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <b class="mr-2 text-2xl">{{ count.listing_count }}</b>
            Objavljenih oglasa
          </div>
        </div>
        <div class="flex flex-col mt-6">
          <div class="flex flex-row items-center w-full inputs">
            <div class="search-inputs">
              <PublishDropdown label="Lokacija" placeholder="Pretražite lokacije" class="location" @select-option="handleSelectedCity"></PublishDropdown>
            </div>
            <div>
              <div class="relative w-full flex flex-col items-start">
                <div class="relative select-border border w-full text-wrap border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:text-gray-900 focus-within:ring-gray-900 focus-within:ring-gray-900 focus-within:border-gray-900">
                  <label for="name" class="absolute -top-2 left-1 -mt-px inline-block px-2 bg-white text-xs font-semibold text-gray-900">Tip oglasa</label>
                  <select @change="handleSelectedType" id="language" name="language" class="block bg-white w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm">
                    <option class="font-medium text-sm" v-for="(type, index) in tabs" :key="index" :value="index" >{{ type }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div class="relative w-full flex flex-col items-start">
                <div class="relative select-border border w-full text-wrap border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:text-gray-900 focus-within:ring-gray-900 focus-within:ring-gray-900 focus-within:border-gray-900">
                  <label for="name" class="absolute -top-2 left-1 -mt-px inline-block px-2 bg-white text-xs font-semibold text-gray-900">Kategorija</label>
                  <select id="language" name="language" class="block bg-white w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" v-model="selectedCategory">
                    <option class="font-medium text-sm" v-for="(category, index) in categories" :key="index" :value="category">{{ category.title }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="price-label">
              <div class="w-full flex items-center justify-between">
                <TextField type="number" label="Kvadratura" placeholder="Od" v-model="squareFrom"></TextField>
                <p class="mx-2">-</p>
                <TextField type="number" placeholder="Do" v-model="squareTo"></TextField>
              </div>
            </div>
            <div class="price-label">
              <div class="w-full flex items-center justify-between">
                <TextField type="number" :currency="true" label="Cijena" placeholder="Od" v-model="priceFrom"></TextField>
                <p class="mx-2">-</p>
                <TextField type="number" :currency="true" placeholder="Do" v-model="priceTo"></TextField>
              </div>
            </div>
            <button @click="search" class="px-4 search">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#1F2937">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="text-gray-900 text-md flex flex-row items-center justify-start pl-4" v-if="$device.isMobile">
      <b class="mr-2 text-2xl">{{ count.listing_count }}</b>
      Objavljenih oglasa
    </div>
    <ins class="adsbygoogle"
         v-if="!$device.isMobile"
         style="display:inline-block;width:980px;height:250px"
         data-ad-client="ca-pub-3745186233711216"
         data-ad-slot="2369493952"></ins>
    <div class="flex flex-col" v-if="premiumListingsLoaded && premiumListings.length">
      <div class="flex custom-width items-center justify-between title-wrapper">
        <h2 class="section-title" ssr-only="stanovi sarajevo stan na dan najam izdavanje rentanje novogradnja iznajmljivanje">Premium oglasi</h2>
        <div class="flex flex-row items-center mr-5">
          <div class="flex flex-row items-center mt-6" v-if="!$device.isMobile">
            <div
              @click.prevent.stopPropagation="$refs.swiperPremium.$swiper.sliderPrev()"
              class="swiper-button-prev rent swiper-button-white mx-4"
              slot="button-prev"
            ></div>
            <div
              @click.prevent.stopPropagation="$refs.swiperPremium.$swiper.sliderNext()"
              class="swiper-button-next rent swiper-button-white"
              slot="button-next"
            ></div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between custom-width premium-listings" v-if="!$device.isMobile">
        <client-only v-if="premiumListingsLoaded">
          <swiper class="swiper" ref="swiperPremium" :options="swiperOptionPremium">
            <swiper-slide v-for="listing in premiumListings" :key="listing.id">
              <PremiumListingCard :listing="listing" />
            </swiper-slide>
          </swiper>
        </client-only>
        <client-only v-else>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="i in 6" :key="i">
              <skeleton height="262px" width="440px"></skeleton>
            </swiper-slide>
          </swiper>
        </client-only>
      </div>
      <div class="pl-4 lg:px-20 xl:px-20 up:px-20 mb-0 mobile" v-else>
        <div v-if="premiumListingsLoaded" class="flex flex-row overflow-y-scroll">
          <div v-for="listing in premiumListings" :key="listing.id" class="mr-5">
            <PremiumListingCard :action="true" :listing="listing" />
          </div>
        </div>
        <div v-else class="flex flex-row overflow-y-scroll">
          <div v-for="i in 5" :key="i" class="w-full">
            <skeleton height="200px" width="300px" class="mr-5"></skeleton>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col custom-width">
      <div class="title-wrapper">
        <h2 class="section-title" ssr-only="stanovi najam sarajevo stan na dan izdavanje rentanje novogradnja iznajmljivanje">
          Najtraženije lokacije
        </h2>
      </div>

      <ul v-if="locationsLoaded" role="list" class="most-visited flex flex-row border-t border-b border-gray-200 overflow-x-scroll max-w-full">
        <li class="flow-root justify-between flex flex-row items-center text-center relative cursor-pointer" v-for="(city, index) in top_locations" :key="index"
            :style="{ backgroundImage: 'url(' + city.background_image + ')' }"
            @click="searchLocation(city.city.id)"
        >
          <div class="overlay-searched"></div>
          <div>
            <h3 class="font-semibold searched-h3 text-left">
                {{ city.title }}
            </h3>
            <p class="mt-1 text-lg text-white searched-h3 km" v-if="city.price_per_square > 0">{{ Number.parseFloat(city.price_per_square).toFixed(0) }} KM/m2</p>
          </div>
        </li>
      </ul>

      <ul v-else role="list" class="most-visited flex flex-row border-t border-b border-gray-200 overflow-x-scroll max-w-full">
        <li class="flow-root justify-between flex flex-row items-center text-center relative cursor-pointer" v-for="i in 6" :key="i">
          <skeleton :height="$device.isMobile ? '' : '262px'" :width="$device.isMobile ? '' : '440px'"></skeleton>
        </li>
      </ul>
    </div>
    <div class="flex items-center justify-between custom-width title-wrapper">
      <h2 class="section-title" ssr-only="prodaja stanova sarajevo">Prodaja</h2>
      <div class="flex flex-row items-center mr-5 lg:mr-0 up:mr-0 md:mr-0 xl:mr-0">
        <nuxt-link class="more" :to="`/pretraga?q=[${searchSell}]`">Pogledaj više</nuxt-link>
        <div class="flex flex-row items-center mt-6" v-if="!$device.isMobile">
          <div
            @click.prevent.stopPropagation="$refs.swiperSell.$swiper.slidePrev()"
            class="swiper-button-prev swiper-button-white mx-4"
            slot="button-prev"
          ></div>
          <div
            @click.prevent.stopPropagation="$refs.swiperSell.$swiper.slideNext()"
            class="swiper-button-next swiper-button-white"
            slot="button-next"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between custom-width standard-listings" v-if="!$device.isMobile">
      <client-only v-if="sellLoaded">
        <swiper class="swiper" ref="swiperSell" :options="swiperOption">
          <swiper-slide v-for="listing in listings_sell" :key="listing.id">
            <ListingCard :listing="listing"/>
          </swiper-slide>
        </swiper>
      </client-only>
      <client-only v-else>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="i in 6" :key="i">
            <skeleton height="370px" width="240px"></skeleton>
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
    <div class="mx-auto w-full mobile" v-else>
      <div v-if="sellLoaded" class="flex flex-row overflow-y-scroll ml-4">
        <div v-for="listing in listings_sell" :key="listing.id" class="mr-5">
          <ListingCard :action="true" :listing="listing" />
        </div>
      </div>
      <div v-else class="flex flex-row overflow-y-scroll mx-5">
        <div  v-for="i in 5" :key="i" class="w-full">
          <skeleton height="232px" width="240px" class="mr-5"></skeleton>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between custom-width title-wrapper">
      <h2 class="section-title" ssr-only="stanovi izdavanje stan na dan rentanje najam">Najam</h2>
      <div class="flex flex-row items-center mr-5 lg:mr-0 up:mr-0 md:mr-0 xl:mr-0">
        <nuxt-link class="more" :to="`/pretraga?q=[${searchRent}]`">Pogledaj više</nuxt-link>
        <div class="flex flex-row items-center mt-6" v-if="!$device.isMobile">
          <div
            @click.prevent.stopPropagation="$refs.swiperRent.$swiper.slidePrev()"
            class="swiper-button-prev rent swiper-button-white mx-4"
            slot="button-prev"
          ></div>
          <div
            @click.prevent.stopPropagation="$refs.swiperRent.$swiper.slideNext()"
            class="swiper-button-next rent swiper-button-white"
            slot="button-next"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between custom-width standard-listings" v-if="!$device.isMobile">
      <client-only v-if="rentLoaded">
        <swiper class="swiper" ref="swiperRent" :options="swiperOption">
          <swiper-slide v-for="listing in listings_rent" :key="listing.id">
            <ListingCard :listing="listing" />
          </swiper-slide>
        </swiper>
      </client-only>
      <client-only v-else>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="i in 6" :key="i">
            <skeleton height="370px" width="240px"></skeleton>
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
    <div class="pl-4 mobile" v-else>
      <div v-if="rentLoaded" class="flex flex-row overflow-y-scroll">
        <div v-for="listing in listings_rent" :key="listing.id" class="mr-5">
          <ListingCard :action="true" :listing="listing" />
        </div>
      </div>
      <div v-else class="flex flex-row overflow-y-scroll">
        <div  v-for="i in 5" :key="i" class="w-full">
          <skeleton height="232px" width="240px" class="mr-5"></skeleton>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between custom-width title-wrapper">
      <h2 class="section-title" ssr-only="stanovi izdavanje stan na dan rentanje najam">Stan na dan</h2>
      <div class="flex flex-row items-center mr-5 lg:mr-0 up:mr-0 md:mr-0 xl:mr-0">
        <nuxt-link class="more" :to="`/pretraga?q=[${searchRentDay}]`">Pogledaj više</nuxt-link>
        <div class="flex flex-row items-center mt-6" v-if="!$device.isMobile">
          <div
            @click.prevent.stopPropagation="$refs.swiperDay.$swiper.slidePrev()"
            class="swiper-button-prev swiper-button-white mx-4"
            slot="button-prev"
          ></div>
          <div
            @click.prevent.stopPropagation="$refs.swiperDay.$swiper.slideNext()"
            class="swiper-button-next swiper-button-white"
            slot="button-next"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between custom-width standard-listings" v-if="!$device.isMobile">
      <client-only v-if="rentPerDayLoaded">
        <swiper class="swiper" ref="swiperDay" :options="swiperOption">
          <swiper-slide v-for="listing in listings_rent_for_a_day" :key="listing.id">
            <ListingCard :listing="listing" :action="false" type="rent"/>
          </swiper-slide>
        </swiper>
      </client-only>
      <client-only v-else>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="i in 6" :key="i">
            <skeleton height="370px" width="240px"></skeleton>
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
    <div class="mobile" v-else>
      <div v-if="rentPerDayLoaded" class="flex flex-row overflow-y-scroll ml-4">
        <div v-for="listing in listings_rent_for_a_day" :key="listing.id" class="mr-5">
          <ListingCard :action="false" :listing="listing" />
        </div>
      </div>
      <div v-else class="flex flex-row overflow-y-scroll ml-4">
        <div  v-for="i in 5" :key="i" class="w-full">
          <skeleton height="232px" width="240px" class="mr-5"></skeleton>
        </div>
      </div>
    </div>
    <ins class="adsbygoogle"
         v-if="!$device.isMobile"
         style="display:inline-block;width:980px;height:250px"
         data-ad-client="ca-pub-3745186233711216"
         data-ad-slot="2369493952"></ins>
    <div class="flex items-center justify-between custom-width mt-8 title-wrapper agency">
      <h2 class="section-title" ssr-only="stanovi izdavanje stan na dan rentanje najam agencija agencije za nekretnine agent">Agencije</h2>
      <nuxt-link class="more" to="/agencije">Pogledaj više</nuxt-link>
    </div>
    <div class="flex items-center justify-start pb-4 custom-width gap-4 flex-row overflow-x-scroll agencija" v-if="agenciesLoaded">
      <UserCard v-for="(agency, index) in agencies" :key="index" :user="agency"/>
    </div>
    <div class="flex items-center justify-start pb-4 custom-width gap-2 flex-row overflow-x-scroll agencija" v-else>
      <skeleton height="166px" width="360px" class="mr-5" v-for="i in 4" :key="i"></skeleton>
    </div>
<!--    <div class="flex items-center justify-between custom-width mt-8 title-wrapper agency">-->
<!--      <h2 class="section-title" ssr-only="stanovi izdavanje stan na dan rentanje najam agencija agencije za nekretnine agent">Investitori</h2>-->
<!--      <nuxt-link class="more" to="/investitori">Pogledaj više</nuxt-link>-->
<!--    </div>-->
<!--    <div class="flex items-center justify-start pb-4 custom-width gap-4 flex-row overflow-x-scroll agencija" v-if="investorsLoaded">-->
<!--      <UserCard v-for="(investor, index) in investors" :key="index" :user="investor"/>-->
<!--    </div>-->
<!--    <div class="flex items-center justify-start pb-4 custom-width gap-2 flex-row overflow-x-scroll agencija" v-else>-->
<!--      <skeleton height="166px" width="360px" class="mr-5" v-for="i in 4" :key="i"></skeleton>-->
<!--    </div>-->
    <a href="https://www.ekupon.ba" target="_blank" class="mx-auto mt-4 leaderboard" v-if="!$device.isMobile">
      <img src="/ekuponbanner.jpg" alt="">
    </a>
  </div>
</template>

<script>
  import { Component, Vue} from "nuxt-property-decorator";
  import ActionButton from "@/components/actionButtons/ActionButton";
  import ListingCard from "@/components/listingCard/ListingCard";
  import PublishDropdown from "@/components/publishInputs/PublishDropdown";
  import Categories from "~/components/publishInputs/Categories";
  import PublishShortcut from "@/components/publish/PublishShortcut";
  import MostVisitedCard from "@/components/MostVisitedCard"
  import PremiumAgency from "@/components/PremiumAgency"
  import UserCard from "../components/UserCard";
  import TextField from "@/components/inputs/TextField";
  import { buildCategory, buildType, buildCity, buildTitle, buildPrice, buildSquare } from "@/util/search";
  import skeleton from "../components/skeleton";
  import skeletonlocation from "../components/skeletonlocation";
  import CitiesMultipleSelect from "../components/global/CitiesMultipleSelect";
  import PremiumListingCard from "../components/PremiumListingCard";

  @Component({
    components: {
      PremiumListingCard,
      MultipleSelect: CitiesMultipleSelect,
      TextField,
      UserCard,
      Categories,
      ListingCard,
      PublishShortcut,
      ActionButton,
      PublishDropdown,
      MostVisitedCard,
      PremiumAgency,
      skeleton,
      skeletonlocation
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',
    head: {
      title: "MojKvadrat.ba - Centar svih nekretnina u BiH",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: "description",
          name: "Želite prodati, kupiti ili rezervisati smještaj unutar BiH, samostalno ili uz pomoć agencije? Na pravom ste mjestu.",
          content: "Sve nekretnine na jednom mjestu! Stanovi, apartmani, kuce, garaze, stanovi za izdavanje, stan na dan, rentanje, novogradnja",
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
  })

  export default class Homepage extends Vue {
    tabs = [
      'Najnovije',
      'Oglasi iz agencija',
      'Novogradnja'
    ]
    priceFrom = null;
    priceTo = null;
    squareFrom = null;
    agenciesLoaded = false;
    squareTo = null;
    activeTab = 0;
    categories = []
    selectedCity = null;
    selectedCategory = null;
    selectedType = {
      id: 1
    };
    sellLoaded = false;
    followedUserListingsLoaded = false;
    followedUserListings = []
    rentLoaded = false;
    rentPerDayLoaded = false;
    quickSearchTab = 0;
    premiumListingsLoaded = false;
    premiumListings = []

    tabs = [
      'Prodaja',
      'Dugoročno izdavanje',
      'Stan na dan'
    ]

    swiperOption = {
      spaceBetween: 16,
      loop: false,
      slidesPerView: 5,
      touchRatio: 0.2,
      slideToClickedSlide: false,
      breakpoints: {
        320: {
          slidesPerView: 'auto',
          spaceBetween: 20,
          simulateTouch: true,
        },
        640: {
          slidesPerView: 'auto',
          spaceBetween: 16
        }
      }
    }
    listings = []
    totalListings = 0;
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
    investorsLoaded = false;
    investors = []

    swiperOptionPremium = {
      spaceBetween: 16,
      loop: true,
      slidesPerView: 4  ,
      touchRatio: 0.2,
      slideToClickedSlide: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        320: {
          slidesPerView: 'auto',
          spaceBetween: 20,
          simulateTouch: true,
        },
        640: {
          slidesPerView: 'auto',
          spaceBetween: 16
        }
      }
    }
    count = {}


    created() {
      this.fetchListingsCount();
      this.fetchCategories()
      this.fetchHomeListings();
      this.fetchSelling();
      this.fetchRenting();
      this.fetchPremiumListings();
      this.fetchRentingPerDay();
      this.fetchAgencies();
      this.fetchInvestors();
      this.fetchTopLocations();
    }

    mounted() {
      this.$nextTick(() => {
        try {
          // this is required for each ad slot (calling this once will only load 1 ad)
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.error(error)
        }
      })
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

    async fetchListingsCount() {
      try {
        let res = await this.$axios.get('/listings/count')
        this.count = res.data.data
      } catch (e) {
        console.log(e)
      }
    }

    async fetchPremiumListings() {
      this.premiumListingsLoaded = false;
      try {
        let res = await this.$axios.get('/listings/premium')
        this.premiumListings = res.data.data;

        this.premiumListingsLoaded = true;
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
      this.agenciesLoaded = false;
      try {
        let res = await this.$axios.get('/agencies')
        this.agencies = res.data.data;

        this.agenciesLoaded = true;
      } catch (e) {
        console.log(e)
      }
    }

    async fetchInvestors() {
      this.investorsLoaded = false;
      try {
        let res = await this.$axios.get('/investors')
        this.investors = res.data.data;

        this.investorsLoaded = true;
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

      } catch (e) {
        console.log(e)
      }

    }

    selectCategory(c) {
      this.selectedCategory = c;
      this.$emit('selected-category', c);
    }

    handleSelectedType(event) {
      const index = parseInt(event.target.value);

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
        type: 'terms',
        name: 'city_id',
        value: [cityId]
      });

      this.$router.push(`/pretraga?q=[${cityFilter}]`);
    }

    searchCategory(cat) {
      this.$router.push(`/pretraga?q=[${buildCategory(cat)}]`);
    }

    search() {
      let filters  = [];

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

      if (this.squareFrom || this.squareTo) {
        filters.push(buildSquare(this.squareFrom, this.squareTo));
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
      min-width: 240px;
    }
  }

  ::v-deep .listing-card-wrapper-premium {
      max-width: 100% !important;
      min-width: 100% !important;
      width: 100% !important;
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
    border-radius: 6px;
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
  border-radius: 6px;
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
  width: 1280px;
  margin: 0 auto;

  @include for-phone-only {
    padding-left: 16px;
    width: 100%;
    overflow-x: scroll;
  }
  li {
    margin-right: 16px;
    min-height: 262px;
    min-width: 440px;
    flex-direction: row !important;
    align-items: flex-start !important;

    @include for-phone-only {
      margin-right: 16px;
      min-height: 182px;
      min-width: 260px;
      width: 260px;
      height: 182px;
    }

    ::v-deep button {
      background-color: rgba(0, 0, 0, 0.51) !important;
    }
  }
}

ul.most-visited-cats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  margin: 0 auto;
  width: 1280px;

  @include for-phone-only {
    margin: 0px;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    width: 100%;
  }
  .flow-root {
    min-width: 100%;
    min-height: 180px;
    width: 100%;
    max-height: 180px;
    height: 262px;
    border-radius: 6px;
    object-fit: cover;
    object-fit: cover;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 12px;
    font-size: 26px;
    line-height: 30px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;


    @include for-phone-only {
      min-height: 180px;
      height: 180px;
      max-height: 150px;
      font-size: 18px;
      padding: 16px;
      max-width: 250px;
      min-width: 250px;
      width: 250px;
    }

    button {
      width: fit-content;
    }

    p {
      font-size: 17px;
      font-weight: 200;
      line-height: 20px;
    }

    h3 {
      font-size: 20px;
      font-weight: 600;
    }
  }
}

.section-title {
  font-size: 23px !important;
  font-weight: 600 !important;

  @include for-phone-only {
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
  border-radius: 6px;
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
  height: 460px;
  background-size: cover;
  background-position: right;
  position: relative;
  border-radius: 6px;
  padding: 0;
  width: 100%;
  margin: 80px auto 0 auto;


  .image-bg {
    height: 456px;
    object-fit: cover;
    width: 100%;
  }

  @include for-phone-only {
    display: none;
  }

  .quick-search {
    position: absolute;
    width: 1280px;
    margin: 0 auto;
    bottom: 0px;
    top: 0;
    border-radius: 8px;
    height: 456px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    ul {
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background-color: #fff;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
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
        padding: 12px 2px;
        margin-right: 16px;
        height: 100%;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    select {
      min-height: 36px;

      &:focus {
        outline: none;
      }
    }

    .inputs {
      border-radius: 4px;
      height: fit-content;
      padding: 14px;
      align-items: flex-end;
      background-color: #fff;
      box-shadow: 0px 19px 15px rgba(0,0,0,0.04);
      padding-top: 20px;


      > div {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-right: 12px;
        padding-right: 12px;

        ::v-deep .input-wrapper input {
          height: 48px;
          max-height: 48px !important;
        }


        &:last-child {
          margin-right: 0;
        }

        label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }
      }
    }

    button {
      height: 54px;
      width: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      background: #fff;
      border-radius: 6px;
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
    color: #1F2937;
    font-weight: 700 !important;
    border-bottom: 1px solid #1F2937;
  }
}

.overlay {
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(255,255,255,0) 100%);
  position: absolute;
  top: -12px;
  left: -12px;
  right: -12px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 0;
  height: 100px;

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
  width: 1280px;
  margin: 40px auto;
  @include for-phone-only {
    margin: 48px 0;
    width: 100%;
  }


}

.overlay-searched {
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,0.53125) 0%, rgba(255,255,255,0) 100%);
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 0;
  height: 70px;
}

.searched-h3 {
  position: relative;
  z-index: 2;

  &.km {
    background: rgba(0, 0, 0, 0.51);
    border-radius: 8px;
    margin-top: 12px;
    padding: 8px;
    font-size: 15px;
    min-width: fit-content;
    max-width: auto;
    font-weight: 600;
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
  border-radius: 4px !important;
  max-height: 48px;
}

.price-label ::v-deep ::placeholder {
  font-size: 14px;
  font-weight: 500;
}

button.search {
  background: #fff !important;
  border: 2px solid #1F2937;
  color: #fff;
  border-radius: 4px !important;

  &:hover {
    background: #f9f9f9 !important;
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
  max-width: 240px !important;
  min-width: 240px !important;
  width: 240px !important;

  img.slider-img {
    max-width: 240px;
    min-width: 240px;
    width: 240px;
  }

  .main-image {
    @include for-phone-only {
      min-width: 100%;
    }
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
    margin-left: 16px;
    margin-right: 16px;
  }
}

.agencija {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding-bottom: 16px;
  @include for-phone-only {
    padding: 0 16px;
    display: flex;
    flex-direction: row;
    min-height: 190px;
  }
}

::v-deep .mobile-user {
  min-width: 180px;
}

.main-title {
  font-size: 50px;
  font-weight: 600;
  max-width: 900px;
  line-height: 57px;
  color: #fff;

  &.sub {
    font-size: 28px;
    margin-bottom: 10px;
  }
}

.select-border {
  border: 1px solid #f1f1f1 !important;

}

.title-wrapper {
  margin-top: 48px;
  margin-bottom: 16px;

  @include for-phone-only {
    margin-top: 42px;

    &.agency {
      padding-right: 16px;
    }
  }
}

.home-img {
  height: 20px;
  width: auto;
  min-width: auto;
  margin-right: 10px;
  filter: invert(1);
}

.leaderboard {
  min-width: 650px;
  min-height: 135px;
}
</style>
