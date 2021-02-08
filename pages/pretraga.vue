<template>
  <div class="search-wrapper">
    <div class="filters">
      <RangeFilter
        v-model="queryPayload.price"
        :attr="false"
        :filter="{name: 'price', display_name: 'Cijena'}"
        @input="newSearch"
      />
      <component
        v-for="(attr, i) in meta.attributes"
        :key="i"
        :filter="attr"
        :attr="true"
        :is="filterFor(attr)"
        v-model="queryPayload[attr.name]"
        @clear="queryPayload[attr.name] = null; newSearch()"
        @input="newSearch"
      />
    </div>
    <div class="content">
      <h2>Pronadjeno <b>{{ results.length }}</b> rezultata za vasu pretragu</h2>

      <HorizontalCard v-for="listing in results" :listing="listing" :key="getResultKey(listing)" />
    </div>
    <div class="map">
      <SearchMap :locations="results"/>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import HorizontalCard from "@/components/listingCard/HorizontalCard";
import TextField from "@/components/inputs/TextField";
import RangeFilter from "@/components/search/RangeFilter"
import { buildQuery } from "@/util/search"
import { capitalize } from "@/util/str"
import SearchMap from "@/components/googleMap/SearchMap";

@Component({
  components: {
    SearchMap,
    TextField,
    HorizontalCard,
    RangeFilter
  },
  layout() { return "home" },

  watchQuery: true,

  async asyncData(ctx) {
    let results = [];
    let meta = {
      categories: [],
      aggregations: []
    };
    let query = [];
    let queryPayload = {}

    if (ctx.route.query.q) {
      let query = decodeURIComponent(ctx.route.query.q)
      try {
        let response = await ctx.app.$axios.get(`/listings/search?q=${ctx.route.query.q}`)
        results = response.data.data;
        meta = response.data.meta;
        query = JSON.parse(query)

        query.forEach(item => {
          queryPayload[item.name] = Object.assign({}, item);
        });

      } catch (e) {
        console.log(e)
        // @TODO: Error handling
      }
    }

    return {
      results,
      meta,
      queryPayload
    }
  },

})

export default class Homepage extends Vue {

  showAllFilters = false;

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
    return `${capitalize(attr.type)}Filter`;
  }
}
</script>

<style scoped lang="scss">

.search-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  max-height: calc(100vh - 50px);
  position: relative;
  .filters {
    display: flex;
    flex-direction: column;
    padding: 24px;
    width: 20%;
    max-height: calc(100vh - 50px);
    min-height: calc(100vh - 50px);
    overflow-y: scroll;
    box-sizing: border-box;
    border-right: 1px solid #ddd;
    h2 {
      padding-bottom: 16px;
      font-size: 18px;
      font-weight: 300;
      padding-top: 16px;
      border-bottom: 1px solid #ddd;
    }
    .listing-layout {
      display: flex;
      flex-direction: column;
    }
    .quick-filters {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 16px;
      position: sticky;
      background: #fff;
      top: 0;
      z-index: 4;
      height: 50px;
      padding: 16px 0;

      button {
        height: 38px;
        border-radius: 19px;
        background: transparent;
        padding: 0 12px;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        margin-right: 12px;
        border: 1px solid #dddddd;

        &:last-child {
          margin-right: 0px;
        }

        &:hover {
          background: #F7F7F7;
        }

        &:focus {
          outline: none;
        }

        &.all {
          border: none;
          display: flex;
          align-items: center;
          color: #fff;
          background: #757B9A;
        }
      }
    }
  }

  .content {
    max-height: calc(100vh - 50px);
    overflow: hidden;
    width: 45%;
    padding: 24px;

    h2 {
      font-size: 18px;
      margin-bottom: 24px;
    }
  }

  .map {
    width: 35%;
  }
}

</style>
