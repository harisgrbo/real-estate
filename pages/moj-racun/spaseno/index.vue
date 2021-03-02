<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Spašeno</p>
      </li>
    </ul>
    <h1 class="heading">
      Spašeno
    </h1>
    <div class="content-wrapper">
      <ul class="cw-ul">
        <li v-for="(tab, index) in tabs"
            @click="activeTab = index"
            :class="[activeTab === index? 'active' : '']"
        >
          {{ tab }}
        </li>
      </ul>
      <div class="saved-content">
        <div v-show="activeTab === 0">
          <div v-if="searchesLoaded" class="searches-wrap">
            <ul class="top-list">
              <li>Naziv pretrage</li>
              <li>Filteri</li>
              <li>Datum sacuvane pretrage</li>
            </ul>
            <ul class="searches">
              <li v-for="search in searches">
                <div class="description">
                  <p>{{ search.description }}</p>
                  <span>
                    <button class="save" @click="goToSearch(search)">
                      <font-awesome-icon icon="search"></font-awesome-icon>
                      Idi na pretragu
                    </button>
                    <button class="save" @click="deleteSingleSearch(search.id)">
                      <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                      Izbrisi pretragu
                    </button>
                  </span>
                </div>
                <div class="filters">
                  <button>Novogradnja</button>
                  <button>Novogradnja</button>
                  <button>Novogradnja</button>
                  <button>Novogradnja</button>
                  <button>Novogradnja</button>
                </div>
                <div class="time"><p>{{ search.created_at }}</p></div>
              </li>
            </ul>
          </div>
          <div v-else class="no-image">
            <img src="/noimg.jpg" alt="no-image">
            <p>Nemate spšenih pretraga</p>
          </div>
        </div>
        <div v-show="activeTab === 1">
          <div class="grid-layout" v-if="savedListings.length">
            <ListingCard v-for="listing in savedListings" :listing="listing" :key="listing.id" :from="true" @remove-from-saved="handleRemoveListing"></ListingCard>
          </div>
          <div v-else class="no-image">
            <img src="/noimg.jpg" alt="no-image">
            <p>Nemate spšenih oglasa</p>
          </div>
        </div>
      </div>
    </div>
    <snackbar></snackbar>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ListingCard from "@/components/listingCard/ListingCard";
import SavedUserCard from "@/components/UserCard"
import Snackbar from "@/components/global/Snackbar";

@Component({
  components: {
    SavedUserCard,
    ListingCard,
    Snackbar
  },
  layout() { return "home" }
})

export default class spaseno extends Vue {

  tabs = [
    'Pretrage',
    'Oglasi'
  ]
  searchesLoaded = false;
  savedUsers = [];
  savedListings = [];
  savedSearches = [];
  activeTab = 0;
  searches = [];

  async created() {
    // await this.fetchSavedUsers();
    await this.fetchSavedListings();
    await this.getSearches();
  }

  async getSearches() {
    this.searchesLoaded = false;
    try {
      let res = await this.$axios.get('/profile/saved/searches');
      this.searches = res.data.data;

      this.searchesLoaded = true;
    } catch(e) {
      console.log(e)
    }
  }

  async fetchSavedUsers() {
    try {
      let response = await this.$axios.get('/profile/saved/users');
      this.savedUsers = response.data.data;
    } catch(e) {
      console.log(e)
    }
  }

  goToSearch(s) {
    console.log('radi', s)

    this.$router.push('/pretraga?q=' + s.query);
    console.log('radi', s)
  }

  async deleteSingleSearch(id) {
    try {
      await this.$axios.delete('/profile/saved/searches/' + id);

      let index = this.searches.findIndex(item => item.id === id)

      this.searches.splice(index, 1)

      this.$snackbar.show({
        text: "Uspješno ste uklonili pretragu iz spasenih",
        timeout: 1000,
        type: "success"
      });
    } catch(e) {
      console.log(e)
    }
  }

  async handleRemoveListing(e) {
    try {
      await this.$axios.delete('/listings/' + e + '/save');

      let index = this.savedListings.findIndex(item => item.id === e)

      this.savedListings.splice(index, 1)

      this.$snackbar.show({
        text: "Uspješno ste uklonili oglas iz spasenih",
        timeout: 1000,
        type: "success"
      });
    } catch(e) {
      console.log(e)
    }
  }

  async fetchSavedListings() {
    try {
      let response = await this.$axios.get('/listings/saved');
      this.savedListings = response.data.data;
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.saved-wrapper {
  ul {
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 36px;

    li {
      display: flex;
      height: 40px;
      line-height: 40px;
      align-items: center;
      justify-content: flex-start;
      font-weight: 500;
      margin-right: 32px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      &.active {
        font-weight: 600 !important;
        color: #012F34 !important;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          border-bottom: 2px solid #54E0C7;

        }
      }
    }
  }
}

.grid-layout {
  padding: 0;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 36px 0px 24px 0px;
  box-sizing: border-box;

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
  .cw-ul {
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
}

.searches-wrap {
  display: flex;
  flex-direction: column;

  .top-list {
    display: flex;
    align-self: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom : 24px;

    li {
      display: flex;
      flex: 2;
      font-weight: 500;
      padding: 8px 24px;
      box-sizing: border-box;
      border-right: 1px solid #f1f1f1;

      &:last-child {
        flex: 1;
      }
    }
  }

  .searches {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: space-between;
    width: 100%;

    li {
      display: flex;
      font-weight: 500;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
      box-sizing: border-box;
      position: relative;
      border-radius: 10px;
      height: 140px;
      padding: 24px;
      min-height: 140px;
      margin-bottom: 24px;

      &::before {
        position: absolute;
        left: 0;
        width: 20px;
        height: 100%;
        background: #f1f1f1;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        content: "";
      }

      &::after {
        position: absolute;
        right: 0;
        width: 20px;
        height: 100%;
        background: #f1f1f1;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        content: "";
      }

      &:last-child {
        margin-bottom: 0;
        flex: 1;
      }

      > div {
        display: flex;
        flex: 2;
        border-right: 1px solid #f1f1f1;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;

        &.description {
          padding: 0 24px;
          box-sizing: border-box;

          span {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .save {
              display: flex;
              font-family: 'Montserrat', sans-serif;
              align-items: center;
              font-size: 16px;
              padding: 6px 12px;
              border-radius: 5px;
              background: none;
              border: none;
              cursor: pointer;
              justify-content: center;
              width: fit-content;
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

          }
        }

        &.time {
          padding: 0 24px;
          box-sizing: border-box;
        }

        &.filters {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-row-gap: 12px;
          grid-column-gap: 12px;
          padding: 0 24px;
          box-sizing: border-box;

          button {
            font-family: 'Montserrat', sans-serif;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            background: #f1f1f1;
            font-weight: 500;
            border: none;

            &:focus {
              outline: none;
            }
          }
        }

        &:last-child {
          flex: 1;
        }
      }
    }
  }
}

</style>
