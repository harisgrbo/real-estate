<template>
  <div class="auth-wrapper">
    <div class="form-wrap">
      <nuxt></nuxt>
    </div>
    <div class="bg">
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
@Component({})
export default class Auth extends Vue {
}
</script>

<style scoped lang="scss">
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

.auth-wrapper {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  .form-wrap {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 700px;

    @include for-phone-only {
      width: 100%;
    }
    .logo {
      width: 300px;
      margin: 0 auto;
      margin-bottom: 64px;
      cursor: pointer;

      @include for-phone-only {
        width: 210px;
      }
    }
  }
}

.bg {
  background-image: url("/login2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 50% !important;
  min-width: 50%;
}
</style>
