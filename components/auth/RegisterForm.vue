<template>
  <div class="form-wrapper">
    <img src="/mojkvadrat-logo-new.png" class="img-logo" alt="" @click="$router.push('/')">

    <h2 class="mt-4">Registracija</h2>
    <ul class="flex flex-row items-center justify-start">
      <li v-for="(type, index) in registrationTypes" @click="currentType = index" :key="index" :class="[ currentType === index ? 'active bg-white rounded-sm' : '' ]">{{ type }}</li>
    </ul>
    <!-- User registration -->
    <div v-if="currentType === 0">
      <form @submit.prevent="handleUserRegistration">
        <TextField label="Korisničko ime" type="text" v-model="userPayload.name" class="mb-6 mt-1"></TextField>
        <TextField type="text" label="Email" v-model="userPayload.email" class="mb-6 mt-1"></TextField>
        <TextField type="password" label="Password" v-model="userPayload.password" class="mb-6 mt-1"></TextField>
        <label class="flex flex-row items-center cursor-pointer mt-2">
          <input type="checkbox" class="mr-1">
          Prihvatam uslove korištenja
        </label>
        <ActionButton class="w-full" :style-options="{ color: '#fff', marginTop: '24px' }" @action="handleUserRegistration" :loading="loading" placeholder="Registruj se"></ActionButton>
      </form>
    </div>
    <!-- Real estate agency registration -->
    <div v-if="currentType === 1">
      <form @submit.prevent="handleRealEstateAgencyRegistration">
        <TextField label="Naziv agencije" type="text" v-model="realEstateAgencyPayload.name" class="mb-6 mt-1"></TextField>
        <TextField label="ID broj" type="number" v-model="realEstateAgencyPayload.external_id" class="mb-4 mt-1"></TextField>
        <TextField label="Email" type="text" v-model="realEstateAgencyPayload.email" class="mb-6 mt-1"></TextField>
        <TextField label="Password" type="password" v-model="realEstateAgencyPayload.password" class="mb-6 mt-1"></TextField>
        <PublishDropdown label="Lokacija" class="location mb-4" @select-option="handleSelectedCity"></PublishDropdown>
        <label class="flex flex-row items-center cursor-pointer mt-2">
          <input type="checkbox" class="mr-1">
          Prihvatam uslove korištenja
        </label>
        <ActionButton class="w-full" :style-options="{ color: '#fff', marginTop: '24px' }" @action="handleRealEstateAgencyRegistration" :loading="loading" placeholder="Registruj se"></ActionButton>
      </form>
    </div>
    <div class="flex items-center justify-center login-u">
      <p>Imaš račun?</p><nuxt-link :to="{ path: '/auth/login' }">Prijavi se</nuxt-link>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import TextField from "@/components/inputs/TextField";
import ActionButton from "@/components/actionButtons/ActionButton";
import PublishDropdown from "@/components/publishInputs/PublishDropdown"

@Component({
  components: {ActionButton, TextField, PublishDropdown}
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
      .then(() => {
        this.handlePostRegister();
      })
      .catch(error => {
        this.loading = false;
        if (error.response && error.response.status === 422) {

          this.$toast.open({
            message: "Unijeli ste pogrešne informacije!",
            type: 'error',
            duration: 5000
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
        if (error.response && error.response.status === 422) {
          this.$toast.open({
            message: "Unijeli ste pogrešne informacije!",
            type: 'error',
            duration: 5000
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

.form-wrapper {
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 10px;
  height: 100vh;
  justify-content: center;

  @include for-phone-only {
    width: 100%;
    padding: 36px 16px;
    height: auto;
    overflow-y: scroll;
    justify-content: center;
  }

  h2 {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 36px;
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
        color: #444;
        border: 1px solid #000;
        padding: 13px 0;
        border-radius: 4px;
      }
    }
  }
}

button {
  width: 100%;
  margin-top: 16px;
  font-size: 16px;
}

label {
  font-weight: 500;
  font-size: 15px;
  margin: 8px 0;
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
  width: 160px;
  margin: 0 auto;
  margin-bottom: 46px;
  cursor: pointer;

  @include for-phone-only {
    height: 48px;
  }

}

.login-u {
  width: 100%;
  padding-top: 24px;
  margin-top: 24px;
  border-top: 1px solid #f1f1f1;
  p {
    min-width: fit-content;
    margin-right: 8px;
    color: #727272;
  }

  a {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
