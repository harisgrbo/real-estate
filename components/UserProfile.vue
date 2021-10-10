<template>
  <aside class="ml-6">
    <div class="main-user-wrapper">
      <div class="flex flex-row">
        <div class="flex w-14 h-14 items-center justify-center rounded-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80" alt="" class="object-contain">
        </div>
        <div class="flex flex-col items-start justify-between h-14 pl-4">
          <h2 @click="goToUser()" class="text-lg font-medium text-black leading-5">{{ user.name }}</h2>
          <div class="flex flex-row items-center justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <p class="pl-2">
              4.8
            </p>
            <nuxt-link class="pl-2 underline" to="/">
              (54 ocjena)
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="flex w-full contact">
        <div class="w-full">
          <div class="w-full flex items-center justify-between" v-if="isMe">
            <ActionButton :style-options="{ background: 'transparent', border: '2px solid #023246', color: '#023246' }"  @action="handleEditListing" class="w-full mr-sm" placeholder="Uredi oglas"></ActionButton>
            <ActionButton :style-options="{ background: '#023246', border: '2px solid #023246' }"  placeholder="Izdvoji" @action="handleListingSponsoring" class="w-full ml-sm"></ActionButton>
          </div>
          <div class="w-full flex items-center justify-between" v-else>
            <ActionButton @action="$modal.show('contact-user')" :style-options="{ background: 'transparent', border: '2px solid #023246', color: '#023246' }" placeholder="Poruka" class="w-full mr-sm"></ActionButton>
            <ActionButton :placeholder="followed? 'Otprati' : 'Zaprati'" :style-options="{ background: 'transparent', border: '2px solid #023246', color: '#023246' }" @action="handleFollow" class="ml-sm"></ActionButton>
          </div>
        </div>

<!--        <button class="report-user" v-if="!isMe">-->
<!--          <font-awesome-icon icon="user-slash"></font-awesome-icon>-->
<!--          {{ type === 'agency'? 'Prijavi agenciju' : 'Prijavi fizičko lice' }}-->
<!--        </button>-->
      </div>

      <div class="rent" v-if="isRent">
        <client-only>
          <form @submit.prevent>
            <div class="flex flex-row items-center mb-4 price-wrap">
              <p class="text-xl font-bold">{{ numberWithCommas(price) + ' KM'}}</p>
              <p class="pl-2">/ noć</p>
            </div>
            <div class="mb-4">
              <h2 class="text-lg font-normal text-black leading-5 mb-4">Rezervišite datum</h2>
              <vc-date-picker
                v-model="range"
                mode="dateTime"
                :masks="masks"
                is-range
              >
                <template v-slot="{ inputValue, inputEvents, isDragging }">
                  <div class="flex flex-col sm:flex-row justify-start items-center">
                    <div class="relative flex-grow">
                      <svg
                        class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <input
                        class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full date-input"
                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                      />
                    </div>
                    <span class="flex-shrink-0 m-2">
              <svg
                class="w-4 h-4 stroke-current text-gray-600"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
                    <div class="relative flex-grow">
                      <svg
                        class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <input
                        class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full date-input"
                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                        :value="inputValue.end"
                        v-on="inputEvents.end"
                      />
                    </div>
                  </div>
                </template>
              </vc-date-picker>
            </div>
            <ActionButton :style-options="{ background: 'transparent', border: '2px solid #000', color: '#000', width: '100%' }" placeholder="Pošalji upit za rezervaciju"></ActionButton>
          </form>
        </client-only>
      </div>
      <div class="rent" v-else>
        <div class="flex flex-col items-start price-wrap">
          <p>Cijena {{ vat ? 'sa uračunatim PDV-om' : 'bez uračunatog PDV-a' }}</p>
          <p class="mt-1 text-lg text-black font-semibold">{{ numberWithCommas(price) }} KM</p>
        </div>
      </div>
    </div>
    <client-only>
      <modal name="contact-user" :adaptive="true" height="100%">
        <div class="modal-inner">
          <div class="modal-header">
            <h2>Poruka za {{ user.name }}</h2>
            <i class="material-icons" @click="$modal.hide('contact-user')">close</i>
          </div>
          <div class="modal-content">
            <textarea v-model="message"></textarea>
            <action-button class="mt-4" placeholder="Pošalji" @action="sendMessage" :loading="loading"></action-button>
          </div>
        </div>
      </modal>
    </client-only>
    <Snackbar></Snackbar>
  </aside>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import Snackbar from "@/components/global/Snackbar";
import UserMedals from "@/components/UserMedals";
import ActionButton from "./actionButtons/ActionButton";

@Component({
  components: {
    ActionButton,
    Snackbar,
    UserMedals
  },
})

export default class UserProfile extends Vue {
  @Prop({}) user;
  @Prop({}) followed;
  @Prop({}) isRent;
  @Prop({}) type;
  @Prop() id;
  @Prop() price;
  @Prop({ type: Boolean }) vat;

  message = '';
  loading = false;
  otherListings = [];
  otherListingsLoaded = false;
  range = {
    start: new Date(2020, 0, 6),
    end: new Date(2020, 0, 23),
  }
  masks = {
    input: 'YYYY-MM-DD',
  }

  handleListingSponsoring() {
    console.log(sponzorisano)
  }



  async created() {
    this.alreadyFollowed = this.followed;
    if(this.type === 'agency') {
      await this.getOtherListings();
    }
  }

  get dates() {
    return this.days.map(day => day.date);
  }

  get attributes() {
    return this.dates.map(date => ({
      highlight: true,
      dates: date,
    }));
  }

  onDayClick(day) {
    const idx = this.days.findIndex(d => d.id === day.id);
    if (idx >= 0) {
      this.days.splice(idx, 1);
    } else {
      this.days.push({
        id: day.id,
        date: day.date,
      });
    }
  }

  async getOtherListings() {
    this.otherListingsLoaded = false;
    try {
      let res = await this.$axios.get('/listings/' + this.id + '/other');
      this.otherListings = res.data.data;
      this.otherListingsLoaded = true;
    } catch(e) {
      console.log(e)
    }
  }

  get isMe() {
    if(this.$auth.user) {
      return this.$auth.user.id === this.user.id;
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  handleEditListing() {
    this.$router.push('/artikal/uredjivanje/' + this.$route.params.id);
  }

  async sendMessage() {
    if(this.message.length === 0) {
      this.$snackbar.show({
        text: "Morate upisati poruku",
        timeout: 1000,
        type: "danger"
      });

      return
    }

    this.loading = true;
    try {
      let res = await this.$axios.post('/conversations', {
        users: [this.user.id],
      })

      let conversation = res.data.data;

      await this.$axios.post('/conversations/' + conversation.id + '/messages', {
        content: this.message,
        initial_key: Math.floor(Math.random() * 100).toString()
      });

      this.$modal.hide('contact-user');

      this.loading = false;

      this.$snackbar.show({
        text: "uspješno ste poslali poruku korisniku " + this.user.name,
        timeout: 1000,
        type: "success"
      });


      this.message = '';
    } catch(e) {
      console.log(e)
    }
  }

  goToUser() {
    if(this.type === 'agency') {
      this.$router.push('/agency/' + this.user.id)
    } else {
      this.$router.push('/users/' + this.user.id)
    }
  }

  async handleFollow() {
    try {
      if(this.isFollowed) {
        await this.$axios.delete('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "uspješno ste otpratili " + this.user.name,
          timeout: 1000,
          type: "success"
        });

        this.isFollowed = false;
      } else {
        await this.$axios.post('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "Uspješno ste zapratili " + this.user.name,
          timeout: 1000,
          type: "success"
        });

        this.isFollowed = true;
      }

    } catch(e)  {
      console.log(e)
    }

  }

}

</script>

<style scoped lang="scss">
aside {
  width: 360px;

  .contact {
    margin-top: 36px;

    ::v-deep button {
      width: 100%;
      margin-top: 16px;
    }

    button {
      &:first-child {
        margin-right: 8px;
      }

      &:last-child {
        margin-left: 8px;
      }
    }
  }

  .rent {
    margin-top: 24px;
  }

}

.main-user-wrapper {
  border: 1px solid #f1f1f1;
  border-radius: 7px;
  padding: 16px;
}

.price-wrap {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 7px;
}

.date-input {
  height: 50px;
  background: #f9f9f9;
  font-size: 13px;
}
</style>
