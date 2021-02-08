<template>
  <div class="w-full">
    <h1 class="heading">
      Uredi profil
    </h1>
    <div class="content">
      <TextField label="Ime i prezime" v-model="payload.name"></TextField>
      <TextField label="Email" v-model="payload.email"></TextField>
      <TextField label="Sifra" type="password" v-model="payload.password"></TextField>
      <TextField label="Potvrdi sifru" v-model="user.password"></TextField>
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
  layout() { return "account" }
})

export default class urediProfil extends Vue {
  user = {}
  payload = {
    name: '',
    email: '',
    password: ''
  }
  loading = false;

  async created() {
    await this.fetchUser();

    this.payload.name = this.user.name;
    this.payload.email = this.user.email;
  }

  async fetchUser() {
    let user = this.$auth.user.data.id;
    try {
      let res = await this.$axios.get('/me');

      this.user = res.data.data;

      console.log(this.user, 'me')
    } catch(e) {
      console.log(e)
    }
  }

  async updateProfileInfo() {
    this.loading = true;
    try {
      await this.$axios.put('/profile/update', this.payload)

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
