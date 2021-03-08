<template>
  <div class="account-wrapper-a">
    <Navbar></Navbar>
    <div class="account-wrapper-inner">
      <div class="sidenav">
        <h1 class="heading-account">Moj račun</h1>
        <div class="info" v-if="$auth.user">
          <p>{{ $auth.user.name }},</p>
          <p>{{ $auth.user.email }}</p>
          <nuxt-link :to="$auth.user.user_type === 'agency' ? '/agency/' + $auth.user.id : '/users/' + this.$auth.user.id">Idi na profil</nuxt-link>
        </div>
        <ul>
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            :class="[ tab.slug === 'dashboard'? 'dashboard-class' : '' ]"
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
      name: "Dashboard",
      slug: "dashboard/analitika",
      icon: "014-browser-6.svg",
      desc: 'Uređivanje postavki agencije'
    },
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
      icon: '012-email.svg',
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
      name: "Statistika",
      slug: "statistika",
      icon: '014-browser-6.svg',
      desc: 'Statistika Vaše agencije i oglasa'
    },
  ]
}


</script>

<style lang="scss" scoped>

@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.account-wrapper-a {
  padding-top: 126px !important;
  height: calc(100vh - 126px);

  @include for-phone-only {
    padding-top: 78px !important;
    height: calc(100vh - 78px);
  }

  .account-wrapper-inner {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;

    @include for-phone-only {
      width: 100%;
    }

    .sidenav {
      display: flex;
      flex: 2;
      background: #fff;
      padding: 24px;
      box-sizing: border-box;
      border-radius: 10px;
      flex-direction: column;

      @include for-phone-only {
        padding: 12px;
      }


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
          color: #D63946;
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

        @include for-phone-only {
          grid-template-columns: repeat(2, 1fr);
        }

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

          @include for-phone-only {
            padding: 12px;
          }

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

            @include for-phone-only {
              font-size: 16px;
              font-weight: 600;
              margin-top: 0;
            }
          }

          p {
            font-size: 17px;
            font-weight: 300;
            line-height: 1.375em !important;
            height: 50px;
            color:rgb(72, 72, 72) !important;

            @include for-phone-only {
              font-size: 14px;
            }
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

a {
  transition: 0.3s all ease;
  color: #9BAABD;
}

.icon {
  margin-right: 12px;
  font-size: 18px;
  color: #9BAABD;
}

.dashboard-class {
  background: #F7F9FF;
}

</style>

