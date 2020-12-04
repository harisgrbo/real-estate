<template>
  <div class="main-container">
    test
  </div>
</template>

<script>
  import { Component, Vue} from "nuxt-property-decorator";

  @Component({
    components: {
    },
    layout() { return "home" }
  })

  export default class Homepage extends Vue {
  }
</script>

<style lang="scss">
.container {
  background: black;
}
</style>
