<template>
  <div class="form-wrapper">
    <h2>Prijava</h2>
    <TextField type="text" placeholder="Email" v-model="payload.username"></TextField>
    <TextField type="password" placeholder="Lozinka" v-model="payload.password"></TextField>
    <ActionButton placeholder="Prijavi se" @action="handleLogin" @keyup.enter="handleLogin" :loading="loading"></ActionButton>
    <nuxt-link :to="{ path: '/auth/register' }">Nemate nalog? <p>Registruj se</p></nuxt-link>
    <Snackbar />
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import TextField from "@/components/inputs/TextField";
import ActionButton from "@/components/actionButtons/ActionButton";

@Component({
  components: {ActionButton, TextField}
})

export default class LoginForm extends Vue{
  payload = {
    grant_type: 'password',
    client_id: 2,
    client_secret: 'NxQqmRUUd4GWpAkNNwGpCilDYvhuU7E6C0xQSWuU',
    username: '',
    password: '',
  }
  loading = false;

  mounted() {
    window.addEventListener('keyup', this.handleEnter);
  }

  destroyed() {
    window.removeEventListener('keyup', this.handleEnter);
  }

  handleEnter(e) {
    if (e.code === 'Enter') {
      this.handleLogin();
    }
  }

  async handleLogin() {
    this.loading = true;

    try {
      await this.$auth.loginWith("local", { data: this.payload });
      this.$auth.setUser(this.payload)
      // this.$auth.$storage.setUniversal('user', this.payload, true)
      this.loading = false
      this.$router.push('/')

    } catch(e) {
      this.loading = false
      console.log(e)
    }
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
  h2 {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 24px;
    text-align: left;
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
