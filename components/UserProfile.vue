<template>
  <aside class="ml-0 lg:ml-6 xl:ml-6 up:ml-6 sticky-top">
    <div class="main-user-wrapper">
      <div class="flex flex-row">
        <div class="flex w-14 h-14 items-center justify-center rounded-full overflow-hidden">
          <img :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']" alt="" class="object-contain">
        </div>
        <div class="flex flex-col items-start justify-start h-14 pl-4">
          <h2 @click="goToUser()" class="text-lg font-medium text-black leading-5">{{ user.name }}</h2>
          <dd class="mt-3">
            <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ user_type(user.user_type) }}</span>
          </dd>
        </div>
      </div>
      <div class="flex w-full contact">
        <div class="w-full" v-if="this.$auth.user">
          <div class="w-full flex items-center justify-between" v-if="isMe">
            <ActionButton :style-options="{ background: 'transparent', border: '2px solid #023246', color: '#023246' }"  @action="handleEditListing" class="w-full mr-sm" placeholder="Uredi oglas"></ActionButton>
            <ActionButton :style-options="{ color: '#fff' }"  placeholder="Izdvoji" @action="handleListingSponsoring" class="w-full ml-sm"></ActionButton>
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

      <div class="rent" v-if="isBooking && !$device.isMobile && !authUser">
        <client-only>
          <form @submit.prevent>
            <div class="price-wrap" v-if="!$device.isMobile">
              <div class="flex flex-row items-center mb-4">
                <p class="text-xl font-bold">{{ numberWithCommas(price) + ' KM'}}</p>
                <p class="pl-2">/ noć</p>
              </div>
              <div v-show="numOfDays">
                <p class="font-semibold text-md">{{ numberWithCommas(totalBookingPrice) }} KM za {{ numOfDays }} dana</p>
              </div>
            </div>

            <div class="mb-4 mt-4">
              <h2 class="text-lg font-normal text-black leading-5 mb-4">Rezervišite datum</h2>
              <vc-date-picker
                :min-date="new Date()"
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
            <ActionButton @action="$emit(`booking`)" :style-options="{ background: 'transparent', border: '2px solid #000', color: '#000', width: '100%' }" placeholder="Pošalji upit"></ActionButton>
          </form>
        </client-only>
      </div>
      <div class="rent" v-else>
        <div class="flex flex-col items-start price-wrap" v-if="!$device.isMobile">
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
            <action-button :style-options="{ color: '#fff', width: '100%' }" class="mt-4" placeholder="Pošalji upit" @action="sendMessage" :loading="loading"></action-button>
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
  @Prop({}) authUser;
  @Prop({}) followed;
  @Prop({}) isRent;
  @Prop({}) isBooking;
  @Prop({}) type;
  @Prop() id;
  @Prop() price;
  @Prop({ type: Boolean }) vat;

  message = '';
  loading = false;
  otherListings = [];
  otherListingsLoaded = false;
  range = {
    start: new Date(),
    end: new Date(),
  }
  masks = {
    input: 'DD-MM-YYYY',
  }

  handleListingSponsoring() {
    console.log(sponzorisano)
  }

  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else {
      return 'Korisnik'
    }
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

  get numOfDays() {
    return this.$moment(this.range.end).diff(this.$moment(this.range.start), 'days');
  }

  get totalBookingPrice() {
    return this.price * this.numOfDays;
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

@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

aside {
  width: 360px;

  @include for-phone-only {
    width: 100%;
  }

  .contact {
    margin-top: 12px;

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
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;

  @include for-phone-only {
    box-shadow: none;
    border: none;
    padding: 16px;
  }

  img {
    height: 100%;
    object-fit: cover;
  }
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

.sticky-top {
  position: sticky;
  top: 100px;
}

textarea {
  height: 300px;
  font-weight: 500;
  color: #000;
  font-size: 18px;
  border: none;
  background: #f9f9f9;

  &:focus {
    outline: none;
    border: 2px solid #000;
    background: #fff;
  }
}
</style>
