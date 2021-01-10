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
  padding-top: 80px !important;
  height: calc(100vh - 80px);
  background: #fafafa;
  .nuxt-wrap {
    padding:24px;
    box-sizing: border-box;
    height: 100%;
  }
}
</style>

