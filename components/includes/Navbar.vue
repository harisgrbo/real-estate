<template>
  <div :class="['navbar-wrapper w-full lg:px-20 xl:px-20 up:px-20 lg:shadow-sm xl:shadow-sm up:shadow-sm sm:shadow-none max-w-full sm:px-4', this.$route.name === 'index' ? 'only-index' : '']">
    <div class="second-row mx-auto w-full">
      <div class="flex flex-row items-center">
        <div class="img-wrapper" :class="[$device.isMobile && focused === true ? 'hide' : '']">
          <img @click="$router.push('/')" :src="[ $device.isMobile ? '/msquare-mobile.png' : '/msquare.png']" class="main-logo" height="40" alt="">
        </div>
      </div>
      <div class="flex items-center justify-center w-full centralize">
        <div class="relative mr-2" v-if="!$device.isMobile">
          <div class="flex flex-row items-center ml-4 cursor-pointer hover:bg-gray-50 rounded-sm p-2" @click="showOtherLinksDropdown = !showOtherLinksDropdown">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>

          <OtherLinksDropdown @close-links="showOtherLinksDropdown = false" v-if="showOtherLinksDropdown"></OtherLinksDropdown>
        </div>
        <div class="input-wrapper"
             @focusin="focused = true"
             :class="[ focused? 'focused' : '']"
             v-on-clickaway="away"
        >
          <svg @click="search" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text"
                 ref="search"
                 v-model="searchInput"
                 @keyup.enter="search"
                 @input="showSuggests"
                 placeholder="Npr. stan Sarajevo.."
          >
          <div class="flex flex-row">
          <span class="relative z-0 inline-flex ml-2 rounded-sm border border-gray-200 selected-cat-type"  v-if="selectedCategory !== null">
            <div type="button" class="relative inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              {{ selectedCategory.title }}
            </div>
            <div @click="selectedCategory = null" type="button" class="-ml-px cursor-pointer relative inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </span>
            <span class="relative z-0 ml-2 inline-flex rounded-sm border border-gray-800 selected-cat-type"  v-if="selectedType !== null">
            <div type="button" class="relative inline-flex items-center px-1 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              {{ selectedType.title }}
            </div>
            <div @click="selectedType = null" type="button" class="-ml-px cursor-pointer relative inline-flex items-center px-1 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </span>
          </div>

          <button v-if="focused === true" class="close">
            <i class="material-icons" @click="clearSearchTerm">close</i>
          </button>
          <!-- Autocomplete dropdown -->
          <div class="autocomplete-dropdown" v-if="focused === true">
            <div class="quick-filters">
              <div class="flex flex-row items-center">
                <button @click="toggleCategories" type="button" class="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-gray-500">
                  {{ selectedCategory !== null ? selectedCategory.title : 'Kategorija' }}
                </button>
                <button @click="$modal.show('type')" type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {{ selectedType !== null ? selectedType.title : 'Vrsta oglasa' }}
                </button>
              </div>
              <button @click="selectedType = null; selectedCategory = null" type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Očisti filtere
              </button>
            </div>
            <p v-if="$auth.user && savedSearches.length" class="saved-title">Snimljene pretrage</p>
            <ul v-if="$auth.user && savedSearches.length" class="saved-searches">
              <li v-for="search in savedSearches" :key="search.id" @click="goToSearch(search)">
                <p>{{ search.description }}</p>
              </li>
            </ul>
            <p v-if="suggestions.length" class="last">Rezultati pretrage</p>
            <ul>
              <li v-for="suggest in suggestions" :key="suggest.id" @click="goToSearchFromSuggestion(suggest)">
                {{ suggest }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button v-if="$auth.user && $device.isMobile" class="login-a notify relative" @click="$modal.show('notifications')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-3" fill="none" viewBox="0 0 24 24" stroke="#1F2937">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <div class="notify" v-if="notifications.length">{{ notifications.length }}</div>
      </button>
      <div class="auth-buttons" v-if="!$device.isMobile">
        <ActionButton v-if="$auth.user" type="submit" @action="redirectToPublish" placeholder="Objava" :style-options="{ border: '2px solid #1F2937', color: '#1F2937', borderRadius: '4px', height: '42px', marginRight: '24px', fontSize: '13px' }" :loading="false"></ActionButton>

        <div class="inner overflow-x-hidden">
          <div v-if="! $auth.user" class="auth-reg">
            <button @click="$router.push('/auth/login')">Prijavi se</button>
          </div>
<!--          <button v-if="$auth.user" class="login-a mr-2" @click="$router.push('/kredit')">-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />-->
<!--            </svg>-->
<!--            <span class="text-medium text-gray-800 bg-gray-50 rounded-sm px-3 py-1 ml-0">{{ $auth.user.credits }}</span>-->
<!--          </button>-->
          <button v-if="$auth.user" class="login-a">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"  @click="goToMessages()">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span class="notify" v-if="messagesCount">{{ messagesCount }}</span>
          </button>
          <button v-if="$auth.user" class="login-a notify" @click="showNotifications = true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="notify" v-if="notifications.length">{{ notifications.length }}</span>
          </button>
          <div v-if="$auth.user" class="login-wrapper bg-gray-50 rounded-full cursor-pointer" @click="showUserDropdown = !showUserDropdown">
            <img class="rounded-full w-9 h-9 min-w-9 max-w-9 navbar-avatar" alt="A"
                 :src="[ $auth.user.avatar_url !== null ? $auth.user.avatar_url  : '/noimage.jpeg']" />
            <span class="flex items-center pl-3 py-2">
              {{ $auth.user.name }}
            </span>
            <button class="bg-transparent hover focus:outline-none" v-if="showUserDropdown === false">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
             <button class="bg-transparent hover focus:outline-none" v-else>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            </div>
          <!-- User dropdown -->
          <div class="user-dropdown" v-if="showUserDropdown" v-on-clickaway="closeSidebar">
            <sidenav></sidenav>
          </div>
          <client-only>
            <div :class="[ 'notification', showNotifications ? 'extend' : '' ]">
              <NotificationsDropdown @clicked="$modal.hide('notifications')" :notifications="notifications" @close-notifications="handleCloseNotifications" @clear-notifications="handleClearNotifications"></NotificationsDropdown>
            </div>
          </client-only>
        </div>
      </div>
    </div>
    <client-only>
      <modal @before-open="beforeOpen" @before-close="beforeClose" name="type" :adaptive="true" height="100%">
        <ListingType @selected-type="handleSelectedType" @close="$modal.hide('type')"></ListingType>
      </modal>
    </client-only>
    <client-only>
      <modal @before-open="beforeOpen" @before-close="beforeClose" name="notifications" :adaptive="true" height="100%">
        <NotificationsDropdown @clicked="$modal.hide('notifications')" :notifications="notifications" @close-notifications="$modal.hide('notifications')" @clear-notifications="handleClearNotifications"></NotificationsDropdown>
      </modal>
    </client-only>
    <Snackbar></Snackbar>
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
import OtherLinksDropdown from "../OtherLinksDropdown";
import ActionButton from "@/components/actionButtons/ActionButton";
import Snackbar from "@/components/global/Snackbar"

@Component({
  components: {
    ActionButton,
    Snackbar,
    OtherLinksDropdown,
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
  showOtherLinksDropdown = false;

  mounted() {
    this.realtime();
  }

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }


  realtime() {
    if (this.$auth.user) {
      this.$echo.private('App.Models.User.' + this.$auth.user.id).notification(notification => {
        if (notification.type === 'App\\Notifications\\NewMessageNotification') {
          if (this.$route.fullPath !== '/moj-racun/poruke') {
            this.messagesCount++;
          } else {
            this.handleReadMessageNotifications();
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

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  async created() {
    await this.getSearches()
    if(this.$auth.user) {
      await this.getNotifications();
      await this.getUnreadMessagesCount();
    }
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
    let q = buildTitle(s);
    this.$router.push('/pretraga?q=[' + q + ']');
  }

  goToSearchFromSuggestion(s) {
    let words = s.split(' ');
    words.pop();

    s = words.join(' ');

    let q = buildTitle(s);
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

  async handleReadMessageNotifications() {
    try {
      await this.$axios.post('/profile/messages/read');
    } catch (e) {
      console.log(e)
    }
  }

  async handleClearNotifications() {
    await this.handleCloseNotifications();
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
  z-index: 12;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  box-sizing: border-box;
  //box-shadow: 0px 5px 9px rgba(0,0,0,0.03) !important;


  @include for-phone-only {
    padding: 0 16px;
    border-bottom: none;
    background: #fff !important;
    box-shadow: none !important;
  }

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
    min-width: fit-content;

    @include for-phone-only {
      width: fit-content;
      flex: 0;
    }

    img {
      height: 40px;
      min-width: fit-content;
    }

    @include for-phone-only {
      img {
        height: 48px;
        width: 58px;
        min-width: 58px;
        margin-right: 16px;
      }
    }

    &.hide {
      @include for-phone-only {
        display: none;
      }
    }

  }
  .input-wrapper {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    padding: 0 12px;
    background: #F3F3F4;
    flex: 2;
    position: relative;
    transition: 0.3s all ease;
    max-width: 600px;

    @include for-phone-only {
      box-sizing: border-box;
      background: #f9f9f9;
      border: none;
    }

    ::placeholder {
      color: #adadad;
    }

    &.focused {
      box-shadow: 0px 8px 20px rgba(0,0,0,0.09);
      border-radius: 4px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      z-index: 1;
      background: #fff;
      border: none;

      @include for-phone-only {
        position: absolute;
        left: 0px;
        right: 0px;
        background: #fff;
        top: 0px;
        border: none;
        height: 60px;

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
      background: transparent;

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
      z-index: 99;
      left: -1px;
      height: fit-content;
      min-height: 0;
      box-sizing: border-box;
      border-left: 1px solid #eaeaea;
      border-right: 1px solid #eaeaea;
      border-bottom: 1px solid #eaeaea;

      @include for-phone-only {
        padding: 16px;
        padding-top: 16px;
        top: 60px;
      }

      .quick-filters {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        button {
          border: 1px solid #1F2937;
          border-radius: 4px;

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
    max-width: fit-content;
    justify-content: flex-end;
    min-width: fit-content;

    .inner {
      display: flex;
      align-items: center;
    }

    .auth-reg {
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      min-width: fit-content;

      button {
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        padding: 0 12px;
        min-width: fit-content;
        background: #F3F3F4;
        flex: 2;
        position: relative;
        transition: 0.3s all ease;

        &:hover {
          background: #e0e0e0 !important;
        }
      }
    }

    .login-wrapper {
      border-radius: 20px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 16px;
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
      font-size: 14px !important;
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

      &.login-a {
        display: flex;
        align-items: center;
        border-radius: 0px;

        img {
          height: 20px
        }

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
            width: 18px;
            border-radius: 13px;
            margin-right: 4px;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: -14px;
            margin-left: -18px;
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
      position: fixed;
      top: 80px;
      padding: 12px;
      background: #fff;
      width: 340px;
      min-width: 340px;
      right: 0px;
      box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: -webkit-fit-content;
      height: -moz-fit-content;
      height: fit-content;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      z-index: 500;
      height: fit-content;
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
      background: #1F2937 !important;

      svg {
        color: #fff !important
      }
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
  position: fixed;
  width: 400px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  top: 0;
  bottom: 0;
  right: -400px;
  width: 0;
  z-index: 400;
  background: #fff;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
  transition: 0.3s all ease;

  @include for-phone-only {
    right: -100vw;
  }

  &.extend {
    right: 0;
    width: 400px;

    @include for-phone-only {
      width: 100vw;
      right: 0 !important;
    }
  }
}
.selected-cat-type {
  @include for-phone-only {
    display: none;
  }
}

#modals-container ::v-deep .vm--container ::v-deep .vm--modal {
  @include for-phone-only {
    top: 0px !important;
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    height: calc(100vh - 20px) !important;
    padding-bottom: 50px !important;
  }
}

.relative {
  z-index: 0;
  .notify {
    height: 14px;
    width: 14px;
    border-radius: 7px;
    font-weight: 600;
    color: #fff;
    background: #D63946;
    position: absolute;
    font-size: 10px;
    top: -1px;
    left: 25px;
    text-align: center;
    line-height: 14px;

  }
}

.first-part {
  font-size: 20px;
  font-weight: 600;
  font-family: 'Outfit', sans-serif;
  color: #002F34;
  margin-left: 5px;
}
.second-part {
  font-size: 20px;
  font-weight: 500;
  font-family: 'Outfit', sans-serif;
  color: #002F34;
}

.navbar-avatar {
  min-height: 36px;
  max-height: 36px;
  min-width: 36px;
  max-width: 36px;
}

.centralize {
  //flex: 2;
}
</style>
