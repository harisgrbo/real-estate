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
          <div class="flex items-center sm:items-start">
            <div class="flex-shrink-0 h-25 bg-gray-200 rounded-lg overflow-hidden main-image-wrap">
              <img :src="booking.listing.images.length > 0 ? booking.listing.images[0].url : '/noimage.jpeg'" alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." class="w-full h-full">
            </div>
            <div class="flex-1 ml-6 text-sm w-full">
              <div class="font-medium text-gray-900 sm:flex sm:justify-between">
                <h5 class="text-lg">
                  {{ booking.listing.title }} - {{ booking.confirmed ? 'Prihvaćeno' : 'Čeka se potvrda' }}
                </h5>
                <p class="mt-2 sm:mt-0 text-lg font-medium">
                  {{ booking.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} KM za {{ booking.days }} dana
                </p>
              </div>
              <p class="text-gray-900 sm:block sm:mt-2 opis">
                {{ booking.listing.description }}
              </p>
              <p class="text-gray-900 sm:block sm:mt-2">
                {{ booking.listing.address }}
              </p>
              <div class="w-full mt-4 flex items-center justify-start special">
                <div
                  v-for="(attr, index) in getSpecialAttributes(booking.listing)"
                  :key="index"
                  class="flex flex-row items-center mr-4 bg-gray-100 rounded-full p-2 px-4"
                >
                  <img v-if="attr.name === 'Broj soba'" src="/door.svg" alt="">
                  <img v-if="attr.name === 'Sprat'" src="/stairs.svg" alt="">
                  <p class="pl-2 font-semibold">{{ attr.value }}</p>
                </div>
              </div>

            </div>
          </div>

          <div class="mt-6 sm:flex sm:justify-between">
            <div class="flex items-center">
              <!-- Heroicon name: solid/check-circle -->
              <svg class="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <p class="ml-2 text-sm font-medium text-gray-500">Poslali ste ponudu <time datetime="2021-07-12">{{ $moment(booking.created_at).format('DD.MM.YYYY') }}</time></p>
            </div>

            <div class="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
              <div class="min-w-min flex justify-center">
                <nuxt-link :to="`/artikal/${booking.listing.id}`" class="whitespace-nowrap hover:text-gray-800 hover:bg-gray-50 py-4 px-4">Pogledaj oglas</nuxt-link>
              </div>
              <div class="flex-1 pl-4 flex justify-center">
                <ActionButton placeholder="Poništi upit" :style-options="{ minWidth: 'fit-content'}" @action="cancel(booking, index)"></ActionButton>
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
    "Sprat"
  ];

  getSpecialAttributes(listing) {
    if (! listing.attributes) return [];
    return listing.attributes.filter((item) => {
      return this.specialAttributesKeys.indexOf(item.name) !== -1;
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
  font-size: 17px;
  margin: 16px 0;
  -webkit-box-orient: vertical;
}

.main-image-wrap {
  width: 30%;
  height: 180px;
  border-radius: 4px;

  img {
    width: 100%;
    object-fit: cover !important;
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
    }

    @include for-phone-only {
      border: none;
      padding: 0;
      background: transparent;

    }
  }

  a {
    &:hover {
      color: #012F34 !important;
      text-decoration: underline !important;
    }
  }
}
</style>
