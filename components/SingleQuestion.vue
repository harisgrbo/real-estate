<template>
  <div class="single-question-wrapper">
    <div class="user-info">
      <div>
        <img src="/avatar.jpg" alt="">
        <p>{{ message.user.name }}</p>
      </div>
      <small>{{ message.created_at }}</small>
    </div>
    <div class="content">
      <p>{{ message.question }}</p>
    </div>
    <ActionButton placeholder="Odgovori na pitanje" v-if="message.user.id === $auth.user.id"></ActionButton>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton"

@Component({
  components: {
    ActionButton
  }
})

export default class SingleQuestion extends Vue {
  @Prop({}) message
}
</script>

<style scoped lang="scss">
  .single-question-wrapper {
    padding: 12px;
    display: flex;
    flex-direction: column;
    box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    height: fit-content;
    border-radius: 10px;
    margin-bottom: 24px;

    .user-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      img {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        object-fit: cover;
        margin-right: 24px;

        p {
          font-size: 16px;
          font-weight: 500;
        }
      }
    }

    .content {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #dcdcdc;
      margin-bottom: 12px;
    }
  }
</style>
