<template>
    <div class="preview-wrapper-inner relative">
        <LoadingBar :override="loadingMobileMessages"/>

        <!-- BEGIN: Content -->
        <div class="flex w-full">
            <div v-if="conversations.length > 0" class="chat flex flex-row w-full">
                <!-- BEGIN: Chat Side Menu -->
                <div class="flex flex-col w-2/6 mobile-chat">
                    <div class="custom-header">
                        <h3>Razgovori</h3>
                    </div>
                    <div class="tab-content w-full">
                        <div id="chats" class="tab-pane active" role="tabpanel" aria-labelledby="chats-tab">
                            <div v-if="isMounted"
                                 class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 mt-0 pt-0">
                                <div v-for="(conversation, index) in conversations" :key="index"
                                     @click="handleSelectedConversation(conversation, index)"
                                     :class="['bg-white cursor-pointer box relative flex items-center py-4 px-0 chat_conversation conversation-box', pinned_conversation && (pinned_conversation.id === conversation.id) ? 'pinned' : '', currentConversation === conversation ? 'active-chat' : '']">
                                    <img alt="mojkvadrat - slika korisnika"
                                         class="w-12 h-12 flex-none image-fit mr-1 rounded-full"
                                         :src="[ others(conversation).length && others(conversation)[0].avatar_url !== null ? others(conversation)[0].avatar_url  : '/noimage.jpeg']">
                                    <div class="ml-2 overflow-hidden w-full h-full">
                                        <div class="flex items-center w-full">
                                            <div class="text-gray-700 font-semibold text-md">
                                                {{ others(conversation).map(item => item.name).join(',') }}
                                            </div>
                                            <div class="text-xs text-gray-900 font-medium ml-auto">
                                                {{ $moment(conversation.last_message.created_at).format("DD.MM.YYYY") }}
                                            </div>
                                        </div>
                                        <div
                                            class="w-full truncate text-gray-600 mt-0.5 flex flex-row items-center justify-between">
                                            <div
                                                class="w-full flex items-center flex-row truncate text-sm text-gray-900 mt-0.5"
                                                v-if="conversation.last_message.message_type === 'media' && conversation.last_message.content.mime.substr(0, 5) === 'image'">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor"
                                                     @click="$modal.show('send-image')">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                </svg>
                                                Korisnik je poslao sliku
                                            </div>
                                            <div
                                                class="w-full flex items-center flex-row truncate text-sm text-gray-900 mt-0.5"
                                                v-else-if="conversation.last_message.message_type === 'listing'">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                                                </svg>
                                                Korisnik je poslao pitanje vezano za oglas
                                            </div>
                                            <div class="w-full truncate text-gray-900 text-md font-medium mt-0.5"
                                                 v-else>
                                                {{ conversation.last_message.content }}
                                            </div>
                                            <div v-if="pinned_conversation === conversation">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                     viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="conversation.unread !== 0"
                                         class="w-5 h-5 flex items-center justify-center absolute top-6 left-4 bg-gray-900 text-xs text-white rounded-full font-medium -mt-1 -mr-1">
                                        {{ conversation.unread }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END: Chat Side Menu -->
                <!-- BEGIN: Chat Content -->
                <div class="flex w-full relative main-content rounded-md">
                    <div v-if="!$device.isMobile" class="chat__box box w-full bg-white min-h-full">
                        <!-- BEGIN: Chat Active -->
                        <div v-if="currentConversation" class="h-full flex flex-col">
                            <div class="custom-header flex flex-row items-center justify-between">
                                <div class="flex flex-row items-center">
                                    <div class="flex items-center cursor-pointer"
                                         @click="goToUser(others(currentConversation))">
                                        <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full"
                                             :src="others(currentConversation)[0].avatar_url !== null ? others(currentConversation)[0].avatar_url : '/noimage.jpeg'">
                                        <h3 class="ml-3">{{
                                                others(currentConversation).map(item => item.name).join(',')
                                            }}</h3>
                                    </div>
                                </div>

                                <div class="flex flex-row items-center">
                                    <div
                                        class="flex items-center mr-6 border-gray-200 pt-3 sm:pt-0 px-1 cursor-pointer hover:bg-gray-50 rounded-md"
                                        @click="pinConversation(currentConversation)">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                                        </svg>
                                        <p class="font-medium text-sm">
                                            {{ pinned_conversation && (pinned_conversation.id === currentConversation.id) ? 'Izbriši iz pinovanih' : 'Pinuj razgovor' }}</p>
                                    </div>
                                    <div
                                        class="flex items-center sm:ml-auto mt-5 sm:mt-0 border-t sm:border-0 border-gray-200 pt-3 ml-6 sm:pt-0 px-1 sm:mx-0 cursor-pointer hover:bg-gray-50 rounded-md"
                                        @click="$modal.show('delete-conversation')">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div v-show="messagesLoaded" ref="messageContainer" class="messages-wrapper">
                                <div class="w-full flex justify-center">
                                    <img v-show="loadingMore" class="invert" src="/loader.svg" alt="Prikazi vise"/>
                                    <button v-show="! loadingMore" v-if="messagesPage < messagesTotalPages"
                                            @click="loadMore">Prikaži više
                                    </button>
                                </div>
                                <div v-for="message in messages" :key="message.id">
                                    <div :class="[isMe(message) ? 'float-right' : 'float-left']"
                                         class="chat__box__text-box flex items-end mb-4">
                                        <div v-if="message.message_type === 'text'"
                                             :class="[isMe(message) ? 'bg-gray-100 border border-gray-300 p-4 text-gray-900 rounded-l-lg text-md leading-6 rounded-t-lg text-right' : 'not-me-box border border-gray-300 p-4 text-md leading-6 font-medium text-gray-700 rounded-r-lg rounded-t-lg']">
                                            {{ message.content }}
                                            <div class="flex justify-between mt-2">
                                                <div
                                                    :class="[isMe(message) ? 'mt-1 text-xs text-gray-700': 'mt-1 text-xs text-gray-800' ]">
                                                    {{ $moment(message.created_at).format('HH:mm') }}
                                                </div>
                                                <div v-if="isMe(message)" class="ml-1 mt-1 text-xs text-gray-700">
                                                    {{ message.delivered ? 'Dostavljeno' : 'Salje se' }}
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else-if="message.message_type === 'listing'"
                                             :class="['add-border', isMe(message) ? 'px-4 py-4 text-gray-700 rounded-l-md bg-gray-50 rounded-t-md text-right' : 'px-4 py-3 text-gray-700 rounded-r-md shadow-md rounded-t-md']">
                                            <nuxt-link :to="'/oglas/' + message.content.listing.slug"
                                                       class="listing-card cursor-pointer flex flex-col"
                                                       v-if="message.content.listing">
                                                <div v-if="message.content.listing.image_urls.length > 0"
                                                     class="grid grid-cols-1">
                                                    <img :src="message.content.listing.image_urls[0]" alt="">
                                                </div>
                                                <div v-else class="grid grid-cols-1">
                                                    <img src="/noimage.jpeg" alt="">
                                                </div>
                                                <h3>{{ message.content.listing.title }}</h3>
                                            </nuxt-link>
                                            {{ message.content.message }}

                                            <!--                      <SmallListingCard :listing="message.listing"></SmallListingCard>-->
                                            <div class="flex justify-between">
                                                <div
                                                    :class="[isMe(message) ? 'mt-1 text-xs text-gray-700': 'mt-1 text-xs text-gray-800' ]">
                                                    {{ $moment(message.created_at).format('HH:mm') }}
                                                </div>
                                                <div v-if="isMe(message)" class="ml-1 mt-1 text-xs text-gray-700">
                                                    {{ message.delivered ? 'Dostavljeno' : 'Salje se' }}
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else-if="message.message_type === 'media'"
                                             :class="['relative', isMe(message) ? 'bg-gray-100 me px-4 py-4 text-white rounded-l-md rounded-t-md text-right' : 'shadow-md px-4 py-3 text-gray-700 dark:text-gray-300 rounded-r-md rounded-t-md']">
                                            <div v-if="message.content.mime.substr(0, 5) === 'image'">
                                                <a :href="message.content.url" download="test" class="download">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                                    </svg>
                                                </a>
                                                <img class="message-image cursor-pointer" :src="message.content.url"
                                                     alt=""
                                                     @click="openImageGallery = true; selectedImage = message.content.url">
                                                <a :href="message.content.url" target="_blank"
                                                           class="mt-3 flex items-center justify-start tab-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1"
                                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              stroke-width="2"
                                                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                                    </svg>
                                                    Otvori u novom tabu
                                                </a>
                                            </div>
                                            <div class="flex justify-between mt-2">
                                                <div
                                                    :class="[isMe(message) ? 'ml-1 mt-1 text-xs text-gray-700': 'ml-1 mt-1 text-xs text-gray-700' ]">
                                                    {{ $moment(message.created_at).format('HH:mm') }}
                                                </div>
                                                <div v-if="isMe(message)" class="ml-1 mt-1 text-xs text-gray-700">
                                                    {{ message.delivered ? 'Dostavljeno' : 'Salje se' }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clear-both"></div>
                                </div>
                            </div>
                            <div v-show="!messagesLoaded"
                                 class="no-messages overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
                                <img src="/loader.svg" alt="">
                            </div>
                            <div
                                class="pt-4 pb-4 flex items-center justify-between border-t border-gray-400 dark:border-dark-5 px-4 mobile-message-wrapper">
                                <VEmojiPicker
                                    v-if="showEmoji"
                                    @select="selectEmoji"
                                    v-on-clickaway="away"
                                    :showSearch="false"
                                />
                                <div class="w-full flex items-center justify-between">
                                    <input v-model="messageContent" @keyup.enter="sendMessage" class="w-full"
                                           placeholder="Upišite poruku..."/>
                                    <button v-show="messageContent.length" @click.prevent="sendMessage"
                                            class="ml-2 p-2 flex items-center justify-center bg-gray-800 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform rotate-90"
                                             fill="none" viewBox="0 0 24 24" stroke="#fff">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="flex flex-row items-center justify-start relative mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 cursor-pointer"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                         @click="showEmoji = !showEmoji">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" @click="$modal.show('send-image')">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- END: Chat Active -->
                        <!-- BEGIN: Chat Default -->
                        <div v-else class="h-full flex items-center bg-white">
                            <div class="mx-auto text-center">
                                <div
                                    class="w-16 h-16 min-w-16 max-w-16 flex-none image-fit rounded-full overflow-hidden mx-auto">
                                    <img class="h-full w-full" alt="Icewall Tailwind HTML Admin Template"
                                         :src="[ $auth.user.avatar_url !== null ? $auth.user.avatar_url  : '/noimage.jpeg']">
                                </div>
                                <div class="mt-3">
                                    <div class="font-bold text-lg">Pozdrav, {{ $auth.user.name }}</div>
                                    <div class="text-gray-600 mt-4">Klikom na jednu od konverzacija, započni razgovor.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- END: Chat Default -->
                    </div>
                </div>
                <!-- END: Chat Content -->
                <!--        <div class="flex flex-col w-2/6 mobile-chat">-->
                <!--          <div class="custom-header">-->
                <!--            <h3>Pitanje za oglas Stan sarajevo 144m2</h3>-->
                <!--          </div>-->
                <!--          <div class="tab-content w-full">-->
                <!--            <div id="chats" class="tab-pane active" role="tabpanel" aria-labelledby="chats-tab">-->
                <!--              listing-->
                <!--            </div>-->
                <!--          </div>-->
                <!--        </div>-->

            </div>
            <NotFound v-else src="/no-messages.svg" text="Nemate poruka"></NotFound>
        </div>

        <client-only>
            <modal @before-open="beforeOpen" @before-close="beforeClose" name="send-image" :adaptive="true"
                   height="100%">
                <div class="modal-inner">
                    <div class="modal-header">
                        <h2>Slanje slike</h2>
                        <i class="material-icons" @click.prevent="$modal.hide('send-image')">close</i>
                    </div>
                    <div class="modal-content places-modal pt-4">
                        <label for="upload" class="image-upload-wrapper">
                            <input
                                id="upload"
                                type="file"
                                @change="preview"
                                class="hidden"
                            />
                            <img v-if="imgSrc.length" id="image" :src="imgSrc" class="mt-md"/>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none"
                                 viewBox="0 0 24 24" stroke="#1F2937">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                        </label>
                        <div class="flex flex-row items-center justify-between mt-md">
                            <ActionButton
                                class="w-full mr-2"
                                placeholder="Pošalji"
                                :style-options="{width: '100%'}"
                                @action="upload(imgBlob); showImageUpload = false;"
                            />
                            <ActionButton
                                class="w-full ml-2"
                                :style-options="{width: '100%'}"
                                placeholder="Odustani"
                                @action="showImagePreviewModal = false; imgSrc = ''; $modal.hide('send-image') "
                            />
                        </div>
                    </div>
                </div>
            </modal>
        </client-only>
        <client-only>
            <modal @before-open="beforeOpen" @before-close="beforeClose" name="send-image" :adaptive="true"
                   height="100%">
                <div class="modal-inner">
                    <div class="modal-header">
                        <h2>Slanje slike</h2>
                        <i class="material-icons" @click.prevent="$modal.hide('send-image')">close</i>
                    </div>
                    <div class="modal-content places-modal pt-4">
                        <label for="upload" class="image-upload-wrapper">
                            <input
                                id="upload"
                                type="file"
                                @change="preview"
                                class="hidden"
                            />
                            <img v-if="imgSrc.length" id="image" :src="imgSrc" class="mt-md"/>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none"
                                 viewBox="0 0 24 24" stroke="#1F2937">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                        </label>
                        <div class="flex flex-row items-center justify-between mt-md">
                            <ActionButton
                                class="w-full mr-2"
                                placeholder="Pošalji"
                                :style-options="{width: '100%'}"
                                @action="upload(imgBlob); showImageUpload = false;"
                            />
                            <ActionButton
                                class="w-full ml-2"
                                :style-options="{width: '100%'}"
                                placeholder="Odustani"
                                @action="showImagePreviewModal = false; imgSrc = ''; $modal.hide('send-image') "
                            />
                        </div>
                    </div>
                </div>
            </modal>
        </client-only>

        <div class="conversation-div" v-if="showConversationDiv">
            <div class="modal-inner">
                <client-only>
                    <modal @before-open="beforeOpen" @before-close="beforeClose" name="send-image-mobile"
                           :adaptive="true" height="100%">
                        <div class="modal-inner">
                            <div class="modal-header">
                                <h2>Slanje slike</h2>
                                <i class="material-icons" @click.prevent="$modal.hide('send-image-mobile')">close</i>
                            </div>
                            <div class="modal-content places-modal pt-4">
                                <label for="upload" class="image-upload-wrapper">
                                    <input
                                        id="upload"
                                        type="file"
                                        @change="preview"
                                        class="hidden"
                                    />
                                    <img v-if="imgSrc.length" id="image" :src="imgSrc" class="mt-md"/>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none"
                                         viewBox="0 0 24 24" stroke="#1F2937">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                </label>
                                <div class="flex flex-row items-center justify-between mt-md">
                                    <ActionButton
                                        class="w-full mr-2"
                                        placeholder="Pošalji"
                                        :style-options="{width: '100%'}"
                                        @action="upload(imgBlob); showImageUpload = false;"
                                    />
                                    <ActionButton
                                        class="w-full ml-2"
                                        :style-options="{width: '100%'}"
                                        placeholder="Odustani"
                                        @action="showImagePreviewModal = false; imgSrc = ''; $modal.hide('send-image') "
                                    />
                                </div>
                            </div>
                        </div>
                    </modal>
                </client-only>

                <div class="modal-content">
                    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
                        <div class="chat__box box">
                            <!-- BEGIN: Chat Active -->
                            <div v-if="currentConversation" class="h-full flex flex-col bg-white rounded-md">
                                <client-only>
                                    <modal @before-open="beforeOpen" @before-close="beforeClose" name="delete-conversation" :adaptive="true"
                                           height="100%">
                                        <div class="modal-inner">
                                            <div class="modal-header">
                                                <h2>Brisanje razgovora</h2>
                                                <i class="material-icons" @click.prevent="$modal.hide('delete-conversation')">close</i>
                                            </div>
                                            <div class="modal-content places-modal pt-4">
                                                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mt-4">
                                                    <div class="flex">
                                                        <div class="flex-shrink-0">
                                                            <!-- Heroicon name: solid/exclamation -->
                                                            <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg"
                                                                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fill-rule="evenodd"
                                                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                                      clip-rule="evenodd"/>
                                                            </svg>
                                                        </div>
                                                        <div class="ml-3">
                                                            <p class="text-sm text-yellow-700">
                                                                Da li ste sigurni da želite izbrisati razgovor
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex flex-row items-center justify-between">
                                                    <action-button :style-options="{ marginRight: '8px', width: '100%' }"
                                                                   @action="deleteConversation(currentConversation); $modal.hide('delete-conversation')"
                                                                   placeholder="Da"></action-button>
                                                    <action-button :style-options="{ marginLeft: '8px', width: '100%' }" placeholder="Ne"
                                                                   @action="$modal.hide('delete-conversation')"></action-button>
                                                </div>
                                            </div>
                                        </div>
                                    </modal>
                                </client-only>

                                <div
                                    class="shadow-sm mb-4 flex flex-row justify-between rounded-md items-center border-b border-gray-200 dark:border-dark-5 py-3">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative">
                                            <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full"
                                                 src="/noimage.jpeg">
                                        </div>
                                        <div class="ml-3 mr-auto">
                                            <div class="font-medium text-base">
                                                {{ others(currentConversation).map(item => item.name).join(',') }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-row items-center">
                                        <div class="flex items-center cursor-pointer"
                                             @click="pinConversation(currentConversation)">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2"
                                                 :fill="pinned_conversation && (pinned_conversation.id === currentConversation.id) ? '#1F2937' : 'none'"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                                            </svg>
                                        </div>
                                        <div
                                            class="flex items-center sm:ml-auto sm:mt-0 border-t sm:border-0 border-gray-200 sm:pt-0 px-1 sm:mx-0 cursor-pointer hover:bg-gray-50 rounded-md"
                                            @click="$modal.show('delete-conversation');">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                            </svg>
                                        </div>
                                        <i class="material-icons ml-4" @click="showConversationDiv = false">close</i>
                                    </div>
                                </div>
                                <div v-show="messagesLoaded" ref="mobileConversations"
                                     class="overflow-y-scroll scrollbar-hidden mobile-height pt-5 flex-1">
                                    <div class="w-full flex justify-center">
                                        <img v-show="loadingMore" class="invert" src="/loader.svg" alt="Prikazi vise"/>
                                        <button v-show="! loadingMore" v-if="messagesPage < messagesTotalPages"
                                                @click="loadMore">Prikaži više
                                        </button>
                                    </div>
                                    <div v-for="message in messages" :key="message.id">
                                        <div :class="[isMe(message) ? 'float-right' : 'float-left']"
                                             class="chat__box__text-box flex items-end mb-4">
                                            <div v-if="message.message_type === 'text'"
                                                 :class="[isMe(message) ? 'bg-gray-100 border border-gray-300 p-4 text-gray-900 rounded-l-lg text-md leading-6 rounded-t-lg text-right' : 'not-me-box border border-gray-300 p-4 text-md leading-6 font-medium text-gray-700 rounded-r-lg rounded-t-lg']">
                                                {{ message.content }}
                                                <div class="flex justify-between mt-2">
                                                    <div
                                                        :class="[isMe(message) ? 'mt-1 text-xs text-gray-700': 'mt-1 text-xs text-gray-800' ]">
                                                        {{ $moment(message.created_at).format('HH:mm') }}
                                                    </div>
                                                    <div v-if="isMe(message)" class="ml-1 mt-1 text-xs text-gray-700">
                                                        {{ message.delivered ? 'Dostavljeno' : 'Salje se' }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else-if="message.message_type === 'listing'"
                                                 :class="['add-border', isMe(message) ? 'px-4 py-4 text-gray-700 rounded-l-md bg-gray-50 rounded-t-md text-right' : 'px-4 py-3 text-gray-700 rounded-r-md shadow-md rounded-t-md']">
                                                <div class="listing-card flex flex-col" v-if="message.content.listing">
                                                    <div v-if="message.content.listing.image_urls.length > 0"
                                                         class="grid grid-cols-1">
                                                        <img :src="message.content.listing.image_urls[0]" alt="">
                                                    </div>
                                                    <div v-else class="grid grid-cols-1">
                                                        <img src="/noimage.jpeg" alt="">
                                                    </div>
                                                    <h3>{{ message.content.listing.title }}</h3>
                                                </div>
                                                {{ message.content.message }}

                                                <!--                      <SmallListingCard :listing="message.listing"></SmallListingCard>-->
                                                <div class="flex justify-between">
                                                    <div
                                                        :class="[isMe(message) ? 'mt-1 text-xs text-gray-700': 'mt-1 text-xs text-gray-800' ]">
                                                        {{ $moment(message.created_at).format('HH:mm') }}
                                                    </div>
                                                    <div v-if="isMe(message)" class="ml-1 mt-1 text-xs text-gray-700">
                                                        {{ message.delivered ? 'Dostavljeno' : 'Salje se' }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else-if="message.message_type === 'media'"
                                                 :class="['relative', isMe(message) ? 'bg-gray-100 me px-4 py-4 text-white rounded-l-md rounded-t-md text-right' : 'shadow-md px-4 py-3 text-gray-700 dark:text-gray-300 rounded-r-md rounded-t-md']">
                                                <div v-if="message.content.mime.substr(0, 5) === 'image'">
                                                    <a :href="message.content.url" download="test" class="download">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                                        </svg>
                                                    </a>
                                                    <img class="message-image cursor-pointer" :src="message.content.url"
                                                         alt=""
                                                         @click="openImageGallery = true; selectedImage = message.content.url">
                                                    <a :href="message.content.url" target="_blank"
                                                               class="mt-3 flex items-center justify-start tab-link">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1"
                                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  stroke-width="2"
                                                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                                        </svg>
                                                        Otvori u novom tabu
                                                    </a>
                                                </div>
                                                <div class="flex justify-between mt-2">
                                                    <div
                                                        :class="[isMe(message) ? 'ml-1 mt-1 text-xs text-gray-700': 'ml-1 mt-1 text-xs text-gray-700' ]">
                                                        {{ $moment(message.created_at).format('HH:mm') }}
                                                    </div>
                                                    <div v-if="isMe(message)" class="ml-1 mt-1 text-xs text-gray-700">
                                                        {{ message.delivered ? 'Dostavljeno' : 'Salje se' }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clear-both"></div>
                                    </div>
                                </div>
                                <div v-show="!messagesLoaded"
                                     class="no-messages overflow-y-scroll scrollbar-hidden pt-5 flex-1">
                                    <img src="/loader.svg" alt="">
                                </div>
                                <div
                                    class="pt-4 pb-4 flex items-center justify-between border-t border-gray-400 dark:border-dark-5 px-4 mobile-message-wrapper">
                                    <VEmojiPicker
                                        v-if="showEmoji"
                                        @select="selectEmoji"
                                        v-on-clickaway="away"
                                        :showSearch="false"
                                    />
                                    <div class="w-full flex items-center justify-between">
                                        <input v-model="messageContent" @keyup.enter="sendMessage" class="w-full"
                                               placeholder="Upišite poruku..."/>
                                        <button v-show="messageContent.length" @click.prevent="sendMessage"
                                                class="ml-2 p-2 flex items-center justify-center bg-gray-800 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform rotate-90"
                                                 fill="none" viewBox="0 0 24 24" stroke="#fff">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="flex flex-row items-center justify-start relative mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 cursor-pointer"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                             @click="showEmoji = !showEmoji">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor"
                                             @click="$modal.show('send-image-mobile')">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
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
                                        <div class="text-gray-600 mt-1">Klikom na jednu od konverzacija, započni
                                            raygovor.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- END: Chat Default -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="openImageGallery" class="image-gallery" @click="openImageGallery = false; selectedImage = ''">
            <div class="img-wrap">
                <img src="/svg/close.svg" alt="" class="close">
                <img :src="selectedImage" alt="" class="main-image">
            </div>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import {v4 as uuidv4} from "uuid";
import ActionButton from "../../../components/actionButtons/ActionButton";
import {mixin as clickaway} from "vue-clickaway";
import NotFound from "../../../components/global/NotFound";
import SmallListingCard from "../../../components/SmallListingCard";
import LoadingBar from "@/components/LoadingBar"

@Component({
    components: {
        LoadingBar,
        SmallListingCard,
        NotFound,
        ActionButton
    },
    mixins: [clickaway],
    middleware: ['auth'],
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'search',
    async asyncData(ctx) {
        let conversations = [];

        try {
            let res = await ctx.app.$axios.get('/conversations');
            conversations = res.data.data;
        } catch (e) {
            console.log(e)
        }

        return {
            conversations
        }
    }
})
export default class Poruke extends Vue {
    loadingMore = false;
    messages = [];
    showConversationDiv = false;
    messagesLoaded = true;
    currentConversation = null;
    messageContent = '';
    pinned_conversation = null;
    isMounted = false;
    search = '';
    showEmoji = false;
    imgSrc = ""
    imgBlob = null;
    showImageUpload = false;
    openImageGallery = false;
    selectedImage = ''
    oldX = null;
    oldY = null;
    loadingMobileMessages = false;
    messagesPage = 1;
    messagesTotalPages = 0;

    mounted() {
        this.readMessageNotifications();

        let xPos = null;
        let yPos = null;

        let self = this;

        window.addEventListener("touchmove", function (event) {
            let touch = event.originalEvent.touches[0];
            self.oldX = xPos;
            self.oldY = yPos;
            xPos = touch.pageX;
            yPos = touch.pageY;
            if (self.oldX == null && self.oldY == null) {
                return false;
            } else {
                if (Math.abs(self.oldX - xPos) > Math.abs(self.oldY - yPos)) {
                    event.preventDefault();
                    return false;
                }
            }
        });
        // this.$nextTick(() => {
        //     try {
        //         // this is required for each ad slot (calling this once will only load 1 ad)
        //         (window.adsbygoogle = window.adsbygoogle || []).push({});
        //     } catch (error) {
        //         console.error(error)
        //     }
        // })

        this.realtime();

        let pinned = localStorage.getItem('pinned');

        if (pinned) {
            this.pinned_conversation = JSON.parse(pinned);
        }

        this.isMounted = true;
    }

    async readMessageNotifications() {
        try {
            await this.$axios.post('/profile/messages/read');
        } catch (e) {
            console.log(e);
        }
    }

    selectEmoji(emoji) {
        this.messageContent += emoji.data;
    }

    away() {
        this.showEmoji = false;
    }

    preview(e) {
        this.imgSrc = URL.createObjectURL(e.target.files[0]);


        this.imgBlob = e.target.files[0];
    }

    goToUser(u) {
        console.log(u)
        if (u[0].user_type === 'agency' || u[0].user_type === 'investor') {
            this.$router.push('/pravno-lice/' + u[0].id)
        } else if (this.$auth.user.user_type === 'agent') {
            this.$router.push('/agent/' + u[0].id)
        } else {
            this.$router.push('/users/' + u[0].id)
        }
    }

    async upload(e) {
        let formData = new FormData();
        let key = uuidv4();

        formData.append("file", e);
        formData.append("type", 'image');
        formData.append("content", 'a');
        formData.append("sender", this.$auth.user);
        formData.append("key", key);

        try {
            this.messages.push({
                message_type: "text",
                sender: this.$auth.user,
                content: "Uploading...",
                id: key,
                delivered: false
            })

            this.scrollBottom();

            let res = await this.$axios.post('/conversations/' + this.currentConversation.id + '/messages',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            let messageId = res.data.data.id;
            key = res.data.data.key;

            let message = this.messages.find(item => item.id === key);

            if (message) {
                message.id = messageId;
                message.content = res.data.data.content;
                message.message_type = 'media';
                message.delivered = true;
            }

            this.$modal.hide('send-image')
        } catch (e) {
            console.log(e)
        }
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

        if (this.pinned_conversation && (this.pinned_conversation.id === c.id)) {
            this.pinned_conversation = null;

            localStorage.removeItem('pinned');
            return
        }
        this.pinned_conversation = c;

        if (process.browser) {
            localStorage.setItem('pinned', JSON.stringify(c))
        }
    }

    deleteConversation(c) {
        let index = this.conversations.findIndex(item => item.id === c.id);

        this.$axios.delete('/conversations/' + c.id);

        if (index !== -1) {
            this.conversations.splice(index, 1);

            if(this.conversations.length) {
                this.currentConversation = this.conversations[0];
            } else  {
                this.currentConversation = null
            }
        }
    }

    others(conversation) {
        return conversation.users.filter(item => item.id !== this.$auth.user.id);
    }

    async handleSelectedConversation(conv, index) {
        if (!this.$device.isMobile) {
            if (this.currentConversation !== conv) {
                this.currentConversation = conv;

                this.conversations[index].unread = 0;

                await this.fetchMessages(conv.id);

                this.scrollBottom();
            }
        } else {
            this.currentConversation = conv;

            this.conversations[index].unread = 0;

            this.loadingMobileMessages = true;
            await this.fetchMessages(conv.id);
            this.loadingMobileMessages = false;

            this.showConversationDiv = true;
            this.scrollBottom();
        }
    }

    scrollBottom() {
        this.$nextTick(() => {
            let container = this.$refs.messageContainer;
            let mobileContainer = this.$refs.mobileConversations;

            if (container) {
                container.scrollTop = container.scrollHeight;
            }

            if (mobileContainer) {
                mobileContainer.scrollTop = mobileContainer.scrollHeight;
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
                message_type: 'text',
                sender: this.$auth.user,
                content: this.messageContent,
                id: key,
                delivered: false
            })

            this.scrollBottom();

            let content = this.messageContent;
            this.messageContent = '';

            let res = await this.$axios.post('/conversations/' + this.currentConversation.id + '/messages', {
                key: key,
                content: content
            });

            let messageId = res.data.data.id;
            key = res.data.data.key;

            let message = this.messages.find(item => item.id === key);

            if (message) {
                message.id = messageId;
                message.delivered = true;
            }
        } catch (e) {
            console.log(e)
        }
    }

    async loadMore() {
        this.loadingMore = true;

        this.messagesPage++;

        try {
            let res = await this.$axios.get('/conversations/' + this.currentConversation.id + '/messages?page=' + this.messagesPage);

            this.messages = res.data.data.concat(this.messages);
            this.messagesLoaded = true;

            this.messagesTotalPages = res.data.meta.last_page;
        } catch (e) {
            console.log(e)
        }

        this.loadingMore = false;
    }

    async fetchMessages(id) {
        this.messagesPage = 1;
        this.messagesLoaded = false;
        try {
            let res = await this.$axios.get('/conversations/' + id + '/messages');

            console.log(res.data);

            this.messages = res.data.data;
            this.messagesLoaded = true;

            this.messagesTotalPages = res.data.meta.last_page;
        } catch (e) {
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
    padding: 0 !important;
    margin-top: 0 !important;
    height: calc(100vh - 80px) !important;
    overflow-y: hidden;
}

.chat__box__input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
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
    border-radius: 6px;
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
    border-radius: 6px;
    max-height: 50px;
    border: 1px solid #ddd;
    background: #f9f9f9;

    &:focus {
        outline: 1px solid #000;
        border-radius: 6px;
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
    @include for-phone-only {
        box-shadow: none;
        border-bottom: 1px solid #f1f1f1;
        border-radius: 0;
        margin-bottom: 0;
    }
}

.chat .chat__tabs a {
    font-family: 'NunitoSans', sans-serif;;
    height: 48px;
    border-radius: 6px;
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
    font-family: 'NunitoSans', sans-serif;;
    height: 48px;
    border-radius: 6px;
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
    border: 2px solid hsla(218, 34%, 30%, 1);
    background: transparent;
}

.chat__chat-list {
    display: flex !important;
    flex-direction: column !important;
    padding: 24px;

    @include for-phone-only {
        padding-top: 0px;
        padding: 0 14px 24px 14px;
        overflow-y: scroll;
        height: calc(100vh - 140px) !important;
    }
}

.conversation-box {
    display: flex;
    position: relative;
    border-bottom: 1px solid #f1f1f1;

    &:last-child {
        border-bottom: none;
    }

    &.active-chat {
        background: #f9f9f9;
        border-radius: 10px;
        border-bottom: none;
    }

    &.pinned {
        order: -1;
        color: #fff !important;
        border: 1px solid #000;
        border-radius: 10px;
    }
}

@include for-phone-only {
    .vm--modal {
        max-height: 100vh !important;
        min-height: 100vh !important;
        top: 0 !important;
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
    }
}


.vm--container {
    height: 100% !important;
    top: 0 !important;
}

.bg-theme-17 {
    background: #f1f1f1 !important;

    &.me {
        a {
            color: #1F2937 !important;
        }
    }
}

.mobile-chat {
    min-width: 25%;
    border-right: 1px solid #f1f1f1;
    height: calc(100vh - 80px);
    @include for-phone-only {
        width: 100%;
        min-width: 100%;
        height: auto;
    }
}

.custom-header {
    height: 70px;
    padding: 24px;
    border-bottom: 1px solid #f1f1f1;

    @include for-phone-only {
    }

    h3 {
        font-size: 20px;
        font-weight: 600;
    }
}

.listing-wrap {
    min-width: 25%;
    @include for-phone-only {
        width: 100%;
        min-width: 100%;
    }
}

.main-content {
    height: calc(100vh - 80px);
    border-right: 1px solid #f1f1f1;
}

.mobile-height {
    height: 500px !important;
    max-height: 500px !important;

    @include for-phone-only {
        padding: 0px;
        height: calc(100vh - 250px) !important;
        min-height: calc(100vh - 250px) !important;
        max-height: calc(100vh - 250px) !important;

        @supports (-webkit-touch-callout: none) {
            min-height: calc(100vh - 380px) !important;
            max-height: calc(100vh - 275px) !important;
        }
    }
}

#EmojiPicker {
    position: absolute;
    bottom: 113px;
    background: #fff;
    border: none;
    padding: 0;
    right: 16px;
    left: 16px;
    width: auto;

    @include for-phone-only {
        top: 0;
        bottom: inherit;
    }
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

    @include for-phone-only {
        height: 40px;
        width: 40px;
        min-width: 40px;
    }
}

.image-preview-modal {
    position: absolute;
    bottom: 94px;
    width: 400px;
    height: fit-content;
    overflow-y: scroll;
    background: #fff;
    border-radius: 6px;

    @include for-phone-only {
        left: 0;
        width: 100%;
        bottom: 74px;
    }

}

#image {
    height: 100%;
    width: auto !important;
    margin: 0 auto;
}

.message-image {
    height: 200px;
    width: fit-content;
    border-radius: 6px;
    margin-bottom: 4px;
    min-width: auto !important;
    width: auto !important;
}

.image-gallery {
    position: fixed;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.38);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .img-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
    }

    img {
        &.main-image {
            height: 70vh;
            width: fit-content;
        }

        &.close {
            margin-bottom: 24px;
            cursor: pointer;
        }
    }

    button {
        &:hover,
        &:focus {
            outline: none;
        }

        svg {
            filter: invert(1) brightness(0);
        }
    }
}

.tab-link {
    text-decoration: underline !important;
    font-size: 12px;
}

.upload-image {
    border: 2px dashed #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
}

.image-upload-wrapper {
    background: #f9f9f9;
    border: 2px dashed #f1f1f1;
    border-radius: 6px;
    height: 100%;
    width: 100%;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px 0;

}

.chat {
    width: 100%;
    margin: 0 auto;
}

.messages-wrapper {
    width: 100%;
    margin: 0 auto;
    height: calc(100vh - 263px);
    overflow-y: scroll;
    background-color: #ffffff;
    padding: 24px 25%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23aaaaaa' fill-opacity='0.05'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E");
}

.chat .chat__box .chat__box__text-box {
    max-width: 75%;
}

.not-me-box {
    border: 1px solid #f1f1f1;
    background-color: #fff;
}

.listing-card {
    max-width: 200px;

    img {
        height: fit-content;
        width: 200px;
        max-height: 180px;
    }

    h3 {
        margin-top: 14px;
        font-weight: 600;
        font-size: 14px;
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 16px;
        margin-bottom: 16px;
    }
}

.add-border {
    border: 1px solid #f1f1f1;
    background-color: #fff;
}

.conversation-div {
    background: #fff;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .modal-inner {
        padding: 0 24px 0 24px;
    }
}

.chat__box.box {
    height: calc(100vh - 80px);

    @include for-phone-only {
        height: 100%;
    }
}

.chat__chat-list {
    height: calc(100vh - 150px);

    @include for-phone-only {
        height: 100%;
    }
}

.download {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 10;
    border-radius: 4px;
    background: #f1f1f1;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

