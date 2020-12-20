<template>
  <div class="navbar-wrapper">
    <img src="/logo.svg" alt="">
    <div class="input-wrapper">
      <input type="text"
             @keyup.enter="search"
      >
      <button @click="search">pretraga</button>
    </div>
    <div class="auth-buttons" v-if="!$auth.user">
      <button>Prijava</button>
      <button>Registracija</button>
    </div>
    <div class="auth-buttons" v-else>
      <button @click="$auth.logout">Odjava</button>
    </div>
  </div>
</template>

<script>

import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({})

export default class Navbar extends Vue{

  buildTitle(title) {
    return JSON.stringify({
      name: "title",
      type: "match",
      value: title
    })
  }

  search(e) {
    if (e.target.value.length) {
      let query = this.buildTitle(e.target.value);

      this.$router.push(`/pretraga?q=[${query}]`);
    }
  }
}
</script>

<style scoped lang="scss">
.navbar-wrapper {
  padding: 0 24px;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  .input-wrapper {
    background: #f1f1f1;
    border-radius: 5px;
    height: 60px;
    input {
      width: 100%;
      height: 100%;
    }
  }
  .auth-buttons {
    display: flex;
    align-items: center;
    button {
      height: 60px;
      border-radius: 5px;
      background: #f1f1f1;
      &:last-child {
        margin-left: 16px;
      }
    }
  }
}
</style>
