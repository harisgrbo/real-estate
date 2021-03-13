<template>
  <div class="notifications-dropdown">
    <div class="header">
      <h2>Obajveštenja</h2>
      <i class="material-icons" @click="$emit('close-notifications')">close</i>
    </div>
    <ul>
      <li>
        <nuxt-link to="#">
          <font-awesome-icon icon="arrow-circle-right"></font-awesome-icon>
          <p>Haris vam je poslao privatnu poruku</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {}
})

export default class NotificationsDropdown extends Vue{
}
</script>

<style scoped lang="scss">
.notifications-dropdown {
  padding: 12px;
  padding-bottom: 0;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    color: #484848;
    padding-bottom: 14px;
    padding-top: 8px;

    h2 {
      font-weight: 500;
    }
  }

  ul {
    padding: 0;
    display: flex;
    flex-direction: column;

    li {
      height: 50px;
      border-bottom: 1px solid #ebebeb;
      color: #484848;
      display: flex;
      width: 100%;
      justify-content: flex-start;
      align-items: center;
      font-size: 16px;
      font-weight: 400;

      &:last-child {
        border-bottom: none;
      }

      a {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;

        p {
          margin-left: 12px !important;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
