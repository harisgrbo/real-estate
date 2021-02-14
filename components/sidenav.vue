<template>
  <div class="sidenav-wrapper">
    <ul>
      <li class="login" v-if="!$auth.user">
        <nuxt-link to="/auth/login">Prijavi se</nuxt-link>
      </li>
      <li v-if="!$auth.user">
        <nuxt-link to="/auth/register">Registruj se</nuxt-link>
      </li>
      <li v-if="$auth.user">
        <nuxt-link to="/moj-racun/">Postavke</nuxt-link>
      </li>
      <li v-if="$auth.user" @click="goToUSer">
        Moj profil
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

export default class sidenav extends Vue{
  logout() {
    this.$auth.logout();
  }

  created() {
    console.log(this.$auth.user)
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
  ul {
    padding: 0;
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
</style>
