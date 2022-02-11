<template>
  <div class="sidenav-wrapper flex flex-col justify-between h-full">
    <ul>
      <li class="w-full items-center min-w-full justify-between">
        <h3 class="w-full">Meni</h3>
        <svg @click="$emit('close-sidenav')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 close" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </li>
      <li v-if="$auth.user" class="user-label" @click="goToUser">
        <img :src="[ $auth.user.avatar_url !== null ? $auth.user.avatar_url  : '/noimage.jpeg']" alt="">
        <div class="user-wrap w-full">
          <dd class="mt-3 w-full flex flex-row items-center justify-between">
            <h2 class="text-3xl font-medium text-black leading-5 text-left">{{ $auth.user.name }}</h2>
            <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ user_type($auth.user.user_type) }}</span>
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
      <li v-if="$auth.user" class="flex flex-row items-center w-full justify-between">
        <div class="flex flex-row items-center w-full">
          <img src="/005-credit-card.png" alt="">
          <nuxt-link to="/moj-racun/placanja">Plaćanja</nuxt-link>
        </div>
        <span class="bg-gray-50 balance p-1 min-w-min font-semibold text-sm text-gray-800">{{ $auth.user.wallet.balance + ' KM' }}</span>
      </li>
      <li v-if="$auth.user && $auth.user.user_type !== 'agency'">
        <img src="/001-article.png" alt="">
        <nuxt-link to="/moj-racun/moji-oglasi">Moji oglasi</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <img src="/003-settings.png" alt="">
        <nuxt-link to="/moj-racun/">Postavke</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <img src="/001-speech-bubble.png" alt="">
        <nuxt-link to="/moj-racun/poruke">Poruke</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <img src="/002-heart.png" alt="">
        <nuxt-link to="/moj-racun/spaseno">Spašeno</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <img src="/007-user.png" alt="">
        <nuxt-link to="/moj-racun/uredi-profil">Uredi profil</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <img src="/006-calendar.png" alt="">
        <nuxt-link to="/moj-racun/moje-rezervacije" class="font-medium">Moje rezervacije</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <img src="/004-ask.png" alt="">
        <nuxt-link to="/moj-racun/oglasi-koje-izdajem" class="font-medium">Zahtjevi za rezervacije</nuxt-link>
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

@Component({
})

export default class sidenav extends Vue {

  @Watch('$route')
  handleWatcher(newVal, oldVal) {
    if(newVal) {
      this.$modal.hide('sidebar')
    }
  }

  logout() {
    this.$auth.logout();
    this.$router.push('/auth/login');
  }

  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else if(t === 'user') {
      return 'Korisnik'
    } else {
      return 'Agent'
    }
  }

  goToUser() {
    if(this.$auth.user) {
      if(this.$auth.user.user_type === 'agency') {
        this.$router.push('/agency/' + this.$auth.user.id)
      } else if(this.$auth.user.user_type === 'agent'){
        this.$router.push('/agent/' + this.$auth.user.id)
      } else {
        this.$router.push('/users/' + this.$auth.user.id)
      }
    } else {
      this.$router.push('/auth/login')
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
    height: 60px;
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
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding-top: 16px;
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
    padding-bottom: 80px;
}

.balance {
  min-width: fit-content;
}

.separate {
  border-bottom: 1px solid #EBEBEB;
}
</style>
