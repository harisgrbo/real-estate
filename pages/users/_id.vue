<template>
  <div class="user-profile-wrapper max-w-7xl mx-auto w-full py-8">
<!--    <div class="user-content-wrapper">-->
<!--      <div class="user-info">-->
<!--        <img src="/test/img1.jpg" alt="" @click="$router.push('/users/' + user.id)">-->
<!--        <div class="username-wrapper">-->
<!--          <div class="rating">-->
<!--            <p @click="$router.push('/users/' + user.id)">{{ user.name }}</p>-->
<!--          </div>-->
<!--          <div class="buttons">-->
<!--            <span>Fizicko lice</span>-->
<!--          </div>-->
<!--          <div class="contact-buttons" v-if="isMe">-->
<!--            <ActionButton @action="$modal.show('contact-user')" placeholder="Uredi" icon="paper-plane"></ActionButton>-->
<!--            <ActionButton placeholder="Izbrisi" @action="toggleFollow" icon="user-plus"></ActionButton>-->
<!--          </div>-->
<!--          <div class="contact-buttons" v-else>-->
<!--            <ActionButton @action="$modal.show('contact-user')" placeholder="Poruka" icon="paper-plane"></ActionButton>-->
<!--            <ActionButton :placeholder="isFollowed? 'Otprati' : 'Zaprati'" @action="toggleFollow" icon="user-plus"></ActionButton>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="separator"></div>-->
<!--      <ul class="user-information">-->
<!--        <li>-->
<!--          <p>Broj telefona</p>-->
<!--          <b>061559944</b>-->
<!--        </li>-->
<!--        <li>-->
<!--          <p>Registrovan</p>-->
<!--          <b>{{ $moment(user.created_at).format("DD.MM.YYYY") }}</b>-->
<!--        </li>-->
<!--        <li>-->
<!--          <p>Email</p>-->
<!--          <b>{{ user.email }}</b>-->
<!--        </li>-->
<!--        <li>-->
<!--          <p>ID</p>-->
<!--          <b>{{ user.id }}</b>-->
<!--        </li>-->
<!--        <li>-->
<!--          <p>Verifikovan</p>-->
<!--          <b>Da</b>-->
<!--        </li>-->
<!--      </ul>-->
<!--      <div class="reporting-system">-->
<!--        <button class="save" v-if="!isMe">-->
<!--          <font-awesome-icon icon="heart"></font-awesome-icon>-->
<!--          Spasi korisnika-->
<!--        </button>-->
<!--        <button class="save" v-if="!isMe">-->
<!--          <font-awesome-icon icon="user-slash"></font-awesome-icon>-->
<!--          Prijavi korisnika-->
<!--        </button>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="content-wrapper">-->
<!--      <ul>-->
<!--        <li v-for="(tab, index) in tabs" @click="activeTab = index" :key="index" :class="[ activeTab === index ? 'active' : '' ]">{{ tab }}</li>-->
<!--      </ul>-->
<!--      <div>-->
<!--        <div v-if="activeTab === 0">-->
<!--          <div class="grid-layout" v-if="listings.length">-->
<!--            <ListingCard v-for="listing in listings" :listing="listing" :key="listing.id"></ListingCard>-->
<!--          </div>-->
<!--          <div v-else class="no-image">-->
<!--            <img src="/noimg.jpg" alt="no-image">-->
<!--            <p>{{ $auth.user && $auth.user.id === user.id? 'Nemate aktivnih oglasa' : 'Korisnik nema aktivnih oglasa' }}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-if="activeTab === 1">-->
<!--          <div class="grid-layout" v-if="finishedListings.length">-->
<!--            <ListingCard v-for="listing in finishedListings" :listing="listing" :key="listing.id"></ListingCard>-->
<!--          </div>-->
<!--          <div v-else class="no-image">-->
<!--            <img src="/noimg.jpg" alt="no-image">-->
<!--            <p>{{ $auth.user && $auth.user.id === user.id? 'Nemate završenih oglasa' : 'Korisnik nema završenih oglasa' }}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-if="activeTab === 2">-->
<!--          <div class="grid-layout" v-if="feedback.length">-->
<!--            feedback-->
<!--          </div>-->
<!--          <div v-else class="no-image">-->
<!--            <img src="/noimg.jpg" alt="no-image">-->
<!--            <p>{{ $auth.user && $auth.user.id === user.id? 'Nemate ostavljenih dojmova' : 'Korisnik nema ostavljenih dojmova' }}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <client-only>-->
<!--      <modal name="contact-user" :adaptive="true" height="100%">-->
<!--        <div class="modal-inner">-->
<!--          <div class="modal-header">-->
<!--            <h2>Poruka za {{ user.name }}</h2>-->
<!--            <i class="material-icons" @click="$modal.hide('contact-user')">close</i>-->
<!--          </div>-->
<!--          <div class="modal-content">-->
<!--            <textarea v-model="message"></textarea>-->
<!--            <action-button placeholder="Pošalji" @action="sendMessage" :loading="loading"></action-button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </modal>-->
<!--    </client-only>-->
<!--    <Snackbar></Snackbar>-->
    <!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ]
  }
  ```
-->
    <div class="flex overflow-hidden">
      <!-- Narrow sidebar -->
      <!--
        Mobile menu

        Off-canvas menu for mobile, show/hide based on off-canvas menu state.
      -->
      <div class="fixed inset-0 z-40 flex md:hidden" role="dialog" aria-modal="true">
        <!--
          Off-canvas menu overlay, show/hide based on off-canvas menu state.

          Entering: "transition-opacity ease-linear duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "transition-opacity ease-linear duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>

        <!--
          Off-canvas menu, show/hide based on off-canvas menu state.

          Entering: "transition ease-in-out duration-300 transform"
            From: "-translate-x-full"
            To: "translate-x-0"
          Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "-translate-x-full"
        -->
        <div class="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
          <!--
            Close button, show/hide based on off-canvas menu state.

            Entering: "ease-in-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in-out duration-300"
              From: "opacity-100"
              To: "opacity-0"
          -->
          <div class="absolute top-1 right-0 -mr-14 p-1">
            <button type="button" class="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white">
              <!-- Heroicon name: outline/x -->
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="sr-only">Close sidebar</span>
            </button>
          </div>

          <div class="flex-shrink-0 px-4 flex items-center">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="Workflow">
          </div>
          <div class="mt-5 flex-1 h-0 px-2">
            <nav class="h-full flex flex-col">
              <div class="space-y-1">
                <!-- Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:bg-indigo-800 hover:text-white" -->
                <a href="#" class="text-indigo-100 hover:bg-indigo-800 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium">
                  <!--
                    Heroicon name: outline/home

                    Current: "text-white", Default: "text-indigo-300 group-hover:text-white"
                  -->
                  <svg class="text-indigo-300 group-hover:text-white mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </a>

                <a href="#" class="text-indigo-100 hover:bg-indigo-800 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium">
                  <!-- Heroicon name: outline/view-grid -->
                  <svg class="text-indigo-300 group-hover:text-white mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>All Files</span>
                </a>

                <a href="#" class="bg-indigo-800 text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium" aria-current="page">
                  <!-- Heroicon name: outline/photograph -->
                  <svg class="text-white mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Photos</span>
                </a>

                <a href="#" class="text-indigo-100 hover:bg-indigo-800 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium">
                  <!-- Heroicon name: outline/user-group -->
                  <svg class="text-indigo-300 group-hover:text-white mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Shared</span>
                </a>

                <a href="#" class="text-indigo-100 hover:bg-indigo-800 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium">
                  <!-- Heroicon name: outline/collection -->
                  <svg class="text-indigo-300 group-hover:text-white mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>Albums</span>
                </a>

                <a href="#" class="text-indigo-100 hover:bg-indigo-800 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium">
                  <!-- Heroicon name: outline/cog -->
                  <svg class="text-indigo-300 group-hover:text-white mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Settings</span>
                </a>
              </div>
            </nav>
          </div>
        </div>

        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>

      <!-- Content area -->
      <div class="flex-1 flex flex-col overflow-hidden">

        <!-- Main content -->
        <div class="flex-1 flex items-stretch">
          <main class="flex-1 overflow-y-auto">
            <div class="max-w-7xl mx-auto">
              <div class="flex">
                <div class="ml-6 bg-gray-100 p-0.5 rounded-lg flex items-center sm:hidden">
                  <button type="button" class="p-1.5 rounded-md text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <!-- Heroicon name: solid/view-list -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                    <span class="sr-only">Use list view</span>
                  </button>
                  <button type="button" class="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <!-- Heroicon name: solid/view-grid -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span class="sr-only">Use grid view</span>
                  </button>
                </div>
              </div>

              <!-- Tabs -->
              <div class="mt-3 sm:mt-2">
                <div class="hidden sm:block">
                  <div class="flex items-center border-b border-gray-200">
                    <nav class="flex space-x-4" aria-label="Tabs">
                      <!-- Current: "bg-gray-100 text-gray-700", Default: "text-gray-500 hover:text-gray-700" -->
                      <a :class="['text-gray-500 hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md cursor-pointer', activeTab === index ? 'bg-gray-100 text-gray-700 px-3 py-2 font-medium text-sm rounded-md' : '']" v-for="(tab, index) in tabs" @click="activeTab = index">
                        {{ tab }}
                      </a>
                    </nav>
                  </div>
                </div>
              </div>

              <!-- Gallery -->
              <section class="mt-8 pb-16" aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" class="sr-only">Recently viewed</h2>
                <ul role="list" class="grid grid-cols-3 sm:grid-cols-3 gap-4">
                  <li class="relative" v-for="listing in listings">
                    <ListingCard :listing="listing" :key="listing.id"></ListingCard>
                  </li>

                  <!-- More files... -->
                </ul>
              </section>
            </div>
          </main>

          <!-- Details sidebar -->
          <aside class="hidden w-96 bg-white px-4 ml-6 border-l border-gray-200 overflow-y-auto lg:block bg-gray-50">
            <div class="pb-16 space-y-6">
              <div>
                <div class="mt-4 flex items-start justify-between mb-4">
                  <div>
                    <h2 class="text-lg font-medium text-black">{{ user.name }}</h2>
                  </div>
                  <button type="button" class="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <!-- Heroicon name: outline/heart -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span class="sr-only">Favorite</span>
                  </button>
                </div>
                <div class="block w-full h-64 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80" alt="" class="object-cover">
                </div>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Informacije</h3>
                <dl class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                  <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Uploaded by</dt>
                    <dd class="text-gray-900">Marie Culver</dd>
                  </div>

                  <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Created</dt>
                    <dd class="text-gray-900">June 8, 2020</dd>
                  </div>

                  <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Last modified</dt>
                    <dd class="text-gray-900">June 8, 2020</dd>
                  </div>

                  <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Dimensions</dt>
                    <dd class="text-gray-900">4032 x 3024</dd>
                  </div>

                  <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Resolution</dt>
                    <dd class="text-gray-900">72 x 72</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Description</h3>
                <div class="mt-2 flex items-center justify-between">
                  <p class="text-sm text-gray-500 italic">Add a description to this image.</p>
                  <button type="button" class="bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <!-- Heroicon name: solid/pencil -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <span class="sr-only">Add description</span>
                  </button>
                </div>
              </div>
              <div class="flex">
                <button type="button" class="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Poruka
                </button>
                <button type="button" class="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Blokiraj
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ListingCard from "@/components/listingCard/ListingCard";
import Snackbar from "@/components/global/Snackbar";

@Component({
  components: {ListingCard, Snackbar},
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',
  async asyncData(ctx) {
    let user = null
    let meta = null

    try {
      let response = await ctx.app.$axios.get('/users/' + ctx.route.params.id)
      user = response.data.data;
      meta = response.data.meta;
    } catch(e) {
      console.log(e)
    }

    return {
      user,
      meta
    }
  }
})

export default class Users extends Vue {

  activeTab = 0
  isFollowed = ''
  message = '';
  loading = false;
  followLoading = false;
  listings = []
  finishedListings = []
  feedback = []
  tabs = [
    "Aktivni oglasi",
    "Završeni oglasi",
    "Dojmovi"
  ]

  get isMe() {
    if(this.$auth.user) {
      return this.$auth.user.id === this.user.id;
    }
  }

  async created() {
    console.log(this.user, 'user')
    this.isFollowed = this.meta.followed;
    await this.fetchUserListings(this.$route.params.id)
  }

  async sendMessage() {
    if(this.message.length === 0) {
      this.$snackbar.show({
        text: "Morate upisati poruku",
        timeout: 1000,
        type: "danger"
      });

      return
    }

    this.loading = true;
    try {
      let res = await this.$axios.post('/conversations', {
        users: [this.user.id],
      })

      let conversation = res.data.data;

      await this.$axios.post('/conversations/' + conversation.id + '/messages', {
        content: this.message,
        initial_key: Math.floor(Math.random() * 100).toString()
      });

      this.$modal.hide('contact-user');

      this.loading = false;

      this.$snackbar.show({
        text: "Uspjšsno ste poslali poruku korisniku " + this.user.name,
        timeout: 1000,
        type: "success"
      });


      this.message = '';
    } catch(e) {
      console.log(e)
    }
  }

  toggleFollow() {
    if (this.isFollowed === false) {
      try {
        this.$axios.post('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "Uspjšsno ste zapratili korisnika " + this.user.name,
          timeout: 1000,
          type: "success"
        });

        this.isFollowed = true;
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        this.$axios.delete('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "Uspjšsno ste otpratili korisnika " + this.user.name,
          timeout: 1000,
          type: "success"
        });

        this.isFollowed = false;
      } catch (e) {
        console.log(e)
      }
    }
  }

  async fetchUser(id) {
    try {
      let response = await this.$axios.get('/users/' + id)
      this.user = response.data.data;
      this.meta = response.data.meta;
    } catch(e) {
      console.log(e)
    }
  }

  async fetchUserListings(id) {
    try {
      let response = await this.$axios.get('/users/' + id + '/listings')
      this.listings = response.data.data;
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
.user-profile-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @include for-phone-only {
    flex-direction: column;
    width: 100%;
    padding: 12px;
    padding-top: 36px;
  }

  .user-content-wrapper {
    display: flex;
    flex-direction: row;
    padding: 12px;
    //box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    height: fit-content;
    align-items: center;
    @include for-phone-only {
      position: static;
    }

    .user-info {
      display: flex;
      width: 100%;
      align-items: flex-start;
      justify-content: flex-start;
      box-sizing: border-box;
      height: 100%;

      img {
        height: 120px;
        width: 120px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
      }

      .username-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 12px;
        height: 120px;
        width: 100%;

        .rating {
          display: flex;
          width: 100%;
          justify-content: space-between;

          p {
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
          }

        }


        .buttons {
          display: flex;

          span {
            margin-right: 8px;
            display: flex;
            align-items: center;
            font-size: 14px;
            padding: 6px 12px;
            border-radius: 5px;
            background: none;
            border: none;
            cursor: pointer;
            background: rgb(247, 247, 247) !important;
          }
        }
      }
    }

    .stars {
      display: flex;
      margin-bottom: 12px;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      svg {
        color: #1B1C32;
      }

      div {
        font-weight: 500;
      }
    }

    .contact-buttons {
      display: flex;
      flex-direction: row;

      button {
        margin-top: 12px !important;
        width: fit-content;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        height: 40px;
        background: #f3f3f4;
        color: #000;

        &:first-child {
          margin-right: 16px;
        }

        &:hover {
          background: #e7e7e9;
        }
      }
    }
  }

  .separator {
    margin: 24px 0;
    border-bottom: 1px solid #f7f7f7;
  }


  .content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;

    @include for-phone-only {
      padding: 0px;
      padding-top: 36px;
      padding-bottom: 120px;
    }

    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 36px;
      margin-top: 36px;
      border-bottom: 1px solid #EBEBEB !important;

      @include for-phone-only {
        overflow-x: scroll ;
      }

      li {
        margin-right: 24px;
        padding-bottom: 8px;
        height: 40px;
        position: relative;
        cursor: pointer;
        text-transform: capitalize;
        font-weight:500 !important;
        font-size: 16px !important;
        line-height: 24px !important;
        color: #848484;

        @include for-phone-only {
          min-width: fit-content;
        }

        &:last-child {
          margin-right: 0;
        }

        &.active {
          color: #0d0c22;
        }
      }
    }

    .grid-layout {
      grid-template-columns: repeat( auto-fill, minmax(250px, 1fr) );
      padding: 0;

      @include for-phone-only {
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        grid-column-gap: 12px !important;
      }
    }
  }
}

.modal-header {
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #dcdcdc;
  justify-content: space-between;

  h2 {
    font-size: 17px;
    font-weight: 500;
  }

  svg {
    cursor: pointer;
  }
}

.modal-inner {
  display: flex;
  flex-direction: column;
  padding: 0 24px;

  .modal-content {
    padding: 24px 0;
    textarea {
      height: 200px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: 'Raleway', sans-serif;
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

.save {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 5px;
  background: none;
  border: none;
  cursor: pointer;
  justify-content: center;
  width: fit-content;
  margin: 0 auto;
  margin-top: 24px;

  svg {
    color: #444;
    height: 16px;
    margin-right: 8px;
  }

  &:hover {
    background: rgb(247, 247, 247) !important;
    text-decoration: underline;
  }
}

ul.user-information {
  margin-bottom: 12px;
  li {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;

    div {
      display: flex;
      align-items: center;
      font-weight: 500;

      svg {
        margin-right: 8px;
      }
    }

    b {
      font-weight: 500;
    }
  }
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    height: 400px;
  }

  p {
    font-size: 20px;
    font-weight: 500;
    margin-top: 24px;
  }
}

.reporting-system {
  display:flex;
  align-items: center;
  justify-content: space-between;
}
</style>
