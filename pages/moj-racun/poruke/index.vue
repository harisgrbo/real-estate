<template>
  <div class="preview-wrapper-inner">
    <!-- BEGIN: Content -->
    <div class="flex w-full">
      <div class="chat flex flex-row w-full">
        <!-- BEGIN: Chat Side Menu -->
        <div class="flex mr-4 flex-col w-2/6 mobile-chat">
          <div class="tab-content w-full">
            <div id="chats" class="tab-pane active" role="tabpanel" aria-labelledby="chats-tab">
              <div v-if="isMounted" class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 mt-0 pt-0">
                <div v-for="(conversation, index) in conversations" :key="index" @click="handleSelectedConversation(conversation, index)" :class="['bg-white cursor-pointer box relative flex items-center p-5 chat_conversation conversation-box', pinned_conversation && (pinned_conversation.id === conversation.id) ? 'pinned' : '', currentConversation === conversation ? 'active-chat' : '']">
                  <img alt="Icewall Tailwind HTML Admin Template" class="w-12 h-12 flex-none image-fit mr-1 rounded-full" src="/noimage.jpeg">
                  <div class="ml-2 overflow-hidden w-full">
                    <div class="flex items-center w-full">
                      <a href="javascript:;" class="text-gray-900 font-semibold">{{ others(conversation).map(item => item.name).join(',') }}</a>
                      <div class="text-xs text-gray-500 ml-auto">{{ $moment(conversation.last_message.created_at).format("DD.MM.YYYY") }}</div>
                    </div>
                    <div class="w-full truncate text-gray-600 mt-0.5 flex flex-row items-center justify-between">
                      <div class="w-full truncate text-gray-900 mt-0.5">{{ conversation.last_message.content }}</div>
                      <div v-if="pinned_conversation === conversation">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div v-if="conversation.unread !== 0" class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-theme-17 font-medium -mt-1 -mr-1">{{ conversation.unread }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Chat Side Menu -->
        <!-- BEGIN: Chat Content -->
        <div class="flex w-full">
          <div v-if="!$device.isMobile" class="chat__box box w-full bg-white">
            <!-- BEGIN: Chat Active -->
            <div v-if="currentConversation" class="h-full flex flex-col">
              <div class="border border-gray-200 flex flex-row justify-between items-center border-b border-gray-200 dark:border-dark-5 px-5 py-4">
                <div class="flex flex-row items-center">
                  <div class="flex items-center">
                    <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative">
                      <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="/noimage.jpeg">
                    </div>
                    <div class="ml-3 mr-auto">
                      <div class="font-medium text-base">{{ others(currentConversation).map(item => item.name).join(',') }}</div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-row items-center">
                  <div class="flex items-center sm:ml-auto mt-5 sm:mt-0 border-t sm:border-0 mr-4 border-gray-200 pt-3 sm:pt-0 px-1 sm:mx-0 cursor-pointer hover:bg-gray-50 rounded-md" @click="pinConversation(currentConversation)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <p class="font-medium">{{ pinned_conversation && (pinned_conversation.id === currentConversation.id ) ? 'Izbriši iz pinovanih' : 'Pinuj razgovor'}}</p>
                  </div>
                  <div class="flex items-center sm:ml-auto mt-5 sm:mt-0 border-t sm:border-0 border-gray-200 pt-3 ml-6 sm:pt-0 px-1 sm:mx-0 cursor-pointer hover:bg-gray-50 rounded-md" @click="deleteConversation(currentConversation)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                </div>
              </div>
              <div v-show="messagesLoaded" ref="messageContainer" class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
                <div v-for="message in messages" :key="message.id">
                  <div :class="[isMe(message) ? 'float-right' : 'float-left']" class="chat__box__text-box flex items-end mb-4">
                    <div class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5">
                      <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="/noimage.jpeg">
                    </div>
                    <div :class="[isMe(message) ? 'bg-theme-17 px-4 py-3 text-white rounded-l-md rounded-t-md text-right' : 'bg-gray-200 dark:bg-dark-5 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-r-md rounded-t-md']">
                      {{ message.content }}
                      <div class="flex justify-between">
                        <div :class="[isMe(message) ? 'mt-1 text-xs text-white': 'mt-1 text-xs text-gray-800' ]">{{ $moment(message.created_at).format('HH:mm') }}</div>
                        <div v-if="isMe(message)" class="ml-1 mt-1 text-xs text-white">{{ message.delivered ? 'Dostavljeno': 'Salje se'}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="clear-both"></div>
                </div>
              </div>
              <div v-show="!messagesLoaded" class="no-messages overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
                <img src="/loader.svg" alt="">
              </div>
              <div class="pt-4 pb-4 flex items-center justify-between border-t border-gray-400 dark:border-dark-5 px-4 mobile-message-wrapper">
                <VEmojiPicker
                  v-if="showEmoji"
                  @select="selectEmoji"
                  v-on-clickaway="away"
                />
                <div class="w-full flex items-center justify-between">
                  <input v-model="messageContent" @keyup.enter="sendMessage" class="w-full" placeholder="Upišite poruku..."></input>
                  <button v-show="messageContent.length" @click.prevent="sendMessage" class="ml-2 p-2 flex items-center justify-center bg-gray-800 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="#fff">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="showEmoji = !showEmoji">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <!-- END: Chat Active -->
            <!-- BEGIN: Chat Default -->
            <div v-else class="h-full flex items-center bg-white">
              <div class="mx-auto text-center">
                <div class="w-16 h-16 flex-none image-fit rounded-full overflow-hidden mx-auto">
                  <img alt="Icewall Tailwind HTML Admin Template" src="/noimage.jpeg">
                </div>
                <div class="mt-3">
                  <div class="font-medium">Pozdrav, {{ $auth.user.name }}</div>
                  <div class="text-gray-600 mt-1">Klikom na jednu od konverzacija, započni raygovor.</div>
                </div>
              </div>
            </div>
            <!-- END: Chat Default -->
          </div>
        </div>
        <!-- END: Chat Content -->
      </div>
    </div>
    <modal name="conversations" @before-open="beforeOpen" @before-close="beforeClose" :adaptive="true" height="100%">
      <div class="modal-inner">
        <div class="modal-content">
          <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
            <div class="chat__box box">
              <!-- BEGIN: Chat Active -->
              <div v-if="currentConversation" class="h-full flex flex-col bg-white">
                <div class="shadow-sm mb-4 flex flex-row justify-between items-center border-b border-gray-200 dark:border-dark-5 px-0 py-3">
                  <div class="flex items-center">
                    <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative">
                      <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="/noimage.jpeg">
                    </div>
                    <div class="ml-3 mr-auto">
                      <div class="font-medium text-base">{{ others(currentConversation).map(item => item.name).join(',') }}</div>
                    </div>
                  </div>
                  <div class="flex flex-row items-center">
                    <div class="flex items-center cursor-pointer" @click="pinConversation(currentConversation)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" :fill="pinned_conversation && (pinned_conversation.id === currentConversation.id) ? '#1F2937' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </div>
                    <div class="flex items-center sm:ml-auto sm:mt-0 border-t sm:border-0 border-gray-200 sm:pt-0 px-1 sm:mx-0 cursor-pointer hover:bg-gray-50 rounded-md" @click="deleteConversation(currentConversation)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                    <i class="material-icons ml-4" @click="$modal.hide('conversations')">close</i>
                  </div>
                </div>
                <div v-show="messagesLoaded" ref="messageContainer" class="overflow-y-scroll scrollbar-hidden pt-5 flex-1 mobile-height">
                  <div v-for="message in messages" :key="message.id">
                    <div :class="[isMe(message) ? 'float-right' : 'float-left']" class="chat__box__text-box flex items-end mb-4">
                      <div class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5">
                        <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="/noimage.jpeg">
                      </div>
                      <div :class="[isMe(message) ? 'bg-theme-17 px-4 py-3 text-white rounded-l-md rounded-t-md text-right' : 'bg-gray-200 dark:bg-dark-5 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-r-md rounded-t-md']">
                        {{ message.content }}
                        <div class="flex justify-between">
                          <div :class="[isMe(message) ? 'mt-1 text-xs text-white': 'mt-1 text-xs text-gray-800' ]">{{ $moment(message.created_at).format('HH:mm') }}</div>
                          <div v-if="isMe(message)" class="ml-1 mt-1 text-xs text-white">{{ message.delivered ? 'Dostavljeno': 'Salje se'}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="clear-both"></div>
                  </div>
                </div>
                <div v-show="!messagesLoaded" class="no-messages overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
                  <img src="/loader.svg" alt="">
                </div>
                <div class="pt-4 pb-4 flex items-center justify-between border-t border-gray-400 dark:border-dark-5 mobile-message-wrapper">
                  <VEmojiPicker
                    v-if="showEmoji"
                    @select="selectEmoji"
                    v-on-clickaway="away"
                  />
                  <div class="w-full flex items-center justify-between">
                    <input v-model="messageContent" @keyup.enter="sendMessage" class="w-full" placeholder="Upišite poruku..."></input>
                    <button v-show="messageContent.length" @click.prevent="sendMessage" class="ml-2 p-2 flex items-center justify-center bg-gray-800 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="#fff">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="showEmoji = !showEmoji">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <!-- END: Chat Active -->
              <!-- BEGIN: Chat Default -->
              <div v-else class="h-full flex items-center">
                <div class="mx-auto text-center">
                  <div class="w-16 h-16 flex-none image-fit rounded-full overflow-hidden mx-auto">
                    <img alt="Icewall Tailwind HTML Admin Template" src="/noimage.jpeg">
                  </div>
                  <div class="mt-3">
                    <div class="font-medium">Pozdrav, {{ $auth.user.name }}</div>
                    <div class="text-gray-600 mt-1">Klikom na jednu od konverzacija, započni raygovor.</div>
                  </div>
                </div>
              </div>
              <!-- END: Chat Default -->
            </div>
          </div>
        </div>
      </div>
    </modal>

  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import {v4 as uuidv4} from "uuid";
import ActionButton from "../../../components/actionButtons/ActionButton";
import {mixin as clickaway} from "vue-clickaway";

@Component({
  components: {
    ActionButton
  },
  mixins: [clickaway],
  middleware: ['auth'],
  layout() { return "settings" },
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

export default class Poruke extends Vue {
  messages = [];
  messagesLoaded = true;
  currentConversation = null;
  messageContent = '';
  pinned_conversation = null;
  isMounted = false;
  search = '';
  showEmoji = false;

  mounted() {
    this.realtime();

    let pinned = localStorage.getItem('pinned');

    if (pinned) {
      this.pinned_conversation = JSON.parse(pinned);
    }

    this.isMounted = true;
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
          this.messages.push(message)
          this.scrollBottom();
        } else if (this.currentConversation.id !== conversation.id) {
          conversation.unread++;
        }

        this.conversations.splice(index, 1);
        this.conversations.unshift(conversation);
      })
    })
  }

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
  }

  pinConversation(c) {

    if(this.pinned_conversation && (this.pinned_conversation.id === c.id)) {
      this.pinned_conversation = null;

      localStorage.removeItem('pinned');
      return
    }
    this.pinned_conversation = c;

    if(process.browser) {
      localStorage.setItem('pinned', JSON.stringify(c))
    }
  }

  deleteConversation(c) {
    let index = this.conversations.findIndex(item => item.id === c.id);

    this.$axios.delete('/conversations/' + c.id);

    if (index !== -1) {
      this.conversations.splice(index, 1);

      this.currentConversation = null;
    }
  }

  others(conversation) {
    return conversation.users.filter( item => item.id !== this.$auth.user.id);
  }

  async handleSelectedConversation(conv, index) {
    if(!this.$device.isMobile) {
      if (this.currentConversation !== conv) {
        this.currentConversation = conv;

        this.conversations[index].unread = 0;

        await this.fetchMessages(conv.id);

        this.scrollBottom();
      }
    } else {
      this.currentConversation = conv;

      this.conversations[index].unread = 0;

      await this.fetchMessages(conv.id);

      this.scrollBottom();
      this.$modal.show('conversations')
    }
  }

  scrollBottom() {
    this.$nextTick(() => {
      let container = this.$refs.messageContainer;

      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    })
  }

  isMe(message) {
    return message.sender.id === this.$auth.user.id;
  }

  async sendMessage() {
    if (this.messageContent.length === 0)
      return;

    let key = uuidv4();

    try {
      this.messages.push({
        sender: this.$auth.user,
        content: this.messageContent,
        id: key,
        delivered: false
      })

      this.scrollBottom();

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

  async fetchMessages(id) {
    this.messagesLoaded = false;
    try {
      let res = await this.$axios.get('/conversations/' + id + '/messages');

      this.messages = res.data.data;
      this.messagesLoaded = true;
    } catch(e) {
      console.log(e)
    }
  }
}
</script>


<style lang="scss">

@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.preview-wrapper-inner {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 4px;
  padding: 24px;

  @include for-phone-only {
    padding: 16px 0 !important;
  }
}

.chat__box__input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: #F3F3F4;
  position: relative;
  transition: 0.3s all ease;
  margin-top: 0;
  min-height: 60px;
  height: fit-content;
  width: 100%;
  flex: 1;
  align-items: center;
  padding: 12px
}

.custom-search {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 0 12px;
  background: #F3F3F4;
  flex: 2;
  position: relative;
  transition: 0.3s all ease;
  max-width: 600px;
  margin-top: 0;
}

.no-messages {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  img {
    height: 30px;
  }
}

textarea {
  padding: 12px;
  height: 100%;
  background: transparent;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  min-height: 50px;
  border-radius: 4px;
  max-height: 50px;
  border: 1px solid #ddd;
  background: #f9f9f9;

  &:focus {
    outline: 1px solid #000;
    border-radius: 4px;
  }
}

.modal-inner .modal-content textarea {
  @include for-phone-only {
    height: 40px;
    min-height: 40px;
    max-height: 40px;
  }
}

.chat__box.box {
  @include for-phone-only {
    height: auto !important;
  }
}

.box {
  margin-bottom: 16px;
  @include for-phone-only {
    box-shadow: none;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0;
    margin-bottom: 0;
  }
}

.modal-inner .modal-content {
  padding: 0;
  padding-bottom: 16px;
}

.chat .chat__tabs a {
  font-family: 'Outfit', sans-serif;
  height: 48px;
  border-radius: 8px;
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  padding: 0 24px;
  color: #1F2937;
  cursor: pointer;
  justify-content: center;
  transition: 0.3s all ease;
  background: transparent;
  color: #848484;
}
.chat .chat__tabs a.active {
  font-family: 'Outfit', sans-serif;
  height: 48px;
  border-radius: 8px;
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  padding: 0 24px;
  color: #1F2937;
  cursor: pointer;
  justify-content: center;
  transition: 0.3s all ease;
  border:2px solid hsla(218, 34%, 30%, 1);
  background: transparent;
}

.chat__chat-list {
  display: flex !important;
  flex-direction: column !important;

  @include for-phone-only {
    padding-top: 16px;
    height: 100vh;
    overflow-y: scroll;
  }
}

.conversation-box {
  display: flex;
  position: relative;

  &.active-chat {
    ::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 2px;
      bottom: 0;
      content: '';
      background: #1F2937;
    }
  }

  &.pinned {
    background: #162f730a;
    order: -1;
    color: #fff !important;
  }
}

.vm--modal {
  max-height: 100vh !important;
  min-height: 100vh !important;
  top: 0 !important;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.vm--container {
  height: 100% !important;
  top: 0 !important;
}

.bg-theme-17 {
  background: #1F2937 !important;
}

.mobile-chat {
  min-width: 370px;
  @include for-phone-only {
    width: 100%;
    min-width: 100%;
  }
}

.mobile-height {
  height: 500px !important;
  max-height: 500px !important;
}

#EmojiPicker {
  position: absolute;
  bottom: 113px;
  width: 100%;
  background: #fff;
  border: none;
  padding: 0;
}

.mobile-message-wrapper {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #f1f1f1;
  align-items: flex-start;
  justify-content: flex-start;

  input {
    height: 48px;
    min-height: 48px;

    &:focus {
      outline: none;
    }
  }
}

img {
  height: 50px;
  width: 50px;
  min-width: 50px;
}
</style>

