<template>
  <div class="account-wrapper max-w-7xl mx-auto w-full">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Uredi profil</p>
      </li>
    </ul>
    <div class="info-wrapper pb-12 mt-6">

      <img :src="avatarUrl" />

      <form class="flex flex-row justify-between w-full" @submit="updateProfileInfo">
        <div class="space-y-6 sm:space-y-5 w-full flex flex-col bg-gray-50 p-4">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Lični podaci
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Koristite prave informacije
            </p>
          </div>
          <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="first-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Ime i Prezime
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input v-model="name" type="text" name="first-name" autocomplete="given-name" class="max-w-lg block w-full shadow-sm h-10 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="first-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Email
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input v-model="email" type="text" name="first-name" id="first-name" autocomplete="given-name" class="max-w-lg block w-full shadow-sm h-10 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="street-address" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Sifra
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input v-model="password" type="password" name="street-address" id="street-address" autocomplete="street-address" class="block max-w-lg w-full shadow-sm h-10 sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="street-address" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Potvrda Sifre
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input v-model="passwordConfirm" type="password" name="street-address" id="street-address" autocomplete="street-address" class="block max-w-lg w-full shadow-sm h-10 sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Slika profila
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div class="space-y-1 text-center mr-2">
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-black">
                        <span class="px-2">Izaberite sliku</span>
                        <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="updateAvatar">
                      </label>
                      <p class="pl-1">ili prevucite sliku u okvir</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit">Spasi izmjene</button>
          </div>
        </div>
      </form>
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
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
})

export default class urediProfil extends Vue {
  user = {}
  name = '';
  email = '';
  password = '';
  passwordConfirm = '';
  loading = false;
  avatarUrl = '';

  async created() {
    this.setInputs();
  }

  async updateAvatar(event) {
    console.log(event.target.files);
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
    this.avatarUrl = this.$auth.user.avatar_url;
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
        if (this.passwordConfirm === this.password) {
          payload.password = this.password;
        } else {
          this.$snackbar.show({
            text: "Sifre nisu iste",
            timeout: 1000,
            type: "danger"
          })
        }
      }

      await this.$axios.put('/profile/update', payload)
      await this.$auth.fetchUser();
      this.setInputs();

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

@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.account-wrapper {
  width: 1180px;
}

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

</style>
