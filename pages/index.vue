<template>
  <div class="homepage-wrap">
    <h2 class="heading">
      Premium agencije
    </h2>
    <div class="most-visited-grid agencies">
      <PremiumAgency v-for="city in 6"></PremiumAgency>
    </div>
    <h2 class="heading">
      Najtraženije lokacije
    </h2>
    <div class="most-visited-grid">
      <MostVisitedCard v-for="city in most_visited_cities" :img="city.img" :city="city.city"></MostVisitedCard>
    </div>

    <ul class="cw-ul">
      <li v-for="(tab, index) in tabs"
          @click="activeTab = index"
          :class="[activeTab === index? 'active' : '']"
      >
        {{ tab }}
      </li>
    </ul>

    <div class="grid-layout" v-if="activeTab === 0">
      <ListingCard v-for="listing in listings" :listing="listing" :key="listing.id"/>
    </div>

    <div class="grid-layout" v-if="activeTab === 1">
      <ListingCard v-for="listing in listings" :listing="listing" :key="listing.id"/>
    </div>

    <div class="grid-layout" v-if="activeTab === 2">
    </div>

    <client-only>
      <infinite-loading direction="bottom" @infinite="infiniteHandler">
        <div slot="spinner">
          <img src="/load.svg" alt="" class="loader-index">
        </div>
        <div slot="no-more">
          <p class="loader-msg">Nema više rezultata</p>
        </div>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
  import { Component, Vue} from "nuxt-property-decorator";
  import ListingCard from "@/components/listingCard/ListingCard";
  import Categories from "~/components/publishInputs/Categories";
  import PublishShortcut from "@/components/publish/PublishShortcut";
  import MostVisitedCard from "@/components/MostVisitedCard"
  import PremiumAgency from "@/components/PremiumAgency"

  @Component({
    components: {
      Categories,
      ListingCard,
      PublishShortcut,
      MostVisitedCard,
      PremiumAgency
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',
    async asyncData(ctx) {
      let listings = []
      let meta = null
      let page = 1

      try {
        let res = await ctx.app.$axios.get('/listings/home')
        listings = res.data.data
        meta = res.data.meta
        page = 2
      } catch (e) {
        console.log(e)
      }

      return {
        listings,
        meta,
        page
      }
    }
  })

  export default class Homepage extends Vue {
    tabs = [
      'Posljednji oglasi',
      'Oglasi iz agencija',
      'Novogradnja'
    ]
    activeTab = 0;
    most_visited_cities = [
      {
        city: 'Sarajevo',
        img: '/landscape/cityscape.svg'
      },
      {
        city: 'Neum',
        img: '/landscape/island.svg'
      },
      {
        city: 'Mostar',
        img: '/landscape/cape.svg'
      },
      {
        city: 'Banja Luka',
        img: '/landscape/hills.svg'
      },
      {
        city: 'Bihać',
        img: '/landscape/waterfall-1.svg'
      },
      {
        city: 'Tuzla',
        img: '/landscape/village.svg'
      },
      {
        city: 'Zenica',
        img: '/landscape/home-1.svg'
      },
      {
        city: 'Travnik',
        img: '/landscape/mill.svg'
      },


    ]
    infiniteHandler($state) {
      this.$axios.get('/listings/home', {
        params: {
          page: this.page,
        },
      }).then(({ data }) => {
        if (data.data.length) {
          this.page++;
          this.listings = this.listings.concat(data.data)
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
@mixin for-laptop {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}
@mixin for-desktop-up {
  @media (min-width: 1200px) {
    @content;
  }
}
@mixin for-big-desktop-up {
  @media (min-width: 1800px) {
    @content;
  }
}
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.homepage-wrap {
  display: flex;
  flex-direction: column;
  padding-bottom: 120px;
  width: 100%;
  padding: 0 80px;
  box-sizing: border-box;

  @include for-phone-only {
    padding-bottom: 90px;
    padding: 0 12px;
  }

  h1 {
    word-wrap: break-word !important;
    font-size: 20px !important;
    font-weight: 500 !important;
    line-height: 1.125em !important;
    color: #484848 !important;
    margin-bottom: 36px !important;
    margin-top: 32px;

    @include for-phone-only {
      margin-left: 12px;
      margin-top: 24px;
    }
  }

}
.container {
  background: black;
}

.grid-layout {
  padding: 0px;
  grid-column-gap: 16px !important;

  @include for-phone-only {
    padding: 0px;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}

.cw-ul {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 42px 0 36px 0;
  border-bottom: 1px solid #EBEBEB !important;

  @include for-phone-only {
    min-width: 100%;
    overflow-x: scroll;
  }

  li {
    font-size: 14px !important;
    line-height: 26px !important;
    margin-right: 24px;
    padding-bottom: 8px;
    height: 40px;
    position: relative;
    cursor: pointer;
    text-transform: uppercase;
    font-weight:500;

    @include for-phone-only {
      min-width: fit-content;
    }

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #0B8489;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #0B8489;
      }
    }
  }
}

.most-visited-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 12px;
  grid-row-gap: 42px;
  width: 100%;
  justify-content: center;
  box-sizing: border-box;

  &.agencies {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-column-gap: 24px;
    grid-row-gap: 24px;

    @include for-phone-only {
      grid-template-columns: repeat(2, 1fr);
      box-sizing: border-box;
      grid-column-gap: 12px;
      grid-row-gap: 12px;
    }
  }
}

h2.heading {
  margin-top: 42px;
  color: rgb(72, 72, 72) !important;
  font-weight: 500 !important;
  padding-bottom: 24px;
  font-size: 22px !important;
  border-bottom: 1px solid #EBEBEB !important;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 80px;
    height: 1px;
    background: #0B8489;
  }
}

.loader-index {
  height: 30px;
  margin: 36px 0;
}

.loader-msg {
  margin: 48px 0;
  font-size: 18px;
  font-weight: 400;
}


</style>
