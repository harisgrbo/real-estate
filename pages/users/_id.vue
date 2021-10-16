<template>
  <div class="user-profile-wrapper px-20 mx-auto w-full py-8">
    <div class="flex overflow-hidden">
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

              <h2 class="font-medium text-2xl">Oglasi</h2>

              <section class="mt-8 pb-16" aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" class="sr-only">Recently viewed</h2>
                <ul role="list" class="grid grid-cols-4 gap-4 gap-x-6">
                  <li class="relative listing-card" v-for="listing in listings">
                    <ListingCard :listing="listing" :key="listing.id"></ListingCard>
                  </li>

                  <!-- More files... -->
                </ul>
              </section>
            </div>
          </main>

          <!-- Details sidebar -->
          <aside class="w-96 bg-white px-4 ml-6 border-l border-gray-200 overflow-y-auto">
            <div class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
              <div class="flex-1 flex flex-row justify-start p-8 pt-0">
                <img class="w-32 h-32 flex-shrink-0 bg-black rounded-full" :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']" alt="">
                <div class="ml-4">
                  <h3 class="text-gray-900 text-md font-medium">{{ user.name }}</h3>
                  <dl class="mt-1 flex-grow flex flex-col justify-between">
                    <dt class="sr-only">Title</dt>
                    <dt class="sr-only">Role</dt>
                    <dd class="mt-3">
                      <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ user_type(user.user_type) }}</span>
                    </dd>
                  </dl>
                </div>
              </div>
              <div>
                <div class="-mt-px flex divide-x divide-gray-200">
                  <div class="w-0 flex-1 flex cursor-pointer" @click="$modal.show('contact-user')">
                    <a class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                      <!-- Heroicon name: solid/mail -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span class="ml-3">Poruka</span>
                    </a>
                  </div>
                  <div class="-ml-px w-0 flex-1 flex cursor-pointer" @click="toggleFollow()">
                    <nuxt-link :to="user.user_type === 'agency' ? '/agency/' + user.id : '/users/' + user.id" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span class="ml-3">{{ isFollowed ? 'Otprati' : 'Zaprati' }}</span>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    <client-only>
      <modal name="contact-user" :adaptive="true" height="100%">
        <div class="modal-inner">
          <div class="modal-header">
            <h2>Poruka za {{ user.name }}</h2>
            <i class="material-icons" @click="$modal.hide('contact-user')">close</i>
          </div>
          <div class="modal-content">
            <textarea v-model="message"></textarea>
            <action-button class="mt-4" placeholder="Pošalji" @action="sendMessage" :loading="loading"></action-button>
          </div>
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ListingCard from "@/components/listingCard/ListingCard";
import Snackbar from "@/components/global/Snackbar";
import UserCard from "../../components/UserCard";

@Component({
  components: {UserCard, ListingCard, Snackbar},
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
  feedback = []

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
        text: "uspješno ste poslali poruku korisniku " + this.user.name,
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
          text: "uspješno ste zapratili korisnika " + this.user.name,
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
          text: "uspješno ste otpratili korisnika " + this.user.name,
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


  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else {
      return 'Korisnik'
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
  box-sizing: border-box;
  margin: 0 auto;

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
      font-family: 'Lato', sans-serif;
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

.listing-card ::v-deep .listing-card-wrapper {
  width: 100%;
}

.listing-card ::v-deep a {
  width: 100%;
}

aside {
  padding-top: 63px;
}

::v-deep {
  .shadow {
    box-shadow: none;
    border-left: 1px solid #f1f1f1;
  }
}
</style>
