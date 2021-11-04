<template>
  <div class="analitika-wrapper">
    <div class="content px-20">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 2xl:col-span-12">
          <div class="grid grid-cols-12 gap-6">
            <!-- BEGIN: General Report -->
            <div class="col-span-12 mt-8">
              <div class="intro-y flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Statistika
                </h2>
              </div>
              <div class="grid grid-cols-12 gap-6 mt-5">
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <div class="flex">
                        <i data-feather="shopping-cart" class="report-box__icon text-theme-21"></i>
                        <div class="ml-auto">
                          <div class="report-box__indicator bg-theme-10 tooltip cursor-pointer" title="33% Higher than last month"> 33% <i data-feather="chevron-up" class="w-4 h-4 ml-0.5"></i> </div>
                        </div>
                      </div>
                      <div class="text-3xl font-medium leading-8 mt-6">4.710</div>
                      <div class="text-base text-gray-600 mt-1">Broj aktivnih oglasa</div>
                    </div>
                  </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <div class="flex">
                        <i data-feather="credit-card" class="report-box__icon text-theme-22"></i>
                        <div class="ml-auto">
                          <div class="report-box__indicator bg-theme-24 tooltip cursor-pointer" title="2% Lower than last month"> 2% <i data-feather="chevron-down" class="w-4 h-4 ml-0.5"></i> </div>
                        </div>
                      </div>
                      <div class="text-3xl font-medium leading-8 mt-6">3.721</div>
                      <div class="text-base text-gray-600 mt-1">Broj završenih oglasa</div>
                    </div>
                  </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <div class="flex">
                        <i data-feather="monitor" class="report-box__icon text-theme-23"></i>
                        <div class="ml-auto">
                          <div class="report-box__indicator bg-theme-10 tooltip cursor-pointer" title="12% Higher than last month"> 12% <i data-feather="chevron-up" class="w-4 h-4 ml-0.5"></i> </div>
                        </div>
                      </div>
                      <div class="text-3xl font-medium leading-8 mt-6">2.149</div>
                      <div class="text-base text-gray-600 mt-1">Broj agenata</div>
                    </div>
                  </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <div class="flex">
                        <i data-feather="user" class="report-box__icon text-theme-10"></i>
                        <div class="ml-auto">
                          <div class="report-box__indicator bg-theme-10 tooltip cursor-pointer" title="22% Higher than last month"> 22% <i data-feather="chevron-up" class="w-4 h-4 ml-0.5"></i> </div>
                        </div>
                      </div>
                      <div class="text-3xl font-medium leading-8 mt-6">152.040</div>
                      <div class="text-base text-gray-600 mt-1">Ukupna posjećenost svih oglasa</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END: General Report -->
            <!-- BEGIN: Sales Report -->
            <div class="col-span-12 lg:col-span-6 mt-8">
              <div class="intro-y block sm:flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Mjesečni/godišnji izvještaj rasta prodaje
                </h2>
              </div>
              <div class="intro-y box p-5 mt-12 sm:mt-5">
                <div class="flex flex-col xl:flex-row xl:items-center">
                  <div class="flex">
                    <div>
                      <div class="text-theme-26 dark:text-gray-300 text-lg xl:text-xl font-medium">$15,000</div>
                      <div class="mt-0.5 text-gray-600 dark:text-gray-600">Ovaj mjesec</div>
                    </div>
                    <div class="w-px h-12 border border-r border-dashed border-gray-300 dark:border-dark-5 mx-4 xl:mx-5"></div>
                    <div>
                      <div class="text-gray-600 dark:text-gray-600 text-lg xl:text-xl font-medium">$10,000</div>
                      <div class="mt-0.5 text-gray-600 dark:text-gray-600">Prošli mjesec Month</div>
                    </div>
                  </div>
                </div>
                <div class="report-chart">
                  <canvas id="report-line-chart" height="169" class="mt-6"></canvas>
                </div>
              </div>
            </div>
            <!-- END: Sales Report -->
            <!-- BEGIN: Weekly Top Seller -->
            <div class="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
              <div class="intro-y flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Broj oglasa po kategorijama
                </h2>
              </div>
              <div class="intro-y box p-5 mt-5">
                <canvas class="mt-3" id="report-pie-chart" height="300"></canvas>
                <div class="mt-8">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-theme-17 rounded-full mr-3"></div>
                    <span class="truncate">Stanovi</span>
                    <div class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span class="font-medium xl:ml-auto">62%</span>
                  </div>
                  <div class="flex items-center mt-4">
                    <div class="w-2 h-2 bg-theme-35 rounded-full mr-3"></div>
                    <span class="truncate">Kuće</span>
                    <div class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span class="font-medium xl:ml-auto">33%</span>
                  </div>
                  <div class="flex items-center mt-4">
                    <div class="w-2 h-2 bg-theme-23 rounded-full mr-3"></div>
                    <span class="truncate">Poslovni prostori</span>
                    <div class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span class="font-medium xl:ml-auto">10%</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Weekly Top Seller -->
            <!-- BEGIN: Sales Report -->
            <div class="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
              <div class="intro-y flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Broj oglasa po lokacijama
                </h2>
              </div>
              <div class="intro-y box p-5 mt-5">
                <canvas class="mt-3" id="report-donut-chart" height="300"></canvas>
                <div class="mt-8">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-theme-17 rounded-full mr-3"></div>
                    <span class="truncate">Sarajevo</span>
                    <div class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span class="font-medium xl:ml-auto">62%</span>
                  </div>
                  <div class="flex items-center mt-4">
                    <div class="w-2 h-2 bg-theme-35 rounded-full mr-3"></div>
                    <span class="truncate">Mostar</span>
                    <div class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span class="font-medium xl:ml-auto">33%</span>
                  </div>
                  <div class="flex items-center mt-4">
                    <div class="w-2 h-2 bg-theme-23 rounded-full mr-3"></div>
                    <span class="truncate">Zenica</span>
                    <div class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"></div>
                    <span class="font-medium xl:ml-auto">10%</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Sales Report -->
            <!-- BEGIN: Official Store -->
            <div class="col-span-12 xl:col-span-8 mt-6">
              <div class="intro-y block sm:flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Mapa nekretnina
                </h2>
              </div>
              <div class="intro-y box p-5 mt-12 sm:mt-5">
                <div>50 nekretnina</div>
                <div class="report-maps mt-5 bg-gray-200 rounded-md" data-center="-6.2425342, 106.8626478" data-sources="/dist/json/location.json"></div>
              </div>
            </div>
            <!-- END: Official Store -->
            <!-- BEGIN: Weekly Best Sellers -->
            <div class="col-span-12 xl:col-span-4 mt-6">
              <div class="intro-y flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Top 5 agenata
                </h2>
              </div>
              <div class="mt-5">
                <div class="intro-y">
                  <div class="box px-4 py-4 mb-3 flex items-center zoom-in">
                    <div class="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                      <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-7.jpg">
                    </div>
                    <div class="ml-4 mr-auto">
                      <div class="font-medium">Angelina Jolie</div>
                      <div class="text-gray-600 text-xs mt-0.5">25 March 2022</div>
                    </div>
                    <div class="py-1 px-2 rounded-full text-xs bg-theme-10 text-white cursor-pointer font-medium">137 Sales</div>
                  </div>
                </div>
                <div class="intro-y">
                  <div class="box px-4 py-4 mb-3 flex items-center zoom-in">
                    <div class="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                      <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-11.jpg">
                    </div>
                    <div class="ml-4 mr-auto">
                      <div class="font-medium">John Travolta</div>
                      <div class="text-gray-600 text-xs mt-0.5">15 February 2021</div>
                    </div>
                    <div class="py-1 px-2 rounded-full text-xs bg-theme-10 text-white cursor-pointer font-medium">137 Sales</div>
                  </div>
                </div>
                <div class="intro-y">
                  <div class="box px-4 py-4 mb-3 flex items-center zoom-in">
                    <div class="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                      <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-11.jpg">
                    </div>
                    <div class="ml-4 mr-auto">
                      <div class="font-medium">Angelina Jolie</div>
                      <div class="text-gray-600 text-xs mt-0.5">31 August 2022</div>
                    </div>
                    <div class="py-1 px-2 rounded-full text-xs bg-theme-10 text-white cursor-pointer font-medium">137 Sales</div>
                  </div>
                </div>
                <div class="intro-y">
                  <div class="box px-4 py-4 mb-3 flex items-center zoom-in">
                    <div class="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                      <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-2.jpg">
                    </div>
                    <div class="ml-4 mr-auto">
                      <div class="font-medium">Tom Cruise</div>
                      <div class="text-gray-600 text-xs mt-0.5">13 December 2021</div>
                    </div>
                    <div class="py-1 px-2 rounded-full text-xs bg-theme-10 text-white cursor-pointer font-medium">137 Sales</div>
                  </div>
                </div>
                <div class="intro-y">
                  <div class="box px-4 py-4 mb-3 flex items-center zoom-in">
                    <div class="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                      <img alt="Icewall Tailwind HTML Admin Template" src="dist/images/profile-2.jpg">
                    </div>
                    <div class="ml-4 mr-auto">
                      <div class="font-medium">Tom Cruise</div>
                      <div class="text-gray-600 text-xs mt-0.5">13 December 2021</div>
                    </div>
                    <div class="py-1 px-2 rounded-full text-xs bg-theme-10 text-white cursor-pointer font-medium">137 Sales</div>
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
import PieChart from "@/components/analytics/PieChart";
import StandardChart from "@/components/analytics/StandardChart";

@Component({
  components: {
  },
})

export default class Analitika extends Vue {
}
</script>

<style scoped lang="scss">
.analitika-wrapper {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  h2 {
    font-size: 20px;
    font-weight:500;
    margin-bottom: 24px;

  }

  .pie-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 36px;
    margin-bottom: 36px;
    box-sizing: border-box;
  }
}
</style>
