<template>
  <div class="mobile-bottom-navbar">
    <nuxt-link :to="{ path: '/' }">
      <font-awesome-icon icon="home"></font-awesome-icon>
    </nuxt-link>
    <nuxt-link to="/moj-racun/poruke" class="relative">
      <font-awesome-icon icon="envelope"></font-awesome-icon>
      <p class="notify">{{ messagesCount }}</p>
    </nuxt-link>
    <nuxt-link to="/publish">
      <font-awesome-icon icon="plus" class="publish-btn"></font-awesome-icon>
    </nuxt-link>
    <nuxt-link :to="goToUser()">
      <font-awesome-icon icon="user" @click=""></font-awesome-icon>
    </nuxt-link>
    <nuxt-link to="#" class="relative">
      <font-awesome-icon icon="bars" @click="openSidebarMenu"></font-awesome-icon>
      <p class="notify">{{ notifications.length }}</p>
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
    await this.getNotifications()
    await this.getUnreadMessagesCount()
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
    bottom: 4px;
    left: 4px;
    box-sizing: border-box;
    right: 4px;
    min-height: 60px;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-radius:10px;
    z-index: 5;
    padding: 0 24px;
    -webkit-box-shadow: 0px 0px 10px -6px rgb(0 0 0 / 69%);
    box-shadow: 0px 0px 10px -6px rgb(0 0 0 / 69%);

    svg {
      font-size: 20px;
      color: #dcdcdc;

      &.fa-plus {
        color: #D63946;
      }
    }

    .publish-btn {
      background-color: #D63946;
      color: #fff !important;
      border-radius:10px;
      padding: 8px;
    }
  }

  a {
    &.nuxt-link-exact-active {
      svg {
        color: red !important;
      }
    }
  }

  .relative {
    position: relative;

    .notify {
      height: 14px;
      width: 14px;
      border-radius: 4px;
      font-weight: 600;
      color: #fff;
      background: #D63946;
      position: absolute;
      font-size: 10px;
      top: -3px;
      left: 18px;
      text-align: center;
      line-height: 14px;
    }
  }
</style>
