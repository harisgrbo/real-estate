<template>
  <div class="home-wrapper">
    <Navbar></Navbar>
    <Nuxt />
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";

@Component({
  components: {Navbar}
})

export default class Home extends Vue {
}
</script>

<style lang="scss">
.home-wrapper {
  padding-top: 70px !important;
}
</style>

