<template>
  <div class="account-wrapper">
    <Navbar></Navbar>
    <div class="account-wrapper-inner">
      <div class="sidenav">
          <h1 class="heading">Postavke</h1>
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
      name: "Spašeno",
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
  padding-top: 70px !important;
  height: calc(100vh - 70px);
  background: #fafafa;

  .account-wrapper-inner {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 1280px;
    margin: 0 auto;
    padding: 24px;
    box-sizing: border-box;

    .sidenav {
      display: flex;
      flex: 2;
      background: #fff;
      padding: 24px;
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.06);
      flex-direction: column;

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
      display: flex;
      flex: 8;
      padding: 24px;
      background: #fff;
      margin-left: 24px;
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.06);
      position: relative;
    }
  }
}

.heading {
  font-size: 20px;
  font-weight: 500;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 24px;
  margin-bottom: 36px;
  width: 100%;
}

a {
  transition: 0.3s all ease;
}

.nuxt-link-exact-active.nuxt-link-active {
  font-weight: 600 !important;
  color: #012F34 !important;
  background: #f1f1f1;
  padding-left: 12px;
  border-radius: 5px;
  width: 100%;
}
</style>

