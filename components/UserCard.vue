<template>
  <nuxt-link :to="user.user_type === 'agency' ? '/agency/' + user.id : '/users/' + user.id">
    <div class="box border shadow-none border-gray-400 hover:shadow-md">
      <div class="flex items-start px-3 pt-3">
        <div class="w-full flex flex-col lg:flex-row items-center">
          <div class="w-16 h-16 image-fit">
            <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']">
          </div>
          <div class="ml-4 text-center lg:text-left">
            <p class="font-semibold text-md text-gray-900">{{ user.name }}</p>
            <div class="text-gray-600 text-sm font-semibold mt-0.5">{{ user_type(user.user_type) }}</div>
          </div>
        </div>
      </div>
      <div class="text-center lg:text-left p-5 pt-2 pb-2">
        <div class="flex items-center justify-start text-gray-700 mt-2 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p>{{ user.email }}</p></div>
        <div class="flex items-center justify-start lg:justify-start text-gray-700 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p class="paragraph">{{ user.location }}</p>
        </div>
      </div>
      <div class="text-center lg:text-right p-5 border-t border-gray-200 dark:border-dark-5">
      <button class="btn text-white bg-gray-800 py-1 px-2 mr-2">Poruka</button>
      <button class="btn btn-outline-secondary py-1 px-2">Profil</button>
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

.box {
  border: 1px solid #f1f1f1;

  img {
    max-width: 60px;
    width: 60px;
    height: 60px;
    min-width: 60px;
  }
  .paragraph {
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
