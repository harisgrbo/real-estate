<template>
  <div class="account-wrapper">
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Display Information -->
      <div class="intro-y box lg:mt-5">
        <div class="flex items-center border-b border-gray-200 dark:border-dark-5">
          <h2 class="font-medium text-base mr-auto">
            Display Information
          </h2>
        </div>
        <div>
          <div class="flex flex-col-reverse xl:flex-row flex-col">
            <div class="flex-1 mt-6 xl:mt-0">
              <div class="grid grid-cols-12 gap-x-5">
                <div class="col-span-12 2xl:col-span-6">
                  <div>
                    <label for="update-profile-form-1" class="form-label">Display Name</label>
                    <input id="update-profile-form-1" type="text" class="form-control" placeholder="Input text" value="Morgan Freeman" disabled>
                  </div>
                  <div class="mt-3">
                    <label for="update-profile-form-2" class="form-label">Nearest MRT Station</label>
                    <select id="update-profile-form-2" data-search="true" class="tom-select w-full">
                      <option value="1">Admiralty</option>
                      <option value="2">Aljunied</option>
                      <option value="3">Ang Mo Kio</option>
                      <option value="4">Bartley</option>
                      <option value="5">Beauty World</option>
                    </select>
                  </div>
                </div>
                <div class="col-span-12 2xl:col-span-6">
                  <div class="mt-3 2xl:mt-0">
                    <label for="update-profile-form-3" class="form-label">Postal Code</label>
                    <select id="update-profile-form-3" data-search="true" class="tom-select w-full">
                      <option value="1">018906 - 1 STRAITS BOULEVARD SINGA...</option>
                      <option value="2">018910 - 5A MARINA GARDENS DRIVE...</option>
                      <option value="3">018915 - 100A CENTRAL BOULEVARD...</option>
                      <option value="4">018925 - 21 PARK STREET MARINA...</option>
                      <option value="5">018926 - 23 PARK STREET MARINA...</option>
                    </select>
                  </div>
                  <div class="mt-3">
                    <label for="update-profile-form-4" class="form-label">Phone Number</label>
                    <input id="update-profile-form-4" type="text" class="form-control" placeholder="Input text" value="65570828">
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="mt-3">
                    <label for="update-profile-form-5" class="form-label">Address</label>
                    <textarea id="update-profile-form-5" class="form-control" placeholder="Adress">10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore</textarea>
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-primary w-20 mt-3">Save</button>
            </div>
            <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
              <div class="border-2 border-dashed border-gray-200 dark:border-dark-5 rounded-md p-5">
                <div class="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                  <img class="rounded-md" alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-3.jpg">
                  <div title="Remove this profile photo?" class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-24 right-0 top-0 -mr-2 -mt-2"> <i data-feather="x" class="w-4 h-4"></i> </div>
                </div>
                <div class="mx-auto cursor-pointer relative mt-5">
                  <button type="button" class="btn btn-primary w-full">Change Photo</button>
                  <input type="file" class="w-full h-full top-0 left-0 absolute opacity-0">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Display Information -->
      <!-- BEGIN: Personal Information -->
      <div class="intro-y box mt-5">
        <div class="flex items-center border-b border-gray-200 dark:border-dark-5">
          <h2 class="font-medium text-base mr-auto">
            Personal Information
          </h2>
        </div>
        <div>
          <div class="grid grid-cols-12 gap-x-5">
            <div class="col-span-12 xl:col-span-6">
              <div>
                <label for="update-profile-form-6" class="form-label">Email</label>
                <input id="update-profile-form-6" type="text" class="form-control" placeholder="Input text" value="morganfreeman@left4code.com" disabled>
              </div>
              <div class="mt-3">
                <label for="update-profile-form-7" class="form-label">Name</label>
                <input id="update-profile-form-7" type="text" class="form-control" placeholder="Input text" value="Morgan Freeman" disabled>
              </div>
              <div class="mt-3">
                <label for="update-profile-form-8" class="form-label">ID Type</label>
                <select id="update-profile-form-8" class="form-select">
                  <option>IC</option>
                  <option>FIN</option>
                  <option>Passport</option>
                </select>
              </div>
              <div class="mt-3">
                <label for="update-profile-form-9" class="form-label">ID Number</label>
                <input id="update-profile-form-9" type="text" class="form-control" placeholder="Input text" value="357821204950001">
              </div>
            </div>
            <div class="col-span-12 xl:col-span-6">
              <div class="mt-3 xl:mt-0">
                <label for="update-profile-form-10" class="form-label">Phone Number</label>
                <input id="update-profile-form-10" type="text" class="form-control" placeholder="Input text" value="65570828">
              </div>
              <div class="mt-3">
                <label for="update-profile-form-11" class="form-label">Address</label>
                <input id="update-profile-form-11" type="text" class="form-control" placeholder="Input text" value="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore">
              </div>
              <div class="mt-3">
                <label for="update-profile-form-12" class="form-label">Bank Name</label>
                <select id="update-profile-form-12" data-search="true" class="tom-select w-full">
                  <option value="1">SBI - STATE BANK OF INDIA</option>
                  <option value="1">CITI BANK - CITI BANK</option>
                </select>
              </div>
              <div class="mt-3">
                <label for="update-profile-form-13" class="form-label">Bank Account</label>
                <input id="update-profile-form-13" type="text" class="form-control" placeholder="Input text" value="DBS Current 011-903573-0">
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button type="button" class="btn btn-primary w-20 mr-auto">Save</button>
            <a href="" class="text-theme-24 flex items-center"> <i data-feather="trash-2" class="w-4 h-4 mr-1"></i> Delete Account </a>
          </div>
        </div>
      </div>
      <!-- END: Personal Information -->
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

<style>
.box {
  box-shadow: none;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 24px;
}
</style>

