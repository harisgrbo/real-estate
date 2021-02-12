<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Poruke</p>
      </li>
    </ul>
    <h1 class="heading">
      Poruke
    </h1>
    <div class="content">
      <div class="conversation-list">
        <div class="search-wrapper">
          <input type="text">
          <font-awesome-icon icon="search"></font-awesome-icon>
        </div>
        <div class="heading-inner">
          <h1>Razgovori</h1>
          <div class="buttons-wrapper">
            <button>
              <font-awesome-icon icon="plus"></font-awesome-icon>
            </button>
            <button>
              <font-awesome-icon icon="ellipsis-v"></font-awesome-icon>
            </button>
          </div>
        </div>
        <div class="conversations-list__inner">
          <ConversationList :conversations="conversations" v-model="currentConversation" @input="handleSelectedConversation"></ConversationList>
        </div>
      </div>
      <div class="conversation">
        <div class="heading-wrapper">
          <h1>Razgovor sa {{ currentConversation !== null? others(currentConversation).map(item => item.name).join(',') : '' }}</h1>
        </div>
        <div>
          <ConversationContent :messages="messages"></ConversationContent>
        </div>
        <div class="main-input-wrapper">
          <input type="text" placeholder="Upišite poruku.." v-model="messageContent">
          <div class="buttons">
            <font-awesome-icon icon="grin"></font-awesome-icon>
            <font-awesome-icon icon="paperclip"></font-awesome-icon>
            <font-awesome-icon icon="paper-plane" @click="sendMessage"></font-awesome-icon>
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
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ConversationList from "@/components/messages/ConversationList"
import ConversationContent from "@/components/messages/ConversationContent"

@Component({
  components: {
    ConversationList,
    ConversationContent,
  },
  layout() { return "home" }
})

export default class poruke extends Vue {
  conversations = [];
  currentConversation = null;
  messages = [];
  messageContent = '';

  async sendMessage() {
    try {
      let res = await this.$axios.post('/conversations/' + this.currentConversation.id + '/messages', {
        content: this.messageContent
      });

      this.messages.push({
        sender: this.$auth.user.data,
        content: this.messageContent,
        id: Math.random()
      })

      this.messageContent = '';
    } catch(e) {
      console.log(e)
    }
  }

  handleSelectedConversation(e) {
    this.currentConversation = e;

    this.fetchMessages(e.id);
  }

  others(conversation) {
    return conversation.users.filter( item => item.id !== this.$auth.user.data.id);
  }

  async created() {
    await this.fetchConversations();

    if(this.conversations.length) {
      this.currentConversation = this.conversations[0];
    }

    await this.fetchMessages(this.currentConversation.id);

  }

  async fetchConversations() {
    try {
      let res = await this.$axios.get('/conversations');

      this.conversations = res.data.data;

      console.log(this.conversations)
    } catch(e) {
      console.log(e)
    }
  }

  async fetchMessages(id) {
    try {
      let res = await this.$axios.get('/conversations/' + id + '/messages');

      this.messages = res.data.data;

      console.log(this.messages, 'poruke')
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
  .content {
    display: flex;
    flex-direction: row;
    height: 100%;

    .heading-wrapper {
      height: 80px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      margin-bottom: 24px;

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

      &__inner {
        display: flex;
        flex-direction: column;
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

            &:last-child {
              margin-right: 0;
              background: #D63946;
              padding: 16px;
              color: #fff;
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

    .user-info {
      display: flex;
      flex: 2;
      flex-direction: column;
      padding: 0 24px;


    }
  }
</style>
