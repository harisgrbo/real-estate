<template>
  <div class="account-wrapper mx-auto w-full">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Uredi profil</p>
      </li>
    </ul>
    <div class="col-span-12">
      <!-- BEGIN: Display Information -->
      <div class="intro-y box lg:mt-5">
        <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
          <h2 class="font-medium text-base mr-auto">
            Display Information
          </h2>
        </div>
        <div class="p-5">
          <div class="flex flex-col-reverse xl:flex-row flex-col">
            <div class="flex-1 mt-6 xl:mt-0">
              <div class="grid grid-cols-12 gap-x-5">
                <div class="col-span-12 2xl:col-span-6">
                  <div>
                    <label for="update-profile-form-1" class="form-label">Display Name</label>
                    <input id="update-profile-form-1" type="text" class="form-control" placeholder="Input text" :value="$auth.user.name" disabled>
                  </div>
                </div>
                <div class="col-span-12 2xl:col-span-6">

                  <div class="">
                    <label for="update-profile-form-4" class="form-label">Phone Number</label>
                    <input id="update-profile-form-4" type="text" class="form-control" placeholder="Input text" value="65570828">
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="mt-3">
                    <label for="update-profile-form-5" class="form-label">Adresa</label>
                    <textarea id="update-profile-form-5" class="form-control" placeholder="Adress">10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore</textarea>
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-primary w-20 mt-3">Sačuvaj</button>
            </div>
            <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
              <div class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5">
                <div class="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                  <img class="rounded-md" alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-3.jpg">
                  <div title="Remove this profile photo?" class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-24 right-0 top-0 -mr-2 -mt-2"> <i data-feather="x" class="w-4 h-4"></i> </div>
                </div>
                <div class="mx-auto cursor-pointer relative mt-5">
                  <button type="button" class="btn btn-primary w-full">Promijeni sliku</button>
                  <input type="file" class="w-full h-full top-0 left-0 absolute opacity-0">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Display Information -->
      <!-- BEGIN: Personal Information -->
      <div class="intro-y box mt-5">
        <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
          <h2 class="font-medium text-base mr-auto">
            Lične informacije
          </h2>
        </div>
        <div class="p-5">
          <div class="grid grid-cols-12 gap-x-5">
            <div class="col-span-12 xl:col-span-6">
              <div>
                <label for="update-profile-form-6" class="form-label">Email</label>
                <input id="update-profile-form-6" type="text" class="form-control" placeholder="Input text" value="morganfreeman@left4code.com" disabled>
              </div>
              <div class="mt-3">
                <label for="update-profile-form-7" class="form-label">Korisničko ime</label>
                <input id="update-profile-form-7" type="text" class="form-control" placeholder="Input text" value="Morgan Freeman" disabled>
              </div>
              <div class="mt-3">
                <label for="update-profile-form-9" class="form-label">ID broj</label>
                <input id="update-profile-form-9" type="text" class="form-control" placeholder="Input text" value="357821204950001">
              </div>
            </div>
            <div class="col-span-12 xl:col-span-6">
              <div class="mt-3 xl:mt-0">
                <label for="update-profile-form-10" class="form-label">Broj telefona</label>
                <input id="update-profile-form-10" type="text" class="form-control" placeholder="Input text" value="65570828">
              </div>
              <div class="mt-3">
                <label for="update-profile-form-11" class="form-label">Address</label>
                <input id="update-profile-form-11" type="text" class="form-control" placeholder="Input text" value="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore">
              </div>
              <div class="mt-3">
                <label for="update-profile-form-13" class="form-label">Lokacija</label>
                <input id="update-profile-form-13" type="text" class="form-control" placeholder="Input text" value="DBS Current 011-903573-0">
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button type="button" class="btn btn-primary w-20 mr-auto">Sačuvaj</button>
            <a href="" class="text-theme-24 flex items-center"> <i data-feather="trash-2" class="w-4 h-4 mr-1"></i>Izbriši račun</a>
          </div>
        </div>
      </div>
      <!-- END: Personal Information -->
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
  width: auto;

  @include for-phone-only {
    width: 100%;
    padding: 16px;
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

input {
  height: 50px;
  background: #f9f9f9;
  border-radius: 4px;
  padding-right: 100px !important;
  width: 100%;
  padding: 0 12px;
  min-width: 100%;

  &:hover,
  &:focus,
  &:visited {
    outline: none;
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
</style>
