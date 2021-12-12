<template>
  <div class="home-wrapper">
    <Navbar></Navbar>
    <Nuxt />
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/Footer"

@Component({
  components: {Navbar, Footer}
})

export default class Article extends Vue {
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
  padding-top: 80px !important;
  min-height: 100vh;

  @include for-phone-only {
    min-height: 100%;
  }

  &.no-padding {
    padding-top: 0;
  }

}
</style>

