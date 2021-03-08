<template>
  <div class="medals">
    <img src="/medals/years-1.svg" alt="">
    <img src="/medals/package-gold.svg" alt="">
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {
  },
})

export default class UserMedals extends Vue {
}
</script>

<style scoped lang="scss">
.medals {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 8px;

  img {
    height: 30px;
    margin-right: 12px;
  }
}
</style>
