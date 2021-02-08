<template>
  <div class="auth-wrapper">
    <div class="form-wrap">
      <img src="/logo.png" class="logo" alt="logo" @click="$router.push('/')">
      <nuxt></nuxt>
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
      width: 300px;
      margin: 0 auto;
      margin-bottom: 64px;
      cursor: pointer;
    }
  }
}
</style>
