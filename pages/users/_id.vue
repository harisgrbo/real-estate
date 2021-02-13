<template>
  <div class="user-profile-wrapper">
    <div class="user-content-wrapper">
      <div class="user-info">
        <img src="/test/img1.jpg" alt="" @click="$router.push('/users/' + user.id)">
        <div class="username-wrapper">
          <div class="rating">
            <p @click="$router.push('/users/' + user.id)">{{ user.name }}</p>
          </div>
          <div class="buttons">
            <span>Agencija</span>
            <span>Korisnik</span>
          </div>
        </div>
      </div>
      <div class="separator"></div>
      <div class="stars">
        <p>Dojmovi</p>
        <div>
          <font-awesome-icon icon="star"></font-awesome-icon>
          4.9
        </div>
      </div>
      <div class="stars">
        <p>Registrovan:</p>
        <div>
          {{ $moment(user.created_at).format("DD.MM.YYYY") }}
        </div>
      </div>
      <div class="stars">
        <p>ID</p>
        <div>
          {{ user.id }}
        </div>
      </div>
      <div class="stars">
        <p>Verifikovan:</p>
        <div>
          Da
        </div>
      </div>
      <div class="contact-buttons">
        <ActionButton @action="$modal.show('contact-user')" placeholder="Poruka" icon="paper-plane"></ActionButton>
        <ActionButton :placeholder="followed? 'Otprati' : 'Zaprati'" @action="toggleFollow" icon="user-plus"></ActionButton>
      </div>
      <div v-if="isRent">
        <div class="separator"></div>
        <h2>Želite rezervisati odmah?</h2>
        <date-picker :show-date-picker="true" :displayClearButton="true"></date-picker>
      </div>
    </div>
    <div class="content-wrapper">
      <ul>
        <li v-for="(tab, index) in tabs" @click="activeTab = index">{{ tab }}</li>
      </ul>
      <div>
        <div v-if="activeTab === 0" class="grid-layout">
          <ListingCard v-for="listing in listings" :listing="listing"></ListingCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import UserProfile from "@/components/UserProfile";
import ListingCard from "@/components/listingCard/ListingCard";

@Component({
  components: {ListingCard, UserProfile},
  layout() { return "home" }
})

export default class Users extends Vue {

  activeTab = 0
  user = {}
  listings = []
  tabs = [
    "Aktivni oglasi",
    "Zavrseni oglasi",
    "Dojmovi"
  ]

  async created() {
    await this.fetchUser(this.$route.params.id)
    await this.fetchUserListings(this.$route.params.id)
  }

  async fetchUser(id) {
    try {
      let response = await this.$axios.get('/users/' + id)
      this.user = response.data.data;
    } catch(e) {
      console.log(e)
    }
  }

  async fetchUserListings(id) {
    try {
      let response = await this.$axios.get('/users/' + id + '/listings')
      this.listings = response.data.data;
      console.log(this.listings)
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.user-profile-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
  height: 100%;
  width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;

  .user-content-wrapper {
    position: sticky;
    top: 84px;
    display: flex;
    flex-direction: column;
    //border: 1px solid rgb(221, 221, 221);
    border-radius: 12px;
    padding: 24px;
    box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    height: fit-content;

    .user-info {
      display: flex;
      width: 100%;
      align-items: flex-start;
      justify-content: flex-start;
      box-sizing: border-box;
      height: fit-content;

      img {
        height: 56px;
        width: 56px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
      }

      .username-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 12px;
        height: 56px;
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
      flex-direction: column;

      button {
        margin-top: 12px !important;

        &:first-child {
          background: transparent;
          border: 1px solid #D63946;
          color: #D63946;
        }
      }
    }
  }

  .separator {
    margin: 24px 0;
    border-bottom: 1px solid #f7f7f7;
  }

  h2 {
    color: rgb(34, 34, 34) !important;
    font-weight: 500 !important;
    font-size: 18px !important;
    line-height: 26px !important;
    margin-bottom: 12px;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px 24px 24px 36px;
    box-sizing: border-box;

    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 36px;

      li {
        font-size: 22px !important;
        line-height: 26px !important;
        margin-right: 24px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .grid-layout {
      grid-template-columns: repeat( auto-fill, minmax(250px, 1fr) );
      padding: 0;
    }
  }
}
</style>
