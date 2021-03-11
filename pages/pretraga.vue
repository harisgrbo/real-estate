<template>
  <div class="search-wrapper">
    <div class="content">
      <div class="search-heading">
        <h2>Pronadjeno <b>{{ results.length }}</b> rezultata za vasu pretragu</h2>
        <div class="filter-buttons">
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
        <modal name="save-search" :adaptive="true" height="100%">
          <div class="modal-inner">
            <div class="modal-header">
              <h2>Snimanje pretrage - unesite naziv</h2>
              <i class="material-icons" @click="$modal.hide('save-search')">close</i>
            </div>
            <div class="modal-content save-search-modal">
              <input type="text" v-model="searchName">
              <ActionButton placeholder="Snimi pretragu" @action="saveSearch"></ActionButton>
            </div>
          </div>
        </modal>
      </div>
      <div class="results">
        <HorizontalCard v-for="listing in results" :listing="listing" :key="getResultKey(listing)" />
      </div>
    </div>
    <div class="map" v-if="!$device.isMobile">
      <SearchMap :locations="results"/>
    </div>
    <client-only>
      <modal name="filters" :adaptive="true" height="100%" width="40%">
        <div class="modal-inner">
          <div class="modal-header">
            <h2>Filteri</h2>
            <i class="material-icons" @click="$modal.hide('filters')">close</i>
          </div>
          <div class="modal-content">
            <CategoryFilter
              v-model="queryPayload.category_id"
              :categories="meta.categories"
              :aggregations="meta.aggregations"
              :filter="{}"
              @input="newSearch"
            />

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
            <div class="modal-content">
              <SearchMap :locations="results"/>
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

@Component({
  components: {
    SearchMap,
    TextField,
    HorizontalCard,
    RangeFilter,
    CategoryFilter,
    TermFilter,
    TermsFilter,
    Snackbar
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',

  watchQuery: true,

  async asyncData(ctx) {
    let results = [];
    let meta = {
      categories: [],
      aggregations: []
    };
    let allAttributes = [];
    let queryPayload = {};

    if (ctx.route.query.q) {
      let query = decodeURIComponent(ctx.route.query.q)
      try {
        let response = await ctx.app.$axios.get(`/listings/search?q=${ctx.route.query.q}`)
        results = response.data.data;
        console.log(response.data.data)
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

    return {
      allAttributes,
      results,
      meta,
      queryPayload
    }
  },
})
export default class Homepage extends Vue {
  searchName = '';

  toggleFiltersModal() {
    this.$modal.show('filters');
  }

  openSearchSaveModal() {
    this.$modal.show('save-search');
  }

  created() {
    console.log(this.results)
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

      this.modal.hide('save-search')

      this.$snackbar.show({
        text: "Uspjesno ste spasili pretragu",
        timeout: 1000,
        type: "danger"
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
  flex-direction: row;
  justify-content: space-between;
  height: calc(100vh - 107px);
  position: relative;
  overflow: hidden;

  @include for-phone-only {
    height: 100%;
  }
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
    width: 52%;
    padding: 24px;
    padding-top: 0;
    box-sizing: border-box;
    position: relative;
    overflow-y: scroll;

    @include for-phone-only {
      max-height: 100%;
      width: 100%;
      padding: 12px;
    }

    .search-heading {
      position: sticky;
      top: 0;
      background: #fff;
      z-index: 3;
      padding-top: 24px;

      @include for-phone-only {
        z-index: 2;
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

    .filter-buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-bottom: 24px;
      border-bottom: 1px solid #f1f1f1;

      @include for-phone-only {
        max-width: 100%;
        overflow-x: scroll;
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
        font-family: 'Montserrat', sans-serif;

        @include for-phone-only {
          min-width: fit-content;
        }

        &:hover {
          border: 1px solid #444;
        }
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
    width: 48%;
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
      font-weight: 500;
      margin-bottom: 0;
    }

    i {
      cursor: pointer;
    }
  }
  .modal-content {
    padding: 24px 0;

    @include for-phone-only {
      padding: 0;
    }
    textarea {
      height: 200px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: 'Montserrat', sans-serif;
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

</style>
