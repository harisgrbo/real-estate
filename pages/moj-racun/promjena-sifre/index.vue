<template>
  <div class="w-full">
    <h1 class="heading">
      Promjena šifre
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

export default class promjenaSifre extends Vue {
}
</script>

<style scoped>

</style>
