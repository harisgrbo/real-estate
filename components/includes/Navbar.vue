<template>
  <div class="navbar-wrapper">
    <img src="/logo.svg" alt="">
    <div class="input-wrapper"
         @focusin="focused = true"
         @focusout="focused = false"
         :class="[ focused? 'focused' : '']"
    >
      <button @click="search">
        <i class="material-icons">search</i>
      </button>
      <input type="text"
             ref="search"
             @keyup.enter="search"
             @input="showSuggests"
      >
      <button class="close">
        <i class="material-icons" @click="clearSearchTerm">close</i>
      </button>
      <!-- Autocomplete dropdown -->
      <div class="autocomplete-dropdown" v-if="showAutoCompleteDropdown">
        <ul>
          <li v-for="suggest in suggestions" :key="suggest.id" @click="goToSearch(suggest)">
              {{ suggest }}
          </li>
        </ul>
      </div>
    </div>
    <div class="auth-buttons">
      <button v-if="!$auth.user" class="register" @click="$router.push('/auth/register')">Registracija</button>
      <nuxt-link :to="{ path: '/publish'}" class="publish">
        <i class="material-icons">add</i>
        Objavi nekretninu
      </nuxt-link>
      <button class="login" @click="showUserDropdown = !showUserDropdown">
        <i class="material-icons">menu</i>
        <i class="material-icons person">person</i>
      </button>
      <!-- User dropdown -->
      <div class="user-dropdown" v-if="showUserDropdown">
        <button v-if="!$auth.user" @click="$router.push('/auth/login')">Prijavi se</button>
        <button v-if="$auth.user" @click="$auth.logout">Odjava</button>
        <button v-if="$auth.user" @click="$router.push('/users/' + $auth.user.data.id)">Moj profil</button>
        <button v-if="$auth.user" @click="$router.push('/moj-racun/')">Moj racun</button>
      </div>
    </div>
  </div>
</template>

<script>

import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({})

export default class Navbar extends Vue{

  showUserDropdown = false;
  showAutoCompleteDropdown = false;
  suggestions = [];
  focused = false;

  buildTitle(title) {
    return JSON.stringify({
      name: "title",
      type: "match",
      value: title
    })
  }

  clearSearchTerm() {
    this.$refs.search.value = '';
  }

  created() {
    console.log(this.$auth.user)
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
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 3;
  box-sizing: border-box;
  .input-wrapper {
    height: 48px;
    border: 1px solid #DDDDDD;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    padding: 0 12px;
    min-width: 500px;
    position: relative;
    transition: 0.3s all ease;
    &.focused {
      box-shadow: 0px 8px 20px rgba(0,0,0,0.06);
      border-radius: 8px;
      border: 1px solid #f8f8f8;
    }
    input {
      width: 100%;
      border: none;
      height: 40px;
      &:focus {
        outline: none;
      }
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: #444;
      border-radius: 16px;
      outline: none;
      border: none;
      background: none;
      i {
        font-size: 22px !important;
        font-weight: bold;
      }
      &.close {
        background: #f1f1f1;
        height: 22px;
        width: 22px;
        min-width: 22px;
        i {
          font-size: 16px !important;
          font-weight: bold;
        }
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
      box-sizing: border-box;
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
      height: 40px;
      border-radius: 8px;
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
    }
  }

  .publish {
    padding: 0 12px;
    height: 40px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    border-radius: 8px;
    outline: none;
    border: none;
    background: #757B9A !important;
    color: #fff;
    font-weight: 500 !important;
    transition: 0.3s all ease;
    i {
      margin-right: 8px;
    }
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px !important;
    }
  }
}
</style>
