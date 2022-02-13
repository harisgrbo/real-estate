<template>
  <div class="packages-wrapper">
    <!-- This example requires Tailwind CSS v2.0+ -->
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
              <span id="project-type-0-label" class="block text-lg font-semibold text-gray-900"> {{ pkg.package_type }} </span>
              <span id="project-type-0-description-0" class="mt-3 flex items-center text-md text-gray-500"> {{ pkg.bonus }}</span>
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
        <th>Fizičko lice</th>
        <th>Basic</th>
        <th>Advanced</th>
        <th>Premium</th>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Ernst Handel</td>
        <td>Roland Mendel</td>
        <td>Austria</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Island Trading</td>
        <td>Helen Bennett</td>
        <td>UK</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Laughing Bacchus Winecellars</td>
        <td>Yoshi Tannamuri</td>
        <td>Canada</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Magazzini Alimentari Riuniti</td>
        <td>Giovanni Rovelli</td>
        <td>Italy</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Magazzini Alimentari Riuniti</td>
        <td>Giovanni Rovelli</td>
        <td>Italy</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Magazzini Alimentari Riuniti</td>
        <td>Giovanni Rovelli</td>
        <td>Italy</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Magazzini Alimentari Riuniti</td>
        <td>Giovanni Rovelli</td>
        <td>Italy</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Magazzini Alimentari Riuniti</td>
        <td>Giovanni Rovelli</td>
        <td>Italy</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Magazzini Alimentari Riuniti</td>
        <td>Giovanni Rovelli</td>
        <td>Italy</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Magazzini Alimentari Riuniti</td>
        <td>Giovanni Rovelli</td>
        <td>Italy</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Magazzini Alimentari Riuniti</td>
        <td>Giovanni Rovelli</td>
        <td>Italy</td>
        <td>Germany</td>
        <td>Germany</td>
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
      package_type: 'Basic',
      price: '50',
      bonus: '20% više sredstava na računu'
    },
    {
      package_type: 'Advanced',
      price: '120',
      bonus: '30% više sredstava na računu'
    },
    {
      package_type: 'Premium',
      price: '300',
      bonus: '50% više sredstava na računu'
    }
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
