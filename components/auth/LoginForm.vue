<template>
  <div class="form-wrapper">
    <h2>Prijava</h2>
    <form @submit.prevent="handleLogin">
      <label for="">Email</label>
      <TextField type="text" placeholder="Email" v-model="payload.username" class="mb-4 mt-1"></TextField>
      <label for="">Password</label>
      <TextField type="password" placeholder="Lozinka" v-model="payload.password" class="mt-1"></TextField>
      <ActionButton type="submit" placeholder="Prijavi se" :loading="loading"></ActionButton>
      <nuxt-link :to="{ path: '/auth/register' }">Registruj se</nuxt-link>
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
    border: 1px solid #ddd;
    background: #fff;
    height: 52px;
    width: 100%;
    padding: 0 16px;
  }

  ::v-deep ::placeholder {
    font-weight: 600;
    font-size: 14px;
    color: #8d8d8d;
  }
  h2 {
    font-weight: 600;
    font-size: 36px;
    margin-bottom: 42px;
    text-align: left;
  }
  a {
    text-decoration: none;
    color: #434343 !important;
    text-align: center;
    font-weight: 500;
    width: fit-content;
    font-size: 16px;
    margin: 0 auto;
  }
}

button {
  width: 100%;
  margin-top: 16px;
}

label {
  font-weight: 600;
  font-size: 15px;
}
</style>
