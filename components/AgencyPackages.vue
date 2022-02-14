<template>
  <div class="packages-wrapper">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="rounded-md bg-yellow-50 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <!-- Heroicon name: solid/exclamation -->
          <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-lg font-medium text-yellow-800">Pažnja</h3>
          <div class="mt-2 text-lg text-yellow-700">
            <p>Paketi su besplatni u testnoj fazi, prednosti su okvirne, moguće su dodatne izmjene u daljem razvoju.</p>
          </div>
        </div>
      </div>
    </div>
    <fieldset>
      <legend class="text-lg font-medium text-gray-900">Izaberite paket</legend>

      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        <!--
          Checked: "border-transparent", Not Checked: "border-gray-300"
          Active: "ring-2 ring-indigo-500"
        -->
        <label v-for="(pkg, index) in packages" class="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none">
          <input type="radio" name="project-type" value="Newsletter" class="sr-only" aria-labelledby="project-type-0-label" aria-describedby="project-type-0-description-0 project-type-0-description-1">
          <div class="flex-1 flex">
            <div class="flex flex-col">
              <span id="project-type-0-label" class="block text-lg font-semibold text-gray-900"> {{ pkg.title }} </span>
              <span id="project-type-0-description-0" class="mt-3 flex items-center text-md text-gray-500"> {{ pkg.features['bonus'] + ' više kredita' }}</span>
              <span id="project-type-0-description-1" class="mt-5 text-lg font-bold text-gray-900"> {{ pkg.price + 'KM / mjesečno' }} </span>
            </div>
          </div>
          <!--
            Not Checked: "invisible"

            Heroicon name: solid/check-circle
          -->
          <svg class="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <!--
            Active: "border", Not Active: "border-2"
            Checked: "border-indigo-500", Not Checked: "border-transparent"
          -->
          <div class="absolute -inset-px rounded-lg border-2 pointer-events-none" aria-hidden="true"></div>
        </label>

      </div>
    </fieldset>

    <a class="anchor" id="top"></a>
    <legend class="text-lg font-medium text-gray-900 mt-8">Detaljne pogodnosti paketa</legend>

    <table>
      <tr>
        <th>Pogodnosti</th>
        <th>Basic</th>
        <th>Advanced</th>
        <th>Premium</th>
      </tr>
      <tr>
        <td>Broj kredita</td>
        <td>Uskoro</td>
        <td>Uskoro</td>
        <td>Uskoro</td>
      </tr>
      <tr>
        <td>Limit oglasa</td>
        <td>30</td>
        <td>80</td>
        <td>nema limita</td>
      </tr>
      <tr>
        <td>Broj agenata</td>
        <td>3</td>
        <td>8</td>
        <td>nema limita</td>
      </tr>
      <tr>
        <td>Podrška 24h</td>
        <td>Ne</td>
        <td>Ne</td>
        <td>Da</td>
      </tr>
      <tr>
        <td>Bulk objava oglasa</td>
        <td>Ne</td>
        <td>Ne</td>
        <td>Da</td>
      </tr>
      <tr>
        <td>Baner na profilu</td>
        <td>Ne</td>
        <td>Da</td>
        <td>Da</td>
      </tr>
      <tr>
        <td>Oglasi sa akcijom na naslovnici</td>
        <td>Ne</td>
        <td>Da</td>
        <td>Da</td>
      </tr>
      <tr>
        <td>PDF lista svih oglasa</td>
        <td>Ne</td>
        <td>Da</td>
        <td>Da</td>
      </tr>
      <tr>
        <td>Popust na oglašavanje</td>
        <td>10%</td>
        <td>15%</td>
        <td>20%</td>
      </tr>
    </table>
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
  packages = [
    {
      title: 'Basic',
      price: '59',
      description: 'test',
      features: {
        limit: 30,
        sponsored_agency_card_on_homepage: false,
        number_of_agents: 3,
        support_24h: false,
        bulk_upload: false,
        agency_banner_on_profile: true,
        bonus: '20%',
        listings_with_discount_on_homepage: false,
        pdf_list_of_articles: false,
        discount_on_banners: '10%'
      }
    },
    {
      title: 'Advanced',
      price: '139',
      description: 'test',
      features: {
        limit: 80,
        sponsored_agency_card_on_homepage: true,
        number_of_agents: 8,
        support_24h: false,
        bulk_upload: false,
        agency_banner_on_profile: true,
        bonus: '25%',
        listings_with_discount_on_homepage: true,
        pdf_list_of_articles: true,
        discount_on_banners: '15%'
      }
    },
    {
      title: 'Premium',
      price: '319',
      description: 'test',
      features: {
        limit: 'beskonacno',
        sponsored_agency_card_on_homepage: true,
        number_of_agents: 'beskonacno',
        support_24h: true,
        bulk_upload: true,
        agency_banner_on_profile: true,
        bonus: '30%',
        listings_with_discount_on_homepage: true,
        pdf_list_of_articles: true,
        discount_on_banners: '20%'
      }
    },
  ]
  selectedPackage = null;
}
</script>

<style scoped lang="scss">
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

  h2 {
    margin-top: 48px;
    font-size: 18px;
    font-weight: 500;
    border-top: 1px solid #ebebeb;
    padding-top: 48px;
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
</style>
