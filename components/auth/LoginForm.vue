<template>
  <div class="form-wrapper">
    <h2>Prijava</h2>
    <form @submit.prevent="handleLogin">
      <TextField type="text" placeholder="Email" v-model="payload.username" class="mb-4"></TextField>
      <TextField type="password" placeholder="Lozinka" v-model="payload.password"></TextField>
      <div class="flex flex-row items-center justify-between mt-8">
        <nuxt-link :to="{ path: '/auth/register' }">Registruj se</nuxt-link>
        <ActionButton type="submit" placeholder="Prijavi se" :loading="loading"></ActionButton>
      </div>
    </form>
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

  handleEnter(e) {
    if (e.code === 'Enter') {
      this.handleLogin();
    }
  }

  async handleLogin() {
    this.loading = true;

    try {
      await this.$auth.loginWith("local", { data: this.payload });
      // this.$auth.setUser(this.payload)
      this.$router.push('/')
    } catch(e) {
      if (e.response.status === 400) {
        this.$snackbar.show({
          text: "Pogresni podaci",
          timeout: 1000,
          type: 'danger'
        })
      }
    } finally {
      this.loading = false;
    }
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

  ::v-deep input {
    border: 1px solid #000;
  }

  ::v-deep ::placeholder {
    font-weight: 500;
    font-size: 14px;
    color: #000;
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
</style>
