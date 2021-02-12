<template>
  <div class="account-wrapper-a">
    <Navbar></Navbar>
    <div class="account-wrapper-inner">
      <div class="sidenav">
        <h1 class="heading-account">Moj račun</h1>
        <div class="info">
          <p>{{ $auth.user.data.name }},</p>
          <p>{{ $auth.user.data.email }}</p>
          <nuxt-link :to="/users/ + $auth.user.data.id">Idi na profil</nuxt-link>
        </div>
        <ul>
          <li
            v-for="(tab, index) in tabs"
            :key="index"
          >
            <nuxt-link
              :to="{ path: '/moj-racun/' + tab.slug }"

            >
              <img :src="'/settings/' + tab.icon" alt="">
              <h4>{{ tab.name }}</h4>
              <p>
                {{ tab.desc }}
              </p>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";

@Component({
  components: { Navbar }
})

export default class accountpage extends Vue {

  tabs = [
    {
      name: "Uredi profil",
      slug: "uredi-profil",
      icon: "010-technical-support.svg",
      desc: 'Uređivanje ličnih podataka'
    },
    {
      name: "Spašeno",
      slug: 'spaseno',
      icon: '013-help.svg',
      desc: 'Spašeni korisnici, pretrage i oglasi'
    },
    {
      name: "Pratioci/Pratim",
      slug: 'pratioci-pratim',
      icon: '034-rating-2.svg',
      desc: 'Lista korisnika koje pratite i koji Vas prate'
    },
    {
      name: "Poruke",
      slug: "poruke",
      icon: '023-conversation.svg',
      desc: 'Poruke i konverzacije'
    },
    {
      name: "Moji oglasi",
      slug: 'moji-oglasi',
      icon: '016-toolbox.svg',
      desc: 'Lista Vaših objavljenih oglasa'
    },
    {
      name: "Blokirani korisnici",
      slug: "blokirani-korisnici",
      icon: '033-laptop-5.svg',
      desc: 'Lista blokiranih korisnika'
    },
    {
      name: "Verifikacija",
      slug: "verifikacija",
      icon: '004-server.svg',
      desc: 'Verifikacija email-a i broja telefona'
    },
    {
      name: "Obavijesti",
      slug: "notifikacije",
      icon: '049-laptop.svg',
      desc: 'Upravljanje obavijestima'
    },
    {
      name: "Privatnost",
      slug: "privatnost",
      icon: '025-laptop-6.svg',
      desc: 'Postavke privatnosti'
    },
    {
      name: "Promjena šifre",
      slug: "promjena-sifre",
      icon: '043-settings.svg',
      desc: 'Promjena trenutne šifre'
    },
  ]
}
</script>

<style lang="scss">
.account-wrapper-a {
  padding-top: 70px !important;
  height: calc(100vh - 70px);

  .account-wrapper-inner {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;

    .sidenav {
      display: flex;
      flex: 2;
      background: #fff;
      padding: 24px;
      box-sizing: border-box;
      border-radius: 10px;
      flex-direction: column;

      .info {
        display: flex;
        align-items: center;
        height: 60px;
        justify-content: flex-start;
        margin-bottom: 32px;
        p {
          margin-right: 12px;

          &:first-child {
            font-weight: 600;
          }
        }

        a {
          &:hover {
            text-decoration: underline;
          }
        }
      }

      .heading-account {
        overflow-wrap: break-word !important;
        //font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
        font-size: 32px !important;
        font-weight: 600 !important;
        line-height: 1.125em !important;
        color: rgb(72, 72, 72) !important;
        margin-top: 39px;
      }

      h2 {
        //font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 20px;
        margin-bottom: 36px;
      }

      ul {
        padding: 0;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 12px;
        row-gap: 12px;

        li {
          display: flex;
          height: fit-content;
          padding: 24px;
          line-height: 40px;
          font-weight: 400;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 8px !important;
          border-radius: 8px;
          box-sizing: border-box;
          cursor: pointer;

          a {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
          }

          img {
            height: 50px;
          }

          h4 {
            font-size: 18px;
            color:rgb(72, 72, 72) !important;
            margin-top: 12px;
            font-weight: 600;
          }

          p {
            font-size: 17px;
            font-weight: 300;
            line-height: 1.375em !important;
            height: 50px;
            color:rgb(72, 72, 72) !important;
          }
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
      position: relative;
      height: calc(100vh - 117px);
      overflow: scroll;
    }
  }
}

.heading {
  word-wrap: break-word !important;
  font-size: 32px !important;
  font-weight: 600 !important;
  line-height: 1.125em !important;
  color: #484848 !important;
  margin-bottom: 36px !important;
}

a {
  transition: 0.3s all ease;
  color: #9BAABD;
}

.icon {
  margin-right: 12px;
  font-size: 18px;
  color: #9BAABD;
}



</style>

