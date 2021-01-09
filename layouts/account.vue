<template>
  <div class="account-wrapper">
    <Navbar></Navbar>
    <div class="account-wrapper-inner">
      <div class="sidenav">
          <h2>Moj racun</h2>
          <ul>
            <li
              v-for="(tab, index) in tabs"
              :key="index"
            >
              <nuxt-link
                :to="{ path: '/moj-racun/' + tab.slug }"
              >
                {{ tab.name }}
              </nuxt-link>
            </li>
          </ul>
      </div>
      <div class="main-wrapper">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";

@Component({
  components: {Navbar}
})

export default class account extends Vue {

  tabs = [
    {
      name: "Uredi profil",
      slug: "uredi-profil",
    },
    {
      name: "Spaseno",
      slug: 'spaseno',
    },
    {
      name: "Pratioci/Pratim",
      slug: 'pratioci-pratim'
    },
    {
      name: "Poruke",
      slug: "poruke"
    },
    {
      name: "Moje nekretnine",
      slug: 'moje-nekretnine',
    },
    {
      name: "Blokirani korisnici",
      slug: "blokirani-korisnici",
    },
    {
      name: "Verifikacija",
      slug: "verifikacija"
    },
    {
      name: "Notifikacije",
      slug: "notifikacije",
    },
    {
      name: "Privatnost",
      slug: "privatnost"
    },
    {
      name: "Promjena šifre",
      slug: "promjena-sifre"
    },
  ]
}
</script>

<style lang="scss">
.account-wrapper {
  padding-top: 80px !important;
  overflow-y: hidden;

  .account-wrapper-inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: calc(100vh - 80px);

    .sidenav {
      display: flex;
      flex-direction: column;
      width: 350px;
      height: 100%;
      padding: 0 24px;
      margin: 24px 0;
      box-sizing: border-box;
      border-right: 1px solid #f1f1f1;

      h2 {
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 20px;
        margin-bottom: 36px;
      }

      ul {
        padding: 0;
        width: 100%;
        display: flex;
        flex-direction: column;

        li {
          display: flex;
          height: 40px;
          line-height: 40px;
          align-items: center;
          justify-content: flex-start;
          font-weight: 500;
        }
      }
    }

    .main-wrapper {
      width: 100%;
      padding: 24px;
      box-sizing: border-box;
      height: 100%;
    }
  }
}
</style>

