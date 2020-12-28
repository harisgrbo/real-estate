<template>
  <div class="publish-wrapper">
    <Navbar></Navbar>
    <div class="nuxt-wrap">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";

@Component({
  components: {Navbar}
})

export default class Publish extends Vue {
}
</script>

<style lang="scss">
.publish-wrapper {
  padding-top: 100px !important;
  height: calc(100vh - 100px);
  background: #fafafa;
  .nuxt-wrap {
    padding: 0 24px;
    box-sizing: border-box;
  }
}
</style>

