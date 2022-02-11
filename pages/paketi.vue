<template>
  <div class="packages-wrapper">
    <div class="warning">
      <p>Kako biste finalizirali registraciju agencije i imali sve pogodnosti odaberite jedan od ponuđenih paketa, do tada se Vaš profil tretira kao obično korisnik.</p>
    </div>
    <div class="packages">
      <a href="#top" v-for="pkg in packages" :key="pkg.id">
        <Package :package-type="pkg.package_type" :price="pkg.price"></Package>
      </a>
    </div>
    <a class="anchor" id="top"></a>
    <h2>Izaberite nacin pretplate</h2>

    <div id="prices">
      <div class="price-box">
        <div class="package-header">
          <div>
            <b>1</b>
            <p class="value">MJESEC</p>
          </div>
          <p class="pdv">sa PDV-om</p>
        </div>
      </div>
      <div class="price-box">
        <div class="package-header">
          <div>
            <b>3</b>
            <p class="value">MJESECA</p>
          </div>
          <p class="pdv">sa PDV-om</p>
        </div>
      </div>
      <div class="price-box">
        <div class="package-header">
          <div>
            <b>6</b>
            <p class="value">MJESECI</p>
          </div>
          <p class="pdv">sa PDV-om</p>
        </div>
      </div>
      <div class="price-box">
        <div class="package-header">
          <div>
            <b>9</b>
            <p class="value">MJESECI</p>
          </div>
          <p class="pdv">sa PDV-om</p>
        </div>
      </div>
    </div>
    <h2>Detaljne karakteristike paketa</h2>

    <table>
      <tr>
        <th>Pogodnosti</th>
        <th>Fizicko lice</th>
        <th>Silver</th>
        <th>Gold</th>
        <th>Platinum</th>
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
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',
})

export default class Paketi extends Vue{
  packages = [
    {
      package_type: 'Silver',
      price: '50'
    },
    {
      package_type: 'Gold',
      price: '100'
    },
    {
      package_type: 'Premium',
      price: '150'
    }
  ]
}
</script>

<style scoped lang="scss">
.packages-wrapper {
  width: 100%;
  padding: 36px 280px;
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
