<template>
  <div class="user-profile-wrapper w-full px-20 pt-20">
    <div class="user-content-wrapper">
      <div class="first-col">
        <aside class="w-96 bg-white overflow-y-auto">
          <div class="col-span-1 flex flex-col text-center bg-white rounded-lg divide-y divide-gray-200">
            <div class="flex-1 flex flex-row justify-start user-inner">
              <img class="w-32 h-32 flex-shrink-0 bg-black rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
              <div class="ml-4">
                <h3 class="text-gray-900 text-md font-medium">{{ user.name }}</h3>
                <dl class="mt-1 flex-grow flex flex-col justify-between items-start">
                  <dt class="sr-only">Title</dt>
                  <dt class="sr-only">Role</dt>
                  <dd class="mt-3">
                    <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">Agencija</span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </aside>

      </div>
      <div class="second-col">
        <div class="grid grid-cols-2 gap-4 text-sm font-medium text-gray-500 infos">
          <div>agencija@agencija.com</div>
          <div>Sarajevo, Alojza Benca 2</div>
          <div>www.agencijatest.ba</div>
          <div>+387 33 223-333</div>
        </div>
      </div>

      <div class="third-col">
        <div v-if="isMe" class="w-full">
          <button class="-ml-px w-0 flex-1 flex cursor-pointer">
            <div @action="toggleFollow" icon="user-plus" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="ml-3">Uredi profil</span>
            </div>
          </button>
        </div>
        <div v-else class="w-full">
          <div class="flex divide-x divide-gray-200 justify-between w-full">
            <button class="flex-1 flex cursor-pointer mr-12 first" @click="$modal.show('contact-user')">
              <a class="relative flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500" @action="$modal.show('contact-user')" placeholder="Uredi profil" icon="paper-plane">
                <!-- Heroicon name: solid/mail -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span class="ml-3">Poruka</span>
              </a>
            </button>
            <button class="flex-1 flex cursor-pointer" @click="toggleFollow()">
              <div icon="user-plus" class="relative flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="ml-3">{{ isFollowed? 'Otprati' : 'Zaprati' }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="flex flex-row items-center justify-between mb-8 user-options">
        <ul class="category-list w-full">
          <li :class="['group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900', cat.id === selectedCategoryId ? 'selected-cat': '']" v-for="cat in categories" @click="handleSelectedCategory(cat)">{{ cat.title }}</li>
        </ul>
        <button class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 p-2 rounded-full px-3 hover:bg-gray-100" @click="$modal.show('filters')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform rotate-90 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filteri</button>
      </div>
      <div>
        <div v-if="activeTab === 0" class="filters-agency">
         <div class="content">
           <div v-if="results.length" class="grid-layout">
             <ListingCard v-for="listing in results" :listing="listing" :key="listing.id"></ListingCard>
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
          <action-button placeholder="Pošalji" @action="sendMessage" :loading="loading"></action-button>
        </div>
      </div>
    </modal>
    <Snackbar></Snackbar>
    <client-only>
      <modal @before-open="beforeOpen" @before-close="beforeClose" name="filters" :adaptive="true" height="100%">
        <div class="modal-inner">
          <div class="modal-header">
            <h2>Filteri</h2>
            <i class="material-icons" @click="$modal.hide('filters')">close</i>
          </div>
          <div class="modal-content">
            <div class="filters-agency-list">
              <div class="modal-content">
                <CategoryFilter
                  v-model="queryPayload.category_id"
                  :categories="searchMeta.categories"
                  :aggregations="searchMeta.aggregations"
                  :filter="{}"
                  @input="newSearch"
                />

                <RangeFilter
                  v-model="queryPayload.price"
                  :attr="false"
                  :filter="{name: 'price', display_name: 'Cijena'}"
                  @input="newSearch"
                  :avg-price="searchMeta.price"
                />

                <component
                  v-for="(attr, i) in allAttributes"
                  :key="i"
                  :filter="attr"
                  :attr="true"
                  :is="filterFor(attr.type)"
                  v-model="queryPayload[attr.name]"
                  @clear="queryPayload[attr.name] = null; newSearch()"
                  @input="newSearch"
                />

              </div>
            </div>
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

@Component({
  components: {ListingCard, Snackbar, PublishMap, UserMedals, TextField, RangeFilter, CategoryFilter, TermsFilter, TermFilter, Pagination},
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
  watchQuery: true,

  async asyncData(ctx) {
    let page = 1;
    let results = [];
    let searchMeta = {
      categories: [],
      aggregations: []
    };
    let allAttributes = [];
    let queryPayload = {};

    let query = `[{"name":"user_id","type":"term","attr":false,"value":${ctx.route.params.id}}]`

    if (ctx.route.query.q) {
      let tmp = decodeURIComponent(ctx.route.query.q)

      let decoded = JSON.parse(tmp);
      let invalid = false;
      let hasUserId = false;

      if (Array.isArray(decoded)) {
        for(let i = 0; i > decoded.length; ++i) {
          let item = decoded[i];

          if (typeof item === 'object') {
            if (item.name === 'user_id') {
              item.attr = false;
              item.value = ctx.route.params.id
              item.type = 'term'
              hasUserId = true;
            }
          } else {
            invalid = true;
          }
        }
      }

      if (! invalid) {
        if (! hasUserId) {
          decoded.push({
            attr: false,
            value: ctx.route.params.id,
            type: 'term',
            name: "user_id"
          })
        }

        query = JSON.stringify(decoded)
      }
    }

    console.log(query)

    page = ctx.route.query.page || '1';
    page = parseInt(page)

    try {
      let response = await ctx.app.$axios.get(`/listings/search?q=${query}&page=${page}`)
      results = response.data.data;
      searchMeta = response.data.meta;
      query = JSON.parse(query)

      query.forEach(item => {
        if (item.name !== 'user_id') {
          queryPayload[item.name] = Object.assign({}, item);
        }
      });

      try {
        let res = await ctx.app.$axios.get('/attributes');

        allAttributes = res.data.data.map(item => {
          item.type = item.attr_type;

          return item;
        }).concat(searchMeta.attributes)
      } catch (e) {
        console.log(e)
      }
    } catch (e) {
      console.log(e)
      // @TODO: Error handling
    }

    let lp = searchMeta.total / searchMeta.perPage;

    if(! Number.isInteger(lp)) {
      lp += 1;
    }

    let last_page = parseInt(lp);

    return {
      allAttributes,
      results,
      searchMeta,
      queryPayload,
      page,
      last_page
    }
  },
})
export default class Agencies extends Vue {

  activeTab = 0
  user = {}
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
  detailedAgencyinfo = {}
  categories = []

  filterFor(attr) {
    return `${capitalize(attr)}Filter`;
  }

  async fetchCategories() {
    try {
      let response = await this.$axios.get(`/categories`)

      this.categories = response.data.data;
    } catch (e) {
      console.log(e)
    }
  }

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
  }

  async created() {
    await this.fetchUser(this.$route.params.id)
    await this.fetchCategories();
    await this.getAgencyDetailedInfo();
    this.isFollowed = this.meta.followed;
    // await this.fetchUserListings(this.$route.params.id)
  }

  newSearch() {
    let q = buildQuery(this.queryPayload)

    this.$router.push(this.$route.path + `?q=${q}`)
  }

  pageChangeHandler(selectedPage) {
    this.$router.push({ query: Object.assign({}, this.$route.query, { page: selectedPage }) });
  }

  async getAgencyDetailedInfo() {
    try {
      let res = await this.$axios.get('/agencije/' + this.user.id);
      this.detailedAgencyinfo = res.data.data;

      console.log(res, 'ressss')
    } catch(e) {
      console.log(e)
    }
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
      padding: 16px;
    }

    .user-inner {
      @include for-phone-only {
        display: flex;
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
          height: 48px;
          font-family: 'Lato', sans-serif;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          font-size: 14px;
          padding: 0 24px;
          color: #fff;
          cursor: pointer;
          justify-content: center;
          transition: 0.3s all ease;
          background: transparent;
          border: 2px solid #023246;
          width: 100%;
          margin-right: 0;

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
      grid-template-columns: repeat(5, 1fr);
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

</style>
