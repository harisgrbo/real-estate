<template>
  <div class="analitika-wrapper">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 2xl:col-span-12">
          <div class="grid grid-cols-12 gap-6">
            <!-- BEGIN: General Report -->
            <div class="col-span-12">
              <div class=" flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Statistika
                </h2>
              </div>
              <div class="grid grid-cols-12 gap-6 mt-5">
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 shadow-md rounded-md">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <div class="text-3xl font-medium leading-8 mt-6">{{ listings.length }}</div>
                      <div class="text-base text-gray-600 mt-1">Broj aktivnih oglasa</div>
                    </div>
                  </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 shadow-md rounded-md">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <div class="text-3xl font-medium leading-8 mt-6">{{ completed_listings }}</div>
                      <div class="text-base text-gray-600 mt-1">Broj završenih oglasa</div>
                    </div>
                  </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 shadow-md rounded-md">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <div class="text-3xl font-medium leading-8 mt-6"> {{ agents.length }}</div>
                      <div class="text-base text-gray-600 mt-1">Broj agenata</div>
                    </div>
                  </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 shadow-md rounded-md">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <div class="text-3xl font-medium leading-8 mt-6">{{ total_views }}</div>
                      <div class="text-base text-gray-600 mt-1">Ukupna posjećenost svih oglasa</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END: General Report -->
            <!-- BEGIN: Sales Report -->
<!--            <div class="col-span-12 lg:col-span-6 mt-8">-->
<!--              <div class="block sm:flex items-center h-10">-->
<!--                <h2 class="text-lg font-medium truncate mr-5">-->
<!--                  Mjesečni/godišnji izvještaj rasta prodaje-->
<!--                </h2>-->
<!--              </div>-->
<!--              <AreaChart></AreaChart>-->
<!--            </div>-->
            <!-- END: Sales Report -->
            <!-- BEGIN: Weekly Top Seller -->
            <div class="up:col-span-6 lg:col-span-6 xl:col-span-6 sm:col-span-12 mt-8">
              <div class="flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Broj oglasa po kategorijama
                </h2>
              </div>
              <PieChart></PieChart>

            </div>
            <!-- END: Weekly Top Seller -->
            <!-- BEGIN: Sales Report -->
            <div class="up:col-span-6 lg:col-span-6 xl:col-span-6 sm:col-span-12 mt-8">
              <div class=" flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Broj oglasa po lokacijama
                </h2>
              </div>
              <PieChart></PieChart>

            </div>
            <!-- END: Sales Report -->
            <!-- BEGIN: Official Store -->
            <div class="col-span-12 xl:col-span-8 mt-6">
              <div class=" block sm:flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Mapa nekretnina ({{ listings.length + ' oglasa' }})
                </h2>
              </div>
              <div class=" box mt-12 sm:mt-5">
                <SearchMap :locations="listings" :current="currentResultIndex"></SearchMap>
              </div>
            </div>
            <!-- END: Official Store -->
            <!-- BEGIN: Weekly Best Sellers -->
            <div class="col-span-12 xl:col-span-4 mt-6">
              <div class=" flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Top 5 agenata
                </h2>
              </div>
              <div class="mt-5">
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
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import SearchMap from "@/components/googleMap/SearchMap";
import PieChart from "../../../components/analytics/PieChart";


@Component({
  components: {
    PieChart,
    SearchMap
  },
})

export default class Analitika extends Vue {
  listings = [];
  agents = [];
  total_views = 0;
  completed_listings = 0;
  chartData = {
    Books: 24,
    Magazine: 30,
    Newspapers: 10
  }

  async getAllAgents() {
    try {
      let res = await this.$axios.get('/agents');

      this.agents = res.data.data;

    } catch (e) {
      console.log(e)
    }
  }
  async created() {
    await this.fetchUserListings()
    await this.getAllAgents();
    await this.fetchTotalListingViews();
    await this.fetchTotalFinishedListings();
  }

  async fetchUserListings() {
    try {
      let res = await this.$axios.get('/profile/listings');

      this.listings = res.data.data;
    } catch(e)  {
      console.log(e)
    }
  }

  async fetchTotalListingViews() {
    try {
      let res = await this.$axios.get('/analytics/total/views');

      this.total_views = res.data;

    } catch(e)  {
      console.log(e)
    }
  }

  async fetchTotalFinishedListings() {
    try {
      let res = await this.$axios.get('/analytics/completed');

      this.completed_listings = res.data;

    } catch(e)  {
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
</style>
