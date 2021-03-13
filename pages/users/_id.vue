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
            <span>Fizicko lice</span>
          </div>
        </div>
      </div>
      <div class="separator"></div>
      <ul class="user-information">
        <li>
          <p>Ocjena</p>
          <div>
            <font-awesome-icon icon="star"></font-awesome-icon>
            4.9
          </div>
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
        <li>
          <p>ID</p>
          <b>{{ user.id }}</b>
        </li>
        <li>
          <p>Verifikovan</p>
          <b>Da</b>
        </li>
      </ul>
      <div class="contact-buttons" v-if="isMe">
        <ActionButton @action="$modal.show('contact-user')" placeholder="Uredi" icon="paper-plane"></ActionButton>
        <ActionButton placeholder="Izbrisi" @action="toggleFollow" icon="user-plus"></ActionButton>
      </div>
      <div class="contact-buttons" v-else>
        <ActionButton @action="$modal.show('contact-user')" placeholder="Poruka" icon="paper-plane"></ActionButton>
        <ActionButton :placeholder="isFollowed? 'Otprati' : 'Zaprati'" @action="toggleFollow" icon="user-plus"></ActionButton>
      </div>
      <div class="reporting-system">
        <button class="save" v-if="!isMe">
          <font-awesome-icon icon="heart"></font-awesome-icon>
          Spasi korisnika
        </button>
        <button class="save" v-if="!isMe">
          <font-awesome-icon icon="user-slash"></font-awesome-icon>
          Prijavi korisnika
        </button>
      </div>
    </div>
    <div class="content-wrapper">
      <ul>
        <li v-for="(tab, index) in tabs" @click="activeTab = index" :class="[ activeTab === index ? 'active' : '' ]">{{ tab }}</li>
      </ul>
      <div>
        <div v-if="activeTab === 0">
          <div class="grid-layout" v-if="listings.length">
            <ListingCard v-for="listing in listings" :listing="listing" :key="listing.id"></ListingCard>
          </div>
          <div v-else class="no-image">
            <img src="/noimg.jpg" alt="no-image">
            <p>{{ $auth.user && $auth.user.id === user.id? 'Nemate aktivnih oglasa' : 'Korisnik nema aktivnih oglasa' }}</p>
          </div>
        </div>
        <div v-if="activeTab === 1">
          <div class="grid-layout" v-if="finishedListings.length">
            <ListingCard v-for="listing in finishedListings" :listing="listing" :key="listing.id"></ListingCard>
          </div>
          <div v-else class="no-image">
            <img src="/noimg.jpg" alt="no-image">
            <p>{{ $auth.user && $auth.user.id === user.id? 'Nemate završenih oglasa' : 'Korisnik nema završenih oglasa' }}</p>
          </div>
        </div>
        <div v-if="activeTab === 2">
          <div class="grid-layout" v-if="feedback.length">
            feedback
          </div>
          <div v-else class="no-image">
            <img src="/noimg.jpg" alt="no-image">
            <p>{{ $auth.user && $auth.user.id === user.id? 'Nemate ostavljenih dojmova' : 'Korisnik nema ostavljenih dojmova' }}</p>
          </div>
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
            <action-button placeholder="Pošalji" @action="sendMessage" :loading="loading"></action-button>
          </div>
        </div>
      </modal>
    </client-only>
    <Snackbar></Snackbar>
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
    "Zavrseni oglasi",
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
        content: this.message
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
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
  height: 100%;
  width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;

  @include for-phone-only {
    flex-direction: column;
    width: 100%;
    padding: 12px;
    padding-top: 36px;
  }

  .user-content-wrapper {
    position: sticky;
    top: 130px;
    display: flex;
    flex-direction: column;
    border: 1px solid #dcdcdc;
    border-radius: 12px;
    padding: 24px;
    //box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    height: fit-content;
    min-width: 24%;

    @include for-phone-only {
      position: static;
    }

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
      border-bottom: 1px solid #EBEBEB !important;

      @include for-phone-only {
        overflow-x: scroll ;
      }

      li {
        font-size: 14px !important;
        line-height: 26px !important;
        margin-right: 24px;
        padding-bottom: 8px;
        height: 40px;
        position: relative;
        cursor: pointer;
        text-transform: uppercase;
        font-weight:500 !important;

        @include for-phone-only {
          min-width: fit-content;
        }

        &:last-child {
          margin-right: 0;
        }

        &.active {
          color: #0B8489;
          &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            border-bottom: 1px solid #0B8489;
          }
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
    font-size: 20px;
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
      font-family: 'Montserrat', sans-serif;
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
