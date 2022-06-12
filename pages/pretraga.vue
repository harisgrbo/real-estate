<template>
    <div class="search-wrapper w-full relative flex flex-col">
        <div class="search-heading py-2 my-0 sticky">
            <div class="w-full relative search-options">
                <div
                    class="flex flex-row overflow-y-scroll gap-2 w-full items-center justify-between sm:justify-start border-b border-gray-200 px-4 lg:px-0 xl:px-0 up:px-0">
                    <ul class="category-list w-full" v-if="!$device.isMobile">
                        <li :class="['group cat-list inline-flex items-center justify-center text-sm font-standard text-gray-800 hover:text-gray-900', cat.id === selectedCategoryId ? 'selected-cat': '']"
                            v-for="cat in categories" @click="handleSelectedCategory(cat)" :key="cat.id">{{ cat.title }}
                        </li>
                    </ul>
                    <button @click="toggleCatsModal" v-else
                            class="group inline-flex justify-center text-sm font-normal text-gray-700 hover:text-gray-900 border border-gray-200 p-2 rounded-sm px-3 hover:bg-gray-100 first-category">
                        {{ categoryTitle !== '' ? categoryTitle : "Kategorije" }}
                    </button>
                    <button class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 p-2 rounded-lg px-3 hover:bg-gray-100"
                            @click="$modal.show('search-filters')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform rotate-90 mr-2" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                        </svg>
                        Filteri
                    </button>
                    <div class="flex items-center justify-end types">
                        <div class="flex w-full text-left type z-10">
                            <button
                                @click="$device.isMobile ? $modal.show('type-modal') : (showTypeDropdown = !showTypeDropdown)"
                                type="button"
                                class=" min-w-full group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 p-2 rounded-lg px-3 hover:bg-gray-100"
                                aria-expanded="false">
                                <span>Vrsta oglasa</span>

                                <span class="ml-1.5 rounded text-xs font-semibold text-gray-700 tabular-nums">{{
                                        selectedTypes && selectedTypes.length ? selectedTypes.length : '0'
                                    }}</span>
                            </button>
                            <div v-if="showTypeDropdown"
                                 class="origin-top-right listing-types top-9 absolute right-0 mt-2 bg-white rounded-lg shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <form class="space-y-4">
                                    <div class="flex items-center cursor-pointer" v-for="item in listing_types"
                                         :key="item.id">
                                        <input :checked="selectedTypes.indexOf(item.id) !== -1"
                                               :id="'filter-category-' + item.id" name="category[]"
                                               @click="addOrRemoveFromListTypes(item.id)" value="new-arrivals"
                                               type="checkbox"
                                               class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label :for="'filter-category-' + item.id"
                                               class="ml-3 pr-6 text-sm font-medium cursor-pointer text-gray-900 whitespace-nowrap">
                                            {{ item.name }}
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-center justify-between w-full w-full mt-4">
                <div class="flex items-center justify-between w-full mobile-button mb-2">
                    <h1 class="results-number font-medium text-lg">{{ meta.total }} rezultata</h1>
                    <div class="flex w-full text-right justify-end type z-10">
                        <button @click="showSortDropdown = !showSortDropdown" type="button"
                                class="flex flex-row items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                                </svg>
                                {{ selectedSort !== "" ? selectedSort.name : 'Sortiraj' }}
                        </button>
                        <div v-if="showSortDropdown"
                             class="origin-top-right listing-types top-9 absolute right-60 mt-2 bg-white rounded-lg shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none"
                             role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div v-for="(item, index) in sort_types" :key="index"
                                 :class="['text-gray-500 px-4 cursor-pointer block px-2 py-2 text-sm hover:bg-gray-100', selectedSort.value === index ? 'font-semibold text-gray-900' : '']"
                                 role="menuitem" tabindex="-1" id="menu-item-0" @click.prevent="selectSort(item)">
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <ul v-if="!$device.isMobile"
                    class="flex flex-row items-center justify-start w-full selected-filters sm:mt-0 mb-3">
                    <li v-for="filter in queryPayload" :key="filter.id" v-if="filter && filterResolveValue(filter)"
                        class="py-1 px-2 border border-black mr-1">
                        <div class="flex flex-row items-center">
                            {{ filterResolveValue(filter) }}
                            <button @click="queryPayload[filter.name] = null; newSearch();">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    </li>
                </ul>
                <div class="content">
                    <div class="results relative" v-if="selectedPreviewType === 'grid' || $device.isMobile">
                        <div v-if="results.length" class="w-full flex flex-col">
                            <div class="divide-y divide-gray-200 flex flex-col grid grid-cols-5 gap-4 w-full listing-wrap">
                                <SearchListingCard v-for="listing in results" :listing="listing" :key="getResultKey(listing)"
                                                   :avg-price="meta.price"/>
                            </div>
                            <client-only>
                                <Pagination
                                    ref="pagination"
                                    v-show="meta.total > 20"
                                    :current-page="page"
                                    :total-pages="lastPage"
                                    @page-change="pageChangeHandler"/>
                            </client-only>
<!--                            <ins class="adsbygoogle"-->
<!--                                 v-if="!$device.isMobile"-->
<!--                                 style="display:flex;margin: 24px auto 0px auto;width:728px;height:90px"-->
<!--                                 data-ad-client="ca-pub-3745186233711216"-->
<!--                                 data-ad-slot="5734023899"></ins>-->
                        </div>
                        <div v-else>
                            <NotFound src="/realestatenoresults.svg" text="Nema rezultata"></NotFound>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <client-only>
            <modal @before-open="beforeOpen" @before-close="beforeClose" name="filters"
                   transition="slide-up"
                   :adaptive="true"
                   height="100%"
                   :width="$device.isMobile ? '100%' : '40%'"
            >
                <div class="modal-inner relative">
                    <div class="modal-header">
                        <h2>Filteri</h2>
                        <i class="material-icons" @click="$modal.hide('filters')">close</i>
                    </div>
                    <div class="modal-content filters">
                        <!--            <div v-show="loading" class="loading-wrapper">-->
                        <!--              <img src="/gps.gif" alt="">-->
                        <!--            </div>-->
                        <div class="rounded-md bg-yellow-50 p-4" v-show="! selectedCategoryId">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <!-- Heroicon name: solid/exclamation -->
                                    <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <h3 class="text-sm font-medium text-yellow-800">
                                        Izaberite kategoriju za više filtera
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col w-full filters-divs">
                            <RangeFilter
                                v-model="queryPayload.price"
                                :attr="false"
                                :filter="{name: 'price', display_name: 'Cijena'}"
                                @input="newSearch"
                            />
                            <!--              <client-only>-->
                            <!--                <apexchart type="bar" :options="histogramOptions" :series="priceBuckets"></apexchart>-->
                            <!--              </client-only>-->
                            <CountriesMultipleSelect :initial-country-ids="countryIds" :countries="countries"/>

                            <CitiesMultipleSelect :initial-city-ids="cityIds" @cities="handleCitiesSearch"/>

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
                </div>
            </modal>
        </client-only>
        <client-only>
            <modal @before-open="beforeOpen" @before-close="beforeClose" name="search-filters" :adaptive="true"
                   height="100%">
                <div class="modal-inner only-mobile-wrap relative">
                    <div class="modal-header only-mobile">
                        <h2>Filteri</h2>
                        <i class="material-icons" @click="$modal.hide('search-filters')">close</i>
                    </div>

                    <div class="modal-content">
                        <div class="filters rounded-md">
                            <div class="rounded-md bg-yellow-50 p-4 pb-4" v-show="! selectedCategoryId">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <!-- Heroicon name: solid/exclamation -->
                                        <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <h3 class="text-sm font-medium text-yellow-800">
                                            Izaberite kategoriju za više filtera
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <RangeFilter
                                class="bb-filters"
                                v-model="queryPayload.price"
                                :attr="false"
                                :filter="{name: 'price', display_name: 'Cijena'}"
                                @input="newSearch"
                                @close-filters="$modal.hide('search-filters')"
                            />
                            <!--                <client-only>-->
                            <!--                  <apexchart type="bar" :options="histogramOptions" :series="priceBuckets"></apexchart>-->
                            <!--                </client-only>-->
                            <CountriesMultipleSelect :countries="allCountries" :initial-countries="countries"
                                                     @countries="handleCountriesSearch"/>

                            <CitiesMultipleSelect :initial-cities="cities" @cities="handleCitiesSearch"/>

                            <component
                                class="bb-filters"
                                v-for="(attr, i) in allAttributes"
                                :key="i"
                                :filter="attr"
                                :attr="true"
                                :is="filterFor(attr.type)"
                                v-model="queryPayload[attr.id]"
                                @clear="queryPayload[attr.id] = null; newSearch()"
                                @input="newSearch"
                            />

                        </div>
                    </div>
                </div>
            </modal>
        </client-only>
        <client-only>
            <modal @before-open="beforeOpen" @before-close="beforeClose" name="cats-modal" :adaptive="true"
                   height="100%">
                <div class="modal-inner">
                    <div class="modal-header">
                        <h2>Kategorije</h2>
                        <i class="material-icons" @click.prevent="$modal.hide('cats-modal')">close</i>
                    </div>
                    <div class="modal-content">
                        <div class="filters rounded-md">
                            <ul role="list"
                                class="border-t border-b border-gray-200 pb-6 grid grid-cols-1 gap-4 w-full categories-list-wrap">
                                <li v-for="(cat, index) in categories" :key="index" @click="handleSelectedCategory(cat)"
                                    class="flow-root shadow-sm border rounded-sm"
                                    :class="[ 'flow-root', cat.id === selectedCategoryId ? 'selected' : '' ]">
                                    <div>
                                        <div class="focus:outline-none">
                                            <span aria-hidden="true"></span>
                                            {{ cat.title }}
                                        </div>
                                    </div>
                                    <div class="relative flex">
                                        <div class="svg-wrap">
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
        <client-only>
            <modal @before-open="beforeOpen" @before-close="beforeClose" classes="only-sort-mobile" name="sort-mobile"
                   :adaptive="true">
                <div class="modal-inner">
                    <div class="modal-header">
                        <h2>Sortiraj</h2>
                        <i class="material-icons" @click.prevent="$modal.hide('sort-mobile')">close</i>
                    </div>
                    <div class="modal-content">
                        <div class="filters rounded-md">
                            <div class="flex flex-col w-full">
                                <div v-for="(item, index) in sort_types" :key="index"
                                     :class="[ 'add-mobile-border', selectedSort.value === index ? 'active' : '']"
                                     role="menuitem" @click.prevent="selectSort(item); $modal.hide('sort-mobile')">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </modal>
        </client-only>
        <client-only>
            <modal @before-open="beforeOpen" @before-close="beforeClose" classes="only-sort-mobile" name="type-modal"
                   :adaptive="true" height="40%" maxHeight="40%">
                <div class="modal-inner">
                    <div class="modal-header">
                        <h2>Vrsta oglasa</h2>
                        <i class="material-icons" @click.prevent="$modal.hide('type-modal')">close</i>
                    </div>
                    <div class="modal-content">
                        <div class="filters rounded-md">
                            <div class="flex flex-col w-full">
                                <form class="space-y-4">
                                    <div class="flex items-center cursor-pointer" v-for="item in listing_types"
                                         :key="item.id">
                                        <input :checked="selectedTypes.indexOf(item.id) !== -1"
                                               :id="'filter-category-' + item.id" name="category[]"
                                               @click="addOrRemoveFromListTypes(item.id); $modal.hide('type-modal')"
                                               value="new-arrivals" type="checkbox"
                                               class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                                        <label :for="'filter-category-' + item.id"
                                               class="ml-3 pr-6 text-sm font-medium cursor-pointer text-gray-900 whitespace-nowrap">
                                            {{ item.name }}
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </modal>
        </client-only>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import TextField from "@/components/inputs/TextField";
import RangeFilter from "@/components/search/RangeFilter";
import TermFilter from "@/components/search/TermFilter";
import TermsFilter from "@/components/search/TermsFilter";
import {buildQuery} from "@/util/search";
import {capitalize} from "@/util/str";
import Pagination from "@/components/pagination";
import skeleton from "../components/skeleton";
import ActionButton from "@/components/actionButtons/ActionButton"
import SearchMap from "../components/googleMap/SearchMap";
import CitiesMultipleSelect from "@/components/global/CitiesMultipleSelect";
import NotFound from "../components/global/NotFound";
import SearchListingCard from "../components/SearchListingCard";
import CountriesMultipleSelect from "../components/global/CountriesMultipleSelect"

@Component({
    components: {
        CountriesMultipleSelect,
        SearchListingCard,
        NotFound,
        CitiesMultipleSelect,
        SearchMap,
        ActionButton,
        TextField,
        RangeFilter,
        Pagination,
        TermFilter,
        skeleton,
        TermsFilter,
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'search',

    watchQuery: true,

    async asyncData(ctx) {
        let center = null;
        let page = 1;
        let results = [];
        let meta = {};
        let loading = true;
        let allAttributes = [];
        let queryPayload = {};
        let categories = [];
        let cities = [];
        let countries = [];
        let selectedCategoryId = null;
        let mapZoom = 14;
        let selectedPreviewType = 'map';
        let selectedSort = {
            name: "Najnovije",
            value: 0,
            order: 'asc'
        }

        let query = decodeURIComponent(ctx.route.query.q)
        page = ctx.route.query.page || '1';
        page = parseInt(page)

        if (ctx.route.query.preview) {
            selectedPreviewType = ctx.route.query.preview;
        }

        let sortQuery = '';

        if (ctx.route.query.sort) {
            let order = ctx.route.query.order || 'desc';

            selectedSort = {
                name: order === 'asc' ? "Najniža cijena" : "Najviša cijena",
                value: order === 'asc' ? 1 : 2,
                sort: 'price',
                order: order
            }

            sortQuery = `&sort=price&order=${order}`;
        }

        let geo = '';

        if (ctx.route.query.lat && ctx.route.query.lng && ctx.route.query.dist) {
            geo = `&lat=${ctx.route.query.lat}&lng=${ctx.route.query.lng}&dist=${ctx.route.query.dist}`

            if (ctx.route.query.zoom) {
                mapZoom = parseInt(ctx.route.query.zoom);
            }

            center = {
                lat: parseFloat(ctx.route.query.lat),
                lng: parseFloat(ctx.route.query.lng)
            }
        }

        if (!ctx.route.query.q) {
            ctx.route.query.q = '';
        }

        try {
            let response = await ctx.app.$axios.get(`/listings/search?q=${ctx.route.query.q}&page=${page}${sortQuery}${geo}`);
            results = response.data.data;
            meta = response.data.meta;
            allAttributes = response.data.meta.attributes;
            cities = response.data.meta.cities;
            countries = response.data.meta.countries;

            query = JSON.parse(query)

            query.forEach(item => {
                if (item.name === 'category_id') {
                    selectedCategoryId = item.value;
                }

                queryPayload[item.name] = Object.assign({}, item);
            });

            loading = false;
        } catch (e) {
            console.log(e)
            // @TODO: Error handling
        }

        // get cats
        try {
            let response = await ctx.app.$axios.get(`/categories`)

            categories = response.data.data;
        } catch (e) {
            console.log(e)
        }

        let lp = meta.total / meta.perPage;

        if (!Number.isInteger(lp)) {
            lp += 1;
        }

        let lastPage = parseInt(lp);

        let selectedTypes = [];

        if (queryPayload.listing_type_id) {
            if (Array.isArray(queryPayload.listing_type_id.value)) {
                selectedTypes = queryPayload.listing_type_id.value;
            } else {
                selectedTypes = [queryPayload.listing_type_id.value];
            }
        }

        let category = categories.find(item => item.id === selectedCategoryId);

        let categoryTitle = category ? category.title : '';

        return {
            center,
            mapZoom,
            loading,
            cities,
            countries,
            selectedSort,
            selectedPreviewType,
            categoryTitle,
            selectedTypes,
            allAttributes,
            results,
            meta,
            queryPayload,
            page,
            lastPage,
            categories,
            selectedCategoryId
        }
    },
})
export default class Pretraga extends Vue {
    searchName = '';
    showSortDropdown = false;
    showTypeDropdown = false;
    currentResultIndex = -1;
    selected_sort = ''
    listing_types = [
        {
            name: "Prodaja",
            id: 1,
        },
        {
            name: "Stan na dan",
            id: 4,
        },
        {
            name: "Najam",
            id: 3,
        },
    ]
    preview_types = [
        {
            name: 'Mapa',
            value: 'map',
            path: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
        },
        {
            name: 'Grid',
            value: 'grid',
            path: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
        }
    ]
    sort_types = [
        {
            name: "Najnovije",
            value: 0,
            sort: 0,
            order: 'asc'
        },
        {
            name: "Najniža cijena",
            value: 1,
            sort: 'price',
            order: 'asc'
        },
        {
            name: "Najviša cijena",
            value: 2,
            sort: 'price',
            order: 'desc'
        }
    ]

    mounted() {
        let preview = localStorage.getItem("preview");

        if (preview && !this.$device.isMobile) {
            this.selectedPreviewType = preview.toLowerCase();
        } else {
            this.selectedPreviewType = 'grid'
        }

        this.$nextTick(() => {
            try {
                // this is required for each ad slot (calling this once will only load 1 ad)
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (error) {
                console.error(error)
            }
        })
    }

    handleMapMoved(event) {
        this.$router.push({
            query: Object.assign({}, this.$route.query, {
                preview: 'map',
                lat: event.lat,
                lng: event.lng,
                dist: event.dist,
                zoom: event.zoom
            })
        });
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // get histogramOptions() {
    //   return {
    //     chart: {
    //       id: 'prices-histogram'
    //     },
    //     yaxis: {
    //       show: false,
    //     },
    //     xaxis: {
    //       lines: {
    //         show: false
    //       },
    //       categories: this.meta.prices.buckets.map(item => {
    //         if (item.min === item.max) {
    //           return this.numberWithCommas(item.max) + " KM";
    //         }
    //
    //         return "Od " + this.numberWithCommas(item.min) + " do " + this.numberWithCommas(item.max) + ' KM';
    //       })
    //     },
    //     colors: ['#1F2937', '#E91E63'],
    //   }
    // }

    // get priceBuckets() {
    //   return [
    //     {
    //       'name': "Artikala",
    //       'data': this.meta.prices.buckets.map(item => {
    //         return parseInt(item.doc_count);
    //       })
    //     }
    //   ];
    // }

    filterResolveValue(filter) {
        if (filter.name === 'category_id') {
            let name = this.categories.find(item => item.id === filter.value);

            if (name) {
                return name.title;
            }
        } else if (filter.name === 'listing_type_id') {
            let name = [];

            filter.value.forEach(filterVal => {
                let listing_type = this.listing_types.find(item => item.id === filterVal);

                if (listing_type) {
                    name.push(listing_type.name)
                }
            })

            return name.join(', ');
        } else if (filter.name === 'price') {
            let name = "Cijena";

            if (filter.value[0]) {
                name += " od " + filter.value[0];
            }

            if (filter.value[1]) {
                name += " do " + filter.value[1];
            }

            return name;
        } else if (filter.name === 'city_id') {
            if (this.cities.length) {
                return this.cities.map(item => item.name).join(', ');
            }

            return null;
        } else if (filter.name === 'country_id') {
            if (this.countries.length) {
                return this.countries.map(item => item.name).join(', ');
            }

            return null;
        } else {
            let attr = this.allAttributes.find(item => item.id === parseInt(filter.name));

            if (attr) {
                if (filter.type === 'range') {
                    let tmpName = attr.name;

                    if (filter.value[0]) {
                        tmpName += " od " + filter.value[0];
                    }

                    if (filter.value[1]) {
                        tmpName += " do " + filter.value[1];
                    }

                    return tmpName;
                } else if (filter.type === 'terms') {
                    return attr.name + " " + filter.value.join(', ');
                } else if (filter.type === 'term') {
                    return attr.name;
                }

                return attr.name + " " + filter.value;
            }

            return null;
        }

        return filter.value;
    }

    handleListingHover(index) {
        this.currentResultIndex = index;
    }

    toggleCatsModal() {
        this.$modal.show('cats-modal')
    }

    selectSort(i) {
        this.selected_sort = i

        if (i.value === 0) {
            let cpy = Object.assign({}, this.$route.query);

            delete cpy.sort;
            delete cpy.order;


            this.$router.push({query: Object.assign({}, cpy, {preview: this.selectedPreviewType})});
        } else {
            this.$router.push({
                query: Object.assign({}, this.$route.query, {
                    sort: i.sort,
                    order: i.order,
                    preview: this.selectedPreviewType
                })
            });
        }
    }

    beforeOpen() {
        document.body.style.overflow = 'hidden';
    }

    beforeClose() {
        document.body.style.overflow = 'auto';
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
        this.$router.push({
            query: Object.assign({}, this.$route.query, {
                page: selectedPage,
                preview: this.selectedPreviewType
            })
        });
    }

    handleSelectPreviewType(t) {
        let old = this.selectedPreviewType;

        this.selectedPreviewType = t.value

        let q = Object.assign({}, this.$route.query, {preview: this.selectedPreviewType});

        if (this.selectedPreviewType === 'grid') {
            delete q['lat'];
            delete q['lng'];
            delete q['dist'];
            delete q['zoom'];
        }

        if (this.selectedPreviewType !== old) {
            this.$router.push({query: q});
        }

        localStorage.setItem('preview', this.selectedPreviewType);
    }


    getResultKey(listing) {
        return `${listing.id}-${this.$route.query.q}`
    }

    newSearch() {
        this.loading = true;

        let q = buildQuery(this.queryPayload)

        let geo = '';

        let query = this.$route.query;

        if (query.lat && query.lng && query.zoom && query.dist) {
            geo = `&lat=${query.lat}&lng=${query.lng}&zoom=${query.zoom}&dist=${query.dist}`
        }

        this.$router.push(`/pretraga?q=${q}&preview=${this.selectedPreviewType}${geo}`);
    }

    handleBack() {
        this.$router.go(-1);
    }

    filterFor(attr) {
        return `${capitalize(attr)}Filter`;
    }

    handleSelectedCategory(cat) {
        this.queryPayload.category_id = {
            name: "category_id",
            type: "term",
            value: cat.id
        }

        this.allAttributes.forEach(item => {
            delete this.queryPayload[item.name];
        })

        this.$modal.hide('cats-modal')

        this.newSearch();
    }

    handleCountriesSearch(countryIds) {
        if (countryIds.length) {
            this.queryPayload.country_id = {
                name: 'country_id',
                type: 'terms',
                value: countryIds
            }
        } else {
            delete this.queryPayload.country_id;
        }

        this.newSearch();
    }

    handleCitiesSearch(cityIds) {
        if (cityIds.length) {
            this.queryPayload.city_id = {
                name: "city_id",
                type: "terms",
                value: cityIds
            }
        } else {
            delete this.queryPayload.city_id;
        }

        this.newSearch();
    }

    async saveSearch() {
        try {
            let res = await this.$axios.post('/profile/saved/searches', {
                query: JSON.stringify(this.$route.query),
                description: this.searchName
            });

            this.$toast.open({
                message: "Uspješno ste snimili pretragu",
                type: 'error',
                duration: 5000
            });

            this.searchName = '';

            this.$modal.hide('save-search')


            this.$toast.open({
                message: "Uspješno ste spasili pretragu",
                type: 'error',
                duration: 5000
            });
        } catch (e) {
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
    display: flex;
    flex-direction: column;
    align-items: center;

    @include for-phone-only {
        padding-top: 12px;
        background: transparent;
        padding-bottom: 12px;
    }
}

.search-wrapper {
    display: flex;
    flex-direction: column;
    width: 1280px;
    margin: 0 auto;
    padding-top: 36px;

    @include for-phone-only {
        background: #f9f9f9;
        width: 100%;
        padding-top: 0;
    }

    @include for-phone-only {
        padding-top: 34x;
    }

    .content {
        box-sizing: border-box;
        height: 100%;

        @include for-phone-only {
            padding-bottom: 0px;
            padding-top: 12px;
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
            padding-bottom: 60px;

            &.map {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                height: calc(100vh - 275px);

                .map-wrapper {
                    width: 55%;
                    min-width: 55%;
                    background: #f9f9f9;
                    margin-left: 36px;
                    height: calc(100vh - 237px);
                    border-radius: 6px;
                    overflow: hidden;

                    ::v-deep #map {
                        height: calc(100vh - 237px);
                    }
                }

                .results-wrapper-map {
                    height: calc(100vh - 237px);
                    overflow-y: scroll;
                    padding-bottom: 30px !important;
                    width: 100%;
                }
            }
        }

        h2 {
            font-size: 18px;
            margin-bottom: 24px;
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
    padding-top: 0 !important;

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
        border-radius: 6px;
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
        font-family: 'NunitoSans', sans-serif;;

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

.filters {
    ::v-deep input, select, text-area {
        border: 1px solid #000;
    }

    @include for-phone-only {
        padding: 24px 0px;
        padding-top: 0;
        padding-bottom: 150px;
    }
}

::v-deep .listing-card-wrapper {
    width: 100%;

    img.main-image {
        @include for-phone-only {
            height: 210px !important;
        }
    }
}


::v-deep .listing-card-wrapper a {
    display: flex;
    flex-direction: column;
    width: 100%;
}

::v-deep .listing-card-wrapper a img {
    width: 100%;
    height: 280px;
}

.category-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    li {
        display: inline-block;
        width: auto;
        -webkit-transition: background-color 0.15s ease-in-out;
        transition: background-color 0.15s ease-in-out;
        border-radius: 4px;
        outline: none;
        font-size: 14px;
        font-weight: 400;
        line-height: 1;
        text-align: center;
        cursor: pointer;
        padding: 6px 8px !important;
        background-color: #ffffff;
        color: #232e3f;
        margin-right: 3px;

        &.selected-cat {
            background: #fff;
            border-width: 1px;
            border-style: solid;
            border-color: #343434;
            color: #232e3f;
            font-weight: 500;
            border-radius: 4px;
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
    border-radius: 6px;
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

.listing-wrap {
    @include for-phone-only {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-column-gap: 16px;
        grid-row-gap: 24px;
        padding: 0 12px;

        ::v-deep .new {
            font-size: 19px;
            font-weight: 800 !important;
            margin-left: 0px;
            margin: 12px 0 !important;
        }

        ::v-deep .address.title h2 {
            font-weight: 500 !important;
            font-size: 18px !important;
        }

        ::v-deep .listing-card-content {
            background: #fff;
            padding: 12px;
        }
    }
}

.categories-list-wrap li {
    @include for-phone-only {
        background: #FFFFFF !important;
        color: #000 !important;
        padding: 8px 16px !important;
        width: 100% !important;
        justify-content: space-between;
        align-items: center;
        font-weight: 500 !important;
        flex-direction: row;
        display: flex;
        font-size: 14px;
        border-radius: 8px;

        span {
            line-height: 19px;
        }

        .svg-wrap {
            height: 40px;
            width: 40px;
            padding-bottom: 0;
            border: none;

            img {
                height: 40px;
                width: 40px;
                min-width: 40px;
            }
        }

        &.selected {
            border: 1px solid #000;
            font-weight: 600 !important;


            @include for-phone-only {
                border: 1px solid #000 !important;
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

.types {
    min-width: fit-content;

    @include for-phone-only {
        display: flex;
        flex: 1;

        button {
            display: flex;
            flex: 1;
        }
    }
}

.bottom-refresh {
    display: none;
    padding: 0 16px;

    @include for-phone-only {
        display: flex;
    }

    .refresh {
        @include for-phone-only {
            display: flex;
            width: 100%;
        }

    }
}


.toggle-map-wrapper {
    display: flex;
    align-items: center;
    min-width: fit-content;;
    justify-content: center;
    height: 40px;

    button {
        display: inline-block;
        width: auto;
        -webkit-transition: background-color 0.15s ease-in-out;
        transition: background-color 0.15s ease-in-out;
        border-radius: 4px;
        outline: none;
        font-size: 14px;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        cursor: pointer;
        padding: 11px 15px;
        background-color: #ffffff;
        color: #232e3f;
        min-width: fit-content;
        display: flex;
        align-items: center;
        flex-direction: row;
        border: 1px solid #f1f1f1;

        &:first-child {
            margin-right: 7px;

            @include for-phone-only {
                margin-right: 0;
            }
        }

        svg {
            margin-right: 4px;
        }

        &.active {
            background: #fff;
            border-radius: 4px;
            //box-shadow: rgb(0 0 0 / 12%) 0px 1px 5px;
            font-weight: 600;
            border-width: 2px;
            border-color: #232e3f;
            border-style: solid;
        }
    }

    button {

    }
}

.no-results {
    height: 200px;
    margin-top: 200px;
}

.sort-btn {
    min-width: fit-content;
}

.cat-list {
    font-weight: 400;
}

.loading-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.45);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottmo: 0;

    img {
        height: 40px;
    }
}

.listing-types {
    @include for-phone-only {
        width: 100%;
        margin-top: 8px;
        border: none;
        box-shadow: none;
    }
}

.vm--modal {
    max-height: 90% !important;
    min-height: fit-content !important;
    top: 0 !important;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
}

.selected-filters {
    margin-top: 0px;

    @include for-phone-only {
        padding-bottom: 0;
        width: 100%;
        overflow-x: scroll;
        margin-top: 0;
    }

    li {
        border-radius: 4px;
        font-size: 12px;
        font-weight: 200;
        border: 1px solid #343434;

        @include for-phone-only {
            background: #f9f9f9;
            color: #000;
            font-size: 13px !important;
            min-width: -webkit-fit-content;
            min-width: -moz-fit-content;
            min-width: fit-content;
            padding: 6px 10px;
            margin-left: 12px;
            margin-top: 16px;
            border-radius: 3px;

            &:first-child {
                margin-left: 24px;

                @include for-phone-only {
                    margin-left: 16px;
                }
            }

        }

        button {
            margin-left: 4px;
            cursor: pointer;
            padding: 2px 4px;
            backgroundck: transparent !important;

            @include for-phone-only {
                padding: 0;
                margin-left: 4px;
                border: none;

                svg {
                    color: #000
                }
            }
        }
    }
}

button.group {
    display: flex !important;
    flex-display: row;
    align-items: center;
    width: auto !important;
    -webkit-transition: background-color 0.15s ease-in-out !important;
    transition: background-color 0.15s ease-in-out;
    border-width: 1px !important;
    border-style: solid !important;
    border-radius: 4px !important;
    outline: none !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    line-height: 1 !important;
    text-align: center !important;
    cursor: pointer !important;
    border-color: #232e3f !important;
    background-color: #ffffff !important;
    color: #232e3f !important;
    min-width: fit-content !important;
    width: fit-content !important;
    padding: 6px 8px !important;

    &:hover {
        background: #01FFCF !important;
    }

}

.sort-mobile {
    display: flex !important;
    flex-display: row;
    align-items: center;
    width: auto !important;
    -webkit-transition: background-color 0.15s ease-in-out !important;
    transition: background-color 0.15s ease-in-out;
    border-width: 1px !important;
    border-style: solid !important;
    border-radius: 4px !important;
    outline: none !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    line-height: 1 !important;
    text-align: center !important;
    cursor: pointer !important;
    border-width: 2px !important;
    border-color: #232e3f !important;
    background-color: #ffffff !important;
    color: #232e3f !important;
    min-width: fit-content !important;
    width: fit-content !important;
}


.sort-mobile {
    padding: 11px 15px;

    a {
        border: 1px solid #ddd;
        border-radius: 6px;
        height: 48px;
        font-size: 13px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;

        &.add-border {
            border: 2px solid #000 !important;
            font-weight: 600;
        }
    }
}

.mobile-fit {
    @include for-phone-only {
        min-width: fit-content;
    }
}

.results-number {
    min-width: fit-content;
    margin: 0;
    margin-right: 24px;

    @include for-phone-only {
        margin-right: 0;
        color: #848484;
        font-weight: 600;
        font-size: 14px;
    }
}

.filters {
    ::v-deep div:first-of-type {

        ::v-deep label {
            font-size: 18px !important;
        }
    }

    div.info {
        padding-bottom: 0 !important;
        border-bottom: 0 !important;

        > div {
            padding-bottom: 0 !important;
            border-bottom: 0 !important;
        }
    }
}

.filters ::v-deep label {
    font-size: 14px !important;
    font-weight: 600 !important;
    text-transform: initial;

    &.switch-label {
        margin-bottom: 0px;
        padding-top: 0px;
        border-top: none;
        font-size: 14px !important;
    }
}

.mobile-button {
    @include for-phone-only {
        padding: 0 16px;
    }
}

.only-mobile {
    @include for-phone-only {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding-left: 24px;
        padding-right: 24px;
        background: #fff;
        z-index: 99;
    }
}

.only-mobile-wrap {
    @include for-phone-only {
        padding-top: 80px;

    }
}

.min-width {
    min-width: fit-content;
}

button {
    &:hover {
        background-color: #f2f3f4 !important;

    }
}

.first-category {
    @include for-phone-only {
        display: flex;
        flex: 1;
    }
}

.add-mobile-border {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: auto;
    -webkit-transition: background-color 0.15s ease-in-out;
    transition: background-color 0.15s ease-in-out;
    border-radius: 4px;
    outline: none;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    text-align: center;
    cursor: pointer;
    padding: 11px 15px;
    background-color: #ffffff;
    color: #232e3f !important;
    margin-bottom: 12px;

    &.active {
        border-width: 2px;
        border-color: #232e3f;
        font-weight: 700;
        border-width: 1px;
        border-style: solid;
    }
}

.add-min-width {
    min-width: fit-content;
}

.type {
    font-size: 13px;
    font-weight: 400 !important;
    &:hover {
        background: transparent !important;
    }
}
</style>
