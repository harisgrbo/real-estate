<template>
  <div class="sidenav-wrapper flex flex-col justify-between h-full">
    <ul>
      <li v-if="$auth.user" class="user-label" @click="goToUSer">
        <img :src="[ $auth.user.avatar_url !== null ? $auth.user.avatar_url  : '/noimage.jpeg']" alt="">
        <div class="user-wrap">
          <h2 @click="goToUser()" class="text-lg font-medium text-black leading-5">{{ $auth.user.name }}</h2>
          <dd class="mt-3">
            <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ user_type($auth.user.user_type) }}</span>
          </dd>
        </div>
      </li>
      <li v-if="$auth.user">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        <nuxt-link to="/moj-racun/dashboard">Dashboard</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <nuxt-link to="/moj-racun/moji-oglasi">Moji oglasi</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <nuxt-link to="/moj-racun/moji-oglasi">Oglasi koje izdajem</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <nuxt-link to="/moj-racun/">Postavke</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <nuxt-link to="/moj-racun/poruke">Chat</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <nuxt-link to="/moj-racun/spaseno">Spašeno</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <nuxt-link to="/moj-racun/uredi-profil">Uredi profil</nuxt-link>
      </li>
      <li v-if="$auth.user" class="bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#023246">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
        <nuxt-link to="/moj-racun/moji-oglasi" class="font-medium">Moje rezervacije</nuxt-link>
      </li>
      <li v-if="$auth.user" class="bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#023246">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <nuxt-link to="/moj-racun/moji-oglasi" class="font-medium">Oglasi koje izdajem</nuxt-link>
      </li>
    </ul>
    <button class="logout mt-2" v-if="$auth.user" @click="logout()">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <a>Odjavi se</a>
    </button>
  </div>
</template>

<script>
import {Component, Vue, Prop, Watch} from "nuxt-property-decorator";

@Component({
})

export default class sidenav extends Vue {

  logout() {
    this.$auth.logout();
    this.$router.push('/auth/login');
  }

  transformType() {
    if(this.$auth.user.user_type === 'user') {
      return 'Fizicko lice'
    } else {
      return 'Agencija'
    }
  }

  goToUSer() {
     if(this.$auth.user) {
       if(this.$auth.user.user_type === 'agency') {
         this.$router.push('/agency/' + this.$auth.user.id)
       } else {
         this.$router.push('/users/' + this.$auth.user.id)
       }
     }
  }

  closeSidebar() {
    this.$modal.hide('sidebar')
  }

  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else {
      return 'Korisnik'
    }
  }
}
</script>

<style scoped lang="scss">
@mixin for-laptop {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}
@mixin for-desktop-up {
  @media (min-width: 1200px) {
    @content;
  }
}
@mixin for-big-desktop-up {
  @media (min-width: 1800px) {
    @content;
  }
}
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
  ul {
    padding: 0;

    @include for-phone-only {
      padding: 12px;
    }
    li {
      height: 40px;
      font-size: 15px;
      font-weight: 400;
      padding: 0 12px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      border-radius: 5px;
      color: #444;
      margin-bottom: 8px;

      @include for-phone-only {
        height: 50px;
      }

      a {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      @include for-phone-only {
        padding: 0;
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
        text-transform: uppercase;
        font-size: 14px !important;
        font-weight: 600;
      }

      &:hover {
        background: #f9f9f9;
      }

      &.links {
        &:hover {
          background: none;
          cursor: default;
        }
      }

      svg {
        margin-right: 10px;
      }

      h2 {
        font-size: 16px;
        color: #444 !important;
      }

      &.user-label {
        height: fit-content;
        cursor: pointer;
        padding: 16px;


        @include for-phone-only {
          padding: 0px 0px 24px 0px;

        }
        img {
          height: 60px;
          width: 60px;
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
            text-transform: uppercase;
            font-size: 12px;
            font-weight: 600;
          }
        }
      }
    }
  }

.modal-inner {
  display: flex;
  flex-direction: column;
  padding: 0 12px;

  .modal-content {
    padding: 24px 0;
    textarea {
      height: 200px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      line-height: 21px;
      box-sizing: border-box;
      padding: 24px;

      &:focus {
        outline: none;

      }
    }
  }
}

img {
  height: 20px;
  color: #4AAE9B;
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
  padding: 0 12px;
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
</style>
