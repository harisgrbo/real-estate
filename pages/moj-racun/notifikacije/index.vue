<template>
  <div class="notifications mx-auto w-full">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Obavijesti</p>
      </li>
    </ul>
    <div class="flex flex-row pb-8 justify-between notifications-wrap">
      <ul class="divide-y divide-gray-200 w-full mr-4 pr-4">
        <li class="notification flex flex-col items-start justify-start relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600" v-for="(notification, index) in notifications" :key="index">
          <div class="flex justify-between w-full items-start space-x-3">
            <div class="min-w-0 flex-1">
              <a href="#" class="block focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"></span>
                <p class="text-sm font-medium text-gray-900 truncate">Izdvajanje oglasa</p>
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

      <form class="w-full space-y-8 divide-y divide-gray-200 bg-gray-50 p-4 postavke">
        <div class="space-y-8 divide-y divide-gray-200">
          <div class="divide-y divide-gray-200 space-y-6 sm:space-y-5">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Postavke obavijesti
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Izaberite vrstu obavijesti koje zelite primati
              </p>
            </div>
            <div class="space-y-6 sm:space-y-5 divide-y divide-gray-200">
              <div class="pt-6 sm:pt-5">
                <div role="group" aria-labelledby="label-email">
                  <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                    <div>
                      <div class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-email">
                        Email-om
                      </div>
                    </div>
                    <div class="mt-4 sm:mt-0 sm:col-span-2">
                      <div class="max-w-lg space-y-4">
                        <div class="relative flex items-start">
                          <div class="flex items-center h-5">
                            <input id="comments" name="comments" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="comments" class="font-medium text-gray-700">Comments</label>
                            <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                          </div>
                        </div>
                        <div>
                          <div class="relative flex items-start">
                            <div class="flex items-center h-5">
                              <input id="candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="candidates" class="font-medium text-gray-700">Candidates</label>
                              <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div class="relative flex items-start">
                            <div class="flex items-center h-5">
                              <input id="offers" name="offers" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="offers" class="font-medium text-gray-700">Offers</label>
                              <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
<!--              <div class="pt-6 sm:pt-5">-->
<!--                <div role="group" aria-labelledby="label-notifications">-->
<!--                  <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">-->
<!--                    <div>-->
<!--                      <div class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-notifications">-->
<!--                        Push Notifications-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="sm:col-span-2">-->
<!--                      <div class="max-w-lg">-->
<!--                        <p class="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>-->
<!--                        <div class="mt-4 space-y-4">-->
<!--                          <div class="flex items-center">-->
<!--                            <input id="push-everything" name="push-notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">-->
<!--                            <label for="push-everything" class="ml-3 block text-sm font-medium text-gray-700">-->
<!--                              Everything-->
<!--                            </label>-->
<!--                          </div>-->
<!--                          <div class="flex items-center">-->
<!--                            <input id="push-email" name="push-notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">-->
<!--                            <label for="push-email" class="ml-3 block text-sm font-medium text-gray-700">-->
<!--                              Same as email-->
<!--                            </label>-->
<!--                          </div>-->
<!--                          <div class="flex items-center">-->
<!--                            <input id="push-nothing" name="push-notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">-->
<!--                            <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700">-->
<!--                              No push notifications-->
<!--                            </label>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
            </div>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
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
.notifications {
  display: flex;
  flex-direction: column;
  width: 1180px;

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
