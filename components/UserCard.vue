<template>
  <nuxt-link class="user-profile" :to="user.user_type === 'agency' ? '/agency/' + user.id : '/users/' + user.id">
    <div class="box border shadow-none border-gray-400 hover:shadow-md">
      <div class="flex items-start px-3 pt-3">
        <div class="w-full flex flex-col  items-center">
          <div class="w-16 h-16 image-fit">
            <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']">
          </div>
          <div class="text-center">
            <p class="font-semibold text-md text-gray-900">{{ user.name }}</p>
            <dd class="mt-2">
              <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ user_type(user.user_type) }}</span>
            </dd>
          </div>
        </div>
      </div>
      <div class="text-center lg:text-left p-5 pt-2 pb-2" v-if="user.hasOwnProperty('email')">
        <div class="flex items-center justify-start text-gray-700 mt-2 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p>{{ user.email }}</p></div>
<!--        <div class="flex items-center justify-start text-gray-700 w-full" v-if="user.location !== null">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />-->
<!--          </svg>-->
<!--          <p class="paragraph">{{ user.location }}</p>-->
<!--        </div>-->
      </div>
    </div>
  </nuxt-link>
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
  message = '';

  removeUser(e) {
    this.$emit('remove-user', e)
  }

  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else {
      return 'Korisnik'
    }
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

  created() {
    console.log(this.user)
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
  border: 1px solid #f1f1f1;
  min-height: 200px;
  height: 200px;

  img {
    max-width: 60px;
    width: 60px;
    height: 60px;
    min-width: 60px;
  }
  .paragraph {
    text-align: left;
    display: inline-block;
    width: 180px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }
}

img {
  height: 128px;
  width: 128px;
  border-radius: 50%;
  object-fit: cover;
  min-width: 128px;

  @include for-phone-only {
    height: 80px;
    width: 80px;
    min-width: 80px;
  }
}

h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-buttons {
  @include for-phone-only {
    display: flex;
    flex-direction: column;
  }
}

@include for-phone-only {
  .mobile-user {
    width: 100%;
    min-width: auto;
  }
}

.user-main-wrap {
  margin-right: 0;
  border: 1px solid #f1f1f1;
  border-radius: 7px;
}

</style>
