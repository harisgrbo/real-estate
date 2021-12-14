<template>
  <div class="listing-card-wrapper relative">
    <nuxt-link :to="{ path: '/artikal/' + listing.id }">
      <label class="publisher shadow-sm">
        <span class="flex flex-row items-center">{{ translateType() }}
        </span>
      </label>
      <div class="bg-white cursor-pointer sm:w-full horizontal-card border-black mb-6 flex flex-col sm:flex-row gap-5 select-none">
        <div class="overflow-hidden relative image-wrapper">
          <swiper v-if="listing.images.length" class="swiper" :options="swiperOptionCard" @click.native.stop>
            <swiper-slide v-for="(img, index) in listing.images" :key="index">
              <img class="slider-img swiper-lazy" :data-src="img.url" alt="">
              <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </swiper-slide>
            <div
              class="swiper-button-prev swiper-button-white"
              slot="button-prev"
            ></div>
            <div
              class="swiper-button-next swiper-button-white"
              slot="button-next"
            ></div>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <img v-else src="/noimage.jpeg" alt="">
        </div>
        <div class="flex w-full flex-col gap-2 p-1 justify-between">
          <div>
            <button
              class='w-full flex items-center font-medium flex flex-row items-center justify-between'
            >
              <h1 class="text-lg font-medium text-gray-800 text-left">
                {{ listing.title }}
              </h1>
            </button>
            <p class="mt-5 text-sm text-gray-800 font-medium leading-5">{{ listing.address }}</p>
          </div>
          <div class="flex  justify-between items-center">

            <div class="flex flex-row items-center special">
                <button
                  v-for="(attr, index) in specialAttributes"
                  :key="index"
                  class='px-2 flex items-center gap-1 sm:text-lg border border-gray-300 py-0 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500 flex flex-row items-center mr-2'
                >
                  <img v-if="attr.name === 'Broj soba'" src="/door.svg" alt="">
                  <img v-if="attr.name === 'Sprat'" src="/stairs.svg" alt="">
                  {{ attr.value }}
                </button>
            </div>
            <div class="flex flex-row items-center">
              <button
                class='flex items-center gap-1 sm:text-lg py-1 px-1 hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500'
              >
                <p class="text-lg w-auto font-semibold">{{ listing.price }} KM</p>

              </button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar />
    </nuxt-link>
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
  swiperOptionCard = {
    spaceBetween: 0,
    // centeredSlides: true,
    // slidesOffsetBefore: '100px',
    // slidesOffsetAfter: '100px',
    // slidesOffsetBefore: '0px',
    loop: true,
    autoplay: false,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    touchRatio: 0.2,
    slideToClickedSlide: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    preloadImages: false,
    lazy: {
      //  tell swiper to load images before they appear
      loadPrevNext: false,
      // amount of images to load
      loadPrevNextAmount: 1,
    },
  }

  created() {
    this.specialAttributes = this.getSpecialAttributes().slice();
    console.log(this.listing)
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

    console.log(this.specialAttributes, 'special')
  }

  get listingType() {
    return this.types[this.listing.listing_type];
  }


  translateType() {
    if(this.listing.listing_type.shortname === 'buy') {
      return 'Potražnja'
    } else if(this.listing.listing_type.shortname === 'sell') {
      return 'Prodaja'
    } else if(this.listing.listing_type.shortname === 'booking'){
      return 'Izdavanje na dan'
    } else if(this.listing.listing_type.shortname === 'rent') {
      return 'Dugoročno izdavanje'
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
  height: fit-content;
  width: 100%;
  position: relative;

  @include for-phone-only {
    flex-direction: row;
    height: 120px;
    margin-bottom: 12px;
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
        font-family: 'Outfit', sans-serif;
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
  min-width: 250px;
  width: 250px;
  max-width: 250px;
  border-radius: 7px;
  height: 180px;
  max-height: 180px;

  img {
    height: 190px !important;
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
    border: 1px solid #ececec;
    width: fit-content;
    margin-right: 8px;
    font-weight: 500;
    background: #f9f9f9;
    font-size: 13px;
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

.publisher {
  position: absolute;
  left: 8px;
  top: 8px;
  position: absolute;
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

  svg {
    margin-right: 8px;
  }
}

</style>
