<template>
  <div class="preview-wrapper-inner">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Oglasi koje izdajem - upiti za rezervacije</p>
      </li>
    </ul>
    <div class="w-full mt-5">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="(booking, index) in bookings" class="p-4 sm:p-6 bg-white shadow-sm rounded-md">
          <div class="flex items-center sm:items-start inner">
            <div class="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40 listing">
              <img :src="booking.listing.images.length > 0 ? booking.listing.images[0].url : '/noimage.jpeg'" alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." class="w-full h-full object-center object-cover">
            </div>
            <div class="flex-1 ml-6 text-sm mr-5 listing-content">
              <div class="font-medium text-gray-900 flex-col sm:flex sm:justify-between">
                <h5 class="text-lg">
                  {{ booking.listing.title }}
                </h5>
                <p class="hidden text-gray-800 sm:block text-lg font-normal sm:mt-2 opis">
                  {{ booking.listing.description }}
                </p>
              </div>
              <p class="mt-2 sm:mt-0 text-lg font-semibold price">
                {{ booking.total_price }} KM za {{ booking.days }} noćenja
              </p>
            </div>
            <vc-date-picker :value="getDatesFromBooking(booking)" title-position="left" is-range/>

          </div>

          <div class="mt-6 sm:flex sm:justify-between">
            <div class="flex items-center">
              <!-- Heroicon name: solid/check-circle -->
              <svg class="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <p class="ml-2 text-md font-normal text-gray-800">Zahtjev za rezervaciju zaprimljen <time datetime="2021-07-12">{{ $moment(booking.created_at).format('DD.MM.YYYY') }}</time></p>
            </div>

            <div class="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
              <div v-if="! booking.confirmed" class="flex-1 flex justify-center">
                <button @click="confirm(booking)" class="text-indigo-600 whitespace-nowrap hover:text-indigo-500">Prihvati rezervaciju</button>
              </div>
              <div class="flex-1 pl-4 flex justify-center">
                <button @click="$router.push('/artikal/' + booking.id)" class="text-gray-800 whitespace-nowrap hover:text-gray-800">Idi na oglas</button>
              </div>
              <div class="flex-1 pl-4 flex justify-center">
                <button @click="cancel(booking, index)" class="text-gray-800 border border-gray-800 p-2 rounded-md flex flex-row items-center whitespace-nowrap hover:bg-gray-800 hover:text-white font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Poništi upit</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Snackbar from "@/components/global/Snackbar";
import ActionButton from "../../components/actionButtons/ActionButton";

@Component({
  components: {
    ActionButton,
    Snackbar
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
  middleware: ['auth'],
  async asyncData(ctx) {
    let bookings = [];

    try {
      let res = await ctx.$axios.get('/booking/requests');

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
  getDatesFromBooking(booking) {
    return {
      start: this.$moment(booking.starts_at).toDate(),
      end: this.$moment(booking.ends_at).toDate()
    }
  }

  async cancel(booking, index) {
    try {
      this.bookings.splice(index, 1);

      await this.$axios.delete('/bookings/' + booking.id);
    } catch (e) {
      console.log(e);
    }
  }

  async confirm(booking) {
    try {
      booking.confirmed = true;

      await this.$axios.post('/bookings/' + booking.id);

      this.$snackbar.show({
        text: "Uspješno ste prihvatili upit",
        timeout: 1000,
        type: "success"
      })
    } catch (e) {
      console.log(e)
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
.preview-wrapper-inner {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 4px;
  padding: 24px;
}

a {
  color: #1F2937;
}

.listing {
  height: 270px;
  width: 220px;
}

.listing-content {
  height: 270px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.price {
  height: 60px;
  width: fit-content;
  background: #f9f9f9;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  padding: 0 24px;
}

li {

  @include for-phone-only {
    margin: 16px;
  }
  .inner {
    @include for-phone-only {
      display: flex;
      flex-direction: column;
    }

    .listing {
      @include for-phone-only {
        height: 150px;
        width: 100%;
      }
    }

    .listing-content {
      @include for-phone-only {
        width: 100%;


        h5 {
          margin-top: 12px;
        }

        .price {
          width: 100%;
          justify-content: flex-start;
          margin-bottom: 16px
        }

      }
    }
  }
}

.opis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
