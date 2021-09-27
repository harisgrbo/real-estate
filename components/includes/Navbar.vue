<template>
  <div :class="['navbar-wrapper w-full px-20 shadow-sm', this.$route.name === 'index' ? 'only-index' : '']">
    <div class="second-row mx-auto w-full">
      <div class="img-wrapper" :class="[$device.isMobile && focused === true ? 'hide' : '']">
        <img :src="[ $device.isMobile ? '/mobile1.png' : '/placeholder.png']" class="main-logo" height="40" alt="" @click="$router.push('/')">
      </div>
      <div v-if="this.$route.name !== 'index'" class="input-wrapper"
           @focusin="focused = true"
           :class="[ focused? 'focused' : '']"
           v-on-clickaway="away"
      >
        <button @click="search" :class="[ 'search-btn', searchInput.length || selectedCategory !== null || selectedType !== null ? 'expanded' : '']" v-if="!$device.isMobile">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
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
        <span class="relative z-0 inline-flex rounded-md border border-gray-200"  v-if="selectedCategory !== null">
          <div type="button" class="relative inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
            {{ selectedCategory.title }}
          </div>
          <div @click="selectedCategory = null" type="button" class="-ml-px cursor-pointer relative inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </span>
        <span class="relative z-0 inline-flex rounded-md border border-gray-800"  v-if="selectedType !== null">
          <div type="button" class="relative inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
            {{ selectedType.title }}
          </div>
          <div @click="selectedType = null" type="button" class="-ml-px cursor-pointer relative inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </span>
        <button v-if="focused === true" class="close">
          <i class="material-icons" @click="clearSearchTerm">close</i>
        </button>
        <!-- Autocomplete dropdown -->
        <div class="autocomplete-dropdown" v-if="focused === true">
          <div class="quick-filters">
            <button @click="toggleCategories" type="button" class="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-gray-500">
              Kategorija
            </button>
            <button @click="$modal.show('type')" type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Vrsta oglasa
            </button>
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
      <div class="auth-buttons">
        <ActionButton type="submit" @action="redirectToPublish" placeholder="Objava" :style-options="{ border: '1px solid #000', color: '#000', borderRadius: '8px', height: '42px', marginRight: '24px' }" :loading="loading"></ActionButton>

        <div class="inner">
          <div v-if="! $auth.user" class="auth-reg">
            <button class="register" @click="$router.push('/auth/login')">Prijavi se</button>
          </div>
          <button v-if="$auth.user" class="login">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"  @click="goToMessages()">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p class="notify" v-if="messagesCount">{{ messagesCount }}</p>
          </button>
          <button v-if="$auth.user" class="login notify" @click="showNotifications = true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p class="notify" v-if="notifications.length">{{ notifications.length }}</p>
          </button>
          <button class="login-wrapper" @click="showUserDropdown = !showUserDropdown">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <!-- User dropdown -->
          <div class="user-dropdown" v-if="showUserDropdown" v-on-clickaway="closeSidebar">
            <sidenav></sidenav>
          </div>
          <div :class="[ 'notification', showNotifications ? 'extend' : '' ]">
            <NotificationsDropdown :notifications="notifications" @close-notifications="handleCloseNotifications" @clear-notifications="handleClearNotifications"></NotificationsDropdown>
          </div>
        </div>
      </div>
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
import { buildType, buildCategory, buildTitle } from '@/util/search'

@Component({
  components: {
    CategoriesList,
    ListingType,
    NotificationsDropdown,
    sidenav,
  },
  mixins: [ clickaway ],
})

export default class Navbar extends Vue {
  messagesCount = 0;
  showUserDropdown = false
  notifications = []
  showAutoCompleteDropdown = false
  suggestions = []
  focused = false
  selectedCategory = null
  selectedType = null
  searchInput = ""
  savedSearches = []
  showNotifications = false;

  mounted() {
    window.addEventListener("scroll", this.onScroll)

    this.realtime();
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll() {
    let scroll = document.documentElement.scrollTop;
    let elem = document.querySelector(".navbar-wrapper");
    let opacity = scroll / 400;

    if (opacity >= 0) {
      elem.style.background = "rgba(255,255,255," + opacity + ")";
      elem.style.boxShadow = "0px -3px 5px -1px rgba(0,0,0," + opacity + ")";
    }
  }

  realtime() {
    if (this.$auth.user) {
      this.$echo.private('App.Models.User.' + this.$auth.user.id).notification(notification => {
        if (notification.type === 'App\\Notifications\\NewMessageNotification') {
          if (this.$route.fullPath !== '/moj-racun/poruke') {
            this.messagesCount++;
          }
        } else {
          this.notifications.unshift(notification)
        }

        this.snackbarNotification(notification.text)
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
    await this.getNotifications()
    await this.getUnreadMessagesCount()
  }

  async getUnreadMessagesCount()
  {
    try {
      let res = await this.$axios.get('/profile/messages/count');

      this.messagesCount = res.data.data
    } catch (e) {
      console.log(e)
    }
  }

  async getNotifications() {
    try {
      let res = await this.$axios.get('/profile/notifications/unread');

      this.notifications = res.data.data.map(notification => {
        return notification.data
      })
    } catch (e) {
      console.log(e)
    }
  }

  redirectToPublish() {
    if(this.$auth.user) {
      this.$router.push('/objava');
    } else {
      this.$router.push('/auth/login')
    }
  }

  goToMessages() {
    try {
      this.$axios.post('/profile/messages/read');
      this.messagesCount = 0;
    } catch (e) {
      console.log(e)
    } finally {
      this.$router.push('/moj-racun/poruke');
    }
  }

  goToSearch(s) {
    let q = this.buildTitle(s)
    this.$router.push('/pretraga?q=[' + q + ']');
  }

  async handleCloseNotifications() {
    try {
      await this.$axios.post('/profile/notifications/read');
    } catch (e) {
      console.log(e)
    } finally {
      this.showNotifications = false;
    }
  }

  async handleClearNotifications() {
    this.notifications = [];
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

  snackbarNotification(text) {
    this.$snackbar.show({
      text: text,
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
      filters.push(buildTitle(text));
    }

    if (this.selectedCategory) {
      filters.push(buildCategory(this.selectedCategory));
    }

    if  (this.selectedType) {
      filters.push(buildType(this.selectedType));
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
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 5;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  box-sizing: border-box;

  .second-row {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    background: #fff;
    height: 100%;

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

    img {
      height: 40px;
    }

    &.hide {
      @include for-phone-only {
        display: none;
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
      //border: none;

      @include for-phone-only {
        position: absolute;
        left: 0px;
        right: 0px;
        background: #fff;
        top: 0px;
      }
    }
    input {
      width: 100%;
      border: none;
      height: 40px;
      font-size: 15px;
      font-weight: 400;
      color: #000;
      padding-left: 8px;

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
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      top: 47px;
      padding: 12px;
      padding-top: 16px;
      background: #fff;
      min-width: 100%;
      right: -1px;
      box-shadow: rgba(0, 0, 0, 0.18) 0px 8px 12px;
      z-index: 3;
      left: -1px;
      height: fit-content;
      min-height: 0;
      box-sizing: border-box;
      border-left: 1px solid #eaeaea;
      border-right: 1px solid #eaeaea;
      border-bottom: 1px solid #eaeaea;

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
          border: 1px solid #eaeaea;
          border-radius: 5px;

          &:hover {
            background: #f9f9f9;
          }
        }
      }

      p {
        font-weight: 500 !important;
        text-transform: uppercase;
        font-size: 14px;
        margin-bottom: 12px;
        margin-left: 8px;

        &.last {
          margin-top: 24px;
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
          font-weight: 400;
          color: #000;
          border-radius: 5px;
          padding: 0 8px;
          height: 40px;
          display: flex;
          align-items: center;
          cursor: pointer;

          &:last-child {
            margin-bottom: 0;
            border-bottom: 0;
          }

          &:hover {
            background: #f9f9f9;
          }
        }
      }
    }
  }
  .auth-buttons {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;

    .inner {
      display: flex;
      align-items: center;
    }

    .auth-reg {
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .login-wrapper {
      border-radius: 8px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 16px;
      background: none;
      padding-right: 0;

      svg {
        &:last-child {
          font-size: 25px;
        };
        transition: 0.3s all ease;
      }
    }

    button {
      height: 30px;
      border-radius: 0px;
      border: none;
      background: transparent;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s all ease;
      //background: #31335d9c;

      &:last-child {
        margin-left: 16px;
        border-right: none;
      }

      &:focus {
        outline: none;
      }

      &.register {
        padding: 0 8px;
        border: none;
        font-weight: 600;
        font-size: 12px;
        text-transform: capitalize !important;

        &:hover {
          text-decoration: underline;
        }

        &:last-child {
          margin-left: 12px;
        }
      }

      &.login {
        display: flex;
        align-items: center;
        border-radius: 0px;


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
            color: #fff;
            background: #0D1F3E;
            height: 18px;
            border-radius: 3px;
            margin-right: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
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
      top: 81px;
      padding: 12px;
      background: #fff;
      width: 340px;
      min-width: 340px;
      right: 90px;
      box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: -webkit-fit-content;
      height: -moz-fit-content;
      height: fit-content;
      border-radius: 10px;
      z-index: 10;
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
    background: #1B1E31;
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

  //&.only-index {
  //  background: transparent;
  //  position: static;
  //  top: 0;
  //
  //  .second-row {
  //    background: transparent;
  //  }
  //
  //  .inner {
  //    background: transparent;
  //
  //    svg {
  //      color: white;
  //    }
  //  }
  //
  //  .notify {
  //    background: transparent !important;
  //  }
  //}
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
    border-radius: 5px !important;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 10px;
    background: #f9f9f9 !important;
    margin-right: 12px;
    cursor: pointer;
    color: #000 !important;
    //border-radius: 5px !important;

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
  width: 0px;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  top: 0;
  right: 0;
  z-index: 99;
  background: #fff;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
  height: 100vh;
  transition: 0.3s all ease;
  overflow-y: scroll;

  &.extend {
    width: 400px;
  }
}
</style>
