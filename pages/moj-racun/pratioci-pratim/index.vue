<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Pratim/pratioci</p>
      </li>
    </ul>
    <h1 class="heading" v-if="!$device.isMobile">
      Pratim/pratioci
    </h1>
    <ul class="navs">
      <li v-for="(tab, index) in tabs"
          :key="index"
          @click="activeTab = index"
          :class="activeTab === index? 'active' : ''"
      >
        {{ tab }}
      </li>
    </ul>
    <div class="saved-content">
      <div v-show="activeTab === 0">
        <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-1" v-if="followers.length">
          <li class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200" v-for="user in followers">
            <div class="flex-1 flex flex-col p-8">
              <img class="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
              <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ user.name }}</h3>
              <dl class="mt-1 flex-grow flex flex-col justify-between">
                <dt class="sr-only">Title</dt>
                <dd class="text-gray-500 text-sm">Paradigm Representative</dd>
                <dt class="sr-only">Role</dt>
                <dd class="mt-3">
                  <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ user_type(user.user_type) }}</span>
                </dd>
              </dl>
            </div>
            <div>
              <div class="-mt-px flex divide-x divide-gray-200">
                <div class="w-0 flex-1 flex">
                  <a href="mailto:janecooper@example.com" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                    <!-- Heroicon name: solid/mail -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span class="ml-3">Poruka</span>
                  </a>
                </div>
                <div class="-ml-px w-0 flex-1 flex">
                  <a href="tel:+1-202-555-0170" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                    <!-- Heroicon name: solid/phone -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="ml-3">Profil</span>
                  </a>
                </div>
              </div>
            </div>
          </li>

          <!-- More people... -->
        </ul>
        <div v-else class="no-image">
          <img src="/noimg.jpg" alt="no-image">
          <p>Nemate pratilaca</p>
        </div>
      </div>
      <div v-show="activeTab === 1">
        <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-1" v-if="followed.length">
          <li class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200" v-for="user in followed">
            <div class="flex-1 flex flex-col p-8">
              <img class="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
              <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ user.name }}</h3>
              <dl class="mt-1 flex-grow flex flex-col justify-between">
                <dt class="sr-only">Title</dt>
                <dd class="text-gray-500 text-sm">Paradigm Representative</dd>
                <dt class="sr-only">Role</dt>
                <dd class="mt-3">
                  <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ user_type(user.user_type) }}</span>
                </dd>
              </dl>
            </div>
            <div>
              <div class="-mt-px flex divide-x divide-gray-200">
                <div class="w-0 flex-1 flex">
                  <a href="mailto:janecooper@example.com" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                    <!-- Heroicon name: solid/mail -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span class="ml-3">Poruka</span>
                  </a>
                </div>
                <div class="-ml-px w-0 flex-1 flex">
                  <a href="tel:+1-202-555-0170" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                    <!-- Heroicon name: solid/phone -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="ml-3">Profil</span>
                  </a>
                </div>
              </div>
            </div>
          </li>

          <!-- More people... -->
        </ul>

        <div v-else class="no-image">
          <img src="/noimg.jpg" alt="no-image">
          <p>Ne pratite nikoga</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

import UserCard from "@/components/UserCard";

@Component({
  components: {
    UserCard,
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',
})

export default class pratioci extends Vue {

  activeTab = 0;
  tabs = [
    'Pratioci',
    'Koga pratim',
  ]
  followed = [];
  followers = [];

  async created() {
    await this.fetchFollowed();
    await this.fetchFollowers()
  }

  async fetchFollowed() {
    try {
      let response = await this.$axios.get('/profile/followed');
      this.followed = response.data.data;
    } catch(e) {
      console.log(e)
    }
  }

  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else {
      return 'Korisnik'
    }
  }

  async fetchFollowers() {
    try {
      let response = await this.$axios.get('/profile/followers');
      this.followers = response.data.data;

      console.log(this.followers)
    } catch(e) {
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

.account-wrapper {
  @include for-phone-only {
    padding: 0 12px 120px 12px;
    box-sizing: border-box;
    width: 100%;
  }
}
ul.navs {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 36px;
  border-bottom: 1px solid #EBEBEB !important;

  li {
    font-size: 14px !important;
    line-height: 26px !important;
    margin-right: 24px;
    padding-bottom: 8px;
    height: 40px;
    position: relative;
    cursor: pointer;
    text-transform: uppercase;
    font-weight:500;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #0B8489;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #0B8489;
      }
    }
  }
}

.user-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 32px;
  column-gap: 24px;
}

h1 {
  color: rgb(72, 72, 72) !important;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    height: 400px;

    @include for-phone-only {
      height: 250px;
    }
  }

  p {
    font-size: 20px;
    font-weight: 500;
    margin-top: 24px;
  }
}

</style>
