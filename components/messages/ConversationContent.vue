<template>
  <div class="conversation-list-wrapper">
    <div class="conversation-wrapper" v-for="(message, index) in messages" :class="[ isMe(message)? 'me' : '' ]">
      <img src="/avatar.jpg" alt="" :class="[(index < messages.length - 1 && message.sender.id !== messages[index + 1].sender.id) || index === messages.length - 1? '' : 'no-image']">
      <div class="bubble">
        <p>{{ message.content }}</p>
        <div class="message-info">
          <p>{{ $moment(message.created_at).format('HH:mm') }}</p>
          <font-awesome-icon v-if="message.delivered" icon="reply-all" class="status-icon delivered"></font-awesome-icon>
          <font-awesome-icon v-else icon="reply" class="status-icon sent"></font-awesome-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout() { return "home" }
})

export default class ConversationContent extends Vue {
  @Prop({ type: Array }) messages;

  created() {

  }

  isMe(message) {
    return message.sender.id === this.$auth.user.id;
  }
}
</script>

<style scoped lang="scss">
.conversation-list-wrapper {
  display: flex;
  padding: 12px;
  height: calc(100vh - 458px);
  overflow-y: scroll;
  flex-direction: column;
}
.conversation-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  align-items: flex-start;
  justify-content: flex-start;

  &.me {
    flex-direction: row-reverse;

    .bubble {
      background: #1B1E31;
      border-radius: 10px;
      border-top-right-radius: 0;

      .message-info {
        display: flex;
        align-items: center;
        font-size: 12px !important;
        margin-top: 12px;
        justify-content: flex-start;
        p {
          font-size: 12px;
        }
      }

      p {
        color: #fff;
      }

      svg {
        display: flex;
      }

      .status-icon {
        font-size: 13px;
        color: #fff;
        margin-right: 12px;
      }
    }

    img {
      margin-right: 0;
      margin-left: 12px;

      &.no-image {
        opacity: 0;
      }
    }
  }

  img {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    object-fit: cover;
    margin-right: 12px;
  }

  .bubble {
    padding: 12px;
    background: #fff;
    border-radius: 10px;
    border-top-left-radius: 0;
    max-width: 50%;
    box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
    margin-bottom: 8px;

    .message-info {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      font-size: 12px !important;
      margin-top: 12px;
      justify-content: flex-start;
      p {
        font-size: 12px;
      }
    }

    svg {
      display: none;
    }
    p {
      line-height: 21px;
      font-size: 16px;
      font-weight: 500;
      color: #444;
    }
  }
}

</style>
