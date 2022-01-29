<template>
  <aside class="ml-0 lg:ml-6 xl:ml-6 up:ml-6 sticky-top">
    <div class="main-user-wrapper">
      <div class="flex flex-row">
        <div class="flex w-14 min-w-14 h-14 items-center justify-center rounded-full overflow-hidden img-wrap">
          <img :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']" alt="" class="object-contain w-full min-w-full">
        </div>
        <div class="flex flex-col items-start justify-start h-14 pl-4 w-full">
          <div class="flex flex-row items-center justify-between w-full cursor-pointer">
            <h2 @click="goToUser()" class="text-lg font-medium text-black leading-5">{{ user.name }}</h2>
            <dd>
              <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ user_type(user.user_type) }}</span>
            </dd>
          </div>
          <dd class="mt-1 flex flex-row items-center justify-start">
            <span :class="['p-2 mr-2 rounded-full', user.online ? 'bg-green-500' : 'bg-gray-300']"></span>
            {{ user.online ? 'Online' : 'Offline' }}
          </dd>
          <div class="flex items-center justify-start text-gray-700 mt-2 w-full" v-if="user.working_agency !== null">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <p>{{ user.working_agency.name }}</p>
          </div>
        </div>
      </div>
      <div class="flex w-full contact" v-if="$auth.user">
        <div class="w-full">
          <div class="w-full flex flex-col items-center justify-between" v-if="isMe">
            <div class="w-full flex items-center justify-center">
              <ActionButton :style-options="{ background: 'transparent', border: '2px solid #1F2937', color: '#1F2937' }"  @action="handleEditListing" class="w-full mr-sm" placeholder="Uredi"></ActionButton>
              <ActionButton :style-options="{ color: '#fff', background: 'red' }"  placeholder="Završi" @action="$emit('finish-listing')" class="w-full ml-sm"></ActionButton>
            </div>
            <div class="rounded-md bg-blue-50 p-2 mt-6">
              <div class="flex">
                <div class="flex-shrink-0">
                  <!-- Heroicon name: solid/information-circle -->
                  <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3 flex-1 md:flex md:justify-between">
                  <p class="text-sm text-blue-700">
                    Sponzorisanjem oglasa, posjećenost oglasa je veća za 60%
                  </p>
                  <p class="mt-3 text-sm md:mt-0 md:ml-6">
                    <nuxt-link to="/sponzorisanje-oglasa" class="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">Više <span aria-hidden="true">&rarr;</span></nuxt-link>
                  </p>
                </div>
              </div>
            </div>
            <ActionButton :style-options="{ color: '#fff' }"  placeholder="Sponzoriši" @action="$emit('sponsor-listing')" class="w-full"></ActionButton>
          </div>
          <div class="w-full flex items-center justify-between" v-else>
            <ActionButton @action="$modal.show('contact-user')" :style-options="{ background: 'transparent', border: '2px solid #1F2937', color: '#1F2937' }" placeholder="Poruka" class="w-full mr-sm"></ActionButton>
            <ActionButton :placeholder="followed? 'Otprati' : 'Zaprati'" :style-options="{ background: 'transparent', border: '2px solid #1F2937', color: '#1F2937' }" @action="handleFollow" class="ml-sm"></ActionButton>
          </div>
        </div>
<!--        <button class="report-user" v-if="!isMe">-->
<!--          <font-awesome-icon icon="user-slash"></font-awesome-icon>-->
<!--          {{ type === 'agency'? 'Prijavi agenciju' : 'Prijavi fizičko lice' }}-->
<!--        </button>-->
      </div>
    </div>
    <client-only>
      <modal @before-open="beforeOpen" @before-close="beforeClose" name="contact-user" :adaptive="true" height="100%">
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
<!--    <button class="mt-4 report" @click="blockUser(user)" v-if="$auth.user && ($auth.user.id !== user.id)">-->
<!--      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="red">-->
<!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />-->
<!--      </svg>-->
<!--      Blokiraj korisnika</button>-->
    <div class="booking rounded-md" v-if="isBooking && !isMe">
      <client-only>
        <form @submit.prevent>
          <div class="price-wrap flex flex-col justify-start mb-4">
            <div class="flex flex-row items-center w-full">
              <p class="text-xl font-medium">{{ numberWithCommas(price) + ' KM'}}</p>
              <p class="pl-2 text-lg font-thin">/ noćenje {{ perguest ? 'po osobi' : '' }}</p>
            </div>
          </div>
          <div class="mb-4 picker-wrap" v-if="$auth.user">
            <vc-date-picker
              :disabled-dates="disabledDates"
              :min-date="new Date()"
              v-model="range"
              :masks="masks"
              locale="sr-Latn-RS"
              is-range
              is-inline
              popover.visibility="visible"
              :popover="{ visibility: 'click' }"
            >
              <template v-slot="{ inputValue, inputEvents, isDragging }">
                <div class="flex flex-row justify-start items-center">
                  <div class="flex flex-col">
                    <label class="text-xs text-gray-400 font-medium mb-2 uppercase">dolazak</label>
                    <div class="relative flex-grow w-full">
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
                        class="flex-grow pl-8 pr-2 py-1 bg-gray-100 rounded w-full date-input shadow-md"
                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                      />
                    </div>
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
                  <div class="flex flex-col">
                    <label class="text-xs text-gray-400 font-medium mb-2 uppercase">odlazak</label>
                    <div class="relative flex-grow w-full">
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
                        class="flex-grow pl-8 pr-2 py-1 bg-gray-100 rounded w-full date-input shadow-md"
                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                        :value="inputValue.end"
                        v-on="inputEvents.end"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </vc-date-picker>
            <div class="flex flex-col">
              <label class="text-xs text-gray-400 font-medium mb-2 uppercase mt-4">Broj gostiju</label>
              <div class="relative flex-grow w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-600 w-4 h-full mx-2 absolute pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <input
                  class="flex-grow pl-8 pr-2 py-1 bg-gray-100 rounded w-full date-input shadow-md"
                  :value="number_of_guests"
                />
              </div>
            </div>
          </div>
          <div v-show="numOfDays" class="mb-4 w-full flex total flex-col">
            <span class="text-md font-light mb-3">Troškovi</span>
            <div class="flex w-full flex-row items-center justify-between">
              <p class="font-thin text-md">{{ price }} KM x {{ numOfDays }} dana</p>
              <p class="font-medium text-md">{{ numberWithCommas(totalBookingPrice) + ' KM' }}</p>
            </div>
          </div>
          <ActionButton @action="$emit('send-booking-request', this.number_of_guests)" :style-options="{ color: '#fff', background: '#1F2937 !important', width: '100%' }" placeholder="Pošalji upit za rezervaciju"></ActionButton>
        </form>
      </client-only>
    </div>
  </aside>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import UserMedals from "@/components/UserMedals";
import ActionButton from "./actionButtons/ActionButton";
import TextField from "./inputs/TextField";

@Component({
  components: {
    TextField,
    ActionButton,
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
  @Prop() perguest
  @Prop() id;
  @Prop() price;
  @Prop({ type: Boolean }) vat;
  @Prop({type: Array, default: () => []}) bookings;

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
  number_of_guests = 1

  handleListingSponsoring() {
  }

  get disabledDates() {
    return this.bookings.map(item => {
      return {
        start: this.$moment(item.starts_at).toDate(),
        end: this.$moment(item.ends_at).toDate(),
      }
    })
  }

  async blockUser(u) {
    try {
      let res = await this.$axios.post('/profile/users/' + u.id + '/block');

      this.$toast.open({
        message: "Blokirali ste korisnika " + u.name,
        type: 'success',
        duration: 5000
      });

    } catch(e) {
      console.log(e)
    }
  }

  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else if(t === 'user') {
      return 'korisnik'
    } else {
      return 'Agent'
    }
  }

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
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

      this.$toast.open({
        message: "Morate upisati poruku",
        type: 'warning',
        duration: 5000
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
        key: Math.floor(Math.random() * 100).toString()
      });

      this.$modal.hide('contact-user');

      this.loading = false;


      this.$toast.open({
        message: "Uspješno ste poslali poruku korisniku " + this.user.name,
        type: 'success',
        duration: 5000
      });


      this.message = '';
    } catch(e) {
      console.log(e)
    }
  }

  goToUser() {
    if(this.$auth.user) {
      if(this.$auth.user.user_type === 'agency') {
        this.$router.push('/agency/' + this.$auth.user.id)
      } else if(this.$auth.user.user_type === 'agent'){
        this.$router.push('/agent/' + this.$auth.user.id)
      } else {
        this.$router.push('/users/' + this.$auth.user.id)
      }
    } else {
      this.$router.push('/auth/login')
    }
  }

  async handleFollow() {
    try {
      if(this.followed) {
        await this.$axios.delete('/users/' + this.user.id + '/follow');

        this.$toast.open({
          message: "Uspješno ste otpratili " + this.user.name,
          type: 'success',
          duration: 5000
        });

        this.followed = false;
      } else {
        await this.$axios.post('/users/' + this.user.id + '/follow');

        this.$toast.open({
          message: "Uspješno ste zapratili " + this.user.name,
          type: 'success',
          duration: 5000
        });

        this.followed = true;
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
  border-radius: 10px;
  padding: 16px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  margin-bottom: 26px;

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

}

.date-input {
  height: 40px;
  background: #fff;
  font-size: 13px;
  border-radius: 10px;
}

.sticky-top {
  position: sticky;
  top: 100px;

  @include for-phone-only {
    position: static;
  }
}

textarea {
  height: 300px;
  font-weight: 500;
  color: #000;
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  min-height: 400px !important;
  padding: 12px;

  &:focus {
    outline: none;
  }
}

.report {
  color: red;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}

.img-wrap {
  min-width: 56px;
}

.booking {
  border: 1px solid rgb(221, 221, 221);
  border-radius: 10px;
  padding: 16px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
}

.total {
  border-top: 1px solid rgb(221, 221, 221);
  padding-top: 16px;
  margin-top: 24px;
}

.picker-wrap {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 12px;
}
</style>
