<template>
  <div class="conversation-list-wrapper">
    <div class="single-conversation"
         v-for="conversation in conversations"
         @click="setSelectedConversation(conversation)"
         :class="[ (conversation.id === (value ? value.id: null)) ? 'active' : '']"
    >
      <img src="/avatar.jpg" alt="">
      <div class="single-conversation__inner">
        <div class="inner-wrap">
          <div class="username">
            <span></span>
            <p>{{ others(conversation).map(item => item.name).join(',') }}</p>
          </div>
          <b>{{ $moment(conversation.last_message.created_at).format("DD.MM.YYYY") }}</b>
        </div>
        <p class="type">{{ others(conversation).length > 2? 'GRUPNI RAZGOVOR' : '' }}</p>
        <p>{{ conversation.last_message.content }}</p>
        <div class="unread" v-if="conversation.unread !== 0"><b>{{ conversation.unread }}</b> nove poruke</div>
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

export default class ConversationList extends Vue {
  @Prop({ type: Array }) conversations;
  @Prop() value;

  others(conversation) {
    return conversation.users.filter( item => item.id !== this.$auth.user.id);
  }

  created() {
    console.log(this.conversations, 'konz')
  }

  setSelectedConversation(c) {
    this.$emit('input', c);
  }
}
</script>

<style scoped lang="scss">
.conversation-list-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 378px);
  overflow-y: scroll;

  .single-conversation {
    width: 100%;
    padding: 16px 12px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    border-bottom: 1px solid #f7f7f7;
    cursor: pointer;

    &.active {
      background: #f7f7f7;
      border-radius: 10px;

      .username p {
        font-weight: 600;
      }
    }

    img {
      height: 60px;
      width: 60px;
      border-radius: 30px;
      object-fit: cover;
    }

    &__inner {
      display: flex;
      flex-direction: column;
      margin-left: 12px;
      justify-content: space-between;
      width: 100%;

      .type {
        font-weight: 600 !important;
        font-size: 12px;
      }

      .inner-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        b {
          font-weight: 500;
          font-size: 13px;
        }
      }

      p {
        line-height: 18px;
        font-size: 14px;
      }

      .username {
        display: flex;
        flex-direction: row;
        align-items: center;

        p {
          font-weight: 500;
          font-size: 16px;
        }

        span {
          height: 8px;
          width: 8px;
          border-radius: 4px;
          background: green;
          margin-right: 12px;
        }
      }
    }
  }
}

.unread {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 4px;
  font-size: 13px;
  font-weight: 500;
  b {
    background: #D63946;
    min-height: 16px;
    width: 16px;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 13px;
    color: #fff;
    margin-right: 4px;
  }
}
</style>
