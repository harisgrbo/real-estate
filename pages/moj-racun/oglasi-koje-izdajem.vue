<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Oglasi koje izdajem - upiti za rezervacije</p>
      </li>
    </ul>
    <div class="w-full mt-5">
      <ul role="list" class="divide-y divide-gray-200">
        <li class="p-4 sm:p-6 bg-white shadow-sm rounded-md">
          <div class="flex items-center sm:items-start">
            <div class="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40 listing">
              <img src="https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg" alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." class="w-full h-full object-center object-cover">
            </div>
            <div class="flex-1 ml-6 text-sm mr-5 listing-content">
              <div class="font-medium text-gray-900 flex-col sm:flex sm:justify-between">
                <h5 class="text-lg">
                  Micro Backpack
                </h5>
                <p class="hidden text-gray-500 sm:block sm:mt-2">
                  Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.
                </p>
              </div>
              <p class="mt-2 sm:mt-0 text-lg font-semibold price">
                $70.00
              </p>
            </div>
            <vc-calendar title-position="left" />

          </div>

          <div class="mt-6 sm:flex sm:justify-between">
            <div class="flex items-center">
              <!-- Heroicon name: solid/check-circle -->
              <svg class="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <p class="ml-2 text-sm font-medium text-gray-500">Zahtjev za rezervaciju zaprimljen <time datetime="2021-07-12">July 12, 2021</time></p>
            </div>

            <div class="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
              <div class="flex-1 flex justify-center">
                <a href="#" class="text-indigo-600 whitespace-nowrap hover:text-indigo-500">Prihvati rezervaciju</a>
              </div>
              <div class="flex-1 pl-4 flex justify-center">
                <a href="#" class="text-indigo-600 whitespace-nowrap hover:text-indigo-500">Poništi upit</a>
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
})

export default class mojeRezervacije extends Vue {
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
</style>