<template>
  <div :class="['homepage-wrap', this.$route.name === 'index' ? 'no-padding' : '']">
    <ul class="categories-mobile" v-if="$device.isMobile">
      <li v-for="(cat, index) in categories" :id="index" @click="selectCategory(cat)"
          :class="[ selectedCategory !== null? (cat.id === selectedCategory.id? 'selected': ''): null ]"
      >
        <div class="img-wrapper">
          <img :src="cat.icon" alt="cat">
        </div>
        <p>{{cat.title}}</p>
      </li>
    </ul>
    <div class="publish mb-32 p-8">
      <div class="quick-search">
        <ul class="w-full">
          <li v-for="(tab, index) in tabs" @click="handleSelectedType(index)" :class="['quick-tab', quickSearchTab === index ? 'active' : '']">{{ tab }}</li>
        </ul>
        <div class="flex flex-row items-center w-full inputs">
          <div>
            <label>Lokacija</label>
            <PublishDropdown placeholder="Pretrazite lokacije" class="location" @select-option="handleSelectedCity"></PublishDropdown>
          </div>
          <div>
            <label>Kategorija</label>
<!--            <TextField type="text" placeholder="Izaberite kategoriju npr. stan"></TextField>-->
            <fieldset class="w-full">
              <label for="language" class="sr-only">Language</label>
              <div class="relative">
                <select id="language" name="language" class="appearance-none block w-full bg-none bg-white rounded-md py-2 h-12 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="selectedCategory">
                  <option v-for="category in categories" :value="category">{{ category.title }}</option>
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
          <div>
            <label>Cijena</label>
            <div class="w-full flex items-center justify-between">
              <TextField type="number" :currency="true" placeholder="Od" v-model="priceFrom"></TextField>
              <p>-</p>
              <TextField type="number" :currency="true" placeholder="Do" v-model="priceTo"></TextField>
            </div>
          </div>
          <button @click="search">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col mx-auto w-full mb-16">
      <h2 class="section-title ml-20">
        Najtraženije lokacije
      </h2>
      <ul role="list" class="most-visited mt-6 flex flex-row border-t border-b border-gray-200 overflow-x-auto">
          <li class="flow-root justify-between flex flex-col" v-for="(city, index) in most_visited_cities" :key="index"
              :style="{ backgroundImage: 'url(' + city.img + ')' }"
          >
            <div>
              <h3 class="font-semibold">
                  {{ city.city }}
              </h3>
              <p class="mt-1 text-lg text-white">2000 KM/m2</p>
            </div>
            <button type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Pogledaj više
            </button>
          </li>

        </ul>
    </div>
    <div class="w-full flex items-center justify-between px-20 mb-4">
      <h2 class="section-title">Prodaja</h2>
      <div class="flex flex-row items-center">
        <nuxt-link class="more" to="/">Pogledaj više</nuxt-link>
        <div class="flex flex-row items-center mt-6">
          <div
            class="swiper-button-next swiper-button-white mx-4"
            slot="button-next"
          ></div>
          <div
            class="swiper-button-prev swiper-button-white"
            slot="button-prev"
          ></div>
        </div>
      </div>
    </div>
    <div class="max-w-full mx-20 mb-8">
      <client-only>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="listing in listings" :key="listing.id">
            <ListingCard :listing="listing" :type="listing.user.user_type"/>
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
    <div class="flex flex-col mx-auto w-full mb-16 mx-20 mt-8">
      <div class="w-full flex items-center justify-between px-20 mb-4">
        <h2 class="section-title">Pretraži kategorije</h2>
        <div class="flex flex-row items-center">
          <nuxt-link class="more" to="/">Više</nuxt-link>
          </div>
      </div>
      <ul role="list" class="most-visited-cats mt-6 flex flex-row border-t border-b border-gray-200">
        <li class="flow-root justify-between flex flex-col" v-for="(cat, index) in most_visited_cats" :key="index"
            :style="{ backgroundImage: 'url(' + cat.img + ')' }"
        >
          <div>
            <h3 class="font-semibold">
              {{ cat.name }}
            </h3>
            <p class="mt-1 text-lg text-white">{{ cat.text }}</p>
          </div>
          <button type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Pretraži
          </button>
        </li>

      </ul>
    </div>

    <div class="w-full flex items-center justify-between px-20 mb-4">
      <h2 class="section-title">Izdavanje</h2>
      <div class="flex flex-row items-center">
        <nuxt-link class="more" to="/">Pogledaj više</nuxt-link>
        <div class="flex flex-row items-center mt-6">
          <div
            class="swiper-button-next rent swiper-button-white mx-4"
            slot="button-next"
          ></div>
          <div
            class="swiper-button-prev rent swiper-button-white"
            slot="button-prev"
          ></div>
        </div>
      </div>
    </div>
    <div class="max-w-full mx-20 mb-8">
      <client-only>
        <swiper class="swiper" :options="swiperOptionRent">
          <swiper-slide v-for="listing in listings" :key="listing.id">
            <ListingCard :listing="listing" :type="listing.user.user_type"/>
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
    <div class="w-full flex items-center justify-between px-20 mb-4">
      <h2 class="section-title">Izdavanje na dan</h2>
      <div class="flex flex-row items-center">
        <nuxt-link class="more" to="/">Pogledaj više</nuxt-link>
        <div class="flex flex-row items-center mt-6">
          <div
            class="swiper-button-next swiper-button-white mx-4"
            slot="button-next"
          ></div>
          <div
            class="swiper-button-prev swiper-button-white"
            slot="button-prev"
          ></div>
        </div>
      </div>
    </div>
    <div class="max-w-full mx-20 mb-8">
      <client-only>
        <swiper class="swiper" :options="swiperOptionRentPerDay">
          <swiper-slide v-for="listing in listings" :key="listing.id">
            <ListingCard :listing="listing" type="rent"/>
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
    <div class="w-full flex items-center justify-between px-20 mb-4">
      <h2 class="section-title">Agencije</h2>
      <nuxt-link class="more" to="/">Pogledaj više</nuxt-link>
    </div>
    <div class="px-20 flex flex-row overflow-x-scroll gap-4 mb-16">
      <UserCard v-for="i in 10" />
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

  @Component({
    components: {
      TextField,
      UserCard,
      Categories,
      ListingCard,
      PublishShortcut,
      MostVisitedCard,
      PremiumAgency
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',
    async asyncData(ctx) {
      let listings = []
      let agency_listings = []
      let meta = null
      let page = 1
      let agency_meta = null
      let agency_page = 1

      try {
        let res = await ctx.app.$axios.get('/listings/home')
        listings = res.data.data
        meta = res.data.meta
        page = 2
      } catch (e) {
        console.log(e)
      }

      try {
        let res = await ctx.app.$axios.get('/listings/agencies/home')
        agency_listings = res.data.data
        agency_meta = res.data.meta
        agency_page = 2
      } catch (e) {
        console.log(e)
      }

      return {
        listings,
        meta,
        page,
        agency_listings,
        agency_meta,
        agency_page
      }
    }
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
    quickSearchTab = 0;
    most_visited_cities = [
      {
        city: 'Sarajevo',
        img: '/sarajevo.jpeg'
      },
      {
        city: 'Neum',
        img: '/neum.jpeg'
      },
      {
        city: 'Mostar',
        img: '/mostar.jpeg'

      },
      {
        city: 'Banja Luka',
        img: '/banjaluka.jpeg'

      },
      {
        city: 'Bihać',
        img: '/sarajevo.jpeg'

      },
      {
        city: 'Tuzla',
        img: '/tuzla.jpeg'

      },
      {
        city: 'Zenica',
        img: '/sarajevo.jpeg'

      },
      {
        city: 'Travnik',
        img: '/sarajevo.jpeg'

      },
    ]
    most_visited_cats = [
      {
        name: 'Stanovi',
        img: '/flat.jpeg',
        text: 'Preko 2000 nekretnina'
      },
      {
        name: 'Kuće',
        img: '/house.jpg',
        text: 'Preko 2000 nekretnina'
      },
      {
        name: 'Garaže',
        img: '/garage.jpg',
        text: 'Preko 2000 nekretnina'
      },
      {
        name: 'Sobe',
        img: '/rooms.jpg',
        text: 'Preko 2000 nekretnina'
      },
      {
        name: 'Luksuzne nekretnine',
        img: '/luxury-villa.jpeg',
        text: 'Preko 2000 nekretnina'
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
      loop: false,
      autoplay: {
        delay: 500000,
      },
      slidesPerView: 6,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }

    swiperOptionRent = {
      spaceBetween: 16,
      // centeredSlides: true,
      // slidesOffsetBefore: '100px',
      // slidesOffsetAfter: '100px',
      // slidesOffsetBefore: '0px',
      loop: false,
      autoplay: {
        delay: 500000,
      },
      slidesPerView: 6,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      navigation: {
        nextEl: '.swiper-button-next .rent',
        prevEl: '.swiper-button-prev .rent'
      }
    }

    swiperOptionRentPerDay = {
      spaceBetween: 16,
      // centeredSlides: true,
      // slidesOffsetBefore: '100px',
      // slidesOffsetAfter: '100px',
      // slidesOffsetBefore: '0px',
      loop: false,
      autoplay: {
        delay: 500000,
      },
      slidesPerView: 6,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
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

        this.loading = false;
      } catch(e) {
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

    async created() {
      await this.fetchCategories()
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
    padding-bottom: 90px;
    padding: 0 12px;
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

    ::v-deep .most-visited-card {
      min-width: 280px;
      width: 280px;
    }
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
  padding: 12px 8px;
  height: fit-content;
  box-sizing: border-box;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 8px;
    border-radius: 8px;
    margin-right: 12px;
    height: 70px;
    min-width: 80px;
    padding: 12px;
    box-sizing: border-box;

    img {
      height: 25px;
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
    padding-bottom: 24px !important;
  }
}

::v-deep .swiper-pagination {
  bottom: 0px !important;
}

.flow-root {
  min-width: 590px;
  min-height: 262px;
  width: 590px;
  height: 262px;
  border-radius: 15px;
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
  padding-right: 80px;

  li {
    margin-left: 16px;
    &:first-child {
      margin-left: 80px;
    }
  }
}

ul.most-visited-cats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px;
  margin: 0 80px;

  .flow-root {
    min-width: 100%;
    min-height: 262px;
    width: 100%;
    max-height: 100%;
    height: 262px;
    border-radius: 15px;
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
}

.section-title {
  font-size: 22px !important;
  line-height: 26px !important;
  font-weight: 600 !important;
}

.more {
  font-weight: 500;
  text-decoration: underline;
  font-size: 14px;

}

.swiper {
  width: 100% !important;

  .swiper-wrapper {
    max-width: 1600px !important;
    margin: 0 80px !important;
  }

  .swiper-slide {
    width: fit-content !important;
  }
}
.swiper-button-prev, .swiper-button-next {
  position: static !important;
  color: #002F34 !important;
  height: 30px;
  max-height: 30px;
  width: 30px;
  border-radius: 15px;
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
  background-image: url("/luxuries.jpeg");
  background-repeat: no-repeat;
  height: 600px;
  background-size: cover;
  background-position: bottom;
  position: relative;

  .quick-search {
    position: absolute;
    left: 80px;
    right: 80px;
    bottom: -50px;
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 20px;
    border-radius: 15px;

    ul {
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 48px;

      li {
        height: 100%;
        padding: 0 24px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;

        &:first-child {
          border-top-left-radius: 15px;
          background: #fff;
        }

        &:last-child {
          border-top-right-radius: 15px;
          background: #fff;
        }
      }
    }

    .inputs {
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      border-top-right-radius: 15px;
      background: #fff;
      height: fit-content;
      padding: 24px;
      align-items: flex-end;

      > div {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-right: 24px;
        border-right: 1px solid #f1f1f1;
        padding-right: 24px;

        ::v-deep input {
          border: none;
          padding: 0;
        }

        ::v-deep .input-wrapper {
          border: none;
          padding: 0;
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
      height: 50px;
      width: 50px;
      min-width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      background: #0D1F3E;
      border-radius: 10px;
    }
  }
}

.quick-tab {
  display: flex;
  position: relative;

  &.active {
    color: #0D1F3E;

    &::after {
      position: absolute;
      content: '';
      height: 2px;
      width: 30px;
      left: auto;
      right: auto;
      background: #0D1F3E;
      bottom: 0;

    }
  }
}

</style>
