<template>
  <div class="listing-card-wrapper mb-5" :class="['sponsored-' + listing.sponsored]">
    <label class="publisher">
        <span class="shadow-sm bg-white mr-2">
          {{ listing.listing_type }}
        </span>
      <span v-if="listing.has_discount" class="flex flex-row items-center bg-red-600 shadow-sm mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="#fff">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
          <p class="text-white font-medium">
            Akcija{{ ' -' + listing.discount * 100 + '%' }}
          </p>
        </span>
      <span v-if="listing.country_name === 'Turska'" class="flex flex-row items-center bg-red-600 shadow-sm mr-2">
          <p class="text-white font-medium">
            Turska
          </p>
        </span>
    </label>
    <nuxt-link :to="'/oglas/' + listing.slug" class="flex flex-row items-start">
      <div class="overflow-hidden relative image-wrapper bg-gray-50">
        <img class="main-image" :src="listing.thumbnail_url" alt="">
      </div>
      <div class="listing-card-content relative">
        <div class="flex flex-col justify-between items-start pb-4 h-full">
          <div class="w-full flex flex-col">
            <div class="address title">
              {{ listing.title }}
            </div>
            <p class="text-sm font-medium mt-1 flex flex-row items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ listing.address }}</p>
          </div>
          <div class="icons-date flex flex-row items-center justify-between w-full" v-if="listing.price != 0">
            <div class="important">
              <p :class="['new', listing.has_discount ? 'cross' : '']">{{ parseInt(listing.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} KM</p>
              <p v-show="listing.listing_type === 'Stan na dan' && ! listing.has_discount" class="pl-2">/ noć {{ listing.per_guest ? 'po osobi' : '' }}</p>
            </div>
            <div class="important" v-if="listing.has_discount">
              <p class="new">{{ parseInt(listing.price - listing.price * listing.discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} KM</p>
              <p v-show="listing.listing_type === 'Stan na dan'" class="pl-2">/ noć {{ listing.per_guest ? 'po osobi' : '' }}</p>
            </div>
          </div>
          <div class="icons-date flex flex-row items-center justify-between w-full" v-else>
            <div class="important">
              <p class="new">Na upit</p>
            </div>
          </div>
        </div>
        <div class="addresses">
          <div
            v-for="(attr, index) in specialAttributes"
            :key="index"
            class="flex flex-row items-center mr-2"
          >
            <img v-if="attr.name === 'Broj kreveta'" src="/double-bed.png" alt="">
            <img v-if="attr.name === 'Broj soba'" src="/door.svg" alt="">
            <img v-if="attr.name === 'Kvadratura'" src="/m2.png" alt="">
            <img v-if="attr.name === 'Broj gostiju'" src="/guests.png" alt="">
            {{ attr.value }}
            <p v-if="attr.name === 'Kvadratura'">
              m²
            </p>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton";

@Component({
  components: {ActionButton}
})

export default class SearchHorizontalCard extends Vue{
  @Prop({ type: Object }) listing
  @Prop({ type: Boolean, default: false}) from
  @Prop({ type: String }) action_text
  @Prop({}) type
  @Prop({ type: Boolean, default: false }) action

  // Translate listing type
  types = {
    rent: 'Iznajmljivanje',
    sell: 'Prodaja',
    buy: 'Potraznja'
  }
  custom_swiper = null;
  showTooltip = false;
  saved = false;
  showListingOptions = false;
  specialAttributes = [];
  specialAttributesKeys = [
    "Broj soba",
    "Kvadratura",
    "Broj kreveta",
    "Broj gostiju"

  ];
  specialRentAttributes = [];

  getSpecialAttributes() {
    if (!this.listing.attributes) return [];
    return this.listing.attributes.filter((item) => {
      return this.specialAttributesKeys.indexOf(item.name) !== -1;
    });
  }

  removeFromSaved(id) {
    this.$emit('remove-from-saved', id)
  }

  get normalAttributes() {
    return this.listing.attributes.filter(item => item.value !== true && item.value !== false);
  }

  created() {
    let index = this.specialAttributesKeys.indexOf('Kvadratura');

    if(this.listing.is_booking && index !== -1) {
      this.specialAttributesKeys.splice(index, 1)
    }

    this.specialAttributes = this.getSpecialAttributes().slice();
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
  border: 1px solid #c9c9c9;
  border-radius: 6px;
  z-index: 1;
  display: flex;
  flex-direction: row !important;
  transition: 0.3s all ease;

  @include for-phone-only {
    width: 100%;
    height: 100%;
    flex-direction: row;
    box-sizing: border-box;
    height: 162px;
  }
}
.listing-card-wrapper {
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  position: relative;

  @include for-phone-only {
    flex-direction: row;
    height: 160px;
    margin-bottom: 0;
  }

  a {
    align-items: flex-start;
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
    padding: 16px;
    height: 100%;

    @include for-phone-only {
      padding: 12px;
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
      padding-top: 10px;

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
        font-size: 18px;
        font-weight: 800;
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
        font-family: 'NunitoSans', sans-serif;;
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
  height: 200px;
}

.image-wrapper {
  min-width: 280px;
  width: 280px;
  max-width: 280px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  height: 180px;
  max-height: 180px;

  @include for-phone-only {
    min-width: 140px;
    width: 140px;
    max-width: 140px;
    max-height: 160px;
  }

  img {
    height: 180px !important;
    min-height: 180px !important;
    width: 100% !important;
    object-fit: cover;

    @include for-phone-only {
      min-height: 160px !important;
      height: 160px !important;
      max-height: 160px !important;
      width: auto;
    }
  }

  ::v-deep .swiper-slide {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    background: #f9f9f9 !important;

    &:focus {
      outline: none !important
    }
  }

}

.special {
  font-size: 14px;
  display: flex;
  font-weight: 300;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  img {
    height: 12px !important;
    width: 12px !important;
    border-radius: 0 !important;
    margin-right: 4px;
  }

  > button {
    width: fit-content;
    margin-right: 8px;
    font-weight: 500;
    font-size: 13px;
    max-width: fit-content;

    img {
      min-width: 12px;
    }
  }
}

.swiper-button-prev, .swiper-button-next {
  color: #002F34 !important;
  height: 30px;
  max-height: 30px;
  width: 30px;
  border-radius: 15px;
  padding: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  z-index: 10;
  transition: 0.3s all ease;

  @include for-phone-only {
    display: flex;
    background: rgba(241, 241, 241, 0.48);
  }

  &::after {
    font-size: 13px !important;
    line-height: 13px !important;
  }
}

::v-deep .swiper-pagination-bullet {
  width: 10px !important;
  height: 10px !important;
  border: 2px solid rgb(255, 255, 255) !important;
  background: #fff !important;
  opacity: 0.8 !important;
}
::v-deep .swiper-pagination-bullet-active {
  width: 10px !important;
  height: 10px !important;
  border: 3px solid white !important;
  background: #fff !important;
  opacity: 1 !important;
}

::v-deep .swiper-pagination {
  bottom: 12px !important;
}

::v-deep .swiper-slide.active {
  @include for-phone-only {
    width: 100% !important;
  }
}

::v-deep .swiper-slide {
  @include for-phone-only {
    width: 100% !important;
    max-width: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: #f9f9f9 !important;
  }
}

label {
  position: absolute;
  left: 4px;
  top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 20px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 500;
  z-index: 2;

  span {
    border-radius: 4px;
    color: #000;
    padding: 4px
  }

  @include for-phone-only {
    font-size: 12px;
    padding: 0 4px;
    border-radius: 2px;
    height: auto;
  }

  &.type {
    background: none;
    top: 162px;
    left: 0px;
    box-shadow: none;
    border-radius: 0px;

    @include for-phone-only {
    }

    button {
      font-family: 'NunitoSans', sans-serif;;
      border: none;
      margin-right: 8px;
      border-radius: 2px;
      background: #fff;
      //box-shadow: rgb(0 0 0 / 12%) 0px 6px 5px;
      color: #444;
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      height: 24px;
      padding: 0 4px;
      font-size: 12px;
      font-weight: 500;
      //box-shadow: rgb(0 0 0 / 12%) 0px 6px 5px;

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
    top: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;

    svg {
      margin-right: 3px;
    }

    span {
      margin-top: 8px;
    }

    &.sale {
      right: 8px !important;
      left: inherit;
      background: red;
      color: #fff;
      transform: rotate(
          45deg) translateX(4px);
      left: -49px;
      bottom: 108px;
      top: 232px;
      width: 150px;

      @include for-phone-only {
        top: 102px;
      }
    }
  }

  .country {
    bottom: 0;
    right: 8px;
    border-radius: 2px;
  }

  span.finished {
    color: #fff;
  }
}
.addresses {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 13px;

  > div {
    border: 1px solid #ececec;
    border-radius: 4px;
    height: 25px;
    width: fit-content;
    margin-right: 8px;
    padding: 0 4px;
    font-weight: 400;
    background: #fff;
    font-size: 13px;
    line-height: 8px;
    color: #000;
  }

  img {
    height: 15px !important;
    width: 15px !important;
    margin-right: 3px;
    max-width: 15px !important;
    min-width: 15px !important;
  }
}

.title {
  font-size: 16px !important;
  font-weight: 600 !important;

  @include for-phone-only {
    font-size: 15px !important;
  }
}

.important {
  font-size: 17px;
  font-weight: 600;
}

</style>

