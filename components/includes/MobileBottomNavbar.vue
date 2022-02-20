<template>
  <div class="mobile-bottom-navbar">
    <nuxt-link :to="{ path: '/' }">
      <img src="/003-home.png" alt="">
      <span>Početna</span>
    </nuxt-link>
    <nuxt-link to="/moj-racun/poruke" class="relative" v-if="$auth.user">
      <img src="/004-conversation.png" alt="">
      <p class="notify" v-if="messagesCount > 0">{{ messagesCount }}</p>
      <span>Poruke</span>
    </nuxt-link>
    <nuxt-link :to="redirectToPublish()" v-if="$auth.user">
      <img src="/005-add.png" alt="">
      <span>Objava</span>
    </nuxt-link>
    <nuxt-link :to="goToUser()">
      <img src="/001-user.png" alt="">
      <span>{{ $auth.user ? 'Profil' : 'Prijavi se' }}</span>
    </nuxt-link>
    <nuxt-link to="" class="relative" v-if="$auth.user">
      <div @click="openSidebarMenu" class="flex flex-col items-center justify-center">
        <img src="/002-menu.png" alt="">
        <span>Meni</span>
      </div>
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

  redirectToPublish() {
    if(this.$auth.user) {
      if(this.$auth.user.user_type === 'investor') {
        return '/objava-investitor';
      } else {
        return '/objava'
      }
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

  beforeDestroy() {
    if (this.$auth.user) {
      this.$echo.leave('App.Models.User.' + this.$auth.user.id);
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

  snackbarNotification(text) {
    this.$toast.open({
      message: text,
      type: 'info',
      duration: 5000
    });
  }

  goToUser() {
    if(this.$auth.user) {
      if(this.$auth.user.user_type === 'agency') {
        return '/pravno-lice/' + this.$auth.user.id
      } else if(this.$auth.user.user_type === 'agent'){
        return '/agent/' + this.$auth.user.id
      } else {
        return '/korisnik/' + this.$auth.user.id
      }
    } else {
      return '/prijava'
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
    min-height: 70px;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 5;
    padding: 0 24px;
    border-top: 1px solid #EBEBEB;
    margin-bottom: env(safe-area-inset-bottom) !important;
    img {
      height: auto !important;
      width: 24px !important;
      min-width: 24px !important;
      margin-bottom: 8px;
    }
  }
  .relative {
    position: relative;

    .notify {
      height: 14px;
      width: fit-content;
      border-radius: 7px;
      font-weight: 600;
      color: #fff;
      background: #D63946;
      position: absolute;
      font-size: 10px;
      top: -4px;
      left: 20px;
      text-align: center;
      line-height: 14px;
      padding: 0 3px;
    }
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    span {
      font-size: 10px;
      font-weight: 400;
    }
  }

  a.nuxt-link-exact-active {
    span {
      color: #1F2937 !important;
      font-weight: 800 !important;
    }
  }
</style>
