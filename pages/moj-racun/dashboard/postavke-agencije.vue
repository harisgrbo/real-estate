<template>
    <div class="w-full">
      <div class="grid grid-cols-2 gap-4">
        <TextField v-model="id" label="ID broj" placeholder="1234567"></TextField>
        <TextField v-model="web" label="Web adresa" placeholder="www.adresa.ba"></TextField>
        <TextField v-model="location" label="Lokacija" placeholder="Sarajevo"></TextField>
      </div>
      <TextAreaField class="mt-4" v-model="description" label="Opis" placeholder="Opis.."></TextAreaField>
      <action-button :loading="loading" @action="updateProfileInfo" class="mt-4" placeholder="Sačuvaj"></action-button>
      <Snackbar></Snackbar>
    </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import TextField from "@/components/inputs/TextField";
import ActionButton from "@/components/actionButtons/ActionButton"
import Snackbar from "@/components/global/Snackbar";
import TextAreaField from "../../../components/inputs/TextAreaField";

@Component({
  components: {
    TextAreaField,
    TextField,
    ActionButton,
    Snackbar
  },
  middleware: ['auth'],
  layout() { return "home" }
})
export default class urediProfil extends Vue {
  id = '';
  location = '';
  description = '';
  loading = false;
  web = '';
  agency = {
    external_id: '',
    location: '',
    description: '',
    web: ''
  };
  loading = false;

  async created() {
    await this.fetchMyAgency();
    this.setInputs();
  }

  setInputs() {
    this.id = this.agency.external_id;
    this.location = this.agency.location;
    this.description = this.agency.description;
    this.web = this.agency.web;
  }

  async fetchMyAgency() {
    try {
      this.agency = (await this.$axios.get('/profile/agency')).data.data;
    } catch (e) {
      console.log(e)
    }
  }

  async updateProfileInfo() {
    this.loading = true;
    try {
      let payload = {};

      if (this.id !== this.agency.id) {
        payload.external_id = this.id
      }

      if (this.location !== this.agency.location) {
        payload.location = this.location;
      }

      if (this.web !== this.agency.web) {
        payload.web = this.web;
      }

      if (this.description !== this.agency.description) {
        payload.description = this.description;
      }

      await this.$axios.put('/profile/agency', payload)

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
}
</script>

<style lang="scss" scoped>
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.content {
  @include for-phone-only {
    padding-top: 0;
  }
}
.box {
  box-shadow: none;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 24px;
}
</style>

