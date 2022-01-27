<template>
  <div class="preview-wrapper-inner mx-auto w-full">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <p>Uredi profil</p>
      </li>
    </ul>
    <div class="w-full">
      <!-- BEGIN: Display Information -->
      <div class="intro-y lg:mt-5">
        <div class="flex items-center pb-5 pl-0 border-b border-gray-200 dark:border-dark-5">
          <h2 class="font-medium text-base mr-auto">
            Osnovni podaci
          </h2>
        </div>
        <div class="w-full">
          <div class="options-wrap">
            <div class="flex-1 mt-6 xl:mt-0 w-full">
              <div class="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 up:grid-cols-2 xl:grid-cols-2 gap-4">
                <TextField type="text" label="Ime" placeholder="john doe" v-model="name"></TextField>
                <TextField type="text" label="Email" placeholder="johndoe@mail.com" v-model="email"></TextField>
                <TextField type="text" label="Broj mobitela" placeholder="+387 61 111 222" v-model="phoneNumber"></TextField>
                <TextField type="text" label="Adresa" placeholder="ulica i broj.." v-model="address"></TextField>
                <TextField type="password" label="Password" placeholder="******" v-model="password"></TextField>
                <TextField type="password" label="Ponovi password" placeholder="******" v-model="passwordConfirm"></TextField>
              </div>
              <action-button class="mt-5 mb-4" @action="updateProfileInfo" placeholder="Sačuvaj"></action-button>
            </div>
            <div class="flex flex-col sm:ml-0 xl:ml-6 lg:ml-6 up:ml-6 xl:ml-6">
              <div class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5">
                <div class="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                  <img class="h-full w-full rounded-md" alt="Profile picture" :src="avatarUrl !== '' ? avatarUrl: 'dist/images/profile-3.jpg'">
                  <div title="Remove this profile photo?" class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-24 right-0 top-0 -mr-2 -mt-2"> <i data-feather="x" class="w-4 h-4"></i> </div>
                </div>
                <div class="mx-auto cursor-pointer relative mt-5">
                  <action-button @action="updateProfileInfo" placeholder="Promijeni sliku"></action-button>

                  <input @change="updateAvatar" type="file" class="w-full h-full top-0 left-0 absolute opacity-0">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Display Information -->
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
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
})

export default class urediProfil extends Vue {
  user = {}
  name = '';
  email = '';
  address = '';
  phoneNumber = '';
  password = '';
  passwordConfirm = '';
  loading = false;
  avatarUrl = '';

  async created() {
    this.setInputs();
  }

  async updateAvatar(event) {
    if (event.target.files.length) {
      let image = event.target.files[0];
      let formData = new FormData();
      formData.append('avatar', image);

      try {
        await this.$axios.post('/avatar', formData, {
          'headers': {
            'Content-Type': 'multipart/form-data'
          }
        })

        await this.$auth.fetchUser();
        this.setInputs();
      } catch (e) {
        alert("Avatar nije moguce postaviti")
      }
    }
  }

  setInputs() {

    this.name = this.$auth.user.name;
    this.email = this.$auth.user.email;
    this.avatarUrl = this.$auth.user.avatar_url || '';
    this.phoneNumber = this.$auth.user.phone_number || '';
    this.address = this.$auth.user.address || '';
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

      if (this.phoneNumber !== this.$auth.user.phone_number) {
        payload.phone_number = this.phoneNumber;
      }

      if (this.address !== this.$auth.user.address) {
        payload.address = this.address;
      }

      if (this.password.length) {
        if (this.passwordConfirm === this.password) {
          payload.password = this.password;
        } else {

          this.$toast.open({
            message: "Šifre nisu iste",
            type: 'warning',
            duration: 5000
          });
        }
      }

      try {
        await this.$axios.put('/profile/update', payload)
      } catch (e) {
        let message = e.response.data.message;

        if (e.response.data.errors.phone_number) {
          message = "Broj mobitela nije u ispravnom formatu (Npr. +387)"
        }

        this.$toast.open({
          message: message,
          type: 'warning',
          duration: 5000
        });

        return;
      }

      await this.$auth.fetchUser();
      this.setInputs();

      this.$snackbar.show({
        text: "Uspješno ste se spasili izmjene!",
        timeout: 3000,
        type: "success"
      });

      this.loading = false;
    } catch(error) {
      this.loading = false;

      console.log(error)
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

.preview-wrapper-inner {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 10px;
  padding: 24px;
}

.account-wrapper {
  width: auto;
  background: #fff;

  @include for-phone-only {
    background: #fff;
    width: 100%;
    padding: 16px;
  }
}

.heading {
  margin-bottom: 36px;
}

h2.heading {
  margin-top: 42px;
  color: rgb(72, 72, 72) !important;
  font-weight: 500 !important;
  padding-bottom: 24px;
  font-size: 22px !important;
  border-bottom: 1px solid #EBEBEB !important;
  position: relative;

  @include for-phone-only {
    margin-top: 24px;
    padding-bottom: 12px !important;
    margin-bottom: 36px !important;
    font-size: 18px !important;
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

  @include for-phone-only {
    grid-template-columns: repeat(1, 1fr);

  }
}

.info-wrapper {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  @include for-phone-only {
    flex-direction: column;
  }

  .field-wrapper {
    display: flex;
    flex-direction: column;
    flex: 6;

    @include for-phone-only {
      width: 100%;
    }
  }

  .img-upload {
    display: flex;
    flex-direction: column;
    flex: 2;
    box-sizing: border-box;
    margin-left: 48px;

    @include for-phone-only {
      width: 100%;
      margin-left: 0;
    }

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
            font-family: 'Outfit', sans-serif;
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
    }
  }
}

.image-upload {
  img {
    height: 150px;
    width: 150px;
    border-radius: 75px;
  }
}

label {
  margin-bottom: 8px;
  font-weight: 600;
}

.options-wrap {
  display: flex;
  flex-direction: row;

  @include for-phone-only {
    flex-direction: column;
  }
}
</style>
