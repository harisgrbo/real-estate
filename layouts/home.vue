<template>
  <div :class="['home-wrapper', this.$route.name === 'index' ? 'no-padding' : '']">
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

export default class Home extends Vue {
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
  padding-top: 0px !important;

  &.no-padding {
    padding-top: 0;
  }

  ::v-deep .navbar-wrapper {
    background: transparent;
    border-bottom: 0;
    box-shadow: none;

  }

  ::v-deep .navbar-wrapper .second-row {
    background: transparent;

  }
}
</style>

