<template>
  <div class="preview-wrapper-inner mx-auto w-full">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <p>Spašeno</p>
      </li>
    </ul>
    <div class="content-wrapper">
      <ul class="cw-ul">
        <li v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = index"
            :class="[activeTab === index? 'active' : '']"
        >
          {{ tab }}
        </li>
      </ul>
      <div class="saved-content">
        <div v-show="activeTab === 0">
          <div class="flex flex-col" v-if="searches.length">
            <div class="overflow-x-auto">
              <div class="py-2 align-middle inline-block min-w-full">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Naziv pretrage
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Filteri
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Datum
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Edit</span>
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="search in searches" :key="search.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ search.description }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Regional Paradigm Technician
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Novogradnja
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ $moment(search.created_at).format('DD.MM.YYYY u HH:MM') }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" @click="goToSearch(search)">
                        <a href="#" class="text-indigo-600 hover:text-indigo-900">Idi na pretragu</a>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" @click="deleteSingleSearch(search.id)">
                        <a href="#" class="text-indigo-600 hover:text-indigo-900">Izbrisi</a>
                      </td>
                    </tr>

                    <!-- More people... -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <NotFound v-else src="/saved.svg" text="Nemate spašenih pretraga"></NotFound>

        </div>
        <div v-show="activeTab === 1">
          <div class="grid-layout" v-if="savedListings.length">
            <ListingCard v-for="listing in savedListings" :listing="listing" :key="listing.id" :from="true" @remove-listing-from-saved="handleRemoveListing"></ListingCard>
          </div>
          <NotFound v-else src="/saved.svg" text="Nemate spašenih oglasa"></NotFound>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ListingCard from "@/components/listingCard/ListingCard";
import SavedUserCard from "@/components/UserCard"
import NotFound from "../../../components/global/NotFound";

@Component({
  components: {
    NotFound,
    SavedUserCard,
    ListingCard,
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
})

export default class spaseno extends Vue {

  tabs = [
    'Pretrage',
    'Oglasi'
  ]
  searchesLoaded = false;
  savedUsers = [];
  savedListings = [];
  savedSearches = [];
  activeTab = 0;
  searches = [];

  async created() {
    // await this.fetchSavedUsers();
    await this.fetchSavedListings();
    await this.getSearches();
  }

  async getSearches() {
    this.searchesLoaded = false;
    try {
      let res = await this.$axios.get('/profile/saved/searches');
      this.searches = res.data.data;
      this.searchesLoaded = true;
    } catch(e) {
      console.log(e)
    }
  }

  async fetchSavedUsers() {
    try {
      let response = await this.$axios.get('/profile/saved/users');
      this.savedUsers = response.data.data;
    } catch(e) {
      console.log(e)
    }
  }

  goToSearch(s) {
    this.$router.push('/pretraga' + s.query);
  }

  async deleteSingleSearch(id) {
    try {
      await this.$axios.delete('/profile/saved/searches/' + id);

      let index = this.searches.findIndex(item => item.id === id)

      this.searches.splice(index, 1)

      this.$toast.open({
        message: "Uspješno ste izbrisali pretragu iz spašenih",
        type: 'success',
        duration: 5000
      });
    } catch(e) {
      console.log(e)
    }
  }

  async handleRemoveListing(e) {
    try {
      await this.$axios.delete('/listings/' + e + '/save');

      let index = this.savedListings.findIndex(item => item.id === e)

      this.savedListings.splice(index, 1)

      this.$toast.open({
        message: "Uspješno ste izbrisali oglas iz spašenih",
        type: 'success',
        duration: 5000
      });
    } catch(e) {
      console.log(e)
    }
  }

  async fetchSavedListings() {
    try {
      let response = await this.$axios.get('/listings/saved');
      this.savedListings = response.data.data;
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

.preview-wrapper-inner {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 6px;
  padding: 24px;

  @include for-phone-only {
    padding: 24px !important;
    height: 100% !important;
  }
}

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
        color: #1F2937 !important;
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

  @include for-phone-only {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 12px !important;
    grid-row-gap: 12px !important;
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 0px 24px 0px;
  box-sizing: border-box;

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
  .cw-ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 36px;
    border-bottom: 1px solid #f1f1f1 !important;
    margin-top: 24px;

    li {
      font-size: 14px !important;
      line-height: 26px !important;
      margin-right: 24px;
      padding-bottom: 8px;
      height: 40px;
      position: relative;
      cursor: pointer;
      font-weight:500;
      color: #727272;

      &:last-child {
        margin-right: 0;
      }

      &.active {
        font-weight: 500;
        color: #000;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          border-bottom: 1px solid #000;
        }
      }
    }
  }
}

::v-deep .image-wrapper img {
  width: 100%;

  @include for-phone-only {
    height: 254px;
    min-height: 254px;
  }
}

.searches-wrap {
  display: flex;
  flex-direction: column;

  .top-list {
    display: flex;
    align-self: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom : 24px;

    li {
      display: flex;
      flex: 2;
      font-weight: 500;
      padding: 8px 24px;
      box-sizing: border-box;
      border-right: 1px solid #f1f1f1;

      &:last-child {
        flex: 1;
        border-right: none;
      }
    }
  }

  .searches {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: space-between;
    width: 100%;

    li {
      display: flex;
      font-weight: 500;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border: 1px solid #e6dada;
      box-sizing: border-box;
      position: relative;
      border-radius: 6px;
      height: 100px;
      padding: 12px 0;
      min-height: 100px;
      margin-bottom: 24px;

      @include for-phone-only {
        flex-direction: column;
        height: fit-content;
        min-height: fit-content;
        margin-bottom: 12px;
        max-height: fit-content;
      }

      //&::before {
      //  position: absolute;
      //  left: 0;
      //  width: 20px;
      //  height: 100%;
      //  background: #f1f1f1;
      //  border-top-left-radius: 10px;
      //  border-bottom-left-radius: 10px;
      //  content: "";
      //}
      //
      //&::after {
      //  position: absolute;
      //  right: 0;
      //  width: 20px;
      //  height: 100%;
      //  background: #f1f1f1;
      //  border-top-right-radius: 10px;
      //  border-bottom-right-radius: 10px;
      //  content: "";
      //}

      &:last-child {
        margin-bottom: 0;
        flex: 1;
      }

      > div {
        display: flex;
        flex: 2;
        border-right: 1px solid #f1f1f1;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;

        @include for-phone-only {
          width: 100%;
          padding: 12px !important;
          height: fit-content;
          max-height: fit-content;
        }

        &:last-child {
          border-right: none;
        }

        &.description {
          padding: 0 24px;
          box-sizing: border-box;

          span {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            @include for-phone-only {
              padding-top: 12px;
            }

            .save {
              display: flex;
              font-family: 'NunitoSans', sans-serif;;
              align-items: center;
              font-size: 16px;
              padding: 6px 12px;
              border-radius: 5px;
              background: none;
              border: none;
              cursor: pointer;
              justify-content: center;
              width: fit-content;
              svg {
                color: #0B8489;
                height: 16px;
                margin-right: 8px;
              }

              &:hover {
                background: rgb(247, 247, 247) !important;
                text-decoration: underline;
              }

              &.delete {

                svg {
                   color: red;
                }
              }
            }

          }
        }

        &.time {
          padding: 0 24px;
          box-sizing: border-box;

          @include for-phone-only {
            font-size: 14px !important;
          }
        }

        &.filters {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-row-gap: 12px;
          grid-column-gap: 12px;
          padding: 0 24px;
          box-sizing: border-box;

          @include for-phone-only {
            grid-template-columns: repeat(2, 1fr);
            max-height: fit-content;

          }

          button {
            font-family: 'NunitoSans', sans-serif;;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            background: #f1f1f1;
            font-weight: 500;
            border: none;

            @include for-phone-only {
              height: 30px;
            }

            &:focus {
              outline: none;
            }
          }
        }

        &:last-child {
          flex: 1;
        }
      }
    }
  }
}

h1 {
  color: rgb(72, 72, 72) !important;
}

.mobile-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  button {
    height: 40px;
    width: 100%;
    border: none;
    border-radius: 6px;
    box-sizing: border-box;

    &:first-child {
      margin-right: 6px;
      background: #0B8489;
      color: #fff;
    }
    &:last-child {
      margin-left: 6px;
      color: #fff;
      background: #D63946;
    }
  }
}

::v-deep .mobile-user {
  @include for-phone-only {
    min-width: 100%;
  }
}
</style>
