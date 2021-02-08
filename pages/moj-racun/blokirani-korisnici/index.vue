<template>
  <div class="w-full">
    <h1 class="heading">
      Blokirani korisnici
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

export default class blokiraniKorisnici extends Vue {
}
</script>

<style scoped lang="scss">
.heading {
  font-size: 20px;
  font-weight: 500;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 24px;
  margin-bottom: 36px;
  width: 100%;

}
</style>
