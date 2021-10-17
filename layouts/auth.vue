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

  @include for-phone-only {
    flex-direction: column;
    align-items: flex-end;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;

  @include for-phone-only {
    display: none;
  }

  .inner-bg {
    height: 700px;
    width: 600px;
    border-radius: 20px;
    background-color: rgba(19,156,120,16%);
    -webkit-backdrop-filter: blur(0.2em);
    backdrop-filter: blur(9px);
    padding: 40px;

    h2 {
      color: #fff;
      font-size: 40px;
      font-weight: 200;
      margin-top: 36px;
    }

    p {
      color: #fff;
      font-size: 26px;
      font-weight: 200;
      margin-top: 32px;
    }
  }
}

img {
  filter: brightness(0) invert(1);
  height: 50px;
  position: relative;

  &::after {
    position: absolute;
    bottom: 0;
    height: 2px;
    width: 400px;
    left: 0;
    content: '';
    background: rgb(19,156,120);
    background: linear-gradient(90deg, rgba(19,156,120,1) 0%, rgba(34,201,154,1) 100%);
  }
}

</style>
