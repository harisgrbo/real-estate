<template>
  <div class="user-content-wrapper">
    <div class="user-info">
      <img src="/test/img1.jpg" alt="" @click="$router.push('/users/' + user.id)">
      <div class="username-wrapper">
        <div class="rating">
          <p @click="$router.push('/users/' + user.id)">{{ user.name }}</p>

          <div class="stars">
            <font-awesome-icon icon="star"></font-awesome-icon>
            4.9
          </div>
        </div>
        <div class="buttons">
          <span>Agencija</span>
          <span>Korisnik</span>
        </div>
      </div>
    </div>
    <div class="contact-buttons">
      <ActionButton @action="$modal.show('contact-user')" placeholder="Poruka"></ActionButton>
      <ActionButton :placeholder="followed? 'Otprati' : 'Zaprati'" @action="toggleFollow"></ActionButton>
    </div>
    <div v-if="isRent">
      <div class="separator"></div>
      <h2>Želite rezervisati odmah?</h2>
      <date-picker :show-date-picker="true" :displayClearButton="true"></date-picker>
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
import Snackbar from "@/components/global/Snackbar";

@Component({
  components: {
    Snackbar
  },
})

export default class UserProfile extends Vue {
  @Prop({}) user;
  @Prop({}) followed;
  @Prop({}) isRent;

  alreadyFollowed = false;
  message = '';
  loading = false;

  async created() {
    this.alreadyFollowed = this.followed;
    console.log(this.followed, 'jel followan')
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
    if (this.alreadyFollowed === false) {
      try {
        this.$axios.post('/users/' + this.user.id + '/follow');

        this.alreadyFollowed = true;
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        this.$axios.delete('/users/' + this.user.id + '/follow');

        this.alreadyFollowed = false;
      } catch (e) {
        console.log(e)
      }
    }
  }

}

</script>

<style scoped lang="scss">
.user-content-wrapper {
  position: sticky;
  top: 84px;
  display: flex;
  flex-direction: column;
  margin-left: 24px;
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

        .stars {
          svg {
            color: #1B1C32;
          }
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
    flex-direction: row;
    margin-top: 12px;

    button {
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

</style>
