<template>
  <div class="search-wrapper">
    <div class="filters" :class="showAllFilters? 'stop-scrolling' : ''">
      <h2>Pronadjeno <b>{{ results.length }}</b> rezultata za vasu pretragu</h2>
      <div class="quick-filters">
        <button>Vrsta oglasa</button>
        <button>Sortiraj</button>
        <button class="all" @click="showAllFilters = !showAllFilters">Ostali filteri</button>
      </div>
      <div class="listing-layout">
        <HorizontalCard v-for="listing in results" :listing="listing" :key="getResultKey(listing)" />
        <div v-if="results.length === 0">
          Nema rezultata
          <button @click="handleBack()">Nazad</button>
        </div>
      </div>
      <transition name="slide">
        <div class="all-filters" v-if="showAllFilters">
          <div class="inner">
            <div class="all-filters-heading">
              <p>Ostali filteri</p>
              <i class="material-icons" @click="showAllFilters = false">close</i>
            </div>
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
      </div>
      </transition>
    </div>
    <div class="content">
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
  layout() { return "search" },

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
    padding: 0px 16px 16px 16px;
    width: 35%;
    max-height: calc(100vh - 50px);
    min-height: calc(100vh - 50px);
    overflow-y: scroll;
    box-sizing: border-box;
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
}

.content {
 max-height: calc(100vh - 50px);
  overflow: hidden;
  width: 65%;
}

.all-filters {
  position: absolute;
  left: 0px;
  right: 0px;
  background: #fff;
  z-index: 4;
  bottom: 0px;
  top: 0px;
  box-sizing: border-box;
  height: calc(100vh - 50px);
  width: 35%;
  background: rgba(0, 0, 0, 0.1);
  .inner {
    margin: 12px;
    padding: 8px;
    border-radius: 10px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
    overflow: scroll;
    box-sizing: border-box;
    height: calc(100vh - 70px);

  }
  .all-filters-heading {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    i {
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: #757B9A;
      font-size: 16px;
      border-radius: 8px;
      cursor: pointer;
    }
  }
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(-100%);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.stop-scrolling {
  overflow: hidden !important;
}


</style>
