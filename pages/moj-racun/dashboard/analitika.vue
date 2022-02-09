<template>
  <div class="analitika-wrapper">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 2xl:col-span-12">
          <div class="flex flex-col">
            <!-- BEGIN: General Report -->
            <div class="flex flex-col">
              <div class=" flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Statistika
                </h2>
              </div>
              <div class="grid grid-cols-12 gap-6 mt-5">
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 shadow-md rounded-md">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <div class="text-3xl font-medium leading-8 mt-6" v-if="loaders.listings">{{ listings.length }}</div>
                      <img class="loading" src="/loader.svg" alt="" v-else>
                      <div class="text-base text-gray-600 mt-1">Broj aktivnih oglasa</div>
                    </div>
                  </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 shadow-md rounded-md">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <div class="text-3xl font-medium leading-8 mt-6" v-if="loaders.finished_listings">{{ completed_listings }}</div>
                      <img class="loading" src="/loader.svg" alt="" v-else>
                      <div class="text-base text-gray-600 mt-1">Broj završenih oglasa</div>
                    </div>
                  </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 shadow-md rounded-md">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <div class="text-3xl font-medium leading-8 mt-6" v-if="loaders.agents"> {{ agents.length }}</div>
                      <img class="loading" src="/loader.svg" alt="" v-else>
                      <div class="text-base text-gray-600 mt-1">Broj agenata</div>
                    </div>
                  </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 shadow-md rounded-md">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <div class="text-3xl font-medium leading-8 mt-6" v-if="loaders.listing_views">{{ total_views }}</div>
                      <img class="loading" src="/loader.svg" alt="" v-else>
                      <div class="text-base text-gray-600 mt-1">Ukupna posjećenost svih oglasa</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="graph-wrapper">
              <div class="w-full mt-8">
                <div class="flex items-center h-10">
                  <h2 class="text-lg font-medium truncate mr-5">
                    Broj oglasa po kategorijama
                  </h2>
                </div>
                <PieChart v-if="loaders.listings_per_category" :data="listings_per_category"></PieChart>
                <img class="loading" src="/loader.svg" alt="" v-else>
              </div>
              <div class="w-full mt-8">
                <div class=" flex items-center h-10">
                  <h2 class="text-lg font-medium truncate mr-5">
                    Broj oglasa po gradovima
                  </h2>
                </div>
                <PieChart v-if="loaders.listings_per_location" :data="listings_per_location"></PieChart>
                <img class="loading" src="/loader.svg" alt="" v-else>

              </div>
            </div>
            <div class="flex sm:flex-col up:flex-row lg:flex-row md:flex-row xl:flex-row w-full mt-8 mobile-map-wrapper">
              <div class="w-full">
                <div class=" block sm:flex items-center h-10">
                  <h2 class="text-lg font-medium truncate mr-5">
                    Mapa nekretnina ({{ listings.length + ' oglasa' }})
                  </h2>
                </div>
                <div class="sm:mt-5 box xl:mt-12 lg:mt-12 up:mt-12">
                  <SearchMap :locations="listings"></SearchMap>
                </div>
              </div>
              <!-- END: Official Store -->
              <!-- BEGIN: Weekly Best Sellers -->
              <div class="sm:w-full lg:w-1/3 xl:w-1/3 up:w-1/3 xl:ml-8 lg:ml-8 up:ml-8 sm:ml-0 mt-5">
                <div class=" flex items-center h-10">
                  <h2 class="text-lg font-medium truncate mr-5">
                    Top 5 agenata
                  </h2>
                </div>
                <div class="sm:mt-0 xl:mt-5 lg:mt-5 up:mt-5">
                  <div class="shadow-md rounded-md" v-for="agent in agents" :key="agent.id">
                    <div class="box px-4 py-4 mb-3 flex items-center zoom-in">
                      <div class="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                        <img alt="Icewall Tailwind HTML Admin Template" :src="[ agent.avatar_url !== null ? agent.avatar_url  : '/noimage.jpeg']" class="h-full w-full">
                      </div>
                      <div class="ml-4 mr-auto">
                        <div class="font-medium">{{ agent.name }}</div>
                        <div class="text-gray-600 text-xs mt-0.5">{{ agent.email }}</div>
                      </div>
                      <div class="py-1 px-2 rounded-full text-xs bg-theme-10 text-white cursor-pointer font-medium">137 oglasa</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import SearchMap from "@/components/googleMap/SearchMap";
import PieChart from "../../../components/analytics/PieChart";
import LoadingBar from "../../../components/LoadingBar";


@Component({
  components: {
    LoadingBar,
    PieChart,
    SearchMap
  },
})

export default class Analitika extends Vue {
  listings = [];
  agents = [];
  total_views = 0;
  completed_listings = 0;
  initialInfoLoaded = false;
  listings_per_category = null;
  listings_per_location = null;
  chartData = {
    Books: 24,
    Magazine: 30,
    Newspapers: 10
  }
  loaders = {
    listings: false,
    agents: false,
    listing_views: false,
    finished_listings: false,
    listings_per_category: false,
    listings_per_location: false
  }

  async created() {
    await this.fetchUserListings()
    this.getAllAgents();
    this.fetchTotalListingViews();
    this.fetchTotalFinishedListings();
    this.fetchListingsPerCategory();
    this.fetchListingsPerLocation();
  }

  async getAllAgents() {
    this.loaders.agents = false;
    try {
      let res = await this.$axios.get('/agents');

      this.agents = res.data.data;

    } catch (e) {
      console.log(e)
    } finally {
      this.loaders.agents = true;
    }
  }

  async fetchUserListings() {
    this.loaders.listings = false;
    try {
      let res = await this.$axios.get('/profile/listings');

      this.listings = res.data.data;
    } catch(e)  {
      console.log(e)
    } finally {
      this.loaders.listings = true;
    }
  }

  async fetchTotalListingViews() {
    this.loaders.listing_views = false
    try {
      let res = await this.$axios.get('/analytics/total/views');

      this.total_views = res.data;

    } catch(e)  {
      console.log(e)
    } finally {
      this.loaders.listing_views = true;
    }
  }

  async fetchTotalFinishedListings() {
    this.loaders.finished_listings = false
    try {
      let res = await this.$axios.get('/analytics/completed');

      this.completed_listings = res.data;

    } catch(e)  {
      console.log(e)
    } finally {
      this.loaders.finished_listings = true;
    }
  }

  async fetchListingsPerCategory() {
    this.loaders.listings_per_category = false
    try {
      let res = await this.$axios.get('/analytics/categories');

      this.listings_per_category = res.data.data;
    } catch(e)  {
      console.log(e)
    } finally {
      this.loaders.listings_per_category = true;
    }
  }

  async fetchListingsPerLocation() {
    this.loaders.listings_per_location = false;
    try {
      let res = await this.$axios.get('/analytics/locations');

      this.listings_per_location = res.data.data;
    } catch(e)  {
      console.log(e)
    } finally {
      this.loaders.listings_per_location = true;
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


.analitika-wrapper {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  h2 {
    font-size: 18px;
    font-weight:500;
    margin-bottom: 0;

  }

  .pie-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 36px;
    margin-bottom: 36px;
    box-sizing: border-box;
  }
}

.content {
  @include for-phone-only {
    padding: 0;
  }
}

.report-box:after {
  position: relative;
  z-index: 1;
}

::v-deep #map {
  height: 500px;
}

.graph-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 100%;
  width: 100%;

  > div {

    &:first-child {
      width: 100%;
      margin-right: 12px;

      @include for-phone-only {
        margin-right: 0;
      }
    }

    &:last-child {
      margin-left: 12px;
      width: 100%;


      @include for-phone-only {
        margin-left: 0;
      }
    }
  }

  @include for-phone-only {
    flex-direction: column;
  }
}

.mobile-map-wrapper {
  @include for-phone-only {
    flex-direction: column;
  }
}

.loading {
  height: 40px;
  width: 40px;
}
</style>
