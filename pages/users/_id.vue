<template>
  <div class="user-profile-wrapper px-20 mx-auto w-full pb-8">
    <div class="flex">
      <!-- Content area -->
      <div class="flex-1 flex flex-col">

        <!-- Main content -->
        <div class="flex-1 flex items-stretch mobile-flex w-full max-w-7xl m-auto">
          <main class="overflow-y-auto w-full">
            <div class="w-full mx-auto main-container-user">
              <div class="flex" v-if="!$device.isMobile">
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

              <div class="content-wrapper">
                <ul class="flex w-full items-center main-tabs">
                  <li v-for="(tab, index) in tabs" :key="index" @click="selected_tab = index" :class="[ 'mr-4 py-4 px-4 border border-gray-300', selected_tab === index ? 'active-tab' : '' ]">{{ tab }}</li>
                </ul>
                <div v-if="selected_tab === 0">
                  <div>
                    <div class="filters-agency">
                      <div class="content pb-20">
                        <h2 class="mb-4">Aktivni oglasi ({{ listings.length }})</h2>
                        <div v-if="listings.length || loadingListings" class="grid-layout">
                          <ListingCard v-for="listing in listings" :listing="listing" :key="listing.id"></ListingCard>
                        </div>
                        <NotFound v-else src="/realestatenoresults.svg" :text="$auth.user && $auth.user.id === user.id? 'Nemate aktivnih oglasa' : 'Korisnik nema aktivnih oglasa'"></NotFound>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div>
                    <div class="filters-agency">
                      <div class="content pb-20">
                        <h2 class="mb-4">Završeni oglasi ({{ completed_listings.length }})</h2>
                        <div v-if="completed_listings.length" class="grid-layout">
                          <ListingCard v-for="listing in completed_listings" :listing="listing" :key="listing.id"></ListingCard>
                        </div>
                        <NotFound v-else src="/realestatenoresults.svg" :text="$auth.user && $auth.user.id === user.id? 'Nemate završenih oglasa' : 'Korisnik nema završenih oglasa'"></NotFound>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </main>

          <!-- Details sidebar -->
          <aside class="user-wrap rounded-lg bg-white p-0 w-full lg:px-4 up:px-4 xl:px-4 ml-6 overflow-y-auto">
            <div class="col-span-1 flex flex-col text-center bg-white divide-y divide-gray-200">
              <div class="flex-1 flex flex-row justify-start p-0 pt-0 inner">
                <img class="w-32 h-32 flex-shrink-0 bg-black rounded-full cursor-pointer" :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']" alt="">
                <div class="w-full inner">
                  <div class="flex flex-col items-start justify-start h-14 pl-4 w-full">
                    <div class="flex flex-row items-center justify-between w-full">
                      <h2 class="text-lg font-medium text-black leading-5 text-left">{{ user.name }}</h2>
                      <dd>
                        <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ user_type(user.user_type) }}</span>
                      </dd>
                    </div>
                    <dd class="mt-1 flex flex-row items-center justify-start">
                      <span :class="['p-2 mr-2 rounded-full', user.online ? 'bg-green-500' : 'bg-gray-300']"></span>
                      {{ user.online ? 'Online' : 'Offline' }}
                    </dd>
                  </div>
                  <div class="pl-4">
                    <div class="flex items-center justify-start text-gray-700 mt-2 w-full" v-if="user.working_agency !== null">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <p>{{ user.working_agency.name }}</p>
                    </div>
                    <div class="flex items-center justify-start text-gray-700 mt-2 w-full" v-if="user.hasOwnProperty('email')">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p>{{ user.email }}</p></div>
                  </div>
                </div>
              </div>
              <div class="flex flex-row items-center justify-between mt-2 w-full" v-if="this.$auth.user">
                <div class="flex flex-row items-center grid grid-cols-2 gap-x-4 justify-between w-full" v-if="$auth.user.id !== user.id">
                  <button class="flex-1 flex cursor-pointer" @click="$modal.show('contact-user')">
                    <nuxt-link to="" class="mr-2 relative flex-1 inline-flex items-center justify-center text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                      <!-- Heroicon name: solid/mail -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span class="ml-3">Poruka</span>
                    </nuxt-link>
                  </button>
                  <button class="flex-1 flex cursor-pointer" @click="toggleFollow()">
                    <nuxt-link :to="user.user_type === 'agency' ? '/agency/' + user.id : '/users/' + user.id" class="ml-2 relative flex-1 inline-flex items-center justify-center text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span class="ml-3">{{ isFollowed ? 'Otprati' : 'Zaprati' }}</span>
                    </nuxt-link>
                  </button>
                </div>
                <div class="flex flex-row items-center justify-between w-full" v-else>
                  <action-button class="mt-4" placeholder="Uredi profil" @action="$router.push('/moj-racun/uredi-profil')" :style-options="{ width: '100%', background: '#1F2937', color: '#fff'}"></action-button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    <client-only>
      <modal @before-open="beforeOpen" @before-close="beforeClose" name="contact-user" :adaptive="true" height="100%">
        <div class="modal-inner">
          <div class="modal-header">
            <h2>Poruka za {{ user.name }}</h2>
            <i class="material-icons" @click="$modal.hide('contact-user')">close</i>
          </div>
          <div class="modal-content">
            <textarea v-model="message"></textarea>
            <action-button class="mt-4" placeholder="Pošalji" @action="sendMessage" :style-options="{ width: '100%'}" :loading="loading"></action-button>
          </div>
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ListingCard from "@/components/listingCard/ListingCard";
import UserCard from "../../components/UserCard";
import skeleton from "../../components/skeleton";
import NotFound from "../../components/global/NotFound";

@Component({
  components: {NotFound, UserCard, ListingCard, skeleton},
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
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
  completed_listings = []
  feedback = []
  listingsLoaded = false;
  selected_tab = 0;
  tabs = [
    'Aktivni oglasi',
    'Završeni'
  ]
  get isMe() {
    if(this.$auth.user) {
      return this.$auth.user.id === this.user.id;
    }
  }

  goToUser(id) {
      this.$router.push('/agency/' + id)
  }

  async created() {
    this.isFollowed = this.meta.followed;
    await this.fetchUserListings(this.$route.params.id)
  }

  async sendMessage() {
    if(this.message.length === 0) {

      this.$toast.open({
        message: "Morate upisati poruku",
        type: 'warning',
        duration: 5000
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
        key: Math.floor(Math.random() * 100).toString()
      });

      this.$modal.hide('contact-user');

      this.loading = false;

      this.$toast.open({
        message: "Uspješno ste poslali poruku korisniku " + this.user.name,
        type: 'warning',
        duration: 5000
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

        this.$toast.open({
          message: "Uspješno ste zapratili korisnika " + this.user.name,
          type: 'warning',
          duration: 5000
        });

        this.isFollowed = true;
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        this.$axios.delete('/users/' + this.user.id + '/follow');

        this.$toast.open({
          message: "Uspješno ste otpratili korisnika " + this.user.name,
          type: 'warning',
          duration: 5000
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


  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else if(t === 'user'){
      return 'Korisnik'
    } else {
      return 'Agent'
    }
  }

  async fetchUserListings(id) {
    this.listingsLoaded = false;
    try {
      let response = await this.$axios.get('/users/' + id + '/listings/active')
      this.listings = response.data.data;
      this.listingsLoaded = true;
    } catch(e) {
      console.log(e)
    }
  }

  async fetchUserFinishedListings(id) {
    this.listingsLoaded = false;
    try {
      let response = await this.$axios.get('/users/' + id + '/listings/completed')
      this.completed_listings = response.data.data;
      this.listingsLoaded = true;
    } catch(e) {
      console.log(e)
    }
  }

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
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
  box-sizing: border-box;
  margin: 0 auto;

  @include for-phone-only {
    width: 100%;
    padding: 0 16px;
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

    }
  }

  .separator {
    margin: 24px 0;
    border-bottom: 1px solid #f7f7f7;
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

.listing-card ::v-deep .listing-card-wrapper {
  width: 100%;
  min-width: 100%;

  img {
    height: 220px;

    @include for-phone-only {
      width: 100%;

    }
  }
}

.listing-card ::v-deep a {
  width: 100%;
}

aside {
  padding-top: 63px;

  @include for-phone-only {
    padding: 0px;
    margin: 0;
    border-left: none;
    padding-top: 36px;
    background: #fff;
  }
}

::v-deep {
  .shadow {
    box-shadow: none;
    border-left: 1px solid #f1f1f1;

    @include for-phone-only {
      border-left: none;
    }
  }
}

.mobile-flex {
  @include for-phone-only {
    display: flex;
    flex-direction: column-reverse;
  }
}

.user-wrap {
  max-width: 400px;
  height: fit-content;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 8px !important;
  box-sizing: border-box;
  margin-top: 90px;
  position: sticky;
  top: 90px;
  margin-left: 36px;

  img {
    margin-right: 16px;
    height: 80px;
    max-height: 80px;
    min-width: 80px;
    max-width: 80px;
  }

  @include for-phone-only {
    max-width: 100%;
    margin-top: 24px;
    margin-left: 0;
    position: static;
    padding: 0;
    box-shadow: none !important;
    background: #fff;

    img {
      height: 100px;
      width: 100px;
      margin-bottom: 16px;
      margin-right: 0;
    }
  }

  .inner {
    @include for-phone-only {

    }

    a {
      @include for-phone-only {
        background: #fff;
      }
    }
  }

}

.listings-user-wrap {
  @include for-phone-only {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 12px;
    grid-row: 16px;
  }
}


::v-deep .listing-card-wrapper {
  width: 100%;
  max-width: 100%;
}

.main-container-user {
  @include for-phone-only {
    width: 100%;
    max-width: 100%;
  }
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    height: 400px;

    @include for-phone-only {
      height: 250px;
    }
  }

  p {
    font-size: 20px;
    font-weight: 500;
    margin-top: 24px;
  }
}


.main-tabs {
  margin-bottom: 24px;
  li {
    border: 1px solid #f9f9f9;
    cursor: pointer;

    &.active-tab {
      font-weight: 600;
      background: #f9f9f9;
      border-radius: 6px;
    }

  }
}

.content-wrapper {
  margin-top: 80px;
}

.grid-layout {
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 24px;
  padding: 0;

  @include for-phone-only {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 12px;
    grid-row: 16px;
  }
}

</style>
