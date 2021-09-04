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

  &.no-padding {
    padding-top: 0;
  }

}

::v-deep .second-row {
  max-width: 1180px !important;
  margin: 0 auto;
}

::v-deep .px-20 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>

