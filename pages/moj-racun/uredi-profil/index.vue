<template>
  <div class="account-wrapper max-w-7xl mx-auto w-full">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Uredi profil</p>
      </li>
    </ul>
    <div class="info-wrapper pb-12">
<!--      <div class="field-wrapper">-->
<!--        <div class="content">-->
<!--          <h2 class="heading">-->
<!--            Korisničke informacije-->
<!--          </h2>-->
<!--          <div class="grid-inputs">-->
<!--            <TextField label="Ime i prezime" v-model="name" type="text"></TextField>-->
<!--            <TextField label="Email" v-model="email" type="text"></TextField>-->
<!--            <TextField label="Broj telefona" v-model="number" type="number"></TextField>-->
<!--            <TextField label="Grad" v-model="email" type="text"></TextField>-->
<!--            <TextField label="Država" v-model="email" type="text"></TextField>-->
<!--            <TextField label="Adresa" v-model="email" type="text"></TextField>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="content">-->
<!--          <h2 class="heading">-->
<!--            Promjena šifre-->
<!--          </h2>-->
<!--          <div class="grid-inputs">-->
<!--            <TextField label="Šifra" type="password" v-model="password"></TextField>-->
<!--            <TextField label="Potvrdi šifru" v-model="passwordConfirm" type="password"></TextField>-->
<!--          </div>-->
<!--        </div>-->
<!--        <ActionButton @action="handleAction" placeholder="Spasi izmjene" :loading="loading"></ActionButton>-->
<!--      </div>-->
<!--      <div class="img-upload">-->
<!--        <h2 class="heading">-->
<!--          Promjena avatara-->
<!--        </h2>-->
<!--        <div class="avatar-wrapper">-->
<!--          <div class="img-wrap-relative">-->
<!--            <div class="upload-btn">-->
<!--              <button>-->
<!--                <p>Izaberite avatar</p> <font-awesome-icon icon="file-upload"></font-awesome-icon>-->
<!--              </button>-->
<!--            </div>-->
<!--            <img src="/avatar.jpg" alt="">-->
<!--          </div>-->
<!--          <ActionButton @action="handleAction" placeholder="Promijeni sliku" :loading="loading"></ActionButton>-->

<!--          <div class="verification-status">-->
<!--            <img src="/percentage.svg" alt="">-->
<!--            <p>profil verifikovan 50%</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <form class="flex flex-row justify-between w-full">
        <div class="mr-4 pr-4 border-r-2 border-gray-400 w-full flex flex-col">

          <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="username" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Username
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg flex rounded-md shadow-sm">
              <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                workcation.com/
              </span>
                  <input type="text" name="username" id="username" autocomplete="username" class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300">
                </div>
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="about" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                About
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <textarea id="about" name="about" rows="3" class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"></textarea>
                <p class="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="photo" class="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="flex items-center">
              <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
                  <button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="cover-photo" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Cover photo
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div class="space-y-1 text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" class="sr-only">
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6 sm:space-y-5 w-full flex flex-col bg-gray-50 p-4">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Personal Information
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div class="space-y-6 sm:space-y-5">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="first-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                First name
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="last-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Last name
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="email" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Email address
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input id="email" name="email" type="email" autocomplete="email" class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="country" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Country / Region
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <select id="country" name="country" autocomplete="country" class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="street-address" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Street address
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="city" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                City
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input type="text" name="city" id="city" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="state" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                State / Province
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input type="text" name="state" id="state" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="zip" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                ZIP / Postal
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input type="text" name="zip" id="zip" autocomplete="postal-code" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>
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
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',
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

@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.account-wrapper {
  @include for-phone-only {
    padding: 0 12px 120px 12px;
    box-sizing: border-box;
    width: 100%;
  }
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
            font-family: 'Roboto', sans-serif;
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
