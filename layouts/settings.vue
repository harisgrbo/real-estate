<template>
  <div class="settings-wrapper">
    <Navbar></Navbar>
    <div :class="['preview-wrapper', $route.path === '/moj-racun/poruke' ? 'messages' : '']">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/Footer"

@Component({
  components: {Navbar, Footer}
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
  padding-top: 110px !important;
  min-height: 100vh;
  width: 100%;
  padding-bottom: 0px;

  .preview-wrapper {
    margin-top: 80px;
    width: 1280px;
    margin: 0 auto;
    background: #fff;
    height: fit-content;

    &.messages {
      background: transparent;
      padding-bottom: 0;
      width: 1280px;
      margin: 0 auto;
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

