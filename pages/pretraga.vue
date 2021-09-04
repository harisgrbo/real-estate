<template>
  <div class="search-wrapper w-full">
    <div class="inner">
      <div class="content">
        <div class="search-heading">
          <div class="border-b border-gray-200">
            <div class="rounded-md bg-blue-50 p-4 mb-6" v-if="meta.price">
              <div class="flex">
                <div class="flex-shrink-0">
                  <!-- Heroicon name: solid/information-circle -->
                  <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3 flex-1 md:flex md:justify-between">
                  <p class="text-sm text-blue-700">
                    Prosječna cijena nekretnine za izabranu kategoriju je {{ parseInt(meta.price).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="filter-buttons">
            <button v-if="$device.isMobile" @click="$modal.show('map-modal')">Mapa</button>
            <button>Sortiraj</button>
            <button>Vrsta oglasa</button>
            <button>Stanje oglasa</button>
<!--            <button @click="toggleFiltersModal">Filteri</button>-->
            <CategoryFilter
              class="bb-filters"
              v-model="queryPayload.category_id"
              :categories="meta.categories"
              :aggregations="meta.aggregations"
              :filter="{}"
              @input="newSearch"
            />
            <button @click="$modal.show('search-filters')">Filteri</button>
          </div>
          <div class="mb-3">
            <div class="hidden sm:block">
              <div class="flex items-center border-b border-gray-200">
                <nav class="flex-1 -mb-px flex space-x-6 xl:space-x-8" aria-label="Tabs">
                  <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
                  <p class="font-medium text-md">{{ results.length }} rezultata</p>
                </nav>
                <div class="flex flex-row items-center">
                  <button
                    class='bg-white relative w-full px-2 mr-4 py-2 text-left cursor-default flex hover:bg-gray-50 cursor-pointer'
                    @click="openSearchSaveModal"
                  >
                    Spasi pretragu
                    <svg class="ml-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path></svg>
                  </button>
                  <div class="mt-1 relative">
                    <button type="button" class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                    <span class="block truncate">
                      Tom Cook
                    </span>
                      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <!-- Heroicon name: solid/selector -->
                      <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </span>
                    </button>
                    <ul class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">

                      <li class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9" id="listbox-option-0" role="option">
                        <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                        <span class="font-normal block truncate">
                        Wade Cooper
                      </span>

                        <!--
                          Checkmark, only display for selected option.

                          Highlighted: "text-white", Not Highlighted: "text-indigo-600"
                        -->
                        <span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                        <!-- Heroicon name: solid/check -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </span>
                      </li>

                      <!-- More items... -->
                    </ul>
                  </div>
                  <div class="hidden ml-6 bg-gray-100 p-0.5 rounded-lg items-center sm:flex">
                    <button type="button" class="p-1.5 rounded-md text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <!-- Heroicon name: solid/view-list -->
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                      </svg>
                      <span class="sr-only">Use list view</span>
                    </button>
                    <button type="button" class="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <!-- Heroicon name: solid/view-grid -->
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span class="sr-only">Use grid view</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="results">
          <ul class="divide-y divide-gray-200">
            <li v-for="listing in results" class="relative bg-white">
              <HorizontalCard :listing="listing" :key="getResultKey(listing)" :avg-price="meta.price"/>
            </li>
          </ul>
          <client-only>
            <Pagination
              ref="pagination"
              v-show="meta.total > 20"
              :current-page="page"
              :total-pages="last_page"
              @page-change="pageChangeHandler" />
          </client-only>
        </div>
      </div>
      <div :class="['map', mapExpanded ? 'expand' : '']" v-if="!$device.isMobile">
        <div class="filter-buttons map" v-if="mapExpanded">
          <button v-if="$device.isMobile" @click="$modal.show('map-modal')">Mapa</button>
          <button>Sortiraj</button>
          <button>Vrsta oglasa</button>
          <button>Stanje oglasa</button>
          <button @click="toggleFiltersModal">Filteri</button>
          <button class="save" @click="openSearchSaveModal">
            <font-awesome-icon icon="heart"></font-awesome-icon>
            Spasi pretragu
          </button>
        </div>
        <button @click="mapExpanded = !mapExpanded" class="map-expand">{{ mapExpanded ? 'Smanji mapu' : 'Prosiri mapu' }}</button>
        <SearchMap :locations="results"/>
      </div>
    </div>
    <client-only>
      <modal name="save-search" :adaptive="true" height="100%">
        <div class="modal-inner">
          <div class="modal-header">
            <h2>Unesite naziv pretrage</h2>
            <i class="material-icons" @click="$modal.hide('save-search')">close</i>
          </div>
          <div class="modal-content save-search-modal">
            <input type="text" v-model="searchName" class="mt-6">
            <ActionButton placeholder="Snimi pretragu" @action="saveSearch"></ActionButton>
          </div>
        </div>
      </modal>
      <modal name="filters" :adaptive="true" height="100%" :width="$device.isMobile ? '100%' : '40%'">
        <div class="modal-inner">
          <div class="modal-header">
            <h2>Filteri</h2>
            <i class="material-icons" @click="$modal.hide('filters')">close</i>
          </div>
          <div class="modal-content">
            <RangeFilter
              v-model="queryPayload.price"
              :attr="false"
              :filter="{name: 'price', display_name: 'Cijena'}"
              @input="newSearch"
              :avg-price="meta.price"
            />

            <component
              v-for="(attr, i) in allAttributes"
              :key="i"
              :filter="attr"
              :attr="true"
              :is="filterFor(attr.type)"
              v-model="queryPayload[attr.name]"
              @clear="queryPayload[attr.name] = null; newSearch()"
              @input="newSearch"
            />

          </div>
        </div>
      </modal>
      <Snackbar></Snackbar>
      <client-only>
        <modal name="map-modal" :adaptive="true" height="100%">
          <div class="modal-inner">
            <div class="modal-header">
              <h2>Mapa</h2>
              <i class="material-icons" @click="$modal.hide('map-modal')">close</i>
            </div>
            <div class="modal-content mapa">
              <SearchMap :locations="results"/>
            </div>
          </div>
        </modal>
      </client-only>
      <client-only>
        <modal name="search-filters" :adaptive="true" height="100%">
          <div class="modal-inner">
            <div class="modal-header">
              <h2>Filteri</h2>
              <i class="material-icons" @click="$modal.hide('search-filters')">close</i>
            </div>
            <div class="modal-content">
              <div class="filters bg-gray-100 rounded-md p-4">

                <RangeFilter
                  class="bb-filters"
                  v-model="queryPayload.price"
                  :attr="false"
                  :filter="{name: 'price', display_name: 'Cijena'}"
                  @input="newSearch"
                />

                <component
                  class="bb-filters"
                  v-for="(attr, i) in allAttributes"
                  :key="i"
                  :filter="attr"
                  :attr="true"
                  :is="filterFor(attr.type)"
                  v-model="queryPayload[attr.name]"
                  @clear="queryPayload[attr.name] = null; newSearch()"
                  @input="newSearch"
                />

              </div>
            </div>
          </div>
        </modal>
      </client-only>
    </client-only>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import HorizontalCard from "@/components/listingCard/HorizontalCard";
import TextField from "@/components/inputs/TextField";
import RangeFilter from "@/components/search/RangeFilter";
import CategoryFilter from "@/components/search/CategoryFilter";
import TermFilter from "@/components/search/TermFilter";
import TermsFilter from "@/components/search/TermsFilter";
import { buildQuery } from "@/util/search";
import { capitalize } from "@/util/str";
import SearchMap from "@/components/googleMap/SearchMap";
import Snackbar from "@/components/global/Snackbar";
import Pagination from "@/components/pagination";

@Component({
  components: {
    SearchMap,
    TextField,
    HorizontalCard,
    RangeFilter,
    CategoryFilter,
    Pagination,
    TermFilter,
    TermsFilter,
    Snackbar
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'search',

  watchQuery: true,

  async asyncData(ctx) {
    let page = 1;
    let results = [];
    let meta = {
      categories: [],
      aggregations: []
    };
    let allAttributes = [];
    let queryPayload = {};

    if (ctx.route.query.q) {
      let query = decodeURIComponent(ctx.route.query.q)
      page = ctx.route.query.page || '1';
      page = parseInt(page)

      try {
        let response = await ctx.app.$axios.get(`/listings/search?q=${ctx.route.query.q}&page=${page}`)
        results = response.data.data;
        meta = response.data.meta;
        query = JSON.parse(query)

        query.forEach(item => {
          queryPayload[item.name] = Object.assign({}, item);
        });

        try {
          let res = await ctx.app.$axios.get('/attributes');

          allAttributes = res.data.data.map(item => {
            item.type = item.attr_type;

            return item;
          }).concat(meta.attributes)
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e)
        // @TODO: Error handling
      }
    }

    let lp = meta.total / meta.perPage;

    if(! Number.isInteger(lp)) {
      lp += 1;
    }

    let last_page = parseInt(lp);

    return {
      allAttributes,
      results,
      meta,
      queryPayload,
      page,
      last_page
    }
  },
})
export default class Homepage extends Vue {
  searchName = '';
  last_page = 0;
  mapExpanded = false;

  toggleFiltersModal() {
    this.$modal.show('filters');
  }

  openSearchSaveModal() {
    this.$modal.show('save-search');
  }

  pageChangeHandler(selectedPage) {
    this.$router.push({ query: Object.assign({}, this.$route.query, { page: selectedPage }) });
  }

  getResultKey(listing) {
    return `${listing.id}-${this.$route.query.q}`
  }

  newSearch() {
    let q = buildQuery(this.queryPayload)

    this.$router.push(`/pretraga?q=${q}`)
  }

  handleBack() {
    this.$router.go(-1);
  }

  filterFor(attr) {
    return `${capitalize(attr)}Filter`;
  }

  async saveSearch() {
    try {
      let res = await this.$axios.post('/profile/saved/searches', {
        query: JSON.stringify(this.$route.query),
        description: this.searchName
      });

      this.$snackbar.show({
        text: "Uspješno ste snimili pretragu",
        timeout: 1000,
        type: "success"
      });

      this.searchName = '';

      this.$modal.hide('save-search')

      this.$snackbar.show({
        text: "Uspjesno ste spasili pretragu",
        timeout: 1000,
        type: "success"
      });

      console.log(res)
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
.search-wrapper {
  display: flex;
  margin-top: 0px;
  flex-direction: column;

  .inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
  }

  @include for-phone-only {
    height: 100%;
  }
  .content {
    width: 50%;
    min-width: 50%;
    box-sizing: border-box;
    position: relative;
    padding: 24px;
    height: calc(100vh - 60px);
    overflow-y: scroll;

    @include for-phone-only {
      max-height: 100%;
      width: 100%;
      padding: 12px;
    }

    .search-heading {
      background: #fff;

      @include for-phone-only {
        z-index: 2;

        h2 {
          font-size: 15px !important;
          margin-bottom: 12px !important;
        }
      }
    }

    h2 {
      font-size: 22px !important;
      font-weight: 500 !important;
      line-height: 1.125em !important;
      color: #484848 !important;

      @include for-phone-only {
        font-size: 17px !important;
      }
    }


    .results {
      display: flex;
      flex-direction: column;
    }

    h2 {
      font-size: 18px;
      margin-bottom: 24px;
    }
  }

  .map {
    width: 50%;
    min-width: 50%;
    left: inherit;
    position: relative;

    &.expand {
      width: 100vw;
      min-width: 100vw;
      position: absolute;
      z-index: 10;

    }

    button.map-expand {
      position: absolute;
      z-index: 11;
      top: 16px;
      left: 16px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 24px;
      font-size: 15px;
      font-weight: 500;
      margin-right: 12px;
      border: 1px solid #c1c1c1;
      background: transparent;
      cursor: pointer;
      transition: 0.3s all ease;
      font-family: 'Raleway', sans-serif;
      background: #fff;
    }
  }
}

.modal-inner {
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  position: relative;

  @include for-phone-only {
    padding: 0;
  }

  .modal-header {
    display: flex;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #dcdcdc;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: #fff;

    @include for-phone-only {
      padding: 0 16px;
      box-sizing: border-box;
    }

    h2 {
      font-size: 20px;
      font-weight: 400;
      margin-bottom: 0;
    }

    i {
      cursor: pointer;
    }
  }
  .modal-content {
    padding: 24px 0;

    @include for-phone-only {
      padding: 12px;
    }

    &.mapa {
      @include for-phone-only {
        padding: 0px;
      }
    }
    textarea {
      height: 200px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: 'Raleway', sans-serif;
      font-size: 16px;
      line-height: 21px;
      box-sizing: border-box;
      padding: 24px;

      &:focus {
        outline: none;

      }
    }
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
  justify-content: center;
  width: fit-content;
  align-self: flex-end;

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

.save-search-modal {
  padding-top: 0!important;
  h4 {
    margin: 24px 0;
    font-size: 16px;
    font-weight: 500;
  }
  input {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 24px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ddd;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}

::v-deep .gm-style.gm-style-iw-c {
  padding-right: 0px;
  padding-bottom: 0px;
  max-width: 270px !important;
  max-height: 356px;
  min-width: 0px;
  padding: 0 !important;
}

.grid-search {
  display: flex;
  flex-direction: column;
}

.filter-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #f1f1f1;
  background: transparent;

  @include for-phone-only {
    max-width: 100%;
    overflow-x: scroll;
    margin-bottom: 12px;
    padding-bottom: 12px;
  }

  button {
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    font-size: 15px;
    font-weight: 500;
    margin-right: 12px;
    border: 1px solid #c1c1c1;
    background: transparent;
    cursor: pointer;
    transition: 0.3s all ease;
    font-family: 'Raleway', sans-serif;

    @include for-phone-only {
      min-width: fit-content;
      padding: 0 12px;
      border-radius: 10px;
      height: 32px;
    }

    &:hover {
      border: 1px solid #444;
    }
  }

  &.map {
    position: absolute;
    top: 16px;
    right: 0;
    left: inherit;
    z-index: 30;

    button {
      background: rgba(255, 255, 255, 0.8);
    }
  }
}

::v-deep .gmnoprint, .gm-control-active.gm-fullscreen-control {
  display: none !important;
}

</style>
