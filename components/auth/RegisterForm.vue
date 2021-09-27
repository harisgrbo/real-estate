<template>
  <div class="form-wrapper">
    <h2>Registracija</h2>
    <ul>
      <li v-for="(type, index) in registrationTypes" @click="currentType = index" :key="index" :class="[ currentType === index ? 'active' : '' ]">{{ type }}</li>
    </ul>
    <!-- User registration -->
    <div v-if="currentType === 0">
      <form @submit.prevent="handleUserRegistration">
        <TextField type="text" placeholder="Email" v-model="userPayload.email" class="mb-4"></TextField>
        <TextField type="text" placeholder="Korisničko ime" v-model="userPayload.name" class="mb-4"></TextField>
        <TextField type="password" placeholder="Lozinka" v-model="userPayload.password" class="mb-4"></TextField>
        <div class="flex flex-row items-center justify-between mt-8 w-full buttons">
          <nuxt-link :to="{ path: '/auth/login' }">Logujte se</nuxt-link>
          <ActionButton placeholder="Registruj se" @action="handleUserRegistration" :loading="loading"></ActionButton>
        </div>
      </form>
    </div>
    <!-- Real estate agency registration -->
    <div v-if="currentType === 1">
      <form @submit.prevent="handleRealEstateAgencyRegistration">
        <TextField type="text" placeholder="Naziv agencije" v-model="realEstateAgencyPayload.name" class="mb-4"></TextField>
        <TextField type="number" placeholder="ID broj" v-model="realEstateAgencyPayload.external_id" class="mb-4"></TextField>
        <TextField type="text" placeholder="Email" v-model="realEstateAgencyPayload.email" class="mb-4"></TextField>
        <TextField type="password" placeholder="Lozinka" v-model="realEstateAgencyPayload.password" class="mb-4"></TextField>
        <PublishDropdown placeholder="Pretrazite lokacije" class="location" @select-option="handleSelectedCity"></PublishDropdown>
      </form>
      <div class="flex flex-row items-center justify-between mt-8 buttons">
        <nuxt-link :to="{ path: '/auth/login' }">Logujte se</nuxt-link>
        <ActionButton placeholder="Registruj se" @action="handleRealEstateAgencyRegistration" :loading="loading"></ActionButton>
      </div>
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
  ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 24px;
    width: 100%;
    li {
      font-size: 14px !important;
      line-height: 26px !important;
      margin-right: 24px;
      padding-bottom: 8px;
      height: 30px;
      position: relative;
      cursor: pointer;
      font-weight:500;
      &.active {
        color: #0D1F3E;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          border-bottom: 1px solid #0D1F3E;
        }
      }
    }
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

.location {
  margin-top: 12px;
}

div.buttons {
  display: flex;
  flex-direction: row;
}

::v-deep input {
  border: 1px solid #000;
}

::v-deep ::placeholder {
  font-weight: 500;
  font-size: 14px;
  color: #000;
}
</style>
