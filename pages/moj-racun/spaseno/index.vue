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
      <ul>
        <li v-for="(tab, index) in tabs"
            @click="activeTab = index"
            :class="[activeTab === index? 'active' : '']"
        >
          {{ tab }}
        </li>
      </ul>
      <div class="saved-content">
        <div v-show="activeTab === 0">
          <div class="grid-layout" v-if="savedUsers.length">
            <SavedUserCard v-for="user in savedUsers" :user="user" :key="user.id"></SavedUserCard>
          </div>
          <div v-else class="no-image">
            <img src="/noimg.jpg" alt="no-image">
            <p>Nemate spšenih korisnika</p>
          </div>
        </div>
        <div v-show="activeTab === 1">
          <div class="grid-layout" v-if="savedSearches.length">
            pretrage
          </div>
          <div v-else class="no-image">
            <img src="/noimg.jpg" alt="no-image">
            <p>Nemate spšenih pretraga</p>
          </div>
        </div>
        <div v-show="activeTab === 2">
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
    'Korisnici',
    'Pretrage',
    'Oglasi'
  ]
  savedUsers = [];
  savedListings = [];
  savedSearches = [];
  activeTab = 0;

  async created() {
    await this.fetchSavedUsers();
    await this.fetchSavedListings();
  }

  async fetchSavedUsers() {
    try {
      let response = await this.$axios.get('/profile/saved/users');
      this.savedUsers = response.data.data;
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
}
</style>
