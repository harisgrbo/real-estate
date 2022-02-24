<template>
  <div class="box">
    <nuxt-link :to="user.user_type === 'agency' || user.user_type === 'investor' ? '/pravno-lice/' + user.id : '/korisnik/' + user.id" class="flex flex-col items-center w-full">
      <div class="flex items-start px-4 pt-4 w-full">
        <div class="w-full flex justify-start w-full flex-row items-start">
          <img alt="Icewall Tailwind HTML Admin Template" class="rounded-sm avatar" :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']">
          <div class="ml-4 text-left mt-0">
            <div class="font-semibold text-sm">
              <h2>{{ user.name }}</h2>
              <span v-if="user.rating !== null" class="flex flex-row items-center">
                 <star-rating :star-size="12" :increment="0.5" :inline="true" :read-only="true" v-model="user.rating"></star-rating>
              </span>
            </div>
            <dd class="mt-3">
              <span class="px-2 py-1 text-green-800 text-xs font-semibold uppercase bg-green-100 rounded-sm">{{ user_type(user.user_type) }}</span>
            </dd>
          </div>
        </div>
      </div>
      <div class="text-left px-5 pb-5 info w-full mt-4">
        <div class="flex items-start justify-center flex-col text-gray-700 mt-2 w-full">
          <div class="flex flex-row items-center mb-1 text-sm" v-if="user.hasOwnProperty('email') && user.hasOwnProperty('email')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p>{{ user.email }}</p>
          </div>
          <div class="flex flex-row items-center text-sm mb-1" v-if="user.hasOwnProperty('location') && user.location !== null">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p>{{ user.location }}</p>
          </div>
          <div class="flex flex-row items-center text-sm" v-if="user.hasOwnProperty('phone_number') && user.phone_number !== null">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p>{{ user.phone_number }}</p>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton"

@Component({
  components: {
    ActionButton
  },
  layout() { return "account" }
})
export default class UserCard extends Vue {
  @Prop({}) user;
  @Prop({}) placeholder;
  message = '';

  removeUser(e) {
    this.$emit('remove-user', e)
  }

  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else if(t === 'user') {
      return 'korisnik'
    } else if(t === 'agent'){
      return 'Agent'
    } else if(t === 'investor') {
      return 'Investitor'
    } else {
      return 'Admin'
    }
  }
  async sendMessage() {
    if(this.message.length === 0) {
      this.$toast.open({
        message: 'Morate upisati poruku',
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

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.box {
  border-radius: 6px;
  min-width: 360px;
  width: 360px;
  max-width: 360px;
  height: 216px;
  max-height: 216px;
  min-height: 16px;
  position: relative;
  z-index: 10;
  border: 2px solid #f1f1f1;

  h2 {
    font-size: 16px;
  }
  &:hover {
    h2 {
      text-decoration: underline;
    }
  }

  &:last-child {
    margin-right: 12px;
  }


  @include for-phone-only {
    min-width: 300px;
    width: 300px;
    max-width: 300px;
  }
}

img {
  height: 80px;
  width: 80px;
  min-width: 80px;
}

.info p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;

  @include for-phone-only {
    max-width: 180px;
  }
}

.info-box {
  border-right: 1px solid #f1f1f1;

  &:last-child {
    border-right: 0;
  }
}

.avatar {
  object-fit: contain;
}
</style>
