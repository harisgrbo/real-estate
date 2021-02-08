<template>
  <div class="w-full">
    <h1 class="heading">
      Poruke
    </h1>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout() { return "account" }
})

export default class poruke extends Vue {
}
</script>

<style scoped>

</style>
