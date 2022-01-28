<template>
  <div class="box shadow-md hover:shadow-lg">
    <nuxt-link :to="user.user_type === 'agency' ? '/agency/' + user.id : '/users/' + user.id" class="flex flex-col items-center w-full">
      <div class="flex items-start px-5 pt-5 w-full">
        <div class="w-full flex flex-col justify-start w-full lg:flex-row items-start">
          <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']">
          <div class="lg:ml-4 text-center lg:text-left mt-3 lg:mt-0">
            <a href="" class="font-medium">{{ user.name }}</a>
            <dd class="mt-3">
              <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">Agencija</span>
            </dd>
          </div>
        </div>
      </div>
      <div class="mb-2 w-full px-3">
        <dl class="mt-5 grid grid-cols-3 gap-3 px-2">
          <div class="info-box bg-white rounded-md flex-col flex flex-1 overflow-hidden">
            <dt class="text-sm font-medium text-gray-500 truncate">
              Ukupno
            </dt>
            <dd class="mt-1 text-sm font-semibold text-gray-900">
              71,897
            </dd>
          </div>

          <div class="info-box bg-white rounded-md flex flex-col flex-1 overflow-hidden">
            <dt class="text-sm font-medium text-gray-500 truncate">
              Aktivni
            </dt>
            <dd class="mt-1 text-sm font-semibold text-gray-900">
              71,897
            </dd>
          </div>

          <div class="info-box bg-white rounded-md flex flex-col flex-1 overflow-hidden">
            <dt class="text-sm font-medium text-gray-500 truncate">
              Završeni
            </dt>
            <dd class="mt-1 text-sm font-semibold text-gray-900">
              71,897
            </dd>
          </div>
        </dl>
      </div>
      <div class="text-center lg:text-left px-5 pb-5 info w-full">
        <div class="flex items-start justify-center flex-col text-gray-700 mt-2 w-full">
          <div class="flex flex-row items-center mb-1 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p>{{ user.email }}</p>
          </div>
          <div class="flex flex-row items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p>{{ user.location }}</p>
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
    } else {
      return 'Korisnik'
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
  border-radius: 10px;
  min-width: 360px;
  width: 360px;
  max-width: 360px;
  height: 230px;
  max-height: 230px;
  min-height: 230px;
}

img {
  height: 50px;
  width: 50px;
  min-width: 50px;
}

.info p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}

.info-box {
  border-right: 1px solid #f1f1f1;

  &:last-child {
    border-right: 0;
  }
}
</style>
