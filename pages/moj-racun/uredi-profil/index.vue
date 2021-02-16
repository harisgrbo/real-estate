<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Uredi profil</p>
      </li>
    </ul>
    <h1 class="heading">
      Uredi profil
    </h1>
    <div class="content">
      <TextField label="Ime i prezime" v-model="name" type="text"></TextField>
      <TextField label="Email" v-model="email" type="text"></TextField>
      <TextField label="Sifra" type="password" v-model="password"></TextField>
      <TextField label="Potvrdi sifru" v-model="passwordConfirm" type="password"></TextField>
    </div>
    <ActionButton @action="handleAction" placeholder="Spasi izmjene" :loading="loading"></ActionButton>
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
    flex-direction: column;

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
</style>
