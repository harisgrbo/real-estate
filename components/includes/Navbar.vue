<template>
  <div class="navbar-wrapper">
    <div class="first-row" v-if="! $device.isMobile">
      <div>
        <ul>
          <li @click="$router.push('/agencies')">agencije</li>
          <li>novogradnja</li>
          <li>oglašavanje</li>
          <li>o nama</li>
          <li @click="$router.push('/zasto-registrovati-agenciju')">zašto registrovati agenciju?</li>
        </ul>
      </div>
      <div class="auth-buttons">
        <div v-if="! $auth.user" class="auth-reg">
          <button class="register" @click="$router.push('/auth/register')">Registracija</button>
        </div>
        <button v-if="$auth.user" class="login">
          <font-awesome-icon icon="coins" @click="$router.push('/moj-racun/poruke')"/>
          <p>650</p>
        </button>
        <button v-if="$auth.user" class="login">
          <font-awesome-icon icon="envelope" @click="$router.push('/moj-racun/poruke')"/>
          <p class="notify">4</p>
        </button>
        <button v-if="$auth.user" class="login notify" @click="showNotifications = true">
          <font-awesome-icon icon="bell"/>
          <p class="notify">2</p>
        </button>
        <button class="login-wrapper" @click="showUserDropdown = !showUserDropdown">
          <font-awesome-icon icon="bars"></font-awesome-icon>
          <font-awesome-icon icon="user-circle"></font-awesome-icon>
        </button>
        <!-- User dropdown -->
        <div class="user-dropdown" v-if="showUserDropdown" v-on-clickaway="closeSidebar">
          <sidenav></sidenav>
        </div>
        <div class="notification" v-show="showNotifications === true">
          <NotificationsDropdown @close-notifications="handleCloseNotifications"></NotificationsDropdown>
        </div>
      </div>
    </div>
    <div class="second-row">
      <div class="img-wrapper" :class="[$device.isMobile && focused === true ? 'hide' : '']">
        <img :src="[ $device.isMobile ? '/mobile1.png' : '/desktop.png']" class="main-logo" alt="" @click="$router.push('/')">
      </div>
      <button v-if="!$device.isMobile" class="categories" @click="toggleCategories">
        KATEGORIJE
        <font-awesome-icon icon="th"></font-awesome-icon>
      </button>
      <div class="input-wrapper"
           @focusin="focused = true"
           :class="[ focused? 'focused' : '']"
           v-on-clickaway="away"
      >
        <button @click="search" :class="[ 'search-btn', searchInput.length || selectedCategory !== null || selectedType !== null ? 'expanded' : '']" v-if="!$device.isMobile">
          <i class="material-icons">search</i>
          <p>Pretraži</p>
        </button>
        <button @click="search" :class="[ 'search-btn', searchInput.length || selectedCategory !== null || selectedType !== null ? 'expanded' : '']" v-if="$device.isMobile">
          <i class="material-icons">search</i>
        </button>
        <input type="text"
               ref="search"
               v-model="searchInput"
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
        <button v-if="focused === true" class="close">
          <i class="material-icons" @click="clearSearchTerm">close</i>
        </button>
        <!-- Autocomplete dropdown -->
        <div class="autocomplete-dropdown" v-if="focused === true">
          <div class="quick-filters">
            <button @click="toggleCategories">Kategorija</button>
            <button @click="$modal.show('type')">Vrsta oglasa</button>
          </div>
          <p v-if="$auth.user && savedSearches.length" class="saved-title">Snimljene pretrage</p>
          <ul v-if="$auth.user && savedSearches.length" class="saved-searches">
            <li v-for="search in savedSearches" :key="search.id" @click="goToSearch(search)">
              <p>{{ search.description }}</p>
              <font-awesome-icon icon="arrow-circle-right"></font-awesome-icon>
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
      <nuxt-link :to="{ path: '/publish'}" class="publish" v-if="!$device.isMobile">
        <p>Objavi oglas</p>
      </nuxt-link>
    </div>
    <client-only>
      <modal name="type" :adaptive="true" height="100%">
        <ListingType @selected-type="handleSelectedType" @close="$modal.hide('type')"></ListingType>
      </modal>
    </client-only>
  </div>
</template>

<script>

import { Component, Vue, Prop, Watch} from "nuxt-property-decorator";
import CategoriesList from "@/components/CategoriesList";
import ListingType from "@/components/ListingType";
import sidenav from "@/components/sidenav"
import { mixin as clickaway } from 'vue-clickaway';
import NotificationsDropdown from "@/components/NotificationsDropdown"

@Component({
  components: {
    CategoriesList,
    ListingType,
    NotificationsDropdown,
    sidenav,
  },
  mixins: [ clickaway ],
})

export default class Navbar extends Vue{
  showUserDropdown = false
  showAutoCompleteDropdown = false
  suggestions = []
  focused = false
  selectedCategory = null
  selectedType = null
  searchInput = ""
  savedSearches = []
  showNotifications = false;
  notificationHandlers = {
    'broadcast.listing_question': this.listingQuestionNotification
  }

  mounted() {
    if (this.$auth.user) {
        this.$echo.private('App.Models.User.' + this.$auth.user.id).notification(notification => {
          if (this.notificationHandlers[notification.type]) {
            this.notificationHandlers[notification.type](notification)
          }
        })
    }
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange() {
    this.closeSidebar();
    this.away();
  }

  async created() {
    await this.getSearches()
  }

  goToSearch(s) {
    let q = this.buildTitle(s)
    this.$router.push('/pretraga?q=[' + q + ']');
  }

  handleCloseNotifications() {
    console.log('radil')
    this.showNotifications = false;
  }

  async getSearches() {
    if(this.$auth.user) {
      try {
        let res = await this.$axios.get('/profile/saved/searches');
        this.savedSearches = res.data.data;

      } catch(e) {
        console.log(e)
      }
    }
  }

  listingQuestionNotification(notification) {
    let name = notification.user.name;
    let id = notification.listing_id;

    this.$snackbar.show({
      text: `Dobili ste novo pitanje od ${name} za artikal broj: ${id}`,
      timeout: 1000,
      type: "success"
    })
  }

  away() {
    this.focused = false;
  }

  closeSidebar() {
    this.showUserDropdown = false;
  }

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
    this.searchInput = '';

    this.focused = false;

    this.showAutoCompleteDropdown = false;
  }

  search() {
    let text = this.searchInput.trim();

    let filters  = [];

    if (text.length) {
      filters.push(this.buildTitle(text));
    }

    if (this.selectedCategory) {
      filters.push(this.buildCategory(this.selectedCategory));
    }

    if  (this.selectedType) {
      filters.push(this.buildType(this.selectedType));
    }

    if (filters.length) {
      this.focused = false;

      this.$router.push(`/pretraga?q=[${filters.join(',')}]`);
    }
  }

  // goToSearch(term) {
  //   let query = this.buildTitle(term);
  //
  //   this.$router.push(`/pretraga?q=[${query}]`);
  //
  //   this.showAutoCompleteDropdown = false;
  // }

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


  async showSuggests() {
    let q = this.searchInput.trim();

    if(q.length > 3) {
      this.showAutoCompleteDropdown = true;
      try {
        let res = await this.$axios.get('/listings/completion?q=' + q);
        this.suggestions = res.data;
        console.log(res)
      } catch (e) {
        console.log(e)
      }
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
.navbar-wrapper {
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 5;
  background: #fff;
  box-sizing: border-box;
  padding: 0px 80px 0px 80px;

  @include for-phone-only {
    padding: 0 8px 0 8px !important;
    position: fixed;
    bottom: 12px;
    left: 4px;
    box-sizing: border-box;
    right: 4px;
    top: 4px;
    width: auto;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-radius:10px;
    z-index: 3;
    -webkit-box-shadow: 0px 0px 10px -6px rgb(0 0 0 / 69%);
    box-shadow: 0px 0px 10px -6px rgb(0 0 0 / 69%);
  }

  .first-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: #1B1D32;
    color: #fff !important;
    padding-top: 8px;
    padding-bottom: 8px;
    padding: 0 80px;


    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;

      li {
        margin-right: 12px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s all ease;
        height: 30px;
        display: flex;
        align-items: center;
        padding: 0 8px;

        &:hover {
          background: rgba(49,51,93,0.61176);
          border-radius: 5px;
        }
      }
    }
  }

  .second-row {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    padding: 0 80px;
    padding-top: 8px;
    padding-bottom: 8px;
    background: #fff;

    @include for-phone-only {
      padding: 0 !important;
      background: transparent !important;
      height: 100%;
    }

    .categories {
      height: 48px;
      display: flex;
      align-items: center;
      margin-right: 24px;
      background: transparent;
      border: none;
      border-radius: 8px;
      padding: 0 12px;
      cursor: pointer;
      transition: 0.3s all ease;
      font-weight: 600;
      font-size: 13px;

      svg {
        text-transform: uppercase;
        margin-left: 12px;
      }
    }
  }

  .img-wrapper {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    cursor: pointer;
    align-items: center;

    @include for-phone-only {
      width: fit-content;
      flex: 0;
      margin-right: 8px;
    }

    &.hide {
      @include for-phone-only {
        display: none;
      }
    }

    img {
      height: 41px;

      @include for-phone-only {
        height: 48px;
      }
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

    @include for-phone-only {
      box-sizing: border-box;
      padding: 0 8px;
    }

    &.focused {
      box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
      border-radius: 8px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      border: none;

      @include for-phone-only {
        position: absolute;
        left: 0px;
        right: 0px;
        background: #fff;
        top: 0px;
      }
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
      font-size: 17px;

      @include for-phone-only {
        height: 35px;
        background: transparent;
      }

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

      @include for-phone-only {
        padding: 8px;
        padding-top: 8px;
      }

      .quick-filters {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;

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
          background: #D63946;
          margin-right: 12px;
          cursor: pointer;
          color: #fff;
          transition: 0.3s all ease;

          &:hover {
            background: #b32e3b;

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
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .login-wrapper {
      width: 76px;
      border-radius: 8px;
      padding: 0 12px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-left: 16px;
      background: none;
      padding-right: 0;

      svg {
        &:first-child {
          margin-right: 12px;
        }
        &:last-child {
          font-size: 25px;
        };
        transition: 0.3s all ease;
      }
    }

    button {
      height: 30px;
      border-radius: 4px;
      border: none;
      background: transparent;
      padding: 0 4px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s all ease;
      background: #31335d9c;

      &:last-child {
        margin-left: 16px;
      }

      &:focus {
        outline: none;
      }

      &.register {
        padding: 0 24px;
        border: none;
        color: #fff;
        font-weight: 600;
        font-size: 12px;
        text-transform: capitalize !important;

        &:last-child {
          margin-left: 12px;
        }
      }

      &.login {
        display: flex;
        align-items: center;
        margin-left: 12px;
        color: #fff;
        border-radius: 8px;

        &.notify {
          position: relative;
        }

        &:hover {
          cursor: pointer;
        }

        p {
          padding: 0 4px;
          margin-rigth: 4px;

          &.notify {
            color: #D63946;
          }
        }

        svg {
          font-size: 18px;
          padding: 0 8px;
          transition: 0.3s all ease;

        }

      }
    }

    .user-dropdown {
      position: absolute;
      top: 44px;
      padding: 12px;
      background: #fff;
      width: 280px;
      min-width: 280px;
      right: 0;
      box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: fit-content;
      border-radius: 10px;
      z-index: 4;
    }
  }

  .publish {
    padding: 0 24px;
    height: 48px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    outline: none;
    color: #fff;
    background: #D63946;
    transition: 0.3s all ease;
    margin-left: 12px;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px !important;
    }

    svg {
      margin-left: 12px;
      font-size: 12px;
    }
  }
}

.search-btn {
  width: auto;
  transition: 0.3s all ease;
  p {
    display: none;
  }

  &.expanded {
    width: fit-content;
    padding: 0 12px;
    border-radius: 5px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 10px;
    background: #D63946 !important;
    margin-right: 12px;
    cursor: pointer;
    color: #fff !important;
    border-radius: 5px !important;

    @include for-phone-only {
      padding: 0 8px;
      height: 30px;
      width: 30px;
      margin-right: 8px;
    }

    p {
      display: flex;
      margin-left: 12px;
      font-size: 11px !important;
    }
  }
}

.saved-searches {
  box-sizing: border-box;
  li {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row-reverse;

    @include for-phone-only {
      height: 30px !important;
      padding: 0 !important;
    }

    p {
      margin: 0;
      margin-bottom: 0 !important;
      text-transform: none !important;
    }

    svg {
      margin: 0;
      margin-right: 12px;
      color: #ddd;
    }
  }
}

.saved-title {
  padding-top: 12px;
  border-top: 1px solid #dcdcdc;
  margin-top: 12px;

  @include for-phone-only {
    font-weight: 500;
    font-size: 13px !important;
    padding-top: 8px;
    margin-top: 8px;
  }
}

.notification {
  position: absolute;
  width: 400px;
  height: fit-content;
  border-radius: 10px;
  top: 44px;
  right: 0;
  z-index: 4;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;

}
</style>
