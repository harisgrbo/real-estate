<template>
    <div class="listing-card-wrapper" :class="[from? 'blur' : '']">
      <label class="publisher shadow-sm">
        <span class="flex flex-row items-center">{{ translateType() }}
          <div v-if="listing.sponsored === 2 || listing.sponsored === 1" class="red-label ml-2">
             Sponzorisan
          </div>
        </span>
      </label>
      <div class="blured-background">
        <button @click="removeFromSaved(listing.id)">Izbriši iz spašenih</button>
      </div>
      <nuxt-link :to="this.$route.fullPath !== '/moj-racun/dashboard/grupisanje-oglasa'? '/artikal/' + listing.id : '' ">
        <div class="overflow-hidden relative">
          <swiper v-if="listing.images.length" class="swiper" :options="swiperOptionCard" @click.native.stop>
            <swiper-slide v-for="img in listing.images" :key="index">
              <img :src="img.url" alt="">
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
          <label class="publisher shadow-sm sale" v-if="action">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
            <span>AKCIJA</span>
          </label>
        </div>
        <div class="listing-card-content">
          <div class="flex flex-col justify-between items-start">
            <div class="address title">
              <p>
                {{ listing.title }}
              </p>
            </div>
            <div class="icons-date">
              <div class="important">
                <p :class="['price', action ? 'old' : '']">{{ parseInt(listing.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} KM</p>
                <p v-if="action" class="new">{{ parseInt(listing.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} KM</p>
                <p v-show="type === 'rent'" class="pl-2">/ noćenje</p>
              </div>
            </div>
          </div>
<!--          <div class="addresses">-->
<!--            <div-->
<!--              v-for="(attr, index) in specialAttributes"-->
<!--              :key="index"-->
<!--              class="flex flex-row items-center mr-2"-->
<!--            >-->
<!--              {{ attr.value }}-->
<!--            </div>-->
<!--          </div>-->
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

export default class ListingCard extends Vue{
  @Prop({ type: Object }) listing
  @Prop({ type: Boolean, default: false}) from
  @Prop({}) type
  @Prop({ type: Boolean, default: false }) action

  // Translate listing type
  types = {
    rent: 'Iznajmljivanje',
    sell: 'Prodaja',
    buy: 'Potraznja'
  }
  saved = false;
  specialAttributes = [];
  specialAttributesKeys = [
    "Broj soba",
    "Godina izgradnje"
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
    }
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

  getSpecialAttributes() {
    if (!this.listing.attributes) return [];
    return this.listing.attributes.filter((item) => {
      return this.specialAttributesKeys.indexOf(item.name) !== -1;
    });
  }

  removeFromSaved(id) {
    this.$emit('remove-from-saved', id)
  }


  created() {
    this.specialAttributes = this.getSpecialAttributes().slice();

    console.log(this.listing)
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
    width: 240px;
    border-radius: 10px;
  }
  .listing-card-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    width: fit-content;
    max-width: fit-content;
    overflow: hidden;

    &:hover {
      .swiper-button-prev,
      .swiper-button-next {
        display: flex !important;
      }
    }

    label {
      position: absolute;
      left: 8px;
      top: 8px;
      border-radius: 7px;
      background: #fff;
      color: #444;
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      height: 24px;
      padding: 0 2px;
      padding-left: 4px;
      font-size: 12px;
      font-weight: 600;

      z-index: 2;

      &.type {
        background: none;
        top: 162px;
        left: 0px;
        box-shadow: none;
        border-radius: 0px;

        @include for-phone-only {
        }

        button {
          font-family: 'Lato', sans-serif;
          border: none;
          margin-right: 8px;
          border-radius: 5px;
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
        top: 8px;

        svg {
          margin-right: 8px;
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

    img {
      height: 280px;
      width: 100%;
      border-radius: 7px;
      object-fit: cover;

      @include for-phone-only {
        height: 154px;
      }
    }

    .listing-card-content {
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      .title-price {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #434343;
        position: relative;

        > div {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 500 !important;
          font-size: 16px !important;
          line-height: 20px !important;
        }

      }

      .address {
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        &.title {
         p {
           font-weight: 500 !important;
           font-size: 17px;
           line-height: 20px !important;
         }
        }

        p {
          position: relative;
          color: #000;
          font-weight: 400;
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;

          &:first-child {
            padding-left: 0;
            &::before {
              display: none;
            }
          }

          &::before {
            position: absolute;
            content: "";
            height: 4px;
            width: 4px;
            border-radius: 2px;
            background: #444;
            top: 8px;
            left: 0px;
          }
        }
      }

      .icons-date {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .icons {
          display:flex;
          align-items: center;
        }

        .price {
          font-weight: 400 !important;
          font-size: 15px !important;
          color: #444;
          line-height: 20px;
          margin-top: 8px;

          @include for-phone-only {
            font-size: 13px;
          }

          &.old {
            text-decoration: line-through;
          }
        }

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

        .important {
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          p {
            font-size: 12px;
          }

          .new {
            font-size: 13px !important;
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

  .icons {
    display: flex;
    align-items: center;
    svg {
      font-size: 16px;
      margin-right: 8px;
    }

    p {
      margin-right: 10px;
      margin-top: 0 !important;
      font-weight: 500;
    }
  }

  .blured-background {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 6;
    border-radius: 7px;
    box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
    padding: 24px;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    transition: 0.3s all ease;

    button {
      height: 48px;
      background: #023246;
      border-radius: 4px;
      border: none;
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
      padding: 0 24px;
      color: #fff;
      cursor: pointer;
      justify-content: center;
      transition: 0.3s all ease;
    }
  }

  @supports ((-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))) {
    .blur:hover {
      .blured-background {
        display: flex;
        background-color: rgba(255, 255, 255, .5);
        -webkit-backdrop-filter: blur(0.2em);
        backdrop-filter: blur(2px);
      }
    }
  }

  .time {
    font-size: 12px !important;
    font-weight: 400;

    @include for-phone-only {
      font-size: 11px !important;
    }
  }

  .new {
    margin-left: 12px !important;
    font-weight: bold !important;
    font-size: 16px !important;
    color: #444;
  }

  .addresses {
    font-size: 14px;
    display: flex;
    font-weight: 300;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 10px;
  }

  .sponsored-label {
    display: none;
  }

  .sponsored {
    .sponsored-label {
      display: flex;
      position: absolute;
      top: 8px;
      right: 8px;
      color: #fff;
      padding: 4px;
      border-radius: 100px;
      z-index: 10;
      background: rgb(19,156,120);
      background: linear-gradient(90deg, rgba(19,156,120,1) 0%, rgba(34,201,154,1) 100%);
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
  display: none;
  transition: 0.3s all ease;

  &::after {
    font-size: 13px !important;
    line-height: 13px !important;
  }
}

::v-deep .swiper-pagination-bullet {
  width: 14px !important;
  height: 14px !important;
  border: 2px solid rgb(255, 255, 255) !important;
  background: transparent !important;
  opacity: 0.8 !important;
}
::v-deep .swiper-pagination-bullet-active {
  width: 14px !important;
  height: 14px !important;
  border: 3px solid white !important;
  background: transparent !important;
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

.red-label {
  background: #ff0000;
  color: #fff;
  border-radius: 7px;
  padding: 4px;
  font-weight: 600;
}
</style>
