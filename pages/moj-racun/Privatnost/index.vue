<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Privatnost</p>
      </li>
    </ul>
    <h1 class="heading">
      Privatnost
    </h1>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout() { return "home" }
})

export default class privatnost extends Vue {
}
</script>

<style scoped lang="scss">
h1 {
  color: rgb(72, 72, 72) !important;
}
</style>
