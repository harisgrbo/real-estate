<template>
  <div class="form-wrapper">
    <img src="/mojkvadrat.svg" class="logo" alt="" @click="$router.push('/')">

    <h2 class="mt-4">Dobrodošli!</h2>
    <form @submit.prevent="handleLogin">
      <label for="">Email</label>
      <TextField type="text" placeholder="Email" v-model="payload.username" class="mb-4 mt-1"></TextField>
      <label for="">Password</label>
      <TextField type="password" placeholder="Lozinka" v-model="payload.password" class="mt-1"></TextField>
      <ActionButton class="w-full hover:bg-gray-100" :style-options="{ background: 'transparent', border: '2px solid #023246', color: '#023246', marginTop: '24px' }" :loading="loading" type="submit" placeholder="Prijavi se"></ActionButton>
    </form>
    <nuxt-link class="mt-xl" :to="{ path: '/auth/register' }">Nemaš račun? Registruj se</nuxt-link>
    <Snackbar />
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import TextField from "@/components/inputs/TextField";
import ActionButton from "@/components/actionButtons/ActionButton";
import {mixin as clickaway} from "vue-clickaway";

@Component({
  components: {ActionButton, TextField},
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
  overflow-y: scroll;


  @include for-phone-only {
    width: 100%;
    padding: 24px 16px;
    height: 100%;

  }

  h2 {
    font-weight: 600;
    font-size: 36px;
    margin-bottom: 42px;
    text-align: left;
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
  padding-bottom: 8px !important;
}

.logo {
  width: 120px;
  margin: 36px auto;
}
</style>
