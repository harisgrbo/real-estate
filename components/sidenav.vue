<template>
  <div class="sidenav-wrapper flex flex-col justify-between h-full">
    <div class="rounded-md bg-yellow-50 p-4 mb-4" v-if="$auth.user && $auth.user.verified === false">
      <div class="flex">
        <div class="flex-shrink-0">
          <!-- Heroicon name: solid/exclamation -->
          <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-yellow-800">Pažnja</h3>
          <div class="mt-2 text-sm text-yellow-700">
            <p class="text-xs">Verifikacijski link dostavljen na {{ $auth.user.email }}"</p>
            <p class="text-xs mt-2">Ako ne vidite poruku provjerite spam folder, ako i dalje ne možete pronaci email pritisnite dugme ispod</p>
            <ActionButton @action="resendVerificationMail()" class="mt-3" :loading="loadingResend" placeholder="Pošalji ponovo"></ActionButton>
          </div>
        </div>
      </div>
    </div>
    <ul>
      <li v-if="$auth.user" class="user-label" @click="goToUser">
        <img :src="[ $auth.user.avatar_url !== null ? $auth.user.avatar_url  : '/noimage.jpeg']" alt="">
        <div class="user-wrap w-full">
          <dd class="mt-3 w-full flex flex-col items-start justify-between">
            <h2 class="text-3xl font-medium text-black leading-5 text-left">{{ $auth.user.name }}</h2>
            <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full mt-2">{{ user_type($auth.user.user_type) }}</span>
          </dd>
        </div>
      </li>
      <li v-if="$auth.user && $auth.user.user_type === 'agency'" class="w-full flex flex-col items-start sub-menu">
        <div class="flex flex-row items-center justify-start w-full">
          <img src="/001-monitor.png" alt="">
          <nuxt-link to="/moj-racun/dashboard/analitika">Dashboard</nuxt-link>
        </div>

        <ul class="w-full inner-ul mt-2">
          <li>
            <img src="/002-dashboard.png" alt="">
            <nuxt-link to="/moj-racun/dashboard/analitika">Analitika</nuxt-link>
          </li>
          <li>
            <img src="/004-settings.png" alt="">
            <nuxt-link to="/moj-racun/dashboard/postavke-agencije">Postavke agencije</nuxt-link>
          </li>
          <li>
            <img src="/003-temporary-agency.png" alt="">
            <nuxt-link to="/moj-racun/dashboard/agenti-za-nekretnine">Agenti za nekretnine</nuxt-link>
          </li>
          <li>
            <img src="/005-real-estate.png" alt="">
            <nuxt-link to="/moj-racun/dashboard/upravljanje-oglasima">Upravljanje oglasima</nuxt-link>
          </li>
        </ul>
      </li>
      <li class="flex flex-row items-center w-full justify-between" disabled>
        <div class="flex flex-row items-center w-full">
          <img src="/005-credit-card.png" alt="">
          <nuxt-link to="">Plaćanja
            <dd class="ml-2">
              <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">Uskoro dostupno</span>
            </dd>
          </nuxt-link>
        </div>
        <span class="bg-gray-50 balance p-1 min-w-min font-semibold text-sm text-gray-800">{{ $auth.user.wallet.balance + ' KM' }}</span>
      </li>
      <li v-if="$auth.user && $auth.user.user_type !== 'agency'">
        <img src="/001-article.png" alt="">
        <nuxt-link to="/moj-racun/moji-oglasi">Moji oglasi</nuxt-link>
      </li>
      <li>
        <img src="/003-settings.png" alt="">
        <nuxt-link to="/moj-racun/">Postavke</nuxt-link>
      </li>
      <li>
        <img src="/001-speech-bubble.png" alt="">
        <nuxt-link to="/moj-racun/poruke">Poruke</nuxt-link>
      </li>
      <li>
        <img src="/002-heart.png" alt="">
        <nuxt-link to="/moj-racun/spaseno">Spašeno</nuxt-link>
      </li>
      <li>
        <img src="/007-user.png" alt="">
        <nuxt-link to="/moj-racun/uredi-profil">Uredi profil</nuxt-link>
      </li>
      <li>
        <img src="/006-calendar.png" alt="">
        <nuxt-link to="/moj-racun/moje-rezervacije" class="font-medium">Moje rezervacije</nuxt-link>
      </li>
      <li>
        <img src="/004-ask.png" alt="">
        <nuxt-link to="/moj-racun/oglasi-koje-izdajem" class="font-medium">Zahtjevi za rezervacije</nuxt-link>
      </li>
    </ul>
    <h4>Ostali linkovi</h4>
    <ul>
      <li>
        <img src="/001-advertising.png" alt="">
        <nuxt-link to="/agencije">Agencije</nuxt-link>
      </li>
      <li>
        <img src="/002-box.png" alt="">
        <nuxt-link to="/paketi">Paketi pretplate (agencije)</nuxt-link>
      </li>
      <li>
        <img src="/003-bug.png" alt="">
        <nuxt-link to="/prijavi-gresku">Prijavi grešku/bug</nuxt-link>
      </li>
      <li>
        <img src="/004-mail.png" alt="">
        <nuxt-link to="/kontakt">Kontakt</nuxt-link>
      </li>
      <li v-if="$auth.user" @click="logout()" class="text-red-600">
        <img src="/008-logout.png" alt="">
        <a class="text-red-600">Odjavi se</a>
      </li>
    </ul>
  </div>
</template>

<script>
import {Component, Vue, Prop, Watch} from "nuxt-property-decorator";
import ActionButton from "./actionButtons/ActionButton";

@Component({
  components: {ActionButton}
})

export default class sidenav extends Vue {
  loadingResend = false;

 @Watch('$route')
  handleWatcher(newVal, oldVal) {
   if(newVal) {
     this.$modal.hide('sidebar')
   }
  }

  logout() {
    this.$auth.logout();
    this.$router.push('/prijava');
  }

  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else if(t === 'user') {
      return 'korisnik'
    } else if(t === 'agent'){
      return 'Agent'
    } else {
      return 'Admin'
    }
  }

  async resendVerificationMail() {
   this.loadingResend = true;
   try {
     await this.$axios.post('/email/verification/resend');

     this.$toast.open({
       message: "Poslali smo Vam novi verifikacijski mail",
       type: 'success',
       duration: 5000
     });

     this.loadingResend = false;
   } catch(e) {
     console.log(e)
   }
  }

  goToUser() {
    if(this.$auth.user) {
      if(this.$auth.user.user_type === 'agency') {
        this.$router.push('/pravno-lice/' + this.$auth.user.id)
      } else if(this.$auth.user.user_type === 'agent'){
        this.$router.push('/agent/' + this.$auth.user.id)
      } else {
        this.$router.push('/korisnik/' + this.$auth.user.id)
      }
    } else {
      this.$router.push('/prijava')
    }
  }

  closeSidebar() {
    this.$modal.hide('sidebar')
  }

}
</script>

<style scoped lang="scss">
ul {
  li {
    height: 50px;
    font-size: 15px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    border-radius: 5px;
    color: #444;
    margin-bottom: 0px;

    &:hover {
      text-decoration: underline;

      &.sub-menu {
        text-decoration: none;
      }
    }
    img {
      height: 24px !important;
      min-width: auto !important;
      max-width: auto !important;
      width: auto !important;
    }
    &.sub-menu {
      height: fit-content;
      margin-bottom: 0;

      li {
        &:hover {
          text-decoration: underline;
        }
      }
    }

    a {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &.login {
      font-weight: 600;
    }

    &.logout {
      border-top: 1px solid #f1f1f1;
      margin-top: 16px;
    }
    h2 {
      color: #444;
      font-size: 22px !important;
      font-weight: 600;
    }

    &.links {
      &:hover {
        background: none;
        cursor: default;
      }
    }

    svg {
      margin-right: 10px;

      &.close {
        margin-right: 0;
      }
    }

    h2 {
      font-size: 16px;
      color: #444 !important;
    }

    &.user-label {
      height: fit-content;
      cursor: pointer;
      padding-bottom: 12px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      height: fit-content !important;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #EBEBEB;

      img {
        height: 60px !important;
        width: 60px !important;
        border-radius: 30px;
        margin-right: 12px;
        object-fit: cover;
      }

      .user-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;

        label {
          font-size: 15px;
        }

        p {
          font-size: 12px;
          font-weight: 600;
        }
      }
    }
  }
}

img {
  margin-right: 12px;
}

li.dashboard {
  background: #EBEBEB;

  &:hover {
    background: #f9f9f9 !important;
  }
}

button.logout {
  height: 40px;
  font-size: 15px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  border-radius: 5px;
  color: #444;
  margin-bottom: 8px;

  svg {
    margin-right: 10px;
  }
}

.inner-ul {
  padding-left: 24px;
  li {
    padding: 0;
    padding-top: 4px;
    padding-bottom: 4px;
  }
}

.sidenav-wrapper {
  height: fit-content;
  max-height: 80vh;
  overflow-y: scroll;
  padding-bottom: 24px;
}

.balance {
  min-width: fit-content;
}

.separate {
  border-bottom: 1px solid #EBEBEB;
}


h4 {
  margin-top: 32px;
  font-size: 18px;
  margin-bottom: 12px;
}
</style>

