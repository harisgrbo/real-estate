<template>
  <div class="sidenav-wrapper">
    <div class="modal-inner" v-if="$device.isMobile">
      <div class="modal-header">
        <h2>{{ $auth.user.name }}</h2>
        <i class="material-icons" @click="$modal.hideAll">close</i>
      </div>
    </div>
    <ul>
      <li v-if="$auth.user" class="user-label">
        <img src="/avatar.jpg" alt="">
        <div class="user-wrap">
          <label for="">{{ $auth.user.name }}</label>
          <p>{{ transformType($auth.user.user_type) }}</p>
        </div>
      </li>
      <li class="login" v-if="!$auth.user">
        <nuxt-link to="/auth/login">Prijavi se</nuxt-link>
      </li>
      <li v-if="!$auth.user">
        <nuxt-link to="/auth/register">Registruj se</nuxt-link>
      </li>
      <li v-if="$auth.user" @click="goToUSer">
        <img src="/037-user.svg" alt="">
        Moj profil
      </li>
      <li v-if="$auth.user">
        <img src="/094-settings.svg" alt="">
        <nuxt-link to="/moj-racun/">Postavke</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <img src="/087-mail.svg" alt="">
        <nuxt-link to="/moj-racun/poruke">Poruke</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <img src="/016-folder.svg" alt="">
        <nuxt-link to="/moj-racun/spaseno">Spašeno</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <img src="/049-user.svg" alt="">
        <nuxt-link to="/moj-racun/uredi-profil">Uredi profil</nuxt-link>
      </li>
      <li class="links">
        <h2>Ostali linkovi</h2>
      </li>
      <li v-if="$auth.user">
        <img src="/095-store.svg" alt="">
        <nuxt-link to="/agencije">Agencije</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <img src="/029-home.svg" alt="">
        <nuxt-link to="/moj-racun/">Novogradnja</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <img src="/096-target.svg" alt="">
        <nuxt-link to="/marketing/">Marketing</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <nuxt-link to="/o-nama/">O nama</nuxt-link>
      </li>
      <li class="logout" v-if="$auth.user">
        <img src="/009-logout.svg" alt="">
        <a @click="logout()">Odjavi se</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

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
      font-size: 14px;
      font-weight: 500;
      padding: 0 12px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      border-radius: 5px;
      color: #444;

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
      }
      h2 {
        color: #444;
        text-transform: uppercase;
        font-size: 14px !important;
        font-weight: 600;
      }

      &:hover {
        background: #f1f1f1;
      }

      &.links {
        &:hover {
          background: none;
          cursor: default;
        }
      }

      h2 {
        font-size: 16px;
        color: #444 !important;
      }

      &.user-label {
        padding: 8px 8px 8px 8px;
        background: #f1f1f1;
        margin-bottom: 12px;
        img {
          height: 40px;
          width: 40px;
          border-radius: 20px;
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

.modal-header {
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #dcdcdc;
  justify-content: space-between;

  h2 {
    font-size: 20px;
    font-weight: 500;
  }

  svg {
    cursor: pointer;
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
      font-family: 'Montserrat', sans-serif;
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
</style>
