<template>
  <div class="message-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Poruke</p>
      </li>
    </ul>
    <div class="content">
      <div class="conversation-list">
        <div class="search-wrapper">
          <input type="text">
          <font-awesome-icon icon="search"></font-awesome-icon>
        </div>
        <div class="heading-inner">
          <h1>Konverzacije</h1>
          <div class="buttons-wrapper">
            <button>
              <font-awesome-icon icon="plus"></font-awesome-icon>
            </button>
            <button>
              <font-awesome-icon icon="ellipsis-v"></font-awesome-icon>
            </button>
          </div>
        </div>
        <div class="conversation-list inner">
          <ConversationList :conversations="conversations" v-model="currentConversation" @input="handleSelectedConversation"></ConversationList>
        </div>
      </div>
      <div class="conversation" v-if="!$device.isMobile">
        <div class="heading-wrapper center">
          <h1>{{ currentConversation !== null? others(currentConversation).map(item => item.name).join(',') : '' }}</h1>
        </div>
        <div class="messages-wrap">
          <ConversationContent v-if="messagesLoaded" :messages="messages"></ConversationContent>
          <div v-else class="loading-wrapper">
            <img src="/load.svg" alt="" class="loading-svg">
          </div>
        </div>
        <div class="main-input-wrapper">
          <input type="text" placeholder="Upišite poruku.." v-model="messageContent" @keyup.enter="sendMessage">
          <div class="buttons">
            <font-awesome-icon @click="showEmoji = !showEmoji" icon="grin"></font-awesome-icon>
            <font-awesome-icon icon="paperclip"></font-awesome-icon>
            <font-awesome-icon icon="paper-plane" class="last" @click="sendMessage"></font-awesome-icon>
            <VEmojiPicker v-if="showEmoji" @select="selectEmoji" v-on-clickaway="away" />
          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="heading-wrapper">
          <img src="/avatar.jpg" alt="">
          <h1>Haris Grbo</h1>
        </div>
        info
      </div>
    </div>
    <client-only>
      <modal name="poruke" :adaptive="true" height="100%" @closed="closeModal">
        <div class="modal-inner">
          <div class="modal-header">
            <h2>Razgovor sa {{ currentConversation !== null? others(currentConversation).map(item => item.name).join(',') : '' }}</h2>
            <i class="material-icons" @click="$modal.hide('poruke')">close</i>
          </div>
          <div class="modal-content">
            <div class="conversation">
              <div class="messages-wrap">
                <ConversationContent v-if="messagesLoaded" :messages="messages"></ConversationContent>
                <div v-else class="loading-wrapper">
                  <img src="/load.svg" alt="" class="loading-svg">
                </div>
              </div>
              <div class="main-input-wrapper">
                <input type="text" placeholder="Upišite poruku.." v-model="messageContent" @keyup.enter="sendMessage">
                <div class="buttons">
                  <font-awesome-icon @click="showEmoji = !showEmoji" icon="grin"></font-awesome-icon>
                  <font-awesome-icon icon="paperclip"></font-awesome-icon>
                  <font-awesome-icon icon="paper-plane" class="last" @click="sendMessage"></font-awesome-icon>
                  <VEmojiPicker v-if="showEmoji" @select="selectEmoji" v-on-clickaway="away" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ConversationList from "@/components/messages/ConversationList"
import ConversationContent from "@/components/messages/ConversationContent"
import { v4 as uuidv4 } from 'uuid';
import { mixin as clickaway } from 'vue-clickaway';

@Component({
  components: {
    ConversationList,
    ConversationContent,
  },
  mixins: [ clickaway ],
  middleware: ['auth'],
  layout() { return "home" },
  async asyncData(ctx) {
    let conversations = [];

    try {
      let res = await ctx.app.$axios.get('/conversations');
      conversations = res.data.data;
    } catch(e) {
      console.log(e)
    }

    return {
      conversations
    }
  }
})
export default class poruke extends Vue {
  currentConversation = null;
  messages = [];
  showEmoji = false;
  messageContent = '';
  messagesLoaded = true;

  mounted() {
    this.realtime();
  }

  selectEmoji(emoji) {
    this.messageContent += emoji.data;
  }

  away() {
    this.showEmoji = false;
  }

  realtime() {
    this.$echo.private('App.Models.User.' + this.$auth.user.id).notification(notification => {
      if (notification.type === 'broadcast.message') {
        let message = notification.message;
        let conversation = message.conversation;

        let index = this.conversations.findIndex(item => item.id === conversation.id)

        if (index === -1) {
          conversation.unread = 1;

          this.conversations.unshift(conversation);
        }
      }
    })

    this.conversations.forEach(conversation => {
      this.$echo.private(`messaging.${conversation.id}`).listen('.message', event => {
        let message = event.message;
        let conversation = message.conversation;

        let index = this.conversations.findIndex(item => item.id === conversation.id)

        conversation.unread = this.conversations[index].unread;

        if (this.currentConversation.id === conversation.id && message.sender.id !== this.$auth.user.id) {
          this.messages.unshift(message)
        } else if (this.currentConversation.id !== conversation.id) {
          conversation.unread++;
        }

        this.conversations.splice(index, 1);
        this.conversations.unshift(conversation);
      })
    })
  }

  async sendMessage() {
    if (this.messageContent.length === 0)
      return;

    let key = uuidv4();

    try {
      this.messages.unshift({
        sender: this.$auth.user,
        content: this.messageContent,
        id: key,
        delivered: false
      })

      let content = this.messageContent;
      this.messageContent = '';

      let res = await this.$axios.post('/conversations/' + this.currentConversation.id + '/messages', {
        initial_key: key,
        content: content
      });

      let messageId = res.data.data.id;
      key = res.data.meta;

      let message = this.messages.find(item => item.id === key);

      if (message) {
        message.id = messageId;
        message.delivered = true;
      }
    } catch(e) {
      console.log(e)
    }
  }

  handleSelectedConversation(e) {
    this.currentConversation = e;

    this.conversations[e.index].unread = 0;

    this.fetchMessages(e.id);

    if(this.$device.isMobile) {
      this.$modal.show('poruke');
    }
  }

  others(conversation) {
    return conversation.users.filter( item => item.id !== this.$auth.user.id);
  }

  async created() {
    if(this.conversations.length) {
      this.currentConversation = this.conversations[0];
      this.conversations[0].unread = 0;
      await this.fetchMessages(this.currentConversation.id);
    }
  }

  async fetchMessages(id) {
    this.messagesLoaded = false;
    try {
      let res = await this.$axios.get('/conversations/' + id + '/messages');

      this.messages = res.data.data.reverse();
      this.messagesLoaded = true;
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

  .message-wrapper {
    display: flex;
    height: calc(100vh - 126px);
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    overflow: hidden;
    padding: 0 80px;
    padding-top: 24px;

    @include for-phone-only {
      padding: 12px;
      height: calc(100vh - 76px);
    }
  }
  .content {
    display: flex;
    flex-direction: row;
    height: 100%;

    .heading-wrapper {
      height: 80px;
      min-height: 80px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      margin-bottom: 24px;

      &.center {
        margin-bottom: 0;
      }

      img {
        height: 60px;
        width: 60px;
        border-radius: 30px;
        margin-right: 12px;
        object-fit: cover;
      }

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
    }

    .conversation-list {
      display: flex;
      flex: 3;
      flex-direction: column;
      padding: 0 24px 0 0;

      @include for-phone-only {
        width: 100%;
        flex: auto;
        padding: 0;
      }

      .search-wrapper {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        background: #f7f7f7;
        border-radius: 8px;
        height: 50px;

        input {
          width: 100%;
          height: 100%;
          border: none;
          background: transparent;
          padding: 0 12px;

          &:focus {
            border: none;
            outline: none;
          }
        }

        svg {
          padding: 0 12px;
          border-left: 1px solid #ddd;
        }
      }

      .heading-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 12px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 24px;

        h1 {
          font-size: 20px;
          font-weight: 500;
        }

        .buttons-wrapper {
          button {
            background: #f7f7f7;
            border-radius: 8px;
            height: 40px;
            width: 40px;
            margin-right: 12px;
            border: none;

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }

      &.inner {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0;
      }
    }


    .user-info {
      display: flex;
      flex: 2;
      flex-direction: column;
      padding: 0 24px;

      @include for-phone-only {
        display: none;
      }

    }
  }

  .loading-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    img {
      height: 40px;
    }
  }

  .messages-wrap {
    height: 100%;

  }


  h1.heading {
    font-size: 32px !important;
    font-weight: 600 !important;
    line-height: 1.125em !important;
    color: #484848 !important;
    margin-top: 12px;
    margin-bottom: 24px;
  }

  .emoji-picker {
    position: absolute;
    bottom: 70px;
    right: 0;
    background: #ffff;
  }

  .breadcrumbs {
    @include for-phone-only {
      margin-top: 0 !important;
      margin-bottom: 12px !important;
    }
  }

.conversation {
  display: flex;
  flex: 6;
  background: #f7f7f7;
  border-radius: 15px;
  flex-direction: column;
  position: relative;
  box-shadow: rgb(0 0 0 / 8%) 0px 6px 12px;
  height: calc(100vh - 225px);

  @include for-phone-only {
    height: calc(100vh - 70px);
    overflow: hidden;
  }

  .main-input-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
    padding: 0 12px;
    box-sizing: border-box;
    height: 70px;
    position: absolute;
    bottom: 12px;
    left: 12px;
    right: 12px;

    .buttons {
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: space-around;

      svg {
        margin-right: 12px;
        padding: 12px;
        background: #f7f7f7;
        color: #444;
        border-radius: 8px;
        cursor: pointer;

        @include for-phone-only {
          padding: 6px;
          margin-right:8px;
        }

        &.last {
          margin-right: 0;
          background: #D63946;
          padding: 16px;
          color: #fff;

          @include for-phone-only {
            padding: 10px;
          }
        }
      }
    }

    input {
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
      padding: 0 12px;
      font-size: 16px;

      &::placeholder {
        color: #444;
      }

      &:focus {
        border: none;
        outline: none;
      }
    }
  }

  .heading-wrapper {
    padding-left: 24px;
  }
}

.modal-inner {
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  position: relative;

  @include for-phone-only {
    padding: 0;
  }

  .modal-header {
    display: flex;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #dcdcdc;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: #fff;

    @include for-phone-only {
      padding: 0 16px;
      box-sizing: border-box;
    }

    h2 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 0;
    }

    i {
      cursor: pointer;
    }
  }
  .modal-content {
    padding: 24px 0;

    @include for-phone-only {
      padding: 0px;
    }

    &.mapa {
      @include for-phone-only {
        padding: 0px;
      }
    }
    textarea {
      height: 200px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      line-height: 21px;
      box-sizing: border-box;
      padding: 24px;

      &:focus {
        outline: none;

      }
    }
  }
}


</style>
