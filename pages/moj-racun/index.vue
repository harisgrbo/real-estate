<template>
  <div class="account-wrapper-a">
    <div class="account-wrapper-inner">
      <div class="sidenav">
        <h1 class="heading-account">Moj račun</h1>
        <div class="info">
          <p>{{ $auth.user.name }},</p>
          <p v-if="!$device.isMobile">{{ $auth.user.email }}</p>
          <nuxt-link :to="$auth.user.user_type === 'agency' ? '/agency/' + $auth.user.id : '/users/' + this.$auth.user.id">Idi na profil</nuxt-link>
        </div>
        <div class="grid grid-cols-4 gap-6 pb-1">
          <div  v-for="(tab, index) in tabs"
                :key="index" class="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 rounded-md">
            <div>
            <span class="flex items-start justify-start">
              <!-- Heroicon name: outline/clock -->
               <img class="max-h-12" :src="'/settings/' + tab.icon" alt="">
            </span>
            </div>
            <div class="mt-8">
              <h3 class="text-lg font-medium">
                <nuxt-link :to="{ path: '/moj-racun/' + tab.slug }"
                           class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  {{ tab.name }}
                </nuxt-link>
              </h3>
              <p class="mt-2 text-sm text-gray-700">
                {{
                  tab.desc
                }}
              </p>
            </div>
            <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
})

export default class accountpage extends Vue {

  tabs = [
    {
      name: "Dashboard",
      slug: "dashboard/analitika",
      icon: "014-browser-6.svg",
      desc: 'Glavni dashboard, statistika oglasa, agenti za nekretnine'
    },
    {
      name: "Uredi profil",
      slug: "uredi-profil",
      icon: "010-technical-support.svg",
      desc: 'Uređivanje ličnih podataka i promjena avatara'
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
  height: 100%;

  .account-wrapper-inner {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: auto;
    margin: 0 80px;
    box-sizing: border-box;

    @include for-phone-only {
      width: 100%;
      padding-bottom: 70px;
    }

    .sidenav {
      display: flex;
      flex: 2;
      box-sizing: border-box;
      border-radius: 10px;
      flex-direction: column;
      padding-top: 36px;

      @include for-phone-only {
        padding: 16px;
      }


      .info {
        display: flex;
        align-items: center;
        height: 60px;
        justify-content: flex-start;
        margin-bottom: 32px;

        @include for-phone-only {
          margin-bottom: 12px;
        }
        p {
          margin-right: 12px;

          &:first-child {
            font-weight: 600;
          }
        }

        a {
          color: #002F34;
          &:hover {
            text-decoration: underline;
          }
        }
      }

      .heading-account {
        overflow-wrap: break-word !important;
        //font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
        font-size: 26px !important;
        font-weight: 500 !important;
        line-height: 1.125em !important;
        color: #000 !important;
      }

      h2 {
        //font-family: 'Lato', sans-serif;
        font-weight: 500;
        font-size: 20px;
        margin-bottom: 36px;
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


.icon {
  margin-right: 12px;
  font-size: 18px;
  color: #9BAABD;
}

.dashboard-class {
  background: #F7F9FF;
}

</style>

