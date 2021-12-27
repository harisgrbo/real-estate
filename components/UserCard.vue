<template>
  <div class="user-profile">
    <nuxt-link :to="user.user_type === 'agency' ? '/agency/' + user.id : '/users/' + user.id" class="flex flex-col items-center">
      <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']">
      <p class="font-semibold text-md text-gray-900 my-4">{{ user.name }}</p>
      <dd class="mt-2">
        <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ user_type(user.user_type) }}</span>
      </dd>
    </nuxt-link>
      <div class="text-center lg:text-left pt-2 pb-2" v-if="user.hasOwnProperty('email')">
        <div class="flex items-center justify-start text-gray-700 mt-2 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p>{{ user.email }}</p></div>
      </div>
      <div class="flex flex-row items-center justify-center my-4 w-full" v-if="placeholder">
        <action-button :placeholder="placeholder" :style-options="{ width: '100%' }" @action="$emit('do-action')"></action-button>
      </div>
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
        key: Math.floor(Math.random() * 100).toString()
      });

      this.$modal.hide('contact-user');

      this.loading = false;

      this.$snackbar.show({
        text: "Uspješno ste poslali poruku korisniku " + this.user.name,
        timeout: 1000,
        type: "success"
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

.user-profile {
  min-width: 240px;
  width: 240px;
  height: 260px;
  border-radius: 4px;
  border: 1px solid #f1f1f1;
  min-height: 200px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}


  img {
    max-width: 90px;
    width: 90px;
    height: 90px;
    min-width: 90px;
    min-height: 90px;
  }
  .paragraph {
    text-align: left;
    display: inline-block;
    width: 180px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
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
