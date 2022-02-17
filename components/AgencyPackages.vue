<template>
  <div class="packages-wrapper">
    <!-- This example requires Tailwind CSS v2.0+ -->
<!--    <div class="rounded-md bg-yellow-50 p-4 mb-6">-->
<!--      <div class="flex">-->
<!--        <div class="flex-shrink-0">-->
<!--          &lt;!&ndash; Heroicon name: solid/exclamation &ndash;&gt;-->
<!--          <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
<!--            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />-->
<!--          </svg>-->
<!--        </div>-->
<!--        <div class="ml-3">-->
<!--          <h3 class="text-lg font-medium text-yellow-800">Pažnja</h3>-->
<!--          <div class="mt-2 text-lg text-yellow-700">-->
<!--            <p>Paketi, cijene i pogodnosti su pokaznog karaktera.</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <h3 class="text-2xl font-semibold mb-2.5">Prednosti agencije</h3>
    <div class="bg-white">
      <div class="max-w-2xl mx-auto lg:max-w-7xl">
        <div class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          <div>
            <img src="https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg" alt="" class="h-24 w-auto">
            <h3 class="mt-6 text-md font-semibold text-gray-900">Profesionalni izgled i konkuretne pozicije oglasa</h3>
            <p class="mt-2 text-sm text-gray-500">It&#039;s not actually free we just price it into the products. Someone&#039;s paying for it, and it&#039;s not us.</p>
          </div>

          <div>
            <img src="https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg" alt="" class="h-24 w-auto">
            <h3 class="mt-6 text-md font-semibold text-gray-900">Profesionalna podrška</h3>
            <p class="mt-2 text-sm text-gray-500">Our AI chat widget is powered by a naive series of if/else statements. Guaranteed to irritate.</p>
          </div>

          <div>
            <img src="https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg" alt="" class="h-24 w-auto">
            <h3 class="mt-6 text-md font-semibold text-gray-900">Popusti na plaćanja</h3>
            <p class="mt-2 text-sm text-gray-500">Look how fast that cart is going. What does this mean for the actual experience? I don&#039;t know.</p>
          </div>

          <div>
            <img src="https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg" alt="" class="h-24 w-auto">
            <h3 class="mt-6 text-md font-semibold text-gray-900">Poklon kartice sa kreditom</h3>
            <p class="mt-2 text-sm text-gray-500">Buy them for your friends, especially if they don&#039;t like our store. Free money for us, it&#039;s great.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <h3 class="text-2xl font-semibold mb-2.5 mt-12">Paketi i pogodnosti</h3>
    <div class="bg-white">
      <div class="paketi-wrap">
        <div class="space-y-4 mt-3 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          <div class="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 package-wrap" v-for="pkg in packages" :key="pkg.id">
            <div class="p-6 py-3">
              <h2 class="text-lg font-medium text-gray-900">{{ pkg.title }}</h2>
              <p class="mt-4 text-sm text-gray-500">{{ pkg.description }}</p>
              <p class="mt-8">
                <span class="text-4xl font-extrabold text-gray-900">{{ pkg.price + 'KM' }}</span>
                <span class="text-base font-medium text-gray-500">/ mjesečno</span>
              </p>
              <a href="#" class="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900">Kupi</a>
            </div>
            <div class="pt-6 pb-8 px-6">
              <h3 class="text-xs font-medium text-gray-900 tracking-wide uppercase">Šta paket uključuje</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li class="flex space-x-3" v-for="feature in pkg.features">
                  <!-- Heroicon name: solid/check -->
                  <svg class="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-500">{{ feature.description }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>



<!--    <a class="anchor" id="top"></a>-->
<!--    <legend class="text-lg font-medium text-gray-900 mt-8">Detaljne pogodnosti paketa</legend>-->

<!--    <table>-->
<!--      <tr>-->
<!--        <th>Pogodnosti</th>-->
<!--        <th>Basic</th>-->
<!--        <th>Advanced</th>-->
<!--        <th>Premium</th>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Količina kredita</td>-->
<!--        <td>Uskoro</td>-->
<!--        <td>Uskoro</td>-->
<!--        <td>Uskoro</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Limit oglasa</td>-->
<!--        <td>30</td>-->
<!--        <td>80</td>-->
<!--        <td>nema limita</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Broj agenata</td>-->
<!--        <td>3</td>-->
<!--        <td>8</td>-->
<!--        <td>nema limita</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Podrška 24h</td>-->
<!--        <td>Ne</td>-->
<!--        <td>Ne</td>-->
<!--        <td>Da</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Bulk objava oglasa</td>-->
<!--        <td>Ne</td>-->
<!--        <td>Ne</td>-->
<!--        <td>Da</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Baner na profilu</td>-->
<!--        <td>Ne</td>-->
<!--        <td>Da</td>-->
<!--        <td>Da</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Oglasi sa akcijom na naslovnici</td>-->
<!--        <td>Ne</td>-->
<!--        <td>Da</td>-->
<!--        <td>Da</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>PDF lista svih oglasa</td>-->
<!--        <td>Ne</td>-->
<!--        <td>Da</td>-->
<!--        <td>Da</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Logotip agencije na kartici oglasa</td>-->
<!--        <td>Ne</td>-->
<!--        <td>Da</td>-->
<!--        <td>Da</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Popust na oglašavanje</td>-->
<!--        <td>10%</td>-->
<!--        <td>15%</td>-->
<!--        <td>20%</td>-->
<!--      </tr>-->
<!--    </table>-->
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import Package from "@/components/package";

@Component({
  components: {
    Package
  },
})

export default class Paketi extends Vue{
  packages = []
  selectedPackage = null;

  async created() {
    await this.fetchAgencyPackages();
  }
  async fetchAgencyPackages() {
    try {
      let res = await this.$axios.get('/packages');

      this.packages = res.data.data;
    } catch(e) {
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
.packages-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .warning {
    background: #eb626e !important;
    padding: 12px;
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
    margin-bottom: 24px;

    p {
      color: #fff;
      font-size: 17px;
      line-height: 25px;
    }
  }

  .packages {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;

    a {
      width: 100%;
      margin-right: 24px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
  table {
    font-family: 'NunitoSans', sans-serif;;
    border-collapse: collapse;
    width: 100%;
    margin-top: 24px;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
    overflow: hidden;
    max-width: 100%;
    overflow-x: scroll;
  }

  td, th {
    border-bottom: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr {
    height: 50px;

    td, th {
      line-height: 30px;
    }
  }

  #prices {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .price-box {
      width: 100%;
      background: #1B1E31;
      color: #fff;
      margin-right: 24px;
      border-radius: 6px;
      overflow: hidden;

      &:hover {
        cursor: pointer;
      }

      &:last-child {
        margin-right: 0;
        background: #D63946;
      }

      .package-header {
        padding: 24px;
        color: #fff;
        font-family: 'NunitoSans', sans-serif;;

        > div {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: center;

          .value {
            font-size: 25px;
            font-weight: 600;
          }

          b {
            font-size: 70px;
            font-weight: 600;
            line-height: 50px;
          }

          .charge {
            font-size: 25px;
            font-weight: 400;
          }
        }

        .pdv {
          font-size: 15px;
          font-weight: 400;
        }
      }
    }
  }
}

.anchor {
  display: block;
  position: relative;
  top: -100px;
  visibility: hidden;
}
.package-wrap {
  border: 1px solid #f1f1f1;
}

.paketi-wrap {
  width: 1280px;
  margin: 0 auto;

  @include for-phone-only {
    width: 100%;
  }
}
</style>
