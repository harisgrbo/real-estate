<template>
  <div class="user-profile-wrapper">
    <div class="user-content-wrapper">
      <div class="first-col">
        <div class="upper">
          <h2>{{ user.name }}</h2>
          <div class="separator"></div>
          <div class="user-info">
            <img src="/test/img1.jpg" alt="">
          </div>
        </div>
        <div class="contact-buttons" v-if="isMe">
          <ActionButton @action="$modal.show('contact-user')" placeholder="Uredi profil" icon="paper-plane"></ActionButton>
        </div>
        <div class="contact-buttons grid" v-else>
          <ActionButton @action="$modal.show('contact-user')" placeholder="Poruka" icon="paper-plane"></ActionButton>
          <ActionButton :placeholder="isFollowed? 'Otprati' : 'Zaprati'" @action="toggleFollow" icon="user-plus"></ActionButton>
        </div>
        <button class="save">
          <font-awesome-icon icon="heart"></font-awesome-icon>
          Spasi agenciju
        </button>
      </div>
      <div class="second-col">
        <h2>Lokacija</h2>
        <div class="separator"></div>
        <PublishMap :location="city"></PublishMap>
      </div>
      <div class="third-col">
        <h2>Informacije o agenciji</h2>
        <div class="separator"></div>
        <ul class="user-information">
         <li v-if="detailedAgencyinfo && detailedAgencyinfo.location">
           <p>Sjedište agencije</p>
           <p>{{ detailedAgencyinfo.location }}</p>
         </li>
          <li>
            <p>Broj telefona</p>
            <b>061559944</b>
          </li>
          <li>
            <p>Registrovan</p>
            <b>{{ $moment(user.created_at).format("DD.MM.YYYY") }}</b>
          </li>
          <li>
            <p>Email</p>
            <b>{{ user.email }}</b>
          </li>
          <li v-if="detailedAgencyinfo && detailedAgencyinfo.external_number">
            <p>ID</p>
            <b>{{ detailedAgencyinfo.external_number }}</b>
          </li>
          <li>
            <p>Web</p>
            <b>www.agencija.ba</b>
          </li>
          <li>
            <UserMedals></UserMedals>
          </li>
        </ul>
      </div>
    </div>
    <div class="content-wrapper">
      <ul>
        <li v-for="(tab, index) in tabs" @click="activeTab = index" :class="[ activeTab === index ? 'active' : '' ]">{{ tab }}</li>
      </ul>
      <div>
        <div v-if="activeTab === 0" class="filters-agency">
          <div class="filters-agency-list">
            <div class="modal-header">
              <h2>Filteri</h2>
              <i class="material-icons" @click="$modal.hide('filters')">close</i>
            </div>
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
         <div class="content">
           <div v-if="results.length" class="grid-layout">
             <ListingCard v-for="listing in results" :listing="listing" :key="listing.id"></ListingCard>
           </div>
           <div v-else class="no-image">
             <img src="/noimg.jpg" alt="no-image">
             <p>{{ $auth.user && $auth.user.id === user.id? 'Nemate aktivnih oglasa' : 'Agencija nema aktivnih oglasa' }}</p>
           </div>
         </div>
        </div>
        <div v-if="activeTab === 1" >
          <div class="grid-layout" v-if="finishedListings.length">
            zavrseni
          </div>
          <div v-else class="no-image">
            <img src="/noimg.jpg" alt="no-image">
            <p>{{ $auth.user && $auth.user.id === user.id? 'Nemate završenih oglasa' : 'Agencija nema završenih oglasa' }}</p>
          </div>
        </div>
        <div v-if="activeTab === 2" >
          <div class="grid-layout" v-if="feedback.length">
            dojmovi
          </div>
          <div v-else class="no-image">
            <img src="/noimg.jpg" alt="no-image">
            <p>{{ $auth.user && $auth.user.id === user.id? 'Nemate ostavljenih dojmova' : 'Agencija nema ostavljenih dojmova' }}</p>
          </div>
        </div>
      </div>
    </div>
    <modal name="contact-user" :adaptive="true" height="100%">
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
  layout() { return "home" },
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
    "Dojmovi"
  ]
  city = {
    location: {
      lat: parseFloat("43.8575641"),
      lng: parseFloat("18.4149369")
    }
  }
  detailedAgencyinfo = {}

  filterFor(attr) {
    return `${capitalize(attr)}Filter`;
  }

  async created() {
    await this.fetchUser(this.$route.params.id)
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
      let res = await this.$axios.get('/agencies/' + this.user.id);
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
.user-profile-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  height: 100%;
  width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;

  .user-content-wrapper {
    display: flex;
    flex-direction: row;
    //border: 1px solid rgb(221, 221, 221);
    border-radius: 12px;
    justify-content: space-between;
    padding: 12px;
    //box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    height: fit-content;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #efefef;

    .first-col {
      display: flex;
      flex: 2;
      flex-direction: column;
      justify-content: space-between;

      h2 {
        font-size: 18px;
        font-weight: 500;
      }

      .user-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        box-sizing: border-box;
        height: fit-content;

        img {
          height: 153px;
          width: 100%;
          border-radius: 8px;
          object-fit: cover;
          cursor: pointer;
        }

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

      .contact-buttons {
        display: flex;
        flex-direction: column;

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
    }
    .second-col {
      display: flex;
      flex: 4;
      padding: 0 36px;
      box-sizing: border-box;
      flex-direction: column;

      h2 {
        font-size: 18px;
        font-weight: 500;
      }
    }
    .third-col {
      display: flex;
      flex: 2;
      justify-content: flex-end;
      min-height: 100%;
      flex-direction: column;

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
    font-weight: 500 !important;
    font-size: 18px !important;
    line-height: 26px !important;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    margin-top: 36px;

    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 36px;

      li {
        font-size: 16px !important;
        line-height: 26px !important;
        margin-right: 24px;
        padding-bottom: 8px;
        position: relative;
        cursor: pointer;

        &:last-child {
          margin-right: 0;
        }

        &.active {
          font-weight: 600;
          &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            border-bottom: 1px solid #D63946;
          }
        }
      }
    }

    .grid-layout {
      grid-template-columns: repeat( auto-fill, minmax(250px, 1fr) );
      padding: 0;
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

  i {
    cursor: pointer;
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
      font-family: 'Roboto', sans-serif;
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
  }
}
</style>
