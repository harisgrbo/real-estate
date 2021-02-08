<template>
  <div class="w-full">
    <h1 class="heading">
      Uredi profil
    </h1>
    <div class="content">
      <TextField></TextField>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import TextField from "@/components/inputs/TextField";

@Component({
  components: {
    TextField
  },
  layout() { return "account" }
})

export default class urediProfil extends Vue {
  async created() {
    await this.fetchUser() {
      console.log('test')
    }
  }
}
</script>

<style scoped lang="scss">
  .w-full {
    display: flex;
    flex-direction: column;
  }
</style>
