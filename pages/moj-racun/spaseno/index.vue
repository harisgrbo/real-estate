<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Spašeno</p>
      </li>
    </ul>
    <h1 class="heading">
      Spašeno
    </h1>
    <ul>
      <li v-for="(tab, index) in tabs"
          @click="activeTab = index"
          :class="[activeTab === index? 'active' : '']"
      >
        {{ tab }}
      </li>
    </ul>
    <div class="saved-content">
      <div v-show="activeTab === 0">
        <div class="grid-layout">
          <SavedUserCard v-for="user in savedUsers" :user="user" :key="user.id"></SavedUserCard>
        </div>
      </div>
      <div v-show="activeTab === 1">
        pretrage
      </div>
      <div v-show="activeTab === 2">
        nekretnine
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

import SavedUserCard from "@/components/UserCard"

@Component({
  components: {
    SavedUserCard
  },
  layout() { return "home" }
})

export default class spaseno extends Vue {

  tabs = [
    'Korisnici',
    'Pretrage',
    'Oglasi'
  ]
  savedUsers = [];
  activeTab = 0;

  async created() {
    await this.fetchSavedUsers();
  }

  async fetchSavedUsers() {
    try {
      let response = await this.$axios.get('/profile/saved/users');
      this.savedUsers = response.data.data;
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.saved-wrapper {
  ul {
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 36px;

    li {
      display: flex;
      height: 40px;
      line-height: 40px;
      align-items: center;
      justify-content: flex-start;
      font-weight: 500;
      margin-right: 32px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      &.active {
        font-weight: 600 !important;
        color: #012F34 !important;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          border-bottom: 2px solid #54E0C7;

        }
      }
    }
  }
}

.grid-layout {
  padding: 0;
}
</style>
