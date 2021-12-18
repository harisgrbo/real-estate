<template>
  <div class="form-wrapper">
    <img src="/msquare.png" class="img-logo" alt="" @click="$router.push('/')">

    <h2 class="mt-4">Registracija</h2>
    <ul class="flex flex-row items-center justify-start bg-gray-50 rounded-md p-2">
      <li v-for="(type, index) in registrationTypes" @click="currentType = index" :key="index" :class="[ currentType === index ? 'active bg-white shadow-sm rounded-md' : '' ]">{{ type }}</li>
    </ul>
    <!-- User registration -->
    <div v-if="currentType === 0">
      <form @submit.prevent="handleUserRegistration">
        <TextField type="text" label="Email" v-model="userPayload.email" class="mb-4 mt-1"></TextField>
        <TextField label="Korisničko ime" type="text" v-model="userPayload.name" class="mb-4 mt-1"></TextField>
        <TextField type="password" label="Password" v-model="userPayload.password" class="mb-4 mt-1"></TextField>
        <ActionButton class="w-full hover:bg-gray-100" :style-options="{ background: 'transparent', border: '2px solid #1F2937', color: '#1F2937', marginTop: '24px' }" @action="handleUserRegistration" :loading="loading" placeholder="Registruj se"></ActionButton>
      </form>
      <nuxt-link :to="{ path: '/auth/login' }">Imaš račun? Loguj se</nuxt-link>

    </div>
    <!-- Real estate agency registration -->
    <div v-if="currentType === 1">
      <form @submit.prevent="handleRealEstateAgencyRegistration">
        <TextField label="Naziv agencije" type="text" v-model="realEstateAgencyPayload.name" class="mb-4 mt-1"></TextField>
        <TextField label="ID broj" type="number" v-model="realEstateAgencyPayload.external_id" class="mb-4 mt-1"></TextField>
        <TextField label="Email" type="text" v-model="realEstateAgencyPayload.email" class="mb-4 mt-1"></TextField>
        <TextField label="Password" type="password" v-model="realEstateAgencyPayload.password" class="mb-4 mt-1"></TextField>
        <PublishDropdown label="Lokacija" class="location" @select-option="handleSelectedCity"></PublishDropdown>
        <ActionButton class="w-full hover:bg-gray-100" :style-options="{ background: 'transparent', border: '2px solid #1F2937', color: '#1F2937', marginTop: '24px' }" @action="handleRealEstateAgencyRegistration" :loading="loading" placeholder="Registruj se"></ActionButton>
      </form>
      <nuxt-link :to="{ path: '/auth/login' }">Imaš račun? Loguj se</nuxt-link>
    </div>
    <Snackbar />
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import TextField from "@/components/inputs/TextField";
import ActionButton from "@/components/actionButtons/ActionButton";
import Snackbar from "@/components/global/Snackbar";
import PublishDropdown from "@/components/publishInputs/PublishDropdown"

@Component({
  components: {ActionButton, TextField, Snackbar, PublishDropdown}
})

export default class RegisterForm extends Vue{

  loginPayload = {
    grant_type: 'password',
    client_id: 2,
    client_secret: 'NxQqmRUUd4GWpAkNNwGpCilDYvhuU7E6C0xQSWuU',
    username: '',
    password: '',
  }

  userPayload = {
    name: '',
    email: '',
    password: '',
  }
  realEstateAgencyPayload = {
    name: '',
    external_id: '',
    email: '',
    password: '',
    location: ''
  }
  registrationTypes = [
    'Fizičko lice',
    'Pravno lice (agencija)'
  ]
  currentType = 0;
  loading = false;
  city = ''

  config = {
    headers: { 'Content-Type': 'application/json' },
    // responseType: 'blob',
  };

  async handlePostRegister(key = 'userPayload') {
    this.loginPayload.username = this[key].email;
    this.loginPayload.password = this[key].password;

    await this.$auth.loginWith("local", { data: this.loginPayload });
    this.$router.push('/');
  }

  // User registration
  handleUserRegistration() {
    this.loading = true;

    this.$axios
      .post('/users/register', this.userPayload, this.config)
      .then(this.handlePostRegister)
      .catch(error => {
        this.loading = false;
        if (error.response.status === 422) {
          this.$snackbar.show({
            text: "Unijeli ste pogresne informacije!",
            timeout: 3000,
            type: "danger"
          });
        }
      })
  }

  handleSelectedCity(f) {
    this.realEstateAgencyPayload.location = f.name;
  }

  // Real estate agency registration
  handleRealEstateAgencyRegistration() {
    this.loading = true;

    this.$axios
      .post('/agencies/register', this.realEstateAgencyPayload, this.config)
      .then(() => {
        this.handlePostRegister('realEstateAgencyPayload')
      }).catch(error => {
        this.loading = false;
        if (error.response.status === 422) {
          this.$snackbar.show({
            text: "Unijeli ste pogresne informacije!",
            timeout: 3000,
            type: "danger"
          });
        }
      })
  }

}
</script>

<style scoped lang="scss">
@mixin for-laptop {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}
@mixin for-desktop-up {
  @media (min-width: 1200px) {
    @content;
  }
}
@mixin for-big-desktop-up {
  @media (min-width: 1800px) {
    @content;
  }
}
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.image {
  width: 300px;
  margin: auto
}

//.form-wrapper {
//  width: 70%;
//  margin: 0 auto;
//  height: 80%;
//  display: flex;
//  flex-direction: column;
//  justify-content: space-between;
//
//  @include for-phone-only {
//    width: 100%;
//    padding: 0 12px;
//    box-sizing: border-box;
//    height: 100%;
//  }
//  div {
//    display: flex;
//    flex-direction: column;
//    justify-content: space-between;
//    width: 100%;
//  }
//  h2 {
//    font-weight: 500;
//    font-size: 20px;
//    margin-bottom: 24px;
//    text-align: left;
//  }
//  a {
//    text-decoration: none;
//    color: #434343 !important;
//    text-align: center;
//    font-weight: 500;
//    width: fit-content;
//    font-size: 14px;
//  }
//}

.form-wrapper {
  width: 70%;
  margin: 0 auto;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: scroll;

  @include for-phone-only {
    width: 100%;
    padding: 36px 16px;
    height: auto;
    overflow-y: scroll;
    justify-content: center;
  }

  h2 {
    font-weight: 600;
    font-size: 36px;
    margin-bottom: 42px;
    text-align: left;
  }
  ul {
    display: flex;
    margin-bottom: 24px;
    height: 50px;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    li {
      flex: 1;
      margin-right: 10px;
      padding: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #797979;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:last-child {
        margin-right: 0;
      }

      &.active {
        font-weight: 600;
        color: #fff;
        background: #012F34;
      }
    }
  }

  a {
    text-decoration: none;
    color: #000 !important;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 24px;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
      background: #f9f9f9;
      border-radius: 7px;
    }
  }
}

button {
  width: 100%;
  margin-top: 16px;
  font-size: 16px;
}

label {
  font-weight: 600;
  font-size: 15px;
}

.logo {
  width: 120px;
  margin: 36px auto;
}

.logo-wrap {
  height: 80px !important;
  width: 80px !important;
  padding-bottom: 36px !important;

}

.img-logo {
  width: 200px;
  margin: 0 auto;
  margin-bottom: 46px;

  @include for-phone-only {
    height: 48px;
  }

}
</style>
