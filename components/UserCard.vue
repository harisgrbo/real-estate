<template>
  <div class="flex-1 relative inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium hover:text-gray-500 bg-white user-main-wrap">
    <div class="w-full mobile-user flex flex-col items-center">
      <nuxt-link :to="user.user_type === 'agency' ? '/agency/' + user.id : '/users/' + user.id">
        <div class="flex-1 flex flex-col items-center p-2 pt-4">
          <img class="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full" :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']" alt="">
          <h3 class="mt-6 text-gray-900 text-sm font-medium ">{{ user.name }}</h3>
          <dl class="mt-1 flex-grow flex flex-col justify-between">
            <dd class="mt-3">
              <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ user_type(user.user_type) }}</span>
            </dd>
          </dl>
        </div>
      </nuxt-link>
      <div class="flex divide-x divide-gray-200" v-if="$auth.user">
        <div class="flex-1 flex cursor-pointer" @click="$modal.show('contact-user')">
          <a class="relative flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
            <!-- Heroicon name: solid/mail -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span class="ml-2">Poruka</span>
          </a>
        </div>
      </div>
      <Snackbar></Snackbar>
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
  display: flex;
  flex-direction: row;
  padding: 12px;
  //box-shadow: rgb(0 0 0 / 7%) 0px 0px 8px;
  border-radius: 10px;
  border: 1px solid #ebebeb;
  min-width: 486px;
  width: 486px;
  height: 200px;

  .user-info {
    display: flex;
    flex-direction: row;

    .rating {
      font-size: 12px !important;
      padding-left: 4px;
    }

    > div {
      display: flex;
      flex-direction: column;

      p {
        font-size: 16px;

        &:first-child {
          margin-bottom: 12px;
          font-weight: 500;
        }
      }
    }
  }

  ul {
    width: 100%;
    padding: 12px;
    border: 1px solid #ebebeb;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    margin-top: 12px;
    margin-bottom: 12px;

    li {
      font-size: 14px;
    }
  }

  .save {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 6px 12px;
    border-radius: 5px;
    background: none;
    border: none;
    cursor: pointer;
    justify-content: flex-start;
    width: fit-content;

    svg {
      color: #444;
      height: 16px;
      margin-right: 8px;
    }

    &:hover {
      background: rgb(247, 247, 247) !important;
      text-decoration: underline;
    }
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
    min-width: 180px;
  }
}

.user-main-wrap {
  margin-right: 0;
  border: 1px solid #f1f1f1;
  border-radius: 7px;
}

</style>
