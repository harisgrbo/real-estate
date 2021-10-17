<template>
  <div class="mobile-bottom-navbar">
    <nuxt-link :to="{ path: '/' }">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    </nuxt-link>
    <nuxt-link to="/moj-racun/poruke" class="relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <p class="notify" v-if="$auth.user">{{ messagesCount }}</p>
    </nuxt-link>
    <nuxt-link to="/objava">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </nuxt-link>
    <nuxt-link :to="goToUser()">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </nuxt-link>
    <nuxt-link to="#" class="relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click.prevent="openSidebarMenu()">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
<!--      <p class="notify" v-if="$auth.user">{{ notifications.length }}</p>-->
    </nuxt-link>
  </div>
</template>

<script>
import {Component, Vue, Watch} from "nuxt-property-decorator";
import CategoriesList from "@/components/CategoriesList";
import ListingType from "@/components/ListingType";


@Component({
  categories: {
    ListingType,
    CategoriesList,
  }
})

export default class MobileBottomNavbar extends Vue {
  messagesCount = 0;
  notifications = []

  openCategoriesModal() {
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

  async created() {
    if(this.$auth.user) {
      await this.getNotifications()
      await this.getUnreadMessagesCount()
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

  async getUnreadMessagesCount()
  {
    try {
      let res = await this.$axios.get('/profile/messages/count');

      this.messagesCount = res.data.data
    } catch (e) {
      console.log(e)
    }
  }

  mounted() {
    this.realtime();
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

  goToUser() {
    if(this.$auth.user) {
      return '/users/' + this.$auth.user.id
    } else {
      return '/auth/login'
    }
  }

  openSidebarMenu() {
    this.$emit('open-sidenav')
  }
}
</script>

<style scoped lang="scss">
  .mobile-bottom-navbar {
    position: fixed;
    bottom: 0px;
    left: 0px;
    box-sizing: border-box;
    right: 0px;
    min-height: 60px;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 5;
    padding: 0 24px;
    border-top-left-radius: 15px;
    box-shadow: 0px 0px 9px 1px rgb(0 0 0 / 27%);
    border-top-right-radius: 15px;

    svg {
      font-size: 20px;
      border-radius: 50%;
      padding: 10px;
      height: 40px;
      width: 40px;
      color: #0B8489;
    }
  }

  a {
    &.nuxt-link-exact-active {
      svg {
        color: #023246 !important;
        background: #f1f1f1;
        border-radius: 10px;
        padding: 10px;
        height: 43px;
        width: 43px;
      }
    }
  }

  .relative {
    position: relative;

    .notify {
      height: 14px;
      width: 14px;
      border-radius: 7px;
      font-weight: 600;
      color: #fff;
      background: #D63946;
      position: absolute;
      font-size: 10px;
      top: 6px;
      left: 21px;
      text-align: center;
      line-height: 14px;

    }
  }
</style>
