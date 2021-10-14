<template>
  <div class="form-wrapper">
    <h2>Registracija</h2>
    <ul class="flex flex-row items-center justify-start bg-gray-50 rounded-md p-2">
      <li v-for="(type, index) in registrationTypes" @click="currentType = index" :key="index" :class="[ currentType === index ? 'active bg-white shadow-sm rounded-md' : '' ]">{{ type }}</li>
    </ul>
    <!-- User registration -->
    <div v-if="currentType === 0">
      <form @submit.prevent="handleUserRegistration">
        <label for="">Email</label>
        <TextField type="text" placeholder="Email" v-model="userPayload.email" class="mb-4"></TextField>
        <label for="">Korisničko ime</label>
        <TextField type="text" placeholder="Korisničko ime" v-model="userPayload.name" class="mb-4"></TextField>
        <label for="">Šifra</label>
        <TextField type="password" placeholder="Šifra" v-model="userPayload.password" class="mb-4"></TextField>
        <ActionButton class="w-full hover:bg-gray-100" :style-options="{ background: 'transparent', border: '2px solid #023246', color: '#023246', marginTop: '24px' }" @action="handleUserRegistration" :loading="loading" placeholder="Registruj se"></ActionButton>
      </form>
      <nuxt-link :to="{ path: '/auth/login' }">Imaš račun? Loguj se</nuxt-link>

    </div>
    <!-- Real estate agency registration -->
    <div v-if="currentType === 1">
      <form @submit.prevent="handleRealEstateAgencyRegistration">
        <label for="">Ime agencije</label>
        <TextField type="text" placeholder="Ime agencije" v-model="realEstateAgencyPayload.name" class="mb-4"></TextField>
        <label for="">ID broj</label>
        <TextField type="number" placeholder="ID broj" v-model="realEstateAgencyPayload.external_id" class="mb-4"></TextField>
        <label for="">Email</label>
        <TextField type="text" placeholder="Email" v-model="realEstateAgencyPayload.email" class="mb-4"></TextField>
        <label for="">Šifra</label>
        <TextField type="password" placeholder="Šifra" v-model="realEstateAgencyPayload.password" class="mb-4"></TextField>
        <PublishDropdown placeholder="Pretrazite lokacije" title="Lokacija" class="location" @select-option="handleSelectedCity"></PublishDropdown>
        <ActionButton class="w-full hover:bg-gray-100" :style-options="{ background: 'transparent', border: '2px solid #023246', color: '#023246', marginTop: '24px' }" @action="handleRealEstateAgencyRegistration" :loading="loading" placeholder="Registruj se"></ActionButton>
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

  // User registration
  handleUserRegistration() {
    this.loading = true;

    this.$axios
      .post('/users/register', this.userPayload, this.config)
      .then(() => {
        this.$auth.loggedIn;
        this.$snackbar.show({
          text: "Uspjesno ste se registrovali!",
          timeout: 3000,
          type: "success"
        });
        this.loading = false;
      })
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
      .post('/agencije/register', this.realEstateAgencyPayload, this.config)
      .then(() => {
        this.$auth.loggedIn;
        this.$snackbar.show({
          text: "Uspjesno ste se registrovali!",
          timeout: 3000,
          type: "success"
        });
        this.loading = false;
      })
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

.form-wrapper {
  width: 70%;
  margin: 0 auto;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @include for-phone-only {
    width: 100%;
    padding: 0 12px;
    box-sizing: border-box;
    height: 100%;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  h2 {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 24px;
    text-align: left;
  }
  a {
    text-decoration: none;
    color: #434343 !important;
    text-align: center;
    font-weight: 500;
    width: fit-content;
    font-size: 14px;
  }
}

.form-wrapper {
  width: 70%;
  margin: 0 auto;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ::v-deep input {
    border: 1px solid #ddd;
    background: #fff;
    height: 52px;
    width: 100%;
    padding: 0 16px;
  }

  ::v-deep ::placeholder {
    font-weight: 500;
    font-size: 14px;
    color: #8d8d8d;
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

    li {
      width: fit-content;
      margin-right: 10px;
      padding: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #797979;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      &.active {
        font-weight: 600;
        color: #000;
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
    margin-top: 42px;
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
</style>
