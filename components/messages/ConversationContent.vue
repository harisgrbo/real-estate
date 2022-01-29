<template>
  <div class="conversation-list-wrapper">
    <div class="conversation-wrapper" v-for="(message, index) in messages" :key="index" :class="[ isMe(message)? 'me' : '' ]">
      <img src="/avatar.jpg" alt="" :class="[(index < messages.length - 1 && message.sender.id !== messages[index + 1].sender.id) || index === messages.length - 1? '' : 'no-image']">
      <div class="bubble">
        <p>{{ message.content }}</p>
        <div class="message-info">
          <p>{{ $moment(message.created_at).format('HH:mm') }}</p>
          <label v-if="message.delivered" >dostavljeno..</label>
          <label v-else >šalje se..</label>
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
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.no-image {
  opacity: 0 !important;
}

.conversation-list-wrapper {
  display: flex;
  padding: 12px;
  height: calc(100vh - 413px);
  overflow-y: scroll;
  flex-direction: column-reverse;
  overflow: auto;

  @include for-phone-only {
    height: calc(100vh - 475px);
  }
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
      border-radius: 6px;
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

        label {
          font-size: 9px;
          color: #fff;
          margin-right: 8px;
          display: flex;
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
    }
  }

  img {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    object-fit: cover;
    margin-right: 12px;

    @include for-phone-only {
      width: 30px;
      height: 30px;
      border-radius: 15px;
    }
  }

  .bubble {
    padding: 12px;
    background: #fff;
    border-radius: 6px;
    border-top-left-radius: 0;
    max-width: 50%;
    box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
    margin-bottom: 8px;

    @include for-phone-only {
      padding: 12px;
    }

    .message-info {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      font-size: 12px !important;
      margin-top: 12px;
      justify-content: flex-start;

      @include for-phone-only {
        margin-top: 4px !important;
      }
      p {
        font-size: 12px;

        @include for-phone-only {
          font-size: 10px !important;
        }
      }

      label {
        display: none;
      }
    }

    svg {
      display: none;
    }
    p {
      line-height: 21px;
      font-size: 15px;
      font-weight: 400;
      color: #000;

      @include for-phone-only {
        font-size: 13px;
      }
    }
  }
}

</style>
