<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Moji upiti za rezervacije</p>
      </li>
    </ul>
    <div class="w-full mt-5">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="(booking, index) in bookings" class="p-4 sm:p-6 bg-white shadow-sm rounded-md">
          <div class="flex items-center sm:items-start">
            <div class="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40">
              <img :src="booking.listing.images.length > 0 ? booking.listing.images[0].url : '/noimage.jpeg'" alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." class="w-full h-full object-center object-cover">
            </div>
            <div class="flex-1 ml-6 text-sm">
              <div class="font-medium text-gray-900 sm:flex sm:justify-between">
                <h5 class="text-lg">
                  {{ booking.listing.title }}
                </h5>
                <p class="mt-2 sm:mt-0 text-lg font-semibold">
                  {{ booking.total_price }} KM
                </p>
              </div>
              <p class="text-gray-500 sm:block sm:mt-2">
                {{ booking.listing.description }}
              </p>
              <p class="text-gray-500 sm:block sm:mt-2">
                {{ booking.listing.address }}
              </p>
              <div
                v-for="(attr, index) in getSpecialAttributes(booking.listing)"
                :key="index"
                class="flex flex-row items-center mr-2"
              >
                <img v-if="attr.name === 'Broj soba'" src="/door.svg" alt="">
                <img v-if="attr.name === 'Sprat'" src="/stairs.svg" alt="">
                {{ attr.value }}
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
              <div class="flex-1 flex justify-center">
                <nuxt-link :to="`/artikal/${booking.listing.id}`" class="text-indigo-600 whitespace-nowrap hover:text-indigo-500">Pogledaj oglas</nuxt-link>
              </div>
              <div class="flex-1 pl-4 flex justify-center">
                <button class="text-indigo-600 whitespace-nowrap hover:text-indigo-500" @click="cancel(booking, index)">Poništi upit</button>
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

@Component({
  components: {
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
  middleware: ['auth'],
  async asyncData(ctx) {
    let bookings = [];

    try {
      let res = await ctx.$axios.get('/bookings');

      bookings = res.data.data;
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

.account-wrapper {
  width: auto;
  min-height: calc(100vh - 80px);

  @include for-phone-only {
    min-height: 100%;
  }
}

a {
  color: #023246;
}
</style>
