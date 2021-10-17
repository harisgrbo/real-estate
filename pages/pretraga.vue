<template>
  <div class="search-wrapper w-full relative flex flex-col">
    <div class="search-heading lg:px-20 xl:px-20 up:px-20 sm:px-5 py-4 lg:my-4 xl:my-4 up:my-4 my-0 sticky">
      <div class="border-b border-gray-200">
      </div>
      <div class="w-full">
        <div class="flex flex-row w-full items-center justify-between border-b border-gray-200 px-5">
          <ul class="category-list w-full" v-if="!$device.isMobile">
            <li :class="['group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900', cat.id === selectedCategoryId ? 'selected-cat': '']" v-for="cat in categories" @click="handleSelectedCategory(cat)">{{ cat.title }}</li>
          </ul>
          <button @click="toggleCatsModal" v-else class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 p-2 rounded-full px-3 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            {{ category_title !== '' ? category_title : "Kategorije" }}
          </button>

          <button class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 p-2 rounded-full px-3 hover:bg-gray-100" @click="$modal.show('search-filters')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform rotate-90 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filteri</button>

          <div class="flex items-center justify-end">
            <div class="relative inline-block text-left filteri">
              <div @click="showSortDropdown = !showSortDropdown" v-if="!$device.isMobile">
                <button type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 p-2 rounded-full px-3 hover:bg-gray-100 font-semibold text-standard" id="menu-button" aria-expanded="false" aria-haspopup="true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                  {{ selectedSort !== "" ? selectedSort : 'Sortiraj' }}
                  <!-- Heroicon name: solid/chevron-down -->
                  <svg :class="['flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500', showSortDropdown ? 'transform rotate-180' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div v-if="showSortDropdown" class="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                  <a v-for="(item, index) in sort_types" href="#" :class="['text-gray-500 block px-2 py-2 text-sm hover:bg-gray-100', selectedSort === index ? 'font-medium text-gray-900' : '']" role="menuitem" tabindex="-1" id="menu-item-0" @click="selectSort(item)">
                    {{ item.name }}
                  </a>
                </div>
              </div>
            </div>
            <div class="px-4 relative flex w-auto text-left type">
              <button @click="showTypeDropdown = !showTypeDropdown" type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 p-2 rounded-full px-3 hover:bg-gray-100" aria-expanded="false">
                <span>Vrsta oglasa</span>

                <span class="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">{{ selectedTypes && selectedTypes.length ? selectedTypes.length : '0' }}</span>
                <!-- Heroicon name: solid/chevron-down -->
                <svg :class="['flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500', showTypeDropdown ? 'transform rotate-180': '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div v-if="showTypeDropdown" class="origin-top-right top-9 right-4 absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <form class="space-y-4">
                  <div class="flex items-center cursor-pointer" v-for="item in listing_types">
                    <input :checked="selectedTypes.indexOf(item.id) !== -1" :id="'filter-category-' + item.id" name="category[]" @click="addOrRemoveFromListTypes(item.id)" value="new-arrivals" type="checkbox" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                    <label :for="'filter-category-' + item.id" class="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {{ item.name }}
                    </label>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- Filters -->
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" class="sr-only">Filters</h2>
      </section>
    </div>
    <div class="content lg:px-20 xl:px-20 up:px-20 px-5 w-full mx-auto">
      <div class="w-full flex items-center justify-between mb-4" v-if="$device.isMobile">
        <h1 class="font-semibold">1000 rezultata</h1>

        <button type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 p-2 rounded-full px-3 hover:bg-gray-100 font-semibold text-standard" id="menu-button" aria-expanded="false" aria-haspopup="true">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          {{ selectedSort !== "" ? selectedSort : 'Sortiraj' }}
        </button>
      </div>
      <div class="results">
        <div class="divide-y divide-gray-200 flex flex-col lg:grid xl:grid up:grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-5 up:grid-cols-5 gap-6 w-full listing-wrap" v-if="results_loaded">
          <ListingCard v-for="listing in results" :listing="listing" :key="getResultKey(listing)" :avg-price="meta.price"/>
        </div>
        <div class="divide-y divide-gray-200 grid grid-cols-5 gap-6 w-full listing-wrap" v-else>
          <skeleton v-for="i in 20"></skeleton>
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
    <client-only>
      <modal name="filters" transition="slide-up" :adaptive="true" height="100%" :width="$device.isMobile ? '100%' : '40%'">
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
      <client-only>
        <modal name="cats-modal" :adaptive="true" height="100%">
          <div class="modal-inner">
            <div class="modal-header">
              <h2>Kategorije</h2>
              <i class="material-icons" @click.prevent="$modal.hide('cats-modal')">close</i>
            </div>
            <div class="modal-content">
              <div class="filters rounded-md">
                <ul role="list" class="border-t border-b border-gray-200 pb-6 grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 up:grid-cols-2 gap-5 w-full categories-list-wrap">
                  <li v-for="(cat, index) in categories" :key="index" @click="handleSelectedCategory(cat)" class="flow-root border bg-gray-100 rounded-md"
                      :class="[ 'flow-root', cat.id === selectedCategoryId ? 'selected' : '' ]">
                    <div>
                      <a href="#" class="focus:outline-none">
                        <span aria-hidden="true"></span>
                        {{ cat.title }}
                      </a>
                    </div>
                    <div class="relative flex items-center space-x-4 rounded-md hover:bg-gray-50">
                      <div class="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg p-1 svg-wrap">
                        <!-- Heroicon name: outline/clock -->
                        <img :src="'/cats/' + cat.slug + '.png'" alt="">
                      </div>
                    </div>
                  </li>
                </ul>
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
import skeleton from "../components/skeleton";

@Component({
  components: {
    ListingCard,
    TextField,
    RangeFilter,
    Pagination,
    TermFilter,
    skeleton,
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
    let results_loaded = false;
    let categories = [];
    let selectedCategoryId = null;

    if (ctx.route.query.q) {
      let query = decodeURIComponent(ctx.route.query.q)
      page = ctx.route.query.page || '1';
      page = parseInt(page)

      results_loaded = false;
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

        results_loaded = true;


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

    let selectedTypes = [];

    if (queryPayload.listing_type_id) {
      if (Array.isArray(queryPayload.listing_type_id.value)) {
        selectedTypes = queryPayload.listing_type_id.value;
      } else {
        selectedTypes = [queryPayload.listing_type_id.value];
      }
    }

    return {
      selectedTypes,
      allAttributes,
      results,
      meta,
      queryPayload,
      page,
      results_loaded,
      last_page,
      categories,
      selectedCategoryId
    }
  },
})
export default class Homepage extends Vue {
  searchName = '';
  mapExpanded = false;
  showSortDropdown = false;
  showTypeDropdown = false;
  selectedSort = '';
  listing_types = [
    {
      name: "Prodaja",
      id: 1,
    },
    {
      name: "Kupovina",
      id: 2,
    },
    {
      name: "Stan na dan",
      id: 4,
    },
    {
      name: "Iznajmljivanje (duži period)",
      id: 3,
    },
  ]
  category_title = '';
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

  toggleCatsModal() {
    this.$modal.show('cats-modal')
  }

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

    if (this.selectedTypes.length) {
      this.queryPayload.listing_type_id = {
        name: "listing_type_id",
        type: "terms",
        value: this.selectedTypes
      }
    } else {
      delete this.queryPayload.listing_type_id;
    }

    this.newSearch();
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

    this.$modal.hide('cats-modal')

    this.newSearch();

    this.category_title = cat.title;

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

.search-heading {
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 9;
}

.search-wrapper {
  display: flex;
  margin-top: 0px;
  flex-direction: column;

  .content {
    box-sizing: border-box;
    height: 100%;

    @include for-phone-only {
      padding-bottom: 180px;
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
      font-family: 'Lato', sans-serif;
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
    font-family: 'Lato', sans-serif;

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

  @include for-phone-only {
    padding: 24px 0px;
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
    padding: 0 10px;
    background: #fff;
    margin-right: 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    min-width: fit-content;
    cursor: pointer;
    color: #717171;

    &.selected-cat {
      background: #fff;
      border: 2px solid #000;
      color: #000;
      font-weight: 600;
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

.type {
  min-width: fit-content;
}

//.listing-wrap {
//  grid-row-gap: 36px;
//}



.categories-list-wrap li {
  @include for-phone-only {
    background: #FFFFFF !important;
    color: #222222 !important;
    padding: 16px !important;
    width: 100% !important;
    border: 1px solid #DDDDDD !important;
    min-height: 76px;
    height: 76px;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    font-weight: 500 !important;
    flex-direction: row;
    display: flex;

    .svg-wrap {
      height: 50px;
      width: 50px;
      border-radius: 7px;
    }

    &.selected {
      border: 2px solid #023246;
      font-weight: 600 !important;


      @include for-phone-only {
        background: #f9f9f9 !important;
        border: 2px solid #000 !important;
      }
    }
  }
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s;
}
.scale-enter,
.scale-leave-active {
  opacity: 0;
  transform: scale(0.3) translateY(24px);
}

.slide-up-enter-active {
  transition: all .2s ease;
}
.slide-up-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-up-enter, .slide-fade-leave-to {
  transform: translateY(100vh);
  opacity: 0;
}

::v-deep .vm--modal {
  @include for-phone-only {
    top: 110px !important;
    border-top-left-radius: 15px !important;
    border-top-right-radius: 15px !important;
    height: calc(100vh - 100px) !important;
    padding-bottom: 180px !important;
  }
}
</style>
