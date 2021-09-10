<template>
  <div class="search-wrapper w-full">
    <div class="inner">
      <div class="content px-20 pt-6">
        <div class="search-heading">
          <div class="border-b border-gray-200">
<!--            <div class="rounded-md bg-blue-50 p-4 mb-6" v-if="meta.price">-->
<!--              <div class="flex">-->
<!--                <div class="flex-shrink-0">-->
<!--                  &lt;!&ndash; Heroicon name: solid/information-circle &ndash;&gt;-->
<!--                  <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
<!--                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />-->
<!--                  </svg>-->
<!--                </div>-->
<!--                <div class="ml-3 flex-1 md:flex md:justify-between">-->
<!--                  <p class="text-sm text-blue-700">-->
<!--                    Prosječna cijena nekretnine za izabranu kategoriju je {{ parseInt(meta.price).toLocaleString() }}-->
<!--                  </p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
          </div>
          <div class="mb-3">
            <div class="w-full">
              <div class="flex flex-col w-full items-center border-b border-gray-200">
                <ul class="category-list w-full">
                  <li :class="['group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900', cat.id === selectedCategoryId ? 'selected-cat': '']" v-for="cat in categories" @click="handleSelectedCategory(cat)">{{ cat.title }}</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Filters -->
          <section aria-labelledby="filter-heading">
            <h2 id="filter-heading" class="sr-only">Filters</h2>

            <div class="relative z-10 bg-white border-b border-gray-200 pb-6 pt-2">
              <div class="mx-auto flex items-center justify-between px-4">
                <div class="flex items-center">
                  <div class="relative inline-block text-left mr-4 filteri">
                    <div @click="showSortDropdown = !showSortDropdown">
                      <button type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                        {{ selectedSort !== "" ? selectedSort : 'Sortiraj' }}
                        <!-- Heroicon name: solid/chevron-down -->
                        <svg :class="['flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500', showSortDropdown ? 'transform rotate-180' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div v-if="showSortDropdown" class="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                      <div class="py-1" role="none">
                        <a v-for="(item, index) in sort_types" href="#" :class="['text-gray-500 block px-4 py-2 text-sm hover:bg-gray-100', selectedSort === index ? 'font-medium text-gray-900' : '']" role="menuitem" tabindex="-1" id="menu-item-0" @click="selectSort(item)">
                          {{ item.name }}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="px-4 relative inline-block text-left mr-4">
                    <button @click="showTypeDropdown = !showTypeDropdown" type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" aria-expanded="false">
                      <span>Vrsta oglasa</span>

                      <span class="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">{{ selectedTypes.length }}</span>
                      <!-- Heroicon name: solid/chevron-down -->
                      <svg :class="['flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500', showTypeDropdown ? 'transform rotate-180': '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <div v-if="showTypeDropdown" class="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <form class="space-y-4">
                        <div class="flex items-center cursor-pointer" v-for="item in listing_types" @click="addOrRemoveFromListTypes(item)">
                          <input id="filter-category-0" name="category[]" value="new-arrivals" type="checkbox" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                          <label for="filter-category-0" class="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {{ item.name }}
                          </label>
                        </div>
                      </form>
                    </div>
                  </div>
                  <button class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" @click="$modal.show('search-filters')">Filteri</button>
                </div>
                <button
                  class='group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900'
                  @click="openSearchSaveModal"
                >
                  Spasi pretragu
                  <svg class="ml-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="h-6" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path></svg>
                </button>
              </div>
            </div>
            <div class="bg-gray-50 mb-6 rounded-md">
              <div class="mx-auto sm:flex sm:items-center px-4 rounded-md py-2">
                <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Filteri
                  <span class="sr-only">, active</span>
                </h3>

                <div aria-hidden="true" class="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4"></div>

                <div class="mt-2 sm:mt-0 sm:ml-4 flex justify-between items-center w-full">
                  <div class="-m-1 flex flex-wrap items-center">
                    <span class="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900">
                      <span>Vrsta oglasa</span>
                      <button type="button" class="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500">
                        <span class="sr-only">Remove filter for Objects</span>
                        <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                          <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                        </svg>
                      </button>
                    </span>
                  </div>
                  <p class="group inline-flex items-center justify-center text-md font-medium text-gray-700 hover:text-gray-900">Pronađeno {{ results.length }} rezultata</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="results">
          <div class="divide-y divide-gray-200 grid grid-cols-5 gap-6 w-full listing-wrap">
            <ListingCard v-for="listing in results" :listing="listing" :key="getResultKey(listing)" :avg-price="meta.price"/>
          </div>
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
        <modal name="search-filters" :adaptive="true" height="100%">
          <div class="modal-inner">
            <div class="modal-header">
              <h2>Filteri</h2>
              <i class="material-icons" @click="$modal.hide('search-filters')">close</i>
            </div>
            <div class="modal-content">
              <div class="filters rounded-md">

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
import TextField from "@/components/inputs/TextField";
import RangeFilter from "@/components/search/RangeFilter";
import TermFilter from "@/components/search/TermFilter";
import TermsFilter from "@/components/search/TermsFilter";
import { buildQuery, buildCategory } from "@/util/search";
import { capitalize } from "@/util/str";
import Snackbar from "@/components/global/Snackbar";
import Pagination from "@/components/pagination";
import ListingCard from "../components/listingCard/ListingCard";

@Component({
  components: {
    ListingCard,
    TextField,
    RangeFilter,
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
    let categories = [];
    let selectedCategoryId = null;

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
          if (item.name === 'category_id') {
            selectedCategoryId = item.value;
          }

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

    // get cats
    try {
      let response = await ctx.app.$axios.get(`/categories`)

      categories = response.data.data;
    } catch (e) {
      console.log(e)
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
      last_page,
      categories,
      selectedCategoryId
    }
  },
})
export default class Homepage extends Vue {
  searchName = '';
  last_page = 0;
  mapExpanded = false;
  showSortDropdown = false;
  showTypeDropdown = false;
  selectedSort = '';
  selectedTypes = [];
  listing_types = [
    {
      name: "Prodaja",
      id: 1,
    },
    {
      name: "Potražnja",
      id: 2,
    },
    {
      name: "Stan na dan",
      id: 3,
    },
    {
      name: "Iznajmljivanje (duži period)",
      id: 4,
    },
  ]
  sort_types = [
    {
      name: "Najniža cijena",
      value: 0,
    },
    {
      name: "Najviša cijena",
      value: 1,
    },
    {
      name: "Najnovije",
      value: 2,
    },
    {
      name: "Najstarije",
      value: 3,
    },
  ]

  selectSort(i) {
    this.selectedSort = i.name;

    this.showSortDropdown = false;
  }

  addOrRemoveFromListTypes(x) {
    let index = this.selectedTypes.indexOf(x);

    if (index === -1) {
      this.selectedTypes.push(x);
    } else {
      this.selectedTypes.splice(index, 1);
    }
  }

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

  handleSelectedCategory(cat) {
    this.queryPayload = {
      category_id: {
        name: "category_id",
        type: "term",
        value: cat.id
      }
    }

    this.newSearch();
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
    //position: relative;
  }

  @include for-phone-only {
    height: 100%;
  }
  .content {
    width: 100%;
    min-width: 100%;
    box-sizing: border-box;
    //height: calc(100vh - 60px);
    //overflow-y: scroll;

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
      font-family: 'Roboto', sans-serif;
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

  button {
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    font-size: 15px;
    font-weight: 500;
    margin-right: 12px;
    border: 1px solid #c1c1c1;
    background: transparent;
    cursor: pointer;
    transition: 0.3s all ease;
    font-family: 'Roboto', sans-serif;

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

.filters {
  ::v-deep input, select, text-area {
    border: 1px solid #000;
  }
}
::v-deep .listing-card-wrapper {
  width: 100%;
}


::v-deep .listing-card-wrapper a{
  display: flex;
  flex-direction: column;
  width: 100%;
}

::v-deep .listing-card-wrapper a img{
  width: 100%;
  height: 280px;
}

.category-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  li {
    height: 44px;
    padding: 0 14px;
    background: #fff;
    border: 1px solid #f1f1f1;
    margin-right: 16px;
    border-radius: 8px;
    font-size: 13px;
    min-width: fit-content;
    cursor: pointer;

    &.selected-cat {
      background: #fff;
      border: 2px solid #000;
    }

    &:hover {
      background: #f9f9f9;
    }
  }
}

.select-field {
  height: 48px;
  padding: 0 16px;
  background: #fff;
  border: 1px solid #f1f1f1;
  margin-right: 16px;
  border-radius: 8px;
  font-size: 13px;
  min-width: fit-content;
  cursor: pointer;

  select {
    height: 47px
  }
}

.filteri {
  position: sticky;
  top: 0;
}
</style>
