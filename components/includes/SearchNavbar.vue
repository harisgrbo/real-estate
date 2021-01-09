<template>
  <div class="navbar-wrapper">
    <img src="/logo.svg" alt="">
    <div class="input-wrapper">
      <input type="text"
             @keyup.enter="search"
             @input="showSuggests"
      >
      <button @click="search">
        <i class="material-icons">search</i>
      </button>
      <!-- Autocomplete dropdown -->
      <div class="autocomplete-dropdown" v-if="showAutoCompleteDropdown">
        <ul>
          <li v-for="suggest in suggestions" @click="goToSearch(suggest)">
            {{ suggest }}
          </li>
        </ul>
      </div>
    </div>
    <div class="auth-buttons">
      <button v-if="!$auth.user" class="register">Registracija</button>
      <button class="login" @click="showUserDropdown = !showUserDropdown">
        <i class="material-icons">menu</i>
        <i class="material-icons person">person</i>
      </button>
      <!-- User dropdown -->
      <div class="user-dropdown" v-if="showUserDropdown">
        <button v-if="!$auth.user">Prijavi se</button>
        <button v-if="$auth.user" @click="$auth.logout">Odjava</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({})

export default class SearchNavbar extends Vue{

  showUserDropdown = false;
  showAutoCompleteDropdown = false;
  suggestions = [];

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

  goToSearch(term) {
    let query = this.buildTitle(term);

    this.$router.push(`/pretraga?q=[${query}]`);

    this.showAutoCompleteDropdown = false;
  }

  async showSuggests(e) {
    let q = e.target.value;
    if(q.length) {
      this.showAutoCompleteDropdown = true;
      let res = await this.$axios.get('/listings/completion?q=' + q);
      this.suggestions = res.data;
    } else {
      this.showAutoCompleteDropdown = false;
    }

  }
}
</script>

<style scoped lang="scss">
.navbar-wrapper {
  padding: 0 16px;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  box-sizing: border-box;
  position: relative;
  z-index: 5;
  .input-wrapper {
    height: 38px;
    border: 1px solid #DDDDDD;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 24px;
    padding: 0 12px;
    min-width: 400px;
    position: relative;
    input {
      width: 100%;
      border: none;
      height: 36px;
      &:focus {
        outline: none;
      }
    }
    button {
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      background: #757B9A;
      color: #fff;
      border-radius: 16px;
      outline: none;
      border: none;
      i {
        font-size: 18px !important;
      }
    }
    .autocomplete-dropdown {
      position: absolute;
      border-radius: 10px;
      top: 70px;
      padding: 12px;
      background: #fff;
      width: 100%;
      right: 0;
      box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
      z-index: 3;
      left: 0;
      height: fit-content;
      ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        max-height: 400px;
        overflow: scroll;
        li {
          width: 100%;
          font-size: 14px;
          font-weight: 500;
          color: #434343;
          background: #F3F5FB;
          border-radius: 5px;
          padding: 8px;
          margin-bottom: 8px;
          cursor: pointer;
        }
      }
    }
  }
  .auth-buttons {
    display: flex;
    align-items: center;
    position: relative;

    button {
      height: 38px;
      border-radius: 19px;
      border: none;
      background: transparent;
      padding: 0 4px;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;

      &:last-child {
        margin-left: 16px;
      }

      &:hover {
        background: #F7F7F7;
      }

      &:focus {
        outline: none;
      }

      &.register {
        padding: 0 24px;
        margin-right: 12px;
      }

      &.login {
        border: 1px solid #dddddd;
        display: flex;
        align-items: center;
        margin-left: 12px;
        color: #757B9A;

        .person {
          height: 30px;
          width: 30px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #757B9A;
          color: #fff;
          margin-left: 8px;
        }

        &:hover {
          box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
          background: transparent;
        }
      }
    }

    .user-dropdown {
      position: absolute;
      border-radius: 10px;
      top: 70px;
      padding: 12px;
      background: #fff;
      width: 280px;
      min-width: 280px;
      right: 0;
      box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
    }
  }
}
</style>
