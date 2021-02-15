<template>
  <div class="home-wrapper">
    <Navbar></Navbar>
    <Nuxt />
    <MobileBottomNavbar></MobileBottomNavbar>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import MobileBottomNavbar from "@/components/includes/MobileBottomNavbar"

@Component({
  components: {Navbar, MobileBottomNavbar}
})

export default class Mobile extends Vue {
}
</script>

<style lang="scss" scoped>
@mixin for-laptop {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}
@mixin for-desktop-up {
  @media (min-width: 1200px) {
    @content;
  }
}
@mixin for-big-desktop-up {
  @media (min-width: 1800px) {
    @content;
  }
}
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.home-wrapper {
  padding-top: 62px !important;
}
</style>

