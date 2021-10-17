<template>
  <div class="notifications-dropdown modal-inner">
    <div class="modal-header">
      <h2>Obavijesti</h2>
      <i class="material-icons cursor-pointer" @click="$emit('close-notifications')">close</i>
    </div>
    <div class="flow-root flex flex-col justify-between h-full">
      <ul role="list" class="divide-y divide-gray-200" v-if="notifications.length">
        <li v-for="notification in notifications" class="cursor-pointer w-auto inline-block relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
          <div class="flex justify-between space-x-3">
            <div class="min-w-0 flex-1">
              <a href="#" class="block focus:outline-none mb-1" v-if="notification.user">
                <span class="absolute inset-0" aria-hidden="true"></span>
                <p class="text-sm font-medium text-gray-900 truncate">{{ notification.user.name }}</p>
              </a>
              <div>
                <p class="line-clamp-2 text-sm text-gray-600">
                  {{
                    notification.text
                  }}
                </p>
              </div>
            </div>
            <time class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{{ $moment(notification.date).format("DD.MM.YYYY") }}</time>
          </div>
        </li>

        <!-- More messages... -->
      </ul>
      <div v-else class="no-notifications flex flex-col items-center">
        <img src="/bell-notify.png" alt="">
        <h2 class="mt-2 p-2 text-standard font-medium">Nemate obavijesti</h2>
      </div>
      <ActionButton v-if="notifications.length" :style-options="{ width: '100%' }" @action="$emit('clear-notifications')" placeholder="Očisti obavijesti" icon="trash-alt"></ActionButton>
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
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.notifications-dropdown {
  height: 100vh;

  @include for-phone-only {
    height: calc(100vh - 260px);
  }


}

.no-notifications {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 60px;
  }
}

ul, .no-notifications {
  height: calc(100vh - 340px);
}
</style>
