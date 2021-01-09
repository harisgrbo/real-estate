<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout() { return "account" }
})

export default class mojRacun extends Vue {
}
</script>

<style scoped>

</style>
