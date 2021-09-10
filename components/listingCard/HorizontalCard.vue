<template>
  <div class="listing-card-wrapper">
<!--    <nuxt-link :to="{ path: '/artikal/' + listing.id }">-->
<!--      <div class="img-wrapper-main">-->
<!--        <label class="type" v-if="$device.isMobile">{{ listing.listing_type.title }}</label>-->

<!--        <label class="publisher" v-if="!$device.isMobile">-->
<!--          <font-awesome-icon icon="bullhorn"></font-awesome-icon>-->
<!--          <span>{{ translateType() }}</span>-->
<!--        </label>-->
<!--        <label class="bottom" v-if="!$device.isMobile">-->
<!--          <button-->
<!--            v-for="(attr, index) in specialAttributes"-->
<!--            :key="index"-->
<!--            class="standard-tag"-->
<!--          >-->
<!--            {{ attr.value }}-->
<!--            <p v-if="attr.name === 'Kvadratura'"> m²</p>-->
<!--            <font-awesome-icon v-if="attr.name === 'Broj soba'" icon="door-closed"></font-awesome-icon>-->
<!--          </button>-->
<!--        </label>-->
<!--        <img src="/stan.jpg" alt="">-->
<!--      </div>-->
<!--      <div :class="['listing-card-content', listing.sponsored !== 0 ? 'sponsored' : '']">-->
<!--        <div class="column">-->
<!--          <div class="title-price">-->
<!--            <div class="title-box">-->
<!--              <div class="pb-5 border-b border-gray-200">-->
<!--                <h3 class="text-lg leading-6 font-medium text-gray-900">-->
<!--                  {{listing.title }}-->
<!--                </h3>-->
<!--              </div>-->
<!--&lt;!&ndash;              <div v-if="!$device.isMobile" class="aprox">&ndash;&gt;-->
<!--&lt;!&ndash;                {{ differenceInPrice(parseInt(this.avgPrice), parseInt(this.listing.price)) }} ispod prosječne cijene&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--            </div>-->
<!--          </div>-->

<!--          &lt;!&ndash; Potrebno u responsu vratitit ime grada, category slug i korisnika &ndash;&gt;-->
<!--          <div class="address">-->
<!--            <p>{{ listing.address }}</p>-->
<!--          </div>-->
<!--          <div class="main-options" v-if="$device.isMobile">-->
<!--            <label v-show="this.listing.price < this.avgPrice" @click.stop.prevent="showTooltip = true">-->
<!--              {{ differenceInPrice(parseInt(this.avgPrice), parseInt(this.listing.price)) }}-->
<!--              <font-awesome-icon icon="sort-down"></font-awesome-icon>-->
<!--            </label>-->
<!--            <label-->
<!--              v-for="(attr, index) in specialAttributes"-->
<!--              :key="index"-->
<!--              >-->
<!--                {{ attr.value }}-->
<!--                <p v-if="attr.name === 'Kvadratura'">m²</p>-->
<!--                <font-awesome-icon v-if="attr.name === 'Broj soba'" icon="door-closed"></font-awesome-icon>-->
<!--            </label>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="price">-->
<!--          <h1>{{ this.$moment(listing.published_at).fromNow() }}</h1>-->
<!--          <div class="price-div">-->
<!--            <p class="price-label">{{ parseInt(listing.price) }} KM</p>-->
<!--            <b v-if="listing.listing_type.shortname === 'rent-for-a-day'">dan</b>-->
<!--            <b v-if="listing.listing_type.shortname === 'rent'">mj</b>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </nuxt-link>-->
    <div class="bg-white cursor-pointer sm:w-full horizontal-card border-black h-36 mb-6 flex flex-col sm:flex-row gap-5 select-none">
      <img
        src="/test/img1.jpg"
        class="min-h-full w-48 rounded-lg bg-gray-100 bg-center object-cover"
      >
      <div class="flex sm:flex-1 flex-col gap-2 p-1 justify-between">
        <h1 class="text-xl font-normal  text-gray-800">
          {{ listing.title }}
        </h1>
        <p class="text-gray-500 text-sm font-light line-clamp-3">
          {{ listing.description }}
        </p>
        <div class="flex  justify-between">

          <div class="flex flex-row items-center">
            <button
              v-for="(attr, index) in specialAttributes"
              :key="index"
              class='mr-4 flex items-center gap-1 sm:text-md border border-gray-300 px-2 py-1 rounded-md transition-colors'
            >
              {{ attr.value }}
              <p v-if="attr.name === 'Kvadratura'">m²</p>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="attr.name === 'Broj soba'">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
          <div class="flex flex-row items-center">
            <button
              class='flex items-center gap-1 sm:text-lg border border-gray-300 px-1 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500'
            >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path></svg>
            </button>
            <button
              class='ml-4 flex items-center font-medium gap-1 sm:text-md px-2 py-2 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500'
            >
              {{ listing.price }} KM
            </button>
          </div>
        </div>
      </div>
    </div>
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
  transition: 0.3s all ease;

  @include for-phone-only {
    width: 100%;
    height: 100%;
    flex-direction: row;
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
padding-left: 16px;

@include for-phone-only {
  padding: 0;
}

.description {
  font-size: 14px;
  line-height: 21px;
  padding: 29px 0;
  height: 100%;
  padding-bottom: 12px;

  @include for-phone-only {
    padding-bottom: 12px;
  }
}

.price {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @include for-phone-only {
    flex-direction: row-reverse;
  }

  h1 {
    font-size: 14px;
    font-weight: 500;

    @include for-phone-only {
      font-size: 10px;
      font-weight: 500
    }
  }

  .price-div {
    display: flex;
    align-items: center;
    border: 1px solid #4444;
    border-radius: 5px;
    padding: 8px 12px;
    @include for-phone-only {
      padding: 4px 8px;
    }
    p {
      font-weight: 500;
      font-size: 18px;

      @include for-phone-only {
        font-weight: 600 !important;
        font-size: 12px;
      }
    }

    b {
      font-weight: 500;
      font-size: 14px;
      border-left: 1px solid #444;
      padding-left: 8px;
      margin-left: 8px;
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
    justify-content: space-between;
    position: relative;
    width: 100%;

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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 200px;


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
    flex-wrap: wrap;

    label {
      margin-bottom: 4px;
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
      text-transform: none;
      position: static;
      font-size: 12px;

      &:last-child {
        margin-right: 0;
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

.aprox {
  min-height: 30px;
  padding: 0 8px;
  font-size: 13px;
  background: #f1f1f1;
  font-weight: 600;
  box-sizing: border-box;
  margin-bottom: 12px;
  width: fit-content;
  display: flex;
  align-items: center;
  border-radius: 4px;
}

.img-wrapper-main {
  position: relative;

  label {
    position: absolute;
    left: 8px;
    top: 8px;
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
      position: absolute;
      left: 4px;
      top: 4px;
      border-radius: 3px;
      background: #fff;
      color: #444;
      display: flex;
      align-items: center;
      justify-content: center;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
      height: 18px;
      padding: 0 4px;
      font-size: 10px;
      font-weight: 600;
      text-transform: capitalize;
      box-shadow: rgb(0 0 0 / 12%) 0px 6px 5px;
      z-index: 2;
    }

    &.bottom {
      bottom: 8px;
      display: flex;
      top: inherit !important;
      left: 0px;
      width: fit-content;
      justify-content: flex-start;
      min-width: fit-content;
      background: transparent;
      box-shadow: none;

      button {
        font-family: 'Roboto', sans-serif;
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
      top: 8px;

      svg {
        margin-right: 8px;
      }
    }

    &.sponsored {
      right: 8px !important;
      left: inherit;
      background: #D63946;
      color: #fff;

      svg {
        margin-rigth: 4px;
      }

      span {
        text-transform: capitalize;
      }
    }
  }


}

.horizontal-card {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ececec;
}
</style>
