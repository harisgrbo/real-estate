<template>
  <div class="preview-wrapper-inner">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <p>Moji upiti za rezervacije</p>
      </li>
    </ul>
    <div class="w-full mt-5">
      <ul role="list" class="divide-y orders divide-gray-200">
        <li v-for="(booking, index) in bookings" :key="index" class="bg-white rounded-md">
          <div class="flex items-center sm:items-start mobile-box">
            <img :src="booking.listing.images.length > 0 ? booking.listing.images[0].url : '/noimage.jpeg'" class="main" alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.">
            <div class="flex-1 sm:ml-0 xl:ml-6 lg:ml-6 up:ml-6 text-sm w-full">
              <div class="font-medium text-gray-900 sm:flex sm:justify-between">
                <div class="flex flex-col items-start justify-start">
                  <h5 class="text-md">
                    {{ booking.listing.title }} -
                  </h5>
                  <span class="approval">{{ booking.confirmed ? 'Prihvaćeno' : 'Čeka se potvrda' }}</span>
                </div>
                <p class="mt-2 sm:mt-0 text-lg font-medium">
                  {{ booking.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} KM za {{ booking.days }} dana
                </p>
              </div>
              <p class="text-gray-900 sm:block opis">
                {{ booking.listing.address }}
              </p>
              <div class="text-gray-900 sm:block sm:mt-2 opis" v-html="booking.listing.description">
              </div>
              <div class="w-full mt-4 flex items-center justify-start special">
                <div
                  v-for="(attr, index) in getSpecialAttributes(booking.listing)"
                  :key="index"
                  class="flex flex-row items-center mr-4 bg-gray-100 rounded-full p-2 px-4"
                >
                  <img v-if="attr.name === 'Broj soba'" src="/door.svg" alt="">
                  <img v-if="attr.name === 'Sprat'" src="/stairs.svg" alt="">
                  <img v-if="attr.name === 'Broj kreveta'" src="/bed.svg" alt="">
                  <p class="pl-2 font-medium">{{ attr.value }}</p>
                  <p v-if="attr.name === 'Kvadratura'">
                    m²
                  </p>
                </div>
              </div>
              <div v-if="RentSpecialAttributes.length && listing.listing_type.shortname !== 'sell'">
                <h2 class="text-xl font-medium text-gray-900 mx-5 mb-8 lg:mx-0 xl:mx-0 up:mx-0">
                  Izdvojene pogodnosti
                </h2>
                <ul role="list" class="mt-3 mobile-grid ammenities">
                  <li  v-for="(attr, index) in getRentSpecialAttributes(booking.listing.attributes)"
                       :key="index"
                       class="col-span-1 flex shadow-sm rounded-md">
                    <img :src="'/' + attr.name + '.png'" alt="">
                    <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                      <div class="flex-1 px-4 py-2 text-sm truncate flex flex-row items-center justify-between">
                        <a class="text-gray-900 font-semibold hover:text-gray-700">{{ attr.name }}</a>
                        <p class="text-gray-500" v-if="typeof (attr.value) !== 'boolean'">{{ typeof (attr.value) === 'boolean' ? '' : attr.value }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mt-6 sm:flex sm:justify-between">
                <div class="flex items-center">
                  <!-- Heroicon name: solid/check-circle -->
                  <svg class="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <p class="ml-2 text-sm font-medium text-gray-500">Poslali ste ponudu <time datetime="2021-07-12">{{ $moment(booking.created_at).format('DD.MM.YYYY') }}</time></p>
                </div>

                <div class="mt-6 border-t border-gray-200 pt-4 flex items-center flex justify-between space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                  <div class="min-w-min flex justify-center">
                    <nuxt-link :to="`/artikal/${booking.listing.id}`" class="whitespace-nowrap hover:text-gray-800 hover:bg-gray-50 py-4 px-4">Pogledaj oglas</nuxt-link>
                  </div>
                  <div class="flex-1 pl-4 flex justify-end">
                    <ActionButton placeholder="Poništi upit" :style-options="{ minWidth: 'fit-content'}" @action="cancel(booking, index)"></ActionButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ActionButton from "../../components/actionButtons/ActionButton";

@Component({
  components: {
    ActionButton
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
  middleware: ['auth'],
  async asyncData(ctx) {
    let bookings = [];

    try {
      let res = await ctx.$axios.get('/bookings');

      bookings = res.data.data;
      console.log(bookings, 'test')
    } catch (e) {
      console.log(e);
    }

    return {
      bookings
    }
  }
})
export default class mojeRezervacije extends Vue {
  specialAttributesKeys = [
    "Broj soba",
    "Sprat",
    "Kvadratura",
    "Broj kreveta"
  ];
  RentSpecialAttributes = []
  RentSpecialAttributesKeys = [
    "Klima",
    "Wifi",
    "Broj kreveta",
    "Pegla",
    "Ves masina",
    "Kuhinja",
    "Fen"
  ];

  getSpecialAttributes(listing) {
    if (! listing.attributes) return [];
    return listing.attributes.filter((item) => {
      return this.specialAttributesKeys.indexOf(item.name) !== -1;
    });
  }

  getRentSpecialAttributes(listing) {
    if (!this.listing.attributes) return [];
    return listing.attributes.filter((item) => {
      return this.RentSpecialAttributesKeys.indexOf(item.name) !== -1;
    });
  }


  async cancel(booking, index) {
    try {
      this.bookings.splice(index, 1);

      await this.$axios.delete('/bookings/' + booking.id);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

ul.orders li {
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 16px;
  margin-bottom: 16px;

  .main {
    height: 200px;
    width: 240px;

    @include for-phone-only {
      width: 100%;
      height: 200px;
      margin-bottom: 24px;
    }
  }
}

.preview-wrapper-inner {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 4px;
  padding: 24px;

  h5 {
    font-size: 20px;
    font-weight: 300;
  }

  span {
    background: #1F2937;
    color: #fff;
  }
}

a {
  color: #1F2937;
}

.opis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  font-weight: 200;
  font-size: 15px;
  margin: 16px 0;
  -webkit-box-orient: vertical;
}

.main-image-wrap {
  width: 30%;
  height: 180px;
  border-radius: 4px;

  img {
    width: 180px;
    object-fit: cover !important;

    @include for-phone-only {
      width: 100%;
    }
  }
}

.special {
  div {
    border: 1px solid #ececec;
    border-radius: 4px;
    height: 25px;
    width: fit-content;
    margin-right: 8px;
    padding: 0 4px;
    font-weight: 300 !important;
    background: #f9f9f9;
    font-size: 13px;
    line-height: 8px;
    color: #000;

    img {
      height: 14px;
      max-width: fit-content !important;
      max-width: 15px;
      min-width: 15px;
    }

    @include for-phone-only {
      border: none;
      padding: 0;
      background: transparent;

    }
  }

  a {
    &:hover {
      color: #1F2937 !important;
      text-decoration: underline !important;
    }
  }
}

.mobile-box {
  @include for-phone-only {
    display: flex;
    flex-direction: column;
  }
}

.approval {
  @include for-phone-only {
    margin-top: 12px;
    padding: 0 12px;
    border-radius: 4px;
  }
}
</style>
