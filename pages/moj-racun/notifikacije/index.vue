<template>
  <div class="notifications mx-auto w-full">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Obavijesti</p>
      </li>
    </ul>
    <div class="flex flex-row pb-8 justify-between notifications-wrap" v-if="notifications.length">
      <ul class="divide-y divide-gray-200 w-full">
        <li class="notification flex flex-col items-start justify-start relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600" v-for="(notification, index) in notifications" :key="index">
          <div class="flex justify-between w-full items-start space-x-3">
            <div class="min-w-0 flex-1">
              <a href="#" class="block focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"></span>
                <p class="text-sm font-medium text-gray-900 truncate">{{ notification.data.user.name }}</p>
              </a>
            </div>
            <time datetime="2021-01-27T16:35" class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{{ $moment(notification.created_at).fromNow() }}</time>
          </div>
          <div class="mt-4">
            <p class="line-clamp-2 font-normal text-sm text-gray-600 desc">
              {{ notification.data.text }}
            </p>
          </div>
          <button @action="handleAction(notification.data)" type="button" class="mt-6 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Pogledaj
          </button>
        </li>
      </ul>
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
.notifications-wrap {
  margin-top: 24px;
}

@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}


.notifications {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 80px;
  min-height: calc(100vh - 80px);

  @include for-phone-only {
    width: 100%;
    background: #f9f9f9;
    padding: 16px;
  }

  li.notification {
    height: fit-content;
    padding-bottom:24px;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    p {
      font-size: 16px;
      font-weight: 400;

      &.desc {
        font-size: 14px;
      }
    }

    ::v-deep button{
      width: fit-content;
    }
  }
}
h1 {
  color: rgb(72, 72, 72) !important;
}

.postavke {
  height: fit-content;
}
</style>
