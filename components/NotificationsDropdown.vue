<template>
  <div class="notifications-dropdown modal-inner">
    <div class="modal-header">
      <h2>Obavijesti</h2>
      <i class="material-icons cursor-pointer" @click="$emit('close-notifications')">close</i>
    </div>
    <div class="flow-root flex flex-col justify-between h-full mt-7">
      <div>
        <div v-if="notifications.length" v-for="notification in notifications" class="p-5 notification hover:shadow-md rounded-md">
          <div class="flex items-center justify-between">
            <div class="text-base font-medium truncate text-black" v-if="notification.user">{{ notification.user.name }}</div>
            <div class="text-gray-800 mt-1">{{ $moment(notification.date).format("DD.MM.YYYY") }}</div>
          </div>
          <div class="text-gray-800 font-normal mt-1"> {{
              notification.text
            }}</div>
          <div class="font-medium flex mt-5" @click="$emit('clicked')">
            <nuxt-link :to="notification.action" class="flex justify-between space-x-3">
              <button type="button" class="btn btn-primary py-1 px-2">Pogledaj</button>
            </nuxt-link>
          </div>
        </div>
        <div v-else class="no-notifications flex flex-col items-center">
          <img src="/bell-notify.png" alt="">
          <h2 class="mt-2 p-2 text-standard font-medium">Nemate obavijesti</h2>
        </div>
      </div>
      <ActionButton v-if="notifications.length" :style-options="{ marginBottom: '24px', width: '100%', minHeight: '48px' }" @action="$emit('clear-notifications')" placeholder="Očisti obavijesti" icon="trash-alt"></ActionButton>
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
  overflow-y: scroll;

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

.btn-primary {
  background: hsla(218, 34%, 30%, 1);
  background: radial-gradient(circle, hsla(218, 34%, 30%, 1) 0%, hsla(217, 47%, 22%, 1) 80%);
  background: -moz-radial-gradient(circle, hsla(218, 34%, 30%, 1) 0%, hsla(217, 47%, 22%, 1) 80%);
  background: -webkit-radial-gradient(circle, hsla(218, 34%, 30%, 1) 0%, hsla(217, 47%, 22%, 1) 80%);
  font-size: 13px;
}

.notification {
  padding: 0;
  margin-bottom: 16px;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 16px;
  transition: 0.3s all ease;
  padding-top: 12px;

  &:hover {
   padding-left: 12px;
    padding-right: 12px;
    cursor: pointer;
  }
}
</style>
