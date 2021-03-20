<template>
  <div class="user-content-wrapper">
    <div class="user-info">
      <img src="/test/img1.jpg" alt="" @click="goToUser">
      <div class="username-wrapper">
        <div class="buttons">
          <span v-if="type === 'agency'">
            Agencija
          </span>
          <span v-else>
            Fizicko lice
          </span>
        </div>
        <UserMedals></UserMedals>
      </div>
    </div>
    <div class="separator"></div>
    <ul v-if="type === 'agency'">
      <li>
        <p>Broj telefona</p>
        <b>061559944</b>
      </li>
      <li>
        <p>Email</p>
        <b>{{ user.email }}</b>
      </li>
      <li>
        <p>Web</p>
        <b>wwww.agencija.ba</b>
      </li>
      <li>
        <p>ID agencije</p>
        <b>{{ user.id }}</b>
      </li>
    </ul>
    <div class="contact-buttons" v-if="isMe">
      <ActionButton @action="$modal.show('contact-user')" placeholder="Uredi oglas"></ActionButton>
      <ActionButton placeholder="Izdvoji" @action="handleFollow"></ActionButton>
    </div>
    <div class="contact-buttons" v-else>
      <ActionButton @action="$modal.show('contact-user')" placeholder="Poruka"></ActionButton>
      <ActionButton :placeholder="followed? 'Otprati' : 'Zaprati'" @action="handleFollow"></ActionButton>
    </div>
    <button class="report-user" v-if="!isMe">
      <font-awesome-icon icon="user-slash"></font-awesome-icon>
      {{ type === 'agency'? 'Prijavi agenciju' : 'Prijavi fizičko lice' }}
    </button>

    <div v-if="type === 'agency' && otherListings.length">
      <h2 class="rest-articles">Ostali oglasi agencije</h2>
      <ul class="grid-ul" v-if="otherListingsLoaded">
        <li v-for="listing in otherListings">
          <ListingCard :listing="listing" :key="listing.id"/>
        </li>
      </ul>
      <img v-else class="load" src="/load.svg" alt="">
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
import Snackbar from "@/components/global/Snackbar";
import UserMedals from "@/components/UserMedals";

@Component({
  components: {
    Snackbar,
    UserMedals
  },
})

export default class UserProfile extends Vue {
  @Prop({}) user;
  @Prop({}) followed;
  @Prop({}) isRent;
  @Prop({}) type;
  @Prop() id;

  message = '';
  loading = false;
  otherListings = [];
  otherListingsLoaded = false;


  async created() {
    this.alreadyFollowed = this.followed;
    if(this.type === 'agency') {
      await this.getOtherListings();
    }
  }

  async getOtherListings() {
    this.otherListingsLoaded = false;
    try {
      let res = await this.$axios.get('/listings/' + this.id + '/other');
      this.otherListings = res.data.data;
      console.log(this.otherListings, 'other')
      this.otherListingsLoaded = true;
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

  goToUser() {
    if(this.type === 'agency') {
      this.$router.push('/agency/' + this.user.id)
    } else {
      this.$router.push('/users/' + this.user.id)
    }
  }

  async handleFollow() {
    try {
      if(this.isFollowed) {
        await this.$axios.delete('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "Uspjšsno ste otpratili " + this.user.name,
          timeout: 1000,
          type: "success"
        });

        this.isFollowed = false;
      } else {
        await this.$axios.post('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "Uspješno ste zapratili " + this.user.name,
          timeout: 1000,
          type: "success"
        });

        this.isFollowed = true;
      }

    } catch(e)  {
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
.user-content-wrapper {
  position: sticky;
  top: 124px;
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  //border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #dcdcdc;
  height: fit-content;

  @include for-phone-only {
    margin-left: 0 !important;
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
      height: fit-content;
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

        .stars {
          svg {
            color: #1B1C32;
          }
        }
      }


      .buttons {
        display: flex;
        padding-top: 8px;

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

  ul {
    margin-bottom: 24px;
    li {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;

      b {
        font-weight: 500;
      }
    }
  }

  .contact-buttons {
    display: flex;
    flex-direction: row;
    button {
      margin-top: 0;
      &:first-child {
        margin-right: 8px;
      }
      &:last-child {
        margin-left: 8px;
      }
    }
  }
}

.separator {
  margin: 16px 0;
  border-bottom: 1px solid #f7f7f7;
}

h2 {
  color: rgb(34, 34, 34) !important;
  font-weight: 500 !important;
  font-size: 18px !important;
  line-height: 26px !important;
  margin-bottom: 12px;

  &.rest-articles {
    margin-top: 24px;
    margin-bottom: 24px !important;
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

.report-user {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 5px;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 16px;
  justify-content: center;
  width: fit-content;

  svg {
    color: #444;
    height: 16px;
    margin-right: 8px;
  }
  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background: rgb(247, 247, 247) !important;

    text-decoration: underline;
  }
}

.grid-ul {
  display: flex;
  flex-direction: column;
  margin-bottom: 0!important;

  li {
    display: flex;
    height: fit-content !important;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    ::v-deep .listing-card-wrapper{
      .sponsored, .type {
        display: none;
      }

      a {
        display: flex;
        flex-direction: row;

        img{
          height: 100px;
          width: 120px;
        }

        .listing-card-content {
          max-width: 170px;
          width: 170px;
          margin-left: 12px;
          padding-top: 0;
        }
      }
    }
  }
}

.load {
  height: 40px;
  margin: 24px auto 0 auto;
  width: fit-content;
  display: flex;
}

</style>
