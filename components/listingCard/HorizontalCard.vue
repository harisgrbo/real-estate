<template>
  <div class="listing-card-wrapper">
    <label class="type" v-if="!$device.isMobile">{{ listing.listing_type.title }}</label>
    <label class="publisher" v-if="!$device.isMobile">
      <font-awesome-icon icon="bullhorn"></font-awesome-icon>
      <span>{{ translateType() }}</span>
    </label>
    <label class="type" v-if="!$device.isMobile">
      <button
        v-for="(attr, index) in specialAttributes"
        :key="index"
        class="standard-tag"
      >
        {{ attr.value }}
        <p v-if="attr.name === 'Kvadratura'"> m²</p>
        <font-awesome-icon v-if="attr.name === 'Broj soba'" icon="door-closed"></font-awesome-icon>
      </button>
    </label>
    <nuxt-link :to="{ path: '/artikal/' + listing.id }">
      <img src="/stan.jpg" alt="">
      <div class="listing-card-content">
        <div class="column">
          <div class="title-price">
            <div class="title-box">
              <p>{{ listing.title }}</p>
            </div>
          </div>

          <!-- Potrebno u responsu vratitit ime grada, category slug i korisnika -->
          <div class="address">
            <p>Alojza Benca 12, Novo Sarajevo</p>
          </div>
          <div class="main-options" v-if="$device.isMobile">
            <label class="first">{{ listing.listing_type.title }}</label>
            <label v-show="this.listing.price < this.avgPrice" @click.stop.prevent="showTooltip = true">
              {{ differenceInPrice(parseInt(this.avgPrice), parseInt(this.listing.price)) }}
              <font-awesome-icon icon="sort-down"></font-awesome-icon>
              <div class="tooltip" v-if="showTooltip">
                Oglas je jeftiniji {{ differenceInPrice(parseInt(this.avgPrice), parseInt(this.listing.price)) }} od prosječne cijene nekretnine u ovoj kategoriji
              </div>
            </label>
            <label
              v-for="(attr, index) in specialAttributes"
              :key="index"
              >
                {{ attr.value }}
                <p v-if="attr.name === 'Kvadratura'">m²</p>
                <font-awesome-icon v-if="attr.name === 'Broj soba'" icon="door-closed"></font-awesome-icon>
            </label>
            <label>
              Dvosoban
            </label>
          </div>
        </div>
        <div class="description" v-if="!$device.isMobile">
          {{ listing.description }}
        </div>
        <div class="price">
<!--            <h1>{{ listing.user.name }}</h1>-->
          <h1>eNekretnine</h1>
          <div class="price-div">
            <p class="price-label">{{ parseInt(listing.price) }} KM</p>
            <b v-if="listing.listing_type.shortname === 'rent-for-a-day'">/dan</b>
            <b v-if="listing.listing_type.shortname === 'rent'">/mj</b>
          </div>
        </div>
      </div>
    </nuxt-link>
    <Snackbar />
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import Snackbar from "@/components/global/Snackbar";

@Component({
  components: {Snackbar}
})

export default class HorizontalCard extends Vue{
  @Prop({ type: Object }) listing
  @Prop({}) avgPrice

  // Translate listing type
  types = {
    rent: 'Iznajmljivanje',
    sell: 'Prodaja',
    buy: 'Potraznja'
  }
  saved = false;
  showTooltip = false;
  specialAttributes = [];
  specialAttributesKeys = [
    "Kvadratura",
    "Broj soba",
  ];

  created() {
    this.specialAttributes = this.getSpecialAttributes().slice();
  }

  differenceInPrice(a, b) {
    let diff = 100 * ((a - b) / a );
    return parseInt(diff) + '%';
  }

  getSpecialAttributes() {
    if (!this.listing.attributes) return [];
    return this.listing.attributes.filter((item) => {
      return this.specialAttributesKeys.indexOf(item.name) !== -1;
    });

    console.log(this.specialAttributes)
  }

  get listingType() {
    return this.types[this.listing.listing_type];
  }


  translateType() {
    if(this.listing.listing_type.shortname === 'buy') {
      return 'Potražnja'
    } else if(this.listing.listing_type.shortname === 'sell') {
      return 'Prodaja'
    } else if(this.listing.listing_type.shortname === 'rent-for-a-day'){
      return 'Stan na dan'
    } else if(this.listing.listing_type.shortname === 'rent') {
      return 'Iznajmljivanje'
    }
  }

  saveListing() {
    this.$axios
      .post('/listings/save/' + this.listing.id)
      .then(() => {
        this.saved = true;
        this.$snackbar.show({
          text: "Uspjesno ste se spasili artikal!",
          timeout: 3000,
          type: "success"
        });
      })
      .catch(error => {
        console.log(error)
        this.$snackbar.show({
          text: "Test",
          timeout: 3000,
          type: "danger"
        });
      })
  }

  sliceAddress(address) {
    return address.slice(0, 10) + '...'
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
a {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  padding: 24px 0;
  transition: 0.3s all ease;
  border-bottom: 1px solid #f1f1f1;
  height: 200px;

  @include for-phone-only {
    width: 100%;
    height: 100%;
    flex-direction: row;
    padding: 0;
    padding-bottom: 12px;
    border-bottom: 1px solid #f1f1f1;
    box-sizing: border-box;

  }
}
.listing-card-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;

  @include for-phone-only {
    flex-direction: row;
    height: 120px;
    margin-bottom: 12px;
  }

  label {
    position: absolute;
    left: 8px;
    top: 24px;
    border-radius: 5px;
    background: #fff;
    color: #444;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 24px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 500;
    text-transform: capitalize;
    box-shadow: rgb(0 0 0 / 12%) 0px 6px 5px;

    z-index: 2;

    &.type {
      background: none;
      top: 190px;
      left: 0px;
      box-shadow: none;
      border-radius: 0px;

      @include for-phone-only {
      }

      button {
        font-family: 'Montserrat', sans-serif;
        border: none;
        margin-right: 8px;
        border-radius: 5px;
        background: #fff;
        box-shadow: rgb(0 0 0 / 12%) 0px 6px 5px;
        color: #444;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 24px;
        padding: 0 4px;
        font-size: 12px;
        font-weight: 500;
        box-shadow: rgb(0 0 0 / 12%) 0px 6px 5px;

        span {
          text-transform: none;
        }

        svg {
          margin-left: 4px;
        }
      }
    }

    &.rating {
      right: 8px !important;
      left: inherit;

      i {
        font-size: 13px;
        margin-right: 5px;
      }
    }

    &.publisher {
      top: 32px;

      svg {
        margin-right: 8px;
      }
    }
  }


img {
height: 200px;
width: 300px;
min-width: 300px;
border-radius: 10px;

@include for-phone-only {
  height: 100%;
  width: 120px;
  max-width: 120px;
  min-width: 120px;
  margin-right: 12px;
  border-radius: 5px;
}
}
.column {
display: flex;
width: 100%;
flex-direction: column;
  height: 100%;
}

.listing-card-content {
display: flex;
flex-direction: column;
justify-content: space-between;
width: 100%;
padding: 0 16px;

@include for-phone-only {
  padding: 0;
}

.description {
  font-size: 14px;
  line-height: 21px;
  padding: 29px 0;
  height: 100%;

  @include for-phone-only {
    padding-bottom: 12px;
  }
}

.price {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;


  h1 {
    font-size: 16px;
    font-weight: 600;

    @include for-phone-only {
      font-size: 14px;
    }
  }

  .price-div {
    display: flex;
    align-items: center;
    @include for-phone-only {

      p {
        font-weight: 600 !important;
      }
    }
    p {
      font-weight: 500;

    }

    b {
      margin-left: 12px;

    }
  }
}

.title-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #434343;
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 10px;

  @include for-phone-only {
    margin-bottom: 8px;
  }

  .title-box {
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;

    p {
      position: relative;
      padding: 0 8px;
      color: #434343;
      font-weight: 400;
      font-size: 20px;
      margin-bottom: 8px;

      @include for-phone-only {
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 0;
      }

      &:first-child {
        padding-left: 0;
        &::after {
          display: none;
        }
      }

      &::after {
        position: absolute;
        content: "";
        height: 4px;
        width: 4px;
        border-radius: 2px;
        background: #444;
        top: 9px;
        left: -1px
      }
    }
  }

  svg {
    font-size: 22px;
    color: #dcdcdc;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .price {
    font-weight: 600;
  }
}

  .address {
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;

    &::after {
      position: absolute;
      content: "";
      bottom: -16px;
      width: 100px;
      border-bottom: 1px solid #ddd;
      left: 0;

      @include for-phone-only {
        display: none
      }
    }

    p {
      position: relative;
      padding: 0 8px;
      color: #434343;
      font-weight: 500;
      font-size: 15px;

      @include for-phone-only {
        font-weight: 400;
        margin-bottom: 8px;
        font-size: 13px;
      }

      &:first-child {
        padding-left: 0;
        &::after {
          display: none;
        }
      }

      &::after {
        position: absolute;
        content: "";
        height: 4px;
        width: 4px;
        border-radius: 2px;
        background: #444;
        top: 6px;
        left: -1px;

      }
    }
  }

  .main-options {
    display: flex;
    flex-direction: row;
    height: fit-content;

    label {
      margin-right: 8px;
      height: 20px;
      border: none;
      background: #f1f1f1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      padding: 0 4px;
      box-shadow: none;
      box-sizing: border-box;
      position: relative;
      text-transform: none;

      .tooltip {
        display: none;
        position: absolute;
        top: 0px;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 10;
        background: #000000ab;
        border-radius: 8px;
        padding: 4px;
        width: 200px;
        text-transform: capitalize;
        color: #fff;
        line-height: 20px;
        display: flex;
      }

      &.first {
        background: #0B8489;
        color: #fff;
      }

      svg {
        margin-top: 0;
        margin-left: 4px;
      }
    }
  }

.icons-date {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e9e9e9;

  > div {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 13px;
    font-weight: 500;

    i {
      color: #757B9A;
      margin-right: 8px;
    }
  }

  p {
    font-size: 13px;
    color: #434343;
    font-weight: 500;
  }
}
}
}
</style>
