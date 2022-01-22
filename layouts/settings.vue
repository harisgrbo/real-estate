<template>
  <div class="settings-wrapper">
    <Navbar></Navbar>
    <div :class="['preview-wrapper', $route.path === '/moj-racun/poruke' ? 'messages' : '']">
      <Nuxt />
    </div>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/Footer"
import Snackbar from "@/components/global/Snackbar"

@Component({
  components: {Navbar, Footer, Snackbar}
})

export default class Settings extends Vue {
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

.settings-wrapper {
  padding-top: 120px !important;
  min-height: 100vh;
  width: 100%;
  background: #f9f9f9;
  padding-bottom: 36px;

  .preview-wrapper {
    margin-top: 80px;
    width: 1180px;
    margin: 0 auto;
    background: #fff;
    height: fit-content;

    &.messages {
      background: transparent;
      padding-bottom: 0;
    }

    @include for-phone-only {
      width: 100%;
    }
  }

  @include for-phone-only {
    min-height: 100%;
    background: #fff;
  }

  &.no-padding {
    padding-top: 0;
  }

}
</style>

