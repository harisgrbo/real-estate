<template>
  <aside class="ml-0 lg:ml-6 xl:ml-6 up:ml-6 sticky-top">
    <div class="main-user-wrapper">
      <div class="flex flex-row">
        <div class="flex w-14 min-w-14 h-14 items-center justify-center rounded-full overflow-hidden img-wrap">
          <img :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']" alt="" class="object-contain">
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
        </div>
      </div>
      <div class="flex w-full contact">
        <div class="w-full" v-if="$auth.user">
          <div class="w-full flex items-center justify-between" v-if="isMe">
            <ActionButton :style-options="{ background: 'transparent', border: '2px solid #1F2937', color: '#1F2937' }"  @action="handleEditListing" class="w-full mr-sm" placeholder="Uredi oglas"></ActionButton>
            <ActionButton :style-options="{ color: '#fff' }"  placeholder="Sponzoriši" @action="handleListingSponsoring" class="w-full ml-sm"></ActionButton>
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
    <Snackbar></Snackbar>
    <button class="mt-4 report" @click="blockUser(user)" v-if="$auth.user && ($auth.user.id !== user.id)">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="red">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
      </svg>
      Blokiraj korisnika</button>
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

  handleListingSponsoring() {
    console.log(sponzorisano)
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

      this.$snackbar.show({
        text: "Blokirali ste korisnika " + u.name,
        timeout: 1000,
        type: "danger"
      });
    } catch(e) {
      console.log(e)
    }
  }

  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else if(t === 'user') {
      return 'Korisnik'
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
    if(this.user.user_type === 'agency') {
      this.$router.push('/agency/' + this.user.id)
    } else {
      this.$router.push('/users/' + this.user.id)
    }
  }

  async handleFollow() {
    try {
      if(this.followed) {
        await this.$axios.delete('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "Uspješno ste otpratili " + this.user.name,
          timeout: 1000,
          type: "success"
        });

        this.followed = false;
      } else {
        await this.$axios.post('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "Uspješno ste zapratili " + this.user.name,
          timeout: 1000,
          type: "success"
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
  border: 1px solid #ebebeb;
  border-radius: 4px;
  padding: 16px;
  box-shadow: rgb(0 0 0 / 9%) 0px 1px 3px;

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
</style>
