<template>
  <div class="preview-wrapper-inner mx-auto w-full">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Obavijesti</p>
      </li>
    </ul>
    <div class="flex flex-row pb-8 justify-between notifications-wrap" v-if="notifications.length">
      <ul class="divide-y divide-gray-200 w-full">
        <li class="notification flex flex-col items-start justify-start relative bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600" v-for="(notification, index) in notifications" :key="index">
          <nuxt-link :to="notification.data.action" class="flex flex-col w-full">
            <div class="flex justify-between w-full items-start">
              <div class="min-w-0 flex-1">
                <a href="#" class="block focus:outline-none" v-if="notification.data.user">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ notification.data.user.name }}</p>
                </a>
              </div>
              <time datetime="2021-01-27T16:35" class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{{ $moment(notification.created_at).fromNow() }}</time>
            </div>
            <div class="mt-4">
              <p class="line-clamp-2 font-normal text-sm text-gray-900 desc">
                {{ notification.data.text }}
              </p>
            </div>
            <button @action="handleAction(notification.data)" type="button">
              Pogledaj
            </button>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="flex flex-row pb-8 justify-between notifications-wrap" v-else>
      <img src="/bell-notify.png" alt="">
      <h2 class="mt-2 p-2 text-standard text-gray-800 font-medium">Nemate obavijesti</h2>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
})

export default class notifikacije extends Vue {
  notifications = []

  async created() {
    await this.getNotifications();
  }

  handleAction(a) {
    this.$router.push(a.action);
  }

  async getNotifications() {
    try {
      let res = await this.$axios.get('/profile/notifications')
      this.notifications = res.data.data;

      console.log(res)
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.preview-wrapper-inner {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 4px;
  padding: 24px;
}




  .notification {
    margin-bottom: 16px;
    border-bottom: 1px solid #f1f1f1;
    transition: 0.3s all ease;
    padding: 12px 12px 16px 12px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @include for-phone-only {
      padding: 0 !important;
      padding-bottom: 24px !important;
    }
    p {
      font-size: 16px;
      font-weight: 400;

      &.desc {
        font-size: 14px;
      }
    }

  }

h1 {
  color: rgb(72, 72, 72) !important;
}

.postavke {
  height: fit-content;
}

.notifications-wrap {
  margin-top: 36px;
  width: 100%;
  height: 100%;
  background: #fff;

  button {
    height: 44px;
    border-radius: 4px;
    background: #1F2937 !important;
    width: fit-content;
    color: #fff;
    padding: 0 12px;
    margin-top: 12px;
  }
}
</style>
