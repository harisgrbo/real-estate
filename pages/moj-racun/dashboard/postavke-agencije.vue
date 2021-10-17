<template>
  <div class="account-wrapper">
    <div class="info-wrapper">
      <div class="field-wrapper">
        <div class="content">
          <h2 class="heading">
            Informacije o agenciji
          </h2>
          <div class="grid-inputs">
            <TextField label="Naziv agencije" v-model="name" type="text"></TextField>
            <TextField label="Email" v-model="email" type="text"></TextField>
            <TextField label="Broj telefona" v-model="number" type="number"></TextField>
            <TextField label="Grad" v-model="email" type="text"></TextField>
            <TextField label="Država" v-model="email" type="text"></TextField>
            <TextField label="Adresa" v-model="email" type="text"></TextField>
            <TextField label="ID broj" v-model="email" type="text"></TextField>
          </div>
        </div>
        <div class="content">
          <h2 class="heading password">
            Promjena šifre
          </h2>
          <div class="grid-inputs">
            <TextField label="Šifra" type="password" v-model="password"></TextField>
            <TextField label="Potvrdi šifru" v-model="passwordConfirm" type="password"></TextField>
          </div>
        </div>
        <div class="content">
          <h2 class="heading password">
            O nama
          </h2>
          <textarea v-model="description"></textarea>
        </div>
        <ActionButton @action="handleAction" placeholder="Spasi izmjene" :loading="loading"></ActionButton>
      </div>
      <div class="img-upload">
        <h2 class="heading">
          Promjena avatara
        </h2>
        <div class="avatar-wrapper">
          <div class="img-wrap-relative">
            <div class="upload-btn">
              <button>
                <p>Izaberite avatar</p> <font-awesome-icon icon="file-upload"></font-awesome-icon>
              </button>
            </div>
            <img src="/avatar.jpg" alt="">
          </div>
          <ActionButton @action="handleAction" placeholder="Promijeni sliku" :loading="loading"></ActionButton>

          <div class="verification-status">
            <img src="/percentage.svg" alt="">
            <p>profil verifikovan 50%</p>
          </div>
        </div>
      </div>
    </div>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import TextField from "@/components/inputs/TextField";
import ActionButton from "@/components/actionButtons/ActionButton"
import Snackbar from "@/components/global/Snackbar";

@Component({
  components: {
    TextField,
    ActionButton,
    Snackbar
  },
  middleware: ['auth'],
  layout() { return "home" }
})

export default class urediProfil extends Vue {
  user = {}
  name = '';
  email = '';
  password = '';
  passwordConfirm = '';
  loading = false;

  async created() {
    this.setInputs();
  }

  setInputs() {
    this.name = this.$auth.user.name;
    this.email = this.$auth.user.email;
  }

  async updateProfileInfo() {
    this.loading = true;
    try {
      let payload = {};

      if (this.name !== this.$auth.user.name) {
        payload.name = this.name
      }

      if (this.email !== this.$auth.user.email) {
        payload.email = this.email;
      }

      if (this.password.length) {
        payload.password = this.password;
      }

      await this.$axios.put('/profile/update', payload)
      await this.$auth.fetchUser();

      this.$snackbar.show({
        text: "Uspjesno ste se spasili izmjene!",
        timeout: 3000,
        type: "success"
      });

      this.loading = false;
    } catch(error) {
      this.loading = false;

      console.log(error)
    }
  }

  handleAction() {
    this.updateProfileInfo();
  }
}
</script>

<style scoped lang="scss">

.heading {
  margin-bottom: 36px;
}
.w-full {
  display: flex;

  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 32px;
    column-gap: 24px;
  }

  ::v-deep button {
    width: 150px;
  }
}

h2.heading {
  color: rgb(72, 72, 72) !important;
  font-weight: 500 !important;
  padding-bottom: 24px;
  font-size: 22px !important;
  border-bottom: 1px solid #EBEBEB !important;
  position: relative;

  &.password {
    margin-top: 42px;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 80px;
    height: 1px;
    background: #0B8489;
  }
}

.grid-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 24px;
  grid-column-gap: 24px;
}

.info-wrapper {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  .field-wrapper {
    display: flex;
    flex-direction: column;
    flex: 6;
  }

  .img-upload {
    display: flex;
    flex-direction: column;
    flex: 2;
    box-sizing: border-box;
    margin-left: 48px;

    .avatar-wrapper {
      border-radius: 10px;
      width: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;

      .img-wrap-relative {
        height: 200px;
        width: 200px;
        border-radius: 100px;
        position: relative;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        .upload-btn {
          position: absolute;
          display: none;
          align-items: center;
          justify-content: center;
          color: white;
          z-index:3;
          height: 100%;
          width: 100%;
          border-radius: 100px;
          background-color: rgba(255, 255, 255, .5);
          -webkit-backdrop-filter: blur(0.1em);
          backdrop-filter: blur(1px);

          button {
            display: flex;
            flex-direction: row;
            align-items: center;
            jsutify-content: center;
            background: #0B8489;
            border-radius: 5px;
            border: none;
            font-family: 'Lato', sans-serif;
            color: #fff;
            padding: 8px 12px;
            cursor: pointer;

            svg {
              font-size: 17px;
            }

            &:focus {
              outline: none;
            }

            p {
              margin-right: 12px;
            }
          }
        }

        &:hover {
          .upload-btn {
            display: flex;
          }
        }
      }

      .verification-status {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #ebebeb;
        align-items: center;
        justify-content: flex-start;

        img {
          height: 40px;
        }

        p {
          margin-left: 12px;
        }
      }
    }
  }
}

::v-deep button {
  background: #0B8489;
}

textarea {
  width: 100%;
  height: 200px;
  padding: 12px;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
}
</style>
