<template>
  <div>
    moje nekretnine
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout() { return "account" }
})

export default class mojeNekretnine extends Vue {
}
</script>

<style scoped>

</style>
