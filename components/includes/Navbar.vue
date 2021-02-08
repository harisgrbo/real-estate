<template>
  <div class="navbar-wrapper">
    <div class="img-wrapper">
      <img src="/logo.png" alt="" @click="$router.push('/')">
    </div>
    <div class="input-wrapper"
         @focusin="focused = true"
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
      <div class="category" v-if="selectedCategory !== null">{{ selectedCategory.title }}
        <button class="close">
          <i class="material-icons" @click="selectedCategory = null">close</i>
        </button>
      </div>
      <div class="category" v-if="selectedType !== null">{{ selectedType.title }}
        <button class="close">
          <i class="material-icons" @click="selectedType = null">close</i>
        </button>
      </div>
      <button class="close">
        <i class="material-icons" @click="clearSearchTerm">close</i>
      </button>
      <!-- Autocomplete dropdown -->
      <div class="autocomplete-dropdown" v-if="focused === true">
        <div class="quick-filters">
          <button @click="toggleCategories">Kategorija</button>
          <button @click="$modal.show('type')">Vrsta oglasa</button>
        </div>
        <p>Posljednje pretrage</p>
        <ul>
          <li>
            Stan sarajevo
          </li>
          <li>
            Sarajevo kuca
          </li>
          <li>
            Banjaluka stanovi
          </li>
        </ul>
        <p v-if="suggestions.length" class="last">Rezultati pretrage</p>
        <ul>
          <li v-for="suggest in suggestions" :key="suggest.id" @click="goToSearch(suggest)">
              {{ suggest }}
          </li>
        </ul>
      </div>
    </div>
    <div class="auth-buttons">
      <nuxt-link :to="{ path: '/publish'}" class="publish">
        <i class="material-icons">add</i>
        <p>Objavi</p>
      </nuxt-link>
      <div v-if="!$auth.user" class="auth-reg">
        <button class="register" @click="$router.push('/auth/register')">Registracija</button>
        <button class="register" @click="$router.push('/auth/login')">Prijava</button>
      </div>
      <button v-if="$auth.user" class="login">
        <i class="material-icons">email</i>
      </button>
      <button class="login" @click="showUserDropdown = !showUserDropdown" v-if="$auth.user">
        <i class="material-icons">perm_identity</i>
      </button>
      <!-- User dropdown -->
      <div class="user-dropdown" v-if="showUserDropdown">
        <sidenav></sidenav>
      </div>
    </div>
    <modals-container></modals-container>
    <modal name="type" :adaptive="true" height="100%">
      <ListingType @selected-type="handleSelectedType" @close="$modal.hide('type')"></ListingType>
    </modal>
  </div>
</template>

<script>

import { Component, Vue, Prop} from "nuxt-property-decorator";
import CategoriesList from "@/components/CategoriesList";
import ListingType from "@/components/ListingType";
import sidenav from "@/components/sidenav"

@Component({
  CategoriesList,
  ListingType,
  sidenav
})

export default class Navbar extends Vue{

  showUserDropdown = false
  showAutoCompleteDropdown = false
  suggestions = []
  focused = false
  selectedCategory = null
  selectedType = null

  buildTitle(title) {
    return JSON.stringify({
      name: "title",
      type: "match",
      value: title
    })
  }

  buildType(type) {
    return JSON.stringify({
      name: "listing_type_id",
      type: "term",
      value: type.id
    })
  }

  buildCategory(category) {
    return JSON.stringify({
      name: "category_id",
      type: "term",
      value: category.id
    })
  }

  handleSelectedType(e) {
    this.selectedType = e;

    this.$modal.hide('type')
  }

  clearSearchTerm() {
    this.$refs.search.value = '';

    this.focused = false;

    this.showAutoCompleteDropdown = false;
  }

  search(e) {
    if (e.target.value.length) {
      let query = this.buildTitle(e.target.value);

      if (this.selectedCategory) {
        query = query + ',' + this.buildCategory(this.selectedCategory);
      }

      if  (this.selectedType) {
        query = query + ',' + this.buildType(this.selectedType);
      }

      this.focused = false;

      this.$router.push(`/pretraga?q=[${query}]`);
    }
  }

  goToSearch(term) {
    let query = this.buildTitle(term);

    this.$router.push(`/pretraga?q=[${query}]`);

    this.showAutoCompleteDropdown = false;
  }

  toggleCategories() {
    let self = this;

      this.$modal.show(
        {
          render(h) {

            return h( CategoriesList, {
              props: {
              },
              on: {
                selectedCat(e) {
                  self.selectedCategory = e;
                  self.closeModal();
                },
                close() {
                  // close event needs to be echoed
                  self.closeModal();
                }
              }
            });
          }
        },
        {
        },
        {
          'selected-category': this.handleSelectedCategory,
          adaptive: true,
          height: "100%",
        }
      );
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

  closeModal() {
    this.$modal.hideAll();
  }
}
</script>

<style scoped lang="scss">
.navbar-wrapper {
  padding: 0 16px;
  height: 70px;
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
  .img-wrapper {
    display: flex;
    flex: 2;
    justify-content: flex-start;

    img {
      height: 80px;
    }
  }
  .input-wrapper {
    height: 48px;
    border: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    padding: 0 12px;
    flex: 2;
    position: relative;
    transition: 0.3s all ease;
    &.focused {
      box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
      border-radius: 8px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      border: none;
    }
    .category {
      background: #f1f1f1;
      border-radius: 3px;
      height: 30px;
      width: fit-content;
      min-width: fit-content;
      margin-right: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 13px;
      flex-direction: row;
      padding: 0 0px 0 8px;

      button {
        margin-left: 8px;

        i {
          font-size: 11px;
        }
      }
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
        cursor: pointer;

        i {
          font-size: 16px !important;
          font-weight: bold;
        }
      }
    }
    .autocomplete-dropdown {
      position: absolute;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      top: 49px;
      padding: 12px;
      padding-top: 16px;
      background: #fff;
      width: 100%;
      right: 0;
      box-shadow: rgba(0, 0, 0, 0.18) 0px 8px 12px;
      z-index: 3;
      left: 0;
      height: fit-content;
      min-height: 0;
      box-sizing: border-box;

      .quick-filters {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        padding-bottom: 12px;
        border-bottom: 1px solid #dcdcdc;
        margin-bottom: 12px;

        button {
          border-radius: 5px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 8px;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 10px;
          background: #757B9A;
          margin-right: 12px;
          cursor: pointer;
          color: #fff;
          transition: 0.3s all ease;

          &:hover {
            background: #585d79;

          }
        }
      }

      p {
        font-weight: 600 !important;
        text-transform: uppercase;
        font-size: 14px;
        margin-bottom: 12px;

        &.last {
          margin-top: 12px;
        }
      }
      ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        max-height: 400px;
        overflow: scroll;
        li {
          width: 100%;
          font-size: 15px;
          font-weight: 500;
          color: #000;
          border-radius: 5px;
          padding: 0 8px;
          height: 40px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: 0.3s all ease;

          &:last-child {
            margin-bottom: 0;
            border-bottom: 0;
          }

          &:hover {
            font-weight: 600;
            padding-left: 12px;
          }
        }
      }
    }
  }
  .auth-buttons {
    display: flex;
    align-items: center;
    position: relative;
    flex: 2;
    justify-content: flex-end;

    .auth-reg {
      width: fit-content;
    }

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
        border: 1px solid #444;
        font-weight: 500 !important;

        &:last-child {
          margin-left: 12px;
        }
      }

      &.login {
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
      top: 56px;
      padding: 12px;
      background: #fff;
      width: 280px;
      min-width: 280px;
      right: -14px;
      box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: calc(100vh - 94px);
    }
  }

  .publish {
    padding: 0 12px;
    height: 40px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    outline: none;
    border: 1px solid  #757B9A !important;
    color: #757B9A;
    transition: 0.3s all ease;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px !important;
    }
  }
}
</style>
