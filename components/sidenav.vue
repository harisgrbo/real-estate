<template>
  <div class="sidenav-wrapper">
    <div class="modal-inner" v-if="$device.isMobile">
      <div class="modal-header">
        <h2>{{ $auth.user.name }}</h2>
        <i class="material-icons" @click="$modal.hideAll">close</i>
      </div>
    </div>
    <ul>
      <li class="login" v-if="!$auth.user">
        <nuxt-link to="/auth/login">Prijavi se</nuxt-link>
      </li>
      <li v-if="!$auth.user">
        <nuxt-link to="/auth/register">Registruj se</nuxt-link>
      </li>
      <li v-if="$auth.user" @click="goToUSer">
        Moj profil
      </li>
      <li v-if="$auth.user">
        <nuxt-link to="/moj-racun/">Postavke</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <nuxt-link to="/moj-racun/">Poruke</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <nuxt-link to="/moj-racun/">Spašeno</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <nuxt-link to="/moj-racun/">Uredi profil</nuxt-link>
      </li>
      <h2>Ostali linkovi</h2>
      <li v-if="$auth.user">
        <nuxt-link to="/moj-racun/">Agencije</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <nuxt-link to="/moj-racun/">Novogradnja</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <nuxt-link to="/moj-racun/">Marketing</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <nuxt-link to="/moj-racun/">O nama</nuxt-link>
      </li>
      <li class="logout" v-if="$auth.user">
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

      @include for-phone-only {
        padding: 0;
      }

      &.login {
        font-weight: 600;
      }

      &.logout {
        border-top: 1px solid #f1f1f1;
      }
      a {
        color: #444;
      }

      &:hover {
        background: #f1f1f1;
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
</style>
