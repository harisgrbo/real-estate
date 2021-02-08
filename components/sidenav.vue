<template>
  <div class="sidenav-wrapper">
    <ul>
      <li>
        <nuxt-link to="/moj-racun/uredi-profil">Postavke</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="/users/ + $auth.user.data.id">Moj profil</nuxt-link>
      </li>

      <li>
        <a @click="$auth.logout">Odjavi se</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
})

export default class sidenav extends Vue{
  created() {
    console.log(this.$auth.user)
  }
}
</script>

<style scoped>

</style>
