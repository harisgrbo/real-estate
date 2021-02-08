<template>
  <div class="form-wrapper">
    <h2>Registracija</h2>
    <ul>
      <li v-for="(type, index) in registrationTypes" @click="currentType = index" :id="index" :class="[ currentType === index ? 'active' : '' ]">{{ type }}</li>
    </ul>
    <!-- User registration -->
    <div v-if="currentType === 0">
      <form @keyup.enter="handleUserRegistration">
        <TextField type="text" placeholder="Email" v-model="userPayload.email"></TextField>
        <TextField type="text" placeholder="Korisnicko ime" v-model="userPayload.name"></TextField>
        <TextField type="password" placeholder="Lozinka" v-model="userPayload.password"></TextField>
        <ActionButton placeholder="Registruj se kao korisnik" @action="handleUserRegistration" @keyup.enter.prevent="handleRealEstateAgentRegistration" :loading="loading"></ActionButton>
      </form>
    </div>
    <!-- Real estate agency registration -->
    <div v-if="currentType === 1">
      <form @keyup.enter="handleRealEstateAgencyRegistration">
        <TextField type="text" placeholder="Email" v-model="realEstateAgencyPayload.email"></TextField>
        <TextField type="text" placeholder="Korisnicko ime" v-model="realEstateAgencyPayload.name"></TextField>
        <TextField type="password" placeholder="Lozinka" v-model="realEstateAgencyPayload.password"></TextField>
        <ActionButton placeholder="Registruj se kao agencija" @action="handleRealEstateAgencyRegistration" @keyup.enter.prevent="handleRealEstateAgentRegistration" :loading="loading"></ActionButton>
      </form>
    </div>
    <nuxt-link :to="{ path: '/auth/login' }">Imate nalog? <p>Logujte se</p></nuxt-link>
    <Snackbar />
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import TextField from "@/components/inputs/TextField";
import ActionButton from "@/components/actionButtons/ActionButton";
import Snackbar from "@/components/global/Snackbar";

@Component({
  components: {ActionButton, TextField, Snackbar}
})

export default class RegisterForm extends Vue{

  userPayload = {
    name: '',
    email: '',
    password: '',
  }
  realEstateAgencyPayload = {
    name: '',
    email: '',
    password: '',
  }
  registrationTypes = [
    'Korisnik',
    'Agencija'
  ]
  currentType = 0;
  loading = false;

  config = {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'blob',
  };

  // User registration
  handleUserRegistration() {
    this.loading = true;

    this.$axios
      .post('/users/register', this.userPayload, this.config)
      .then(() => {
        this.$auth.loggedIn;
        this.loading = false;
        this.$snackbar.show({
          text: "Uspjesno ste se registrovali!",
          timeout: 3000,
          type: "success"
        });
      })
      .catch(error => {
        this.loading = false;
        console.log(error)
        this.$snackbar.show({
          text: "Unijeli ste pogresne informacije!",
          timeout: 3000,
          type: "danger"
        });
      })
  }

  // Real estate agency registration
  handleRealEstateAgencyRegistration() {
    this.loading = true;

    this.$axios
      .post('/agencies/register', this.realEstateAgencyPayload, this.config)
      .then(() => {
        this.$auth.loggedIn;
        this.loading = false;
        this.$snackbar.show({
          text: "Uspjesno ste se registrovali!",
          timeout: 3000,
          type: "success"
        });
      })
      .catch(error => {
        this.loading = false;
        console.log(error)
        this.$snackbar.show({
          text: "Unijeli ste pogresne informacije!",
          timeout: 3000,
          type: "danger"
        });
      })
  }

}
</script>

<style scoped lang="scss">
.form-wrapper {
  width: 70%;
  margin: 0 auto;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    justify-content: space-between;
    margin-bottom: 32px;
    width: 100%;
    li {
      display: flex;
      font-size: 14px;
      color: #444444;
      font-weight: 500;
      flex: 1;
      justify-content: center;
      align-items: center;
      line-height: 40px;
      cursor: pointer;
      &.active {
        background: #f1f1f1;
        border-radius: 5px;
        font-weight: 600;
      }
    }
  }
  a {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    color: #000;
    text-align: center;
    margin: 24px auto 0 auto;
    font-weight: 500;
    p {
      margin-left: 8px;
      color: #F3B86C;
    }
  }
}
</style>
