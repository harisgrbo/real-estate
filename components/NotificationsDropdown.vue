<template>
  <div class="notifications-dropdown pb-6">
    <div class="header p-6">
      <h2>Obavještenja</h2>
      <i class="material-icons cursor-pointer" @click="$emit('close-notifications')">close</i>
    </div>
    <div class="flow-root p-4 flex flex-col justify-between h-full">
      <ul class="-mb-8 p-4 min-h-full" v-if="notifications.length">
        <li v-for="notification in notifications">
          <div class="relative pb-8">
            <span class="absolute top-4 left-4 -ml-px h-3/4 w-0.5 bg-gray-200" aria-hidden="true"></span>
            <div class="relative flex space-x-3">
              <div>
            <span class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
              <!-- Heroicon name: solid/user -->
              <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </span>
              </div>
              <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                <div>
                  <p v-if="notification.user" class="text-gray-800 font-medium mb-3">{{ notification.user.name }}</p>
                  <p class="text-sm text-gray-500">{{
                      notification.text
                    }}</p>
                </div>
                <div class="text-right text-sm whitespace-nowrap text-gray-500">
                  <time datetime="2020-09-20">{{ $moment(notification.date).format("DD.MM.YYYY") }}</time>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="no-notifications flex flex-col items-center">
        <img src="/messages-1.jpg" alt="">
        <h2 class="mt-2 p-2 text-standard font-medium rounded-sm bg-gray-50">Nemate obavijesti</h2>
      </div>
      <ActionButton :style-options="{ width: '100%' }" @action="$emit('clear-notifications')" placeholder="Očisti obavijesti" icon="trash-alt"></ActionButton>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ActionButton from "./actionButtons/ActionButton";

@Component({
  components: {ActionButton}
})

export default class NotificationsDropdown extends Vue {
  @Prop({
    type: Array,
    required: true
  }) notifications;

}
</script>

<style scoped lang="scss">
.notifications-dropdown {
  height: calc(100vh - 120px);

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    color: #000;
    h2 {
      font-weight: 500;
      font-size: 16px;
    }
  }

}

.no-notifications {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  img {
    height: 150px;
  }
}
</style>
