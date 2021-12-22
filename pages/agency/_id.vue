<template>
  <div class="user-profile-wrapper w-full px-20 pt-8">
    <div class="agency-banner" :style="{ backgroundImage: 'url(' + 'https://prostor.ba/assets/img/12h_banner_desktop.jpg?v=1.1' + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }">.</div>
    <div class="user-content-wrapper mt-8" >
      <div class="first-col">
        <aside class="w-96 bg-white overflow-y-auto">
          <div class="col-span-1 flex flex-col text-center bg-white rounded-lg divide-y divide-gray-200">
            <div class="flex-1 flex flex-row justify-start user-inner">
              <img class="w-32 h-32 flex-shrink-0 bg-black rounded-full" :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']" alt="">
              <div class="ml-4">
                <h3 class="text-gray-900 text-lg font-normal">{{ user.name }}</h3>
                <dd class="mt-1 flex flex-row items-center justify-start">
                  <span :class="['p-2 mr-2 rounded-full', user.online ? 'bg-green-500' : 'bg-gray-300']"></span>
                  {{ user.online ? 'Online' : 'Offline' }}
                </dd>
                <dl class="mt-1 flex-grow flex flex-col justify-between items-start">
                  <dt class="sr-only">Title</dt>
                  <dt class="sr-only">Role</dt>
                  <dd class="mt-1">
                    <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">Agencija</span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </aside>

      </div>
      <div class="second-col">
        <div class="grid grid-cols-1 gap-4 text-sm font-medium text-gray-500 infos">
          <div v-if="user.email !== null">{{ user.email }}</div>
          <div v-if="user.address !== null">{{ user.address }}</div>
          <div v-if="user.web !== null">{{ user.web }}</div>
          <div v-if="user.location !== null">{{ user.location }}</div>
          <div v-if="user.phone_number !== null">{{ user.phone_number }}</div>
        </div>
      </div>

<!--      {{ user }}-->
      <div class="third-col">
        <div v-if="isMe" class="w-full flex flex-end grid grid-cols-2 gap-4">
          <button class="-ml-px flex-1 flex cursor-pointer">
            <nuxt-link to="/moj-racun/uredi-profil" icon="user-plus" class="relative flex-1 inline-flex bg-gray-800 text-white items-center py-2 justify-center text-sm font-medium rounded-sm border border-transparent hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="ml-3">Uredi profil</span>
            </nuxt-link>
          </button>
          <button class="flex-1 flex cursor-pointer" @click="$modal.show('about-agency')">
            <div icon="user-plus" class="relative flex-1 inline-flex items-center justify-center bg-gray-800 text-white text-sm py-2 font-medium border border-transparent rounded-sm hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
              <span class="ml-3">O nama</span>
            </div>
          </button>
        </div>
        <div v-else class="w-full flex justify-end on-mobile">
          <div class="w-full grid grid-cols-2 gap-4" v-if="$auth.user">
            <button class="flex-1 flex cursor-pointer mr-4 first" @click="$modal.show('contact-user')">
              <a class="relative flex-1 inline-flex items-center justify-center py-2 text-sm bg-gray-800 text-white font-medium border border-transparent rounded-sm hover:text-gray-500" @action="$modal.show('contact-user')" placeholder="Uredi profil" icon="paper-plane">
                <!-- Heroicon name: solid/mail -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span class="ml-3">Poruka</span>
              </a>
            </button>
            <button class="flex-1 flex cursor-pointer" @click="toggleFollow()">
              <div icon="user-plus" class="relative flex-1 inline-flex items-center justify-center py-2 text-sm bg-gray-800 text-white font-medium border border-transparent rounded-sm hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="ml-3">{{ isFollowed? 'Otprati' : 'Zaprati' }}</span>
              </div>
            </button>
            <button class="flex-1 flex cursor-pointer" @click="$modal.show('about-agency')">
              <div icon="user-plus" class="relative flex-1 inline-flex items-center justify-center py-2 bg-gray-800 text-white text-sm font-medium border border-transparent rounded-sm hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
                <span class="ml-3">O nama</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="flex flex-row items-center justify-between mb-8 user-options">
        <ul class="category-list w-full">
          <li :class="['group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200', cat.id === selectedCategoryId ? 'selected-cat': '']" v-for="cat in categories" :key="cat.id" @click="handleSelectedCategory(cat)">{{ cat.title }}</li>
        </ul>
      </div>
      <div>
        <div v-if="activeTab === 0" class="filters-agency">
         <div class="content pb-20">
           <h2 class="mb-4">Oglasi ({{ listings.length }})</h2>
           <div v-if="listings.length || loadingListings" class="grid-layout">
             <ListingCard v-for="listing in listings" :listing="listing" :key="listing.id"></ListingCard>
           </div>
           <div v-else class="no-image">
             <img src="/nodata.jpeg" alt="no-image">
             <p>{{ $auth.user && $auth.user.id === user.id? 'Nemate aktivnih oglasa' : 'Agencija nema aktivnih oglasa' }}</p>
           </div>
         </div>
        </div>
      </div>
    </div>
    <modal @before-open="beforeOpen" @before-close="beforeClose" name="contact-user" :adaptive="true" height="100%">
      <div class="modal-inner">
        <div class="modal-header">
          <h2>Poruka za {{ user.name }}</h2>
          <i class="material-icons" @click="$modal.hide('contact-user')">close</i>
        </div>
        <div class="modal-content">
          <textarea v-model="message"></textarea>
          <action-button class="mt-4" :style-options="{ width: '100%'}" placeholder="Pošalji" @action="sendMessage" :loading="loading"></action-button>
        </div>
      </div>
    </modal>
    <modal @before-open="beforeOpen" @before-close="beforeClose" name="about-agency" :adaptive="true" height="100%">
      <div class="modal-inner">
        <div class="modal-header">
          <h2>O nama</h2>
          <i class="material-icons" @click="$modal.hide('about-agency')">close</i>
        </div>
        <div class="modal-content">
          <p>{{ user.description }}</p>
        </div>
      </div>
    </modal>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ListingCard from "@/components/listingCard/ListingCard";
import Snackbar from "@/components/global/Snackbar";
import PublishMap from "@/components/publish/PublishMap";
import UserMedals from "@/components/UserMedals"
import TextField from "@/components/inputs/TextField";
import RangeFilter from "@/components/search/RangeFilter";
import CategoryFilter from "@/components/search/CategoryFilter";
import TermFilter from "@/components/search/TermFilter";
import TermsFilter from "@/components/search/TermsFilter";
import Pagination from "@/components/pagination";
import {buildQuery} from "@/util/search";
import {capitalize} from "@/util/str";
import ActionButton from "../../components/actionButtons/ActionButton";

@Component({
  components: {ActionButton, ListingCard, Snackbar, PublishMap, UserMedals, TextField, Pagination},
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
  watchQuery: true,
  async asyncData(ctx) {
    let categories = [];
    let user = {};
    let meta = {};

    try {
      let response = await ctx.app.$axios.get(`/users/${ctx.route.params.id}/categories`);

      categories = response.data.data;
    } catch (e) {
      console.log(e)
    }

    try {
      let response = await ctx.app.$axios.get('/agencies/' + ctx.route.params.id)
      user = response.data.data;
      meta = response.data.meta;
    } catch(e) {
      console.log(e)
    }

    return {
      categories,
      user,
      meta
    }
  }
})
export default class Agencies extends Vue {
  loadingListings = false;
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
  ]
  city = {
    location: {
      lat: parseFloat("43.8575641"),
      lng: parseFloat("18.4149369")
    }
  }
  selectedCategoryId = null;

  async handleSelectedCategory(cat) {
    if (this.selectedCategoryId === cat.id) {
      this.selectedCategoryId = null;
    } else {
      this.selectedCategoryId = cat.id;
    }

    await this.fetchUserListings(this.user.id, this.selectedCategoryId);
  }

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
  }

  async created() {

    await this.fetchUserListings(this.$route.params.id, null);
    this.isFollowed = this.meta.followed;
  }

  get isMe() {
    if(this.$auth.user) {
      return this.$auth.user.id === this.user.id;
    }
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
        this.$axios.post('/agencies/' + this.user.id + '/follow');

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
        this.$axios.delete('/agencies/' + this.user.id + '/follow');

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

  async fetchUserListings(id, catId) {
    this.loadingListings = true;

    try {
      let url = '/users/' + id + '/listings';

      if (catId) {
        url += '?category_id=' + catId;
      }

      let response = await this.$axios.get(url)
      this.listings = response.data.data;
    } catch(e) {
      console.log(e)
    } finally {
      this.loadingListings = false;
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
  max-width: 1180px;

  @include for-phone-only {
    padding: 16px;
  }

  .user-content-wrapper {
    display: flex;
    flex-direction: row;
    //border: 1px solid rgb(221, 221, 221);
    border-radius: 12px;
    justify-content: space-between;
    //box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    height: fit-content;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 36px;
    margin-bottom: 36px;
    border-bottom: 1px solid #f9f9f9;

    @include for-phone-only {
      display: flex;
      flex-direction: column;
      background: #fff;
      padding: 0px;
    }

    .user-inner {
      @include for-phone-only {
        display: flex;
      }

      img {
        height: 80px;
        width: 80px;
        min-width: 80px;
      }
    }

    .first-col {
      display: flex;

      @include for-phone-only {
        padding-bottom: 24px;
        margin-bottom: 12px;
        border-bottom: 1px solid #f1f1f1;
      }
    }
    .second-col {
      display: flex;
      padding: 0 36px;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: space-between;

      @include for-phone-only {
        padding: 0;
        margin-top: 12px;
        margin-bottom: 20px;
      }

      .infos {
        color: #000;
        font-size: 16px;
        font-weight: 400;
        @include for-phone-only {
          grid-template-columns: repeat(1, 1fr);
        }
      }

      h2 {
        font-size: 18px;
        font-weight: 400;
      }

      .user-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        box-sizing: border-box;
        height: fit-content;


        .username-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 12px;
          height: 56px;

          .rating {
            display: flex;
            justify-content: space-between;

            p {
              font-size: 16px;
              font-weight: 500;
              cursor: pointer;
            }

          }


          .buttons {
            display: flex;

            @include for-phone-only {
              width: 100%;
              max-width: 100% !important;
              min-width: 100%;
            }

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


    }
    .third-col {
      display: flex;
      flex: 2;
      justify-content: flex-end;
      align-items: flex-end;
      flex-direction: column;

      @include for-phone-only {
        justify-content: center;
        width: 100%;
        align-items: center;

        button {

          &.first {
            margin-right: 8px;
          }

          a {
            font-weight: 500;
          }
        }
      }

      .contact-buttons {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;

        button {
          margin-top: 12px !important;

          &:first-child {
            background: transparent;
            border: 1px solid #D63946;
            color: #D63946;
          }
        }

        &.grid {
          display: flex;
          flex-direction: row;

          button:first-child {
            margin-right: 8px;
          }

          button:last-child {
            margin-left: 8px;
          }
        }
      }

      h2 {
        font-size: 18px;
        font-weight: 500;
      }

      ul.user-information {
        margin-bottom: 12px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        li {
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

    }


  }

  h2 {
    color: rgb(34, 34, 34) !important;
    font-weight: 400 !important;
    font-size: 22px !important;
    line-height: 26px !important;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;

    .grid-layout {
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 24px;
      padding: 0;

      @include for-phone-only {
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 12px;
        grid-row: 16px;
      }
    }

    .user-options {
      @include for-phone-only {
        display: flex;
        flex-direction: row;
        width: 100%;
        overflow-y: scroll;
      }
    }
  }
}
.modal-inner {
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: fit-content;

  .modal-content {
    padding: 16px 0 0 0;
    overflow-y: scroll;
    textarea {
      height: 200px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: 'Outfit', sans-serif;
      font-size: 15px;
      line-height: 16px;
      box-sizing: border-box;
      padding: 12px;
      min-height: 400px;

      &:focus {
        outline: none;
        border: 1px solid #000;
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
  margin-top: 8px;

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

::v-deep #map {
  margin-top: 0;
  height: 270px;
}

.separator {
  margin: 16px 0;
  border-bottom: 1px solid #f7f7f7;
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

.filters-agency {
  display: flex;
  flex-direction: row;

  .filters-agency-list {
    width: 300px;
    min-width: 300px;
    padding-right: 24px;
    box-sizing: border-box;
    margin-right: 24px;
    border-right: 1px solid #dcdcdc;
  }

  .content {
    width: 100%;

    @include for-phone-only {
      padding: 0;
    }
  }
}

.grid-layout {
  ::v-deep a {
    width: 100%;
    min-width: 100%;
  }

  ::v-deep .listing-card-wrapper {
    width: 100%;
    max-width: 100%;
  }
}

.category-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  li {
    height: 44px;
    padding: 0 10px;
    background: #fff;
    margin-right: 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    min-width: fit-content;
    cursor: pointer;
    color: #717171;

    &.selected-cat {
      background: #fff;
      border: 2px solid #000;
      color: #000;
      font-weight: 600;
    }

    &:hover {
      background: #f9f9f9;
    }
  }
}

.buttons {
  max-width: fit-content;

  @include for-phone-only {
    max-width: 100%;
  }
}

.about-us-btn button {
  margin-top: 12px;
  display: flex;
  flex: 1;
  width: 100%;
  background: #f9f9f9;
  align-items: center;
  justify-content: center;
}

.agency-banner {
  height: 300px;
  border-radius: 4px;

  @include for-phone-only {
    height: 150px;
  }
}

.on-mobile {
  @include for-phone-only {
    width: 100%;
    justify-content: space-between;

    button {
      display: flex;
      flex: 1;
      width: 100%;
      background: #f9f9f9;
    }
  }
}
</style>
