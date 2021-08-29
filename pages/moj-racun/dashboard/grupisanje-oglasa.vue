<template>
  <div class="upravljanje-wrapper">
    <div class="grouped-inner">
      <div class="left">
        <h2 class="heading">Izaberite oglase koje želite grupisati</h2>
        <div class="grid-layout">
          <div v-for="listing in listings" @click.stop.prevent="addToSelected(listing)" class="overlay">
            <div :class="['blur', selectedListings.includes(listing) ? 'blured' : '']">
              <font-awesome-icon v-if="selectedListings.includes(listing)" icon="check-square" class="checked"></font-awesome-icon>
            </div>
            <ListingCard :listing="listing" :key="listing.id" :from="false"/>
          </div>
          <div class="fixed-btn" v-if="selectedListings.length">
            <ActionButton placeholder="Završeni odabir artikala za grupisanje" @action="filterSelectedListings"></ActionButton>
          </div>
        </div>
      </div>
      <div class="right" v-if="selectedListings.length">
        <h2 class="heading">Odabrani oglasi:</h2>

        <div class="mini-wrapper">
          <div v-for="listing in selectedListings" :listing="listing" :key="listing.id" class="mini-card">
            <img src="/hotel.webp" alt="">
            <p>Stan sarajevo malta</p>
          </div>
        </div>
        <h2 class="grp-heading">Naziv grupnog oglasa</h2>
        <input type="text" v-model="groupedListingsTitle">
        <ActionButton placeholder="Objavi grupni oglas" @action="publishGroupedListings"></ActionButton>
        <Snackbar></Snackbar>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ListingCard from "@/components/listingCard/ListingCard";
import ActionButton from "@/components/actionButtons/ActionButton"
import Snackbar from "@/components/global/Snackbar";

@Component({
  components: {
    ListingCard,
    ActionButton,
    Snackbar
  },
})

export default class GrupisanjeOglasa extends Vue {
  listings = [];
  groupedListingsTitle = '';
  selectedListings = [];
  filteredIds = [];

  payload = {
    title: this.groupedListingsTitle,
    listings: this.filteredIds
  }

  async created() {
    await this.fetchUserListings();
  }

  showActiveListings() {
    this.$modal.show('active-listings');
  }

  async fetchUserListings() {
    try {
      let res = await this.$axios.get('/profile/listings');

      this.listings = res.data.data;
    } catch(e)  {
      console.log(e)
    }
  }

  async publishGroupedListings() {
    try {
      await this.$axios.post('/listings/' + this.filteredIds[0] + '/group', {
        listings: this.filteredIds,
        title: this.groupedListingsTitle
      });

      this.$snackbar.show({
        text: "Uspješno ste objavili grupni oglas",
        timeout: 1000,
        type: "error"
      });

    } catch(e)  {
      console.log(e)
    }
  }

  addToSelected(l) {
    if(this.selectedListings.includes(l)) {
      let index = this.selectedListings.findIndex(item => item.id === l.id)

      this.selectedListings.splice(index, 1)
    } else {
      this.selectedListings.push(l);

    }
  }

  filterSelectedListings() {
    let result = this.selectedListings.map(item => item.id);
    this.filteredIds = result;

    this.$snackbar.show({
      text: "Grupisali ste odabrane oglase",
      timeout: 1000,
      type: "error"
    });
  }
}
</script>

<style scoped lang="scss">
.upravljanje-wrapper {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  h2 {
    font-size: 20px;
    font-weight:500;
    margin-bottom: 24px;

  }

  .grouped-inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > div {
      flex: 1;
    }

    .left {
      padding-bottom: 78px;
      position: relative;
      display:flex;
      flex-direction: column;
      flex: 4;
      .fixed-btn {
        position: fixed;
        bottom: 24px;
        z-index:3;
      }
    }

    .right {
      display: flex;
      padding-left: 24px;
      margin-left: 24px;
      flex: 2;
      box-sizing: border-box;
      border-left: 1px solid #f1f1f1;
      flex-direction: column;

      .mini-wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 12px;
        grid-row-gap: 12px;

        .mini-card {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: fit-content;
          img {
            height: 120px;
            width: 100%;
            border-radius: 10px;
            margin-bottom: 12px;
          }

          p {
            font-weight: 500;
            font-size: 15px;
          }
        }
      }

      .grp-heading {
        margin-top: 24px;
        border-top: 1px solid #dcdcdc;
        font-size: 17px;
        padding-top: 24px;
      }

      input {
        display: flex;
        width: 100%;
        height: 50px;
        border: 1px solid #ddd;
        border-radius: 4px;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        margin-right: 24px;
        transition: 0.1s all ease;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 500;
        font-family: 'Raleway', sans-serif;
        margin-top: 12px;
        &:focus {
          outline: none;
        }
      }
    }
  }
}

.grid-layout {
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  padding: 0;
}

.overlay {
  position: relative;
  height: fit-content;
  cursor: pointer;
  .blur {
    &.blured {
      position: absolute;
      color: white;
      z-index:3;
      height: 100%;
      width: 100%;
      display:flex;
      border-radius: 10px;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, .5);
      -webkit-backdrop-filter: blur(0.2em);
      backdrop-filter: blur(2px);

      .checked {
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background-color: transparent;
        color: #D63946;
      }

    }
  }

}

.heading {
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
</style>
