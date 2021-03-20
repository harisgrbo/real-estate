<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Obavijesti</p>
      </li>
    </ul>
    <h1 class="heading" v-if="!$device.isMobile">Obavijesti</h1>
    <ul class="notifications">
      <li v-for="(notification, index) in notifications" :key="index">
        <p>{{ notification.data.text }}</p>
        <ActionButton placeholder="Pogledaj" @action="handleAction(notification.data)"></ActionButton>
      </li>
    </ul>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',
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
.notifications {
  display: flex;
  flex-direction: column;
  width: 100%;

  li {
    height: fit-content;
    padding-bottom:24px;
    margin-bottom: 24px;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
      font-weight: 500;
    }

    ::v-deep button{
      width: fit-content;
    }
  }
}
h1 {
  color: rgb(72, 72, 72) !important;
}
</style>
