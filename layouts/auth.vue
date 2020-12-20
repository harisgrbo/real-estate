<template>
  <div class="auth-wrapper">
    <div class="form-wrap">
      <img src="/logo.svg" class="logo" alt="logo">
      <nuxt></nuxt>
    </div>
    <div class="auth-background">
      <img src="/bg.png" alt="background">
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
    width: 40%;
    .logo {
      height: 55px;
      width: auto;
      margin-bottom: 64px;
    }
  }
  .auth-background {
    width: 60%;
    display: flex;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
