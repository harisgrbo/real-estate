<template>
  <div class="account-wrapper-a">
    <!-- BEGIN: Content -->
    <div class="content px-20 mt-20">
      <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
        <!-- BEGIN: Chat Side Menu -->
        <div class="col-span-12 lg:col-span-4 2xl:col-span-3">
          <div class="intro-y pr-1">
            <div class="box p-2">
              <div class="chat__tabs nav nav-tabs justify-center" role="tablist"> <a id="chats-tab" data-toggle="tab" data-target="#chats" href="javascript:;" class="flex-1 py-2 rounded-md text-center active" role="tab" aria-controls="chats" aria-selected="true">Inbox</a> <a id="friends-tab" data-toggle="tab" data-target="#friends" href="javascript:;" class="flex-1 py-2 rounded-md text-center" role="tab" aria-controls="friends" aria-selected="false">Spašene</a></div>
            </div>
          </div>
          <div class="tab-content">
            <div id="chats" class="tab-pane active" role="tabpanel" aria-labelledby="chats-tab">
              <div class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4">
                <div v-for="(conversation, index) in conversations" @click="handleSelectedConversation(conversation, index)" class="intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                  <div class="w-12 h-12 flex-none image-fit mr-1">
                    <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="/noimage.jpeg">
                  </div>
                  <div class="ml-2 overflow-hidden w-full">
                    <div class="flex items-center w-full">
                      <a href="javascript:;" class="font-medium">{{ others(conversation).map(item => item.name).join(',') }}</a>
                      <div class="text-xs text-gray-500 ml-auto">{{ $moment(conversation.last_message.created_at).format("DD.MM.YYYY") }}</div>
                    </div>
                    <div class="w-full truncate text-gray-600 mt-0.5">{{ conversation.last_message.content }}</div>
                  </div>
                  <div v-if="conversation.unread !== 0" class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-theme-17 font-medium -mt-1 -mr-1">{{ conversation.unread }}</div>
                </div>
              </div>
            </div>
            <div id="friends" class="tab-pane" role="tabpanel" aria-labelledby="friends-tab">
              <div class="pr-1">
                <div class="box p-5 mt-5">
                  <div class="relative text-gray-700 dark:text-gray-300">
                    <input type="text" class="form-control py-3 px-4 border-transparent bg-gray-200 pr-10 placeholder-theme-8" placeholder="Search for messages or users...">
                    <i class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0" data-feather="search"></i>
                  </div>
                  <button type="button" class="btn btn-primary w-full mt-3">Invite Friends</button>
                </div>
              </div>
              <div class="chat__user-list overflow-y-auto scrollbar-hidden pr-1 pt-1">
                <div class="mt-4 text-gray-600">A</div>
                <div class="cursor-pointer box relative flex items-center p-5 mt-5">
                  <div class="w-12 h-12 flex-none image-fit mr-1">
                    <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="dist/images/profile-1.jpg">
                    <div class="w-3 h-3 bg-theme-10 absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div class="ml-2 overflow-hidden">
                    <div class="flex items-center"> <a href="" class="font-medium">Russell Crowe</a> </div>
                    <div class="w-full truncate text-gray-600 mt-0.5">Last seen 2 hours ago</div>
                  </div>
                  <div class="dropdown ml-auto">
                    <a class="dropdown-toggle w-5 h-5 block" href="javascript:;" aria-expanded="false"> <i data-feather="more-horizontal" class="w-5 h-5 text-gray-600 dark:text-gray-300"></i> </a>
                    <div class="dropdown-menu w-40">
                      <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                        <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="share-2" class="w-4 h-4 mr-2"></i> Share Contact </a>
                        <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="copy" class="w-4 h-4 mr-2"></i> Copy Contact </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cursor-pointer box relative flex items-center p-5 mt-5">
                  <div class="w-12 h-12 flex-none image-fit mr-1">
                    <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="dist/images/profile-7.jpg">
                    <div class="w-3 h-3 bg-theme-10 absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div class="ml-2 overflow-hidden">
                    <div class="flex items-center"> <a href="" class="font-medium">Johnny Depp</a> </div>
                    <div class="w-full truncate text-gray-600 mt-0.5">Last seen 2 hours ago</div>
                  </div>
                  <div class="dropdown ml-auto">
                    <a class="dropdown-toggle w-5 h-5 block" href="javascript:;" aria-expanded="false"> <i data-feather="more-horizontal" class="w-5 h-5 text-gray-600 dark:text-gray-300"></i> </a>
                    <div class="dropdown-menu w-40">
                      <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                        <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="share-2" class="w-4 h-4 mr-2"></i> Share Contact </a>
                        <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="copy" class="w-4 h-4 mr-2"></i> Copy Contact </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4 text-gray-600">B</div>
                <div class="cursor-pointer box relative flex items-center p-5 mt-5">
                  <div class="w-12 h-12 flex-none image-fit mr-1">
                    <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="dist/images/profile-10.jpg">
                    <div class="w-3 h-3 bg-theme-10 absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div class="ml-2 overflow-hidden">
                    <div class="flex items-center"> <a href="" class="font-medium">Kevin Spacey</a> </div>
                    <div class="w-full truncate text-gray-600 mt-0.5">Last seen 2 hours ago</div>
                  </div>
                  <div class="dropdown ml-auto">
                    <a class="dropdown-toggle w-5 h-5 block" href="javascript:;" aria-expanded="false"> <i data-feather="more-horizontal" class="w-5 h-5 text-gray-600 dark:text-gray-300"></i> </a>
                    <div class="dropdown-menu w-40">
                      <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                        <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="share-2" class="w-4 h-4 mr-2"></i> Share Contact </a>
                        <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="copy" class="w-4 h-4 mr-2"></i> Copy Contact </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cursor-pointer box relative flex items-center p-5 mt-5">
                  <div class="w-12 h-12 flex-none image-fit mr-1">
                    <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="dist/images/profile-7.jpg">
                    <div class="w-3 h-3 bg-theme-10 absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div class="ml-2 overflow-hidden">
                    <div class="flex items-center"> <a href="" class="font-medium">Robert De Niro</a> </div>
                    <div class="w-full truncate text-gray-600 mt-0.5">Last seen 2 hours ago</div>
                  </div>
                  <div class="dropdown ml-auto">
                    <a class="dropdown-toggle w-5 h-5 block" href="javascript:;" aria-expanded="false"> <i data-feather="more-horizontal" class="w-5 h-5 text-gray-600 dark:text-gray-300"></i> </a>
                    <div class="dropdown-menu w-40">
                      <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                        <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="share-2" class="w-4 h-4 mr-2"></i> Share Contact </a>
                        <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="copy" class="w-4 h-4 mr-2"></i> Copy Contact </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cursor-pointer box relative flex items-center p-5 mt-5">
                  <div class="w-12 h-12 flex-none image-fit mr-1">
                    <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="dist/images/profile-12.jpg">
                    <div class="w-3 h-3 bg-theme-10 absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div class="ml-2 overflow-hidden">
                    <div class="flex items-center"> <a href="" class="font-medium">Tom Cruise</a> </div>
                    <div class="w-full truncate text-gray-600 mt-0.5">Last seen 2 hours ago</div>
                  </div>
                  <div class="dropdown ml-auto">
                    <a class="dropdown-toggle w-5 h-5 block" href="javascript:;" aria-expanded="false"> <i data-feather="more-horizontal" class="w-5 h-5 text-gray-700 dark:text-gray-300"></i> </a>
                    <div class="dropdown-menu w-40">
                      <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                        <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="share-2" class="w-4 h-4 mr-2"></i> Share Contact </a>
                        <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="copy" class="w-4 h-4 mr-2"></i> Copy Contact </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Chat Side Menu -->
        <!-- BEGIN: Chat Content -->
        <div class="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
          <div v-if="!$device.isMobile" class="chat__box box">
            <!-- BEGIN: Chat Active -->
            <div v-if="currentConversation" class="h-full flex flex-col">
              <div class="shadow-sm flex flex-col sm:flex-row border-b border-gray-200 dark:border-dark-5 px-5 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative">
                    <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="/noimage.jpeg">
                  </div>
                  <div class="ml-3 mr-auto">
                    <div class="font-medium text-base">{{ others(currentConversation).map(item => item.name).join(',') }}</div>
                  </div>
                </div>
                <div class="flex items-center sm:ml-auto mt-5 sm:mt-0 border-t sm:border-0 border-gray-200 pt-3 sm:pt-0 -mx-5 sm:mx-0 px-5 sm:px-0">
                  <a href="javascript:;" class="w-5 h-5 text-gray-600"> <i data-feather="search" class="w-5 h-5"></i> </a>
                  <a href="javascript:;" class="w-5 h-5 text-gray-600 ml-5"> <i data-feather="user-plus" class="w-5 h-5"></i> </a>
                  <div class="dropdown ml-auto sm:ml-3">
                    <a href="javascript:;" class="dropdown-toggle w-5 h-5 text-gray-600" aria-expanded="false"> <i data-feather="more-vertical" class="w-5 h-5"></i> </a>
                    <div class="dropdown-menu w-40">
                      <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                        <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="share-2" class="w-4 h-4 mr-2"></i> Share Contact </a>
                        <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="settings" class="w-4 h-4 mr-2"></i> Settings </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="messagesLoaded" ref="messageContainer" class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
                <div v-for="message in messages">
                  <div :class="[isMe(message) ? 'float-right' : 'float-left']" class="chat__box__text-box flex items-end mb-4">
                    <div class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5">
                      <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="/noimage.jpeg">
                    </div>
                    <div :class="[isMe(message) ? 'bg-theme-17 px-4 py-3 text-white rounded-l-md rounded-t-md text-right' : 'bg-gray-200 dark:bg-dark-5 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-r-md rounded-t-md']">
                      {{ message.content }}
                      <div class="flex justify-between">
                        <div :class="[isMe(message) ? 'mt-1 text-xs text-theme-33': 'mt-1 text-xs text-gray-600' ]">{{ $moment(message.created_at).format('HH:mm') }}</div>
                        <div v-if="isMe(message)" class="ml-1 mt-1 text-xs text-gray-600">{{ message.delivered ? 'Dostavljeno': 'Salje se'}}</div>
                      </div>
                    </div>
                    <div class="hidden sm:block dropdown ml-3 my-auto">
                      <a href="javascript:;" class="dropdown-toggle w-4 h-4 text-gray-600" aria-expanded="false"> <i data-feather="more-vertical" class="w-4 h-4"></i> </a>
                      <div class="dropdown-menu w-40">
                        <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                          <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="corner-up-left" class="w-4 h-4 mr-2"></i> Reply </a>
                          <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="trash" class="w-4 h-4 mr-2"></i> Delete </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="clear-both"></div>
                </div>
              </div>
              <div v-show="!messagesLoaded" class="no-messages overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
                <img src="/loader.svg" alt="">
              </div>
              <div class="pt-4 pb-10 sm:py-4 flex items-center justify-between border-t border-gray-200 dark:border-dark-5 px-5">
                <textarea v-model="messageContent" @keyup.enter="sendMessage" class="chat__box__input form-control dark:bg-dark-3 h-16 resize-none border-transparent px-5 py-3 shadow-none focus:ring-0" rows="1" placeholder="Type your message..."></textarea>
                <button @click.prevent="sendMessage" class="ml-5 w-auto h-10 px-3 font-semibold sm:h-10 flex bg-theme-17 text-white rounded-md flex-none flex items-center justify-center">Pošalji</button>
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
        <!-- END: Chat Content -->
        <modal name="conversations" @before-open="beforeOpen" @before-close="beforeClose" :adaptive="true" height="100%">
          <div class="modal-inner">
            <div class="modal-content">
              <div class="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
                <div class="chat__box box">
                  <!-- BEGIN: Chat Active -->
                  <div v-if="currentConversation" class="h-full flex flex-col">
                    <div class="shadow-sm flex flex-col sm:flex-row border-b border-gray-200 dark:border-dark-5 pb-5">
                      <div class="flex items-center">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative">
                          <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="/noimage.jpeg">
                        </div>
                        <div class="ml-3 mr-auto flex flex-row items-center justify-between w-full">
                          <div class="font-medium text-base">{{ others(currentConversation).map(item => item.name).join(',') }}</div>
                          <i class="material-icons" @click="$modal.hide('conversations')">close</i>
                        </div>
                      </div>
                    </div>
                    <div v-show="messagesLoaded" ref="messageContainer" class="overflow-y-scroll scrollbar-hidden pt-5 flex-1">
                      <div v-for="message in messages">
                        <div :class="[isMe(message) ? 'float-right' : 'float-left']" class="chat__box__text-box flex items-end mb-4">
                          <div class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5">
                            <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="/noimage.jpeg">
                          </div>
                          <div :class="[isMe(message) ? 'bg-theme-17 px-4 py-3 text-white rounded-l-md rounded-t-md text-right' : 'bg-gray-200 dark:bg-dark-5 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-r-md rounded-t-md']">
                            {{ message.content }}
                            <div class="flex justify-between">
                              <div :class="[isMe(message) ? 'mt-1 text-xs text-theme-33': 'mt-1 text-xs text-gray-600' ]">{{ $moment(message.created_at).format('HH:mm') }}</div>
                              <div v-if="isMe(message)" class="ml-1 mt-1 text-xs text-gray-600">{{ message.delivered ? 'Dostavljeno': 'Salje se'}}</div>
                            </div>
                          </div>
                          <div class="hidden sm:block dropdown ml-3 my-auto">
                            <a href="javascript:;" class="dropdown-toggle w-4 h-4 text-gray-600" aria-expanded="false"> <i data-feather="more-vertical" class="w-4 h-4"></i> </a>
                            <div class="dropdown-menu w-40">
                              <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                                <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="corner-up-left" class="w-4 h-4 mr-2"></i> Reply </a>
                                <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="trash" class="w-4 h-4 mr-2"></i> Delete </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="clear-both"></div>
                      </div>
                    </div>
                    <div v-show="!messagesLoaded" class="no-messages overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
                      <img src="/loader.svg" alt="">
                    </div>
                    <div class="pt-4 pb-10 flex items-center justify-between border-t border-gray-200 dark:border-dark-5">
                      <textarea v-model="messageContent" @keyup.enter="sendMessage" class="chat__box__input form-control dark:bg-dark-3 h-16 resize-none border-transparent px-5 py-3 shadow-none focus:ring-0" rows="1" placeholder="Type your message..."></textarea>
                      <button @click.prevent="sendMessage" class="ml-5 w-auto h-10 px-3 font-semibold sm:h-10 flex bg-theme-17 text-white rounded-md flex-none flex items-center justify-center">Pošalji</button>
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
    </div>l
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import {v4 as uuidv4} from "uuid";

@Component({
  components: {
  },
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

export default class Porukice extends Vue {
  messages = [];
  messagesLoaded = true;
  currentConversation = null;
  messageContent = '';

  mounted() {
    this.realtime();
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

.account-wrapper-a {
  background: #f9f9f9;
  min-height: calc(100vh - 80px);
  @include for-phone-only {
    min-height: 100%;
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

.modal-inner .modal-content textarea {
  @include for-phone-only {
    height: 40px;
    min-height: 40px;
    max-height: 40px;
  }
}

.chat__box.box {
  @include for-phone-only {
    height: 683px !important;
  }
}

.modal-inner .modal-content {
  padding: 0;
  padding-bottom: 16px;
}

.chat .chat__tabs a {
  font-family: 'Lato', sans-serif;
  height: 48px;
  border-radius: 8px;
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  padding: 0 24px;
  color: #023246;
  cursor: pointer;
  justify-content: center;
  transition: 0.3s all ease;
  background: transparent;
  color: #848484;
}
.chat .chat__tabs a.active {
  font-family: 'Lato', sans-serif;
  height: 48px;
  border-radius: 8px;
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  padding: 0 24px;
  color: #023246;
  cursor: pointer;
  justify-content: center;
  transition: 0.3s all ease;
  border:2px solid hsla(218, 34%, 30%, 1);
  background: transparent;
}
</style>

