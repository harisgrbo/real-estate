<template>
  <div class="form-wrapper">
    <div class="inner">
      <img src="/svg-logo.svg" class="img-logo" alt="" @click="$router.push('/')">
      <h2 class="mt-4 text-left w-full">Reset šifre</h2>
      <div class="rounded-md bg-yellow-50 p-4 mb-6 w-full">
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Heroicon name: solid/exclamation -->
            <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-yellow-800">
              Pažnja
            </h3>
            <div class="mt-2 text-sm text-yellow-700">
              <p>
                U formu ispod u prvo polje unesite novu šifru, a zatim je ponovite u idućem polju
              </p>
            </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="handleResetPassword">
        <TextField type="password" label="Nova šifra" id="1" placeholder="******" v-model="newPassword" class="mb-6 mt-1"></TextField>
        <TextField type="password" label="Ponovite šifru" id="2" placeholder="******" v-model="repeatNewPassword" class="mb-6 mt-1"></TextField>
        <div class="rounded-md bg-red-50 p-4" v-show="error">
          <div class="flex">
            <div class="flex-shrink-0">
              <!-- Heroicon name: solid/x-circle -->
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Šifre moraju biti iste</h3>
            </div>
          </div>
        </div>
        <ActionButton class="w-full" :style-options="{ color: '#fff', marginTop: '24px' }" :loading="loading" type="submit" placeholder="Resetuj šifru"></ActionButton>
      </form>
    </div>
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

export default class zaboravljenasifra extends Vue{
  newPassword = '';
  repeatNewPassword = '';
  loading = false;
  error = '';

  checkPasswords() {
    return this.newPassword !== '' && this.repeatNewPassword !== '' && (this.newPassword === this.repeatNewPassword);
  }

  async handleResetPassword() {
    this.loading = true;

    try {
      if(this.checkPasswords()) {
        await this.$axios.post(`/password/reset/${this.$route.params.token}`, {
          password: this.newPassword
        });

        await this.$router.push('/prijava')
      } else {
        this.error = true;
      }

    } catch(e) {
      if (e.response.status === 400) {
        this.$toast.open({
          message: "Pogrešni podaci",
          type: 'error',
          duration: 5000
        });
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
  width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 10px;
  height: 100vh;
  justify-content: center;

  .inner {
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include for-phone-only {
      width: 100%;
    }
  }


  @include for-phone-only {
    width: 100%;
    padding: 24px 16px;
    height: 100%;
    min-height: 100vh;
    justify-content: center;


  }

  h2 {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 36px;
    text-align: left;
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

.first-part {
  font-size: 20px;
  font-weight: 600;
  font-family: 'NunitoSans', sans-serif;;
  color: #002F34;
  margin-left: 5px;
}
.second-part {
  font-size: 20px;
  font-weight: 500;
  font-family: 'NunitoSans', sans-serif;;
  color: #002F34;
}

.img-logo {
  width: 160px;
  margin: 0 auto;
  margin-bottom: 46px;
  cursor: pointer;
  height: auto;
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

form {
  width: 100%;
}
</style>
