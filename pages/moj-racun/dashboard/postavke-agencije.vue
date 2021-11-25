<template>
  <div class="account-wrapper">
    <div class="col-span-12">
      <!-- BEGIN: Display Information -->
      <div class="intro-y box lg:mt-5">
        <div class="py-5">
          <div class="flex flex-col-reverse xl:flex-row flex-col">
            <div class="flex-1 mt-6 xl:mt-0">
              <div class="grid grid-cols-12 gap-x-5">
                <div class="col-span-12 2xl:col-span-6">
                  <div>
                    <label for="update-profile-form-1" class="form-label">ID Broj</label>
                    <input id="update-profile-form-1" type="text" class="form-control" v-model="id">
                  </div>
                </div>
                <div class="col-span-12 2xl:col-span-6">

                  <div class="">
                    <label for="update-profile-form-4" class="form-label">Lokacija</label>
                    <input id="update-profile-form-4" type="text" class="form-control" v-model="location">
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="mt-3">
                    <label for="update-profile-form-5" class="form-label">Opis</label>
                    <textarea id="update-profile-form-5" class="form-control" v-model="description"></textarea>
                  </div>
                </div>
              </div>
              <button type="button" class="btn bg-gray-800 text-white w-20 mt-3" @click="updateProfileInfo">Sačuvaj</button>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Display Information -->
    </div>
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
  id = '';
  location = '';
  description = '';
  loading = false;
  agency = {
    external_id: '',
    location: '',
    description: ''
  };

  async created() {
    await this.fetchMyAgency();
    this.setInputs();
  }

  setInputs() {
    this.id = this.agency.external_id;
    this.location = this.agency.location;
    this.description = this.agency.description
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

