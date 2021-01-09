<template>
  <div>
    {{ user.name }}
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout() { return "account" }
})

export default class SavedUserCard extends Vue {

  @Prop({}) user;

}
</script>

<style scoped>

</style>
