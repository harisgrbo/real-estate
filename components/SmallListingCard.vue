<template>
    <div class="listing-card-wrapper" :class="[from? 'blured' : '', 'sponsored-' + listing.sponsored]">
        <label class="publisher">
        <span class="shadow-sm bg-white mr-2">
          {{ translateType() }}
        </span>
            <span v-if="listing.hasOwnProperty('discount')"
                  class="flex flex-row items-center bg-red-600 shadow-sm mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="#fff">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/>
          </svg>
          <p class="text-white font-medium">
            Akcija{{ ' -' + listing.discount * 100 + '%' }}
          </p>
        </span>
            <!--        <span class="flex flex-row items-center bg-white shadow-sm mr-2">-->
            <!--          {{ listing.city.country.shortname }}-->
            <!--        </span>-->
            <span v-if="listing.completed_at"
                  class="flex flex-row items-center bg-red-600 text-white shadow-sm mr-2 finished">
          ZAVRŠEN
        </span>
        </label>

        <nuxt-link :to="'/oglas/' + listing.slug">
            <div class="overflow-hidden relative image-wrapper">
                <div class="gallery-wrap" v-if="listing.images.length" @mouseenter="handleCardHover"
                     @mouseleave="handleCardHoverDone">
                    <swiper class="swiper" ref="swiper" :options="swiperOptionCard" @click.native.stop>
                        <swiper-slide v-for="(img, index) in listing.images" :key="index">
                            <img class="slider-img swiper-lazy" :data-src="img.url" alt="" />
                            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </div>
                <div v-else class="gallery-wrap">
                    <img src="/noimage.jpeg" alt="" />
                </div>
            </div>
            <div class="listing-card-content relative">
                <div class="flex flex-col justify-between items-start">
                    <div class="address title">
                        <p>
                            {{ listing.title }}
                        </p>
                    </div>
                </div>
                <div class="addresses">
                    <div
                        v-for="(attr, index) in specialAttributes"
                        :key="index"
                        class="flex flex-row items-center mr-2"
                    >
                        <img v-if="attr.name === 'Broj kreveta'" src="/double-bed.png" alt="" />
                        <img v-if="attr.name === 'Broj soba'" src="/door.svg" alt="" />
                        <img v-if="attr.name === 'Kvadratura'" src="/m2.png" alt="" />
                        <img v-if="attr.name === 'Broj gostiju'" src="/guests.png" alt="" />
                        {{ attr.value }}
                        <p v-if="attr.name === 'Kvadratura'">
                            m²
                        </p>
                    </div>
                </div>
                <div class="icons-date flex flex-row items-center justify-between w-full">
                    <div class="important">
                        <p :class="['new', listing.hasOwnProperty('discount') ? 'cross' : '']">
                            {{ parseInt(listing.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} KM</p>
                        <p v-show="listing.is_booking && !listing.hasOwnProperty('discount')" class="pl-2">/ noć
                            {{ listing.per_guest ? 'po osobi' : '' }}</p>
                    </div>
                    <div class="important" v-if="listing.hasOwnProperty('discount')">
                        <p class="new">{{
                                parseInt(listing.price - listing.price * listing.discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                            }} KM</p>
                        <p v-show="listing.is_booking" class="pl-2">/ noć {{ listing.per_guest ? 'po osobi' : '' }}</p>
                    </div>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton";

@Component({
    components: {ActionButton}
})

export default class SmallListingCard extends Vue {
    @Prop({type: Object}) listing
    @Prop({type: Boolean, default: false}) from
    @Prop({type: String}) action_text
    @Prop({}) type
    @Prop({type: Boolean, default: false}) action

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
    swiperOptionCard = {
        spaceBetween: 0,
        // centeredSlides: true,
        // slidesOffsetBefore: '100px',
        // slidesOffsetAfter: '100px',
        // slidesOffsetBefore: '0px',
        loop: true,
        slidesPerView: 1,
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
        autoplay: false,
        speed: 400,
        touchRatio: 0,
        slideToClickedSlide: true,
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // },
        preloadImages: false,
        lazy: {
            //  tell swiper to load images before they appear
            loadPrevNext: false,
            // amount of images to load
            loadPrevNextAmount: 1,
        },
    }

    mounted() {
        this.$nextTick(() => {
            if (this.$refs.swiper !== undefined) {
                this.custom_swiper = this.$refs.swiper;
            }
        })
    }

    handleCardHover() {
        if (this.custom_swiper !== null && this.custom_swiper.$swiper.autoplay) {
            this.custom_swiper.$swiper.autoplay.start();
            this.custom_swiper.$swiper.params.autoplay.delay = 600;
        }

    }

    handleCardHoverDone() {
        if (this.custom_swiper !== null) {
            this.custom_swiper.$swiper.autoplay.stop();
        }
    }

    translateType() {
        if (this.listing.listing_type.shortname === 'sell') {
            return 'Prodaja'
        } else if (this.listing.listing_type.shortname === 'booking') {
            return 'Stan na dan'
        } else if (this.listing.listing_type.shortname === 'rent') {
            return 'Najam'
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

    get normalAttributes() {
        return this.listing.attributes.filter(item => item.value !== true && item.value !== false);
    }


    created() {
        let index = this.specialAttributesKeys.indexOf('Kvadratura');

        if (this.listing.is_booking && index !== -1) {
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
    z-index: 1;
    width: 100%;
    border-radius: 6px;
    display: flex;
    flex-direction: row;

    @include for-phone-only {
        width: 100%;
        min-width: 100%;
    }
}

.listing-card-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    height: fit-content;
    border-radius: 7px;
    padding: 12px;

    &.sponsored-1 {
        background: rgba(19, 95, 20, 0.05);

        .listing-card-content {
            padding-left: 8px;
            padding-right: 8px;
        }
    }

    @include for-phone-only {
        min-width: 100%;
    }

    &:hover {
        .swiper-button-prev,
        .swiper-button-next {
            display: flex !important;
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

    img {
        height: 280px;
        width: 100%;
        border-radius: 7px;
        object-fit: cover;

        @include for-phone-only {
            height: 154px;
            //max-width: 220px;
        }
    }

    .listing-card-content {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        min-height: 80px;
        padding-bottom: 8px;
        justify-content: space-between;

        @include for-phone-only {
            min-height: fit-content;
        }

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
                font-weight: 200 !important;
                font-size: 18px !important;
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
                    font-weight: 300 !important;
                    font-size: 16px;
                    line-height: 20px !important;
                    @include for-phone-only {
                        font-weight: 400 !important;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 170px;
                    }
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
                display: flex;
                align-items: center;
            }

            .price {
                font-weight: 600 !important;
                font-size: 17px !important;
                color: #000;
                line-height: 20px;

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
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                margin-top: 2px;

                @include for-phone-only {
                    margin-top: 0;
                }

                .new {
                    font-size: 16px;
                    font-weight: 600 !important;
                    margin-left: 0px;
                    margin: 4px 0;

                    &.cross {
                        font-size: 13px !important;
                    }
                }
            }

            p {
                font-size: 13px;
                color: #434343;
                font-weight: 500;
            }
        }
    }

    &.sponsored-2 {
        background: rgba(19, 95, 20, 0.05);

        .listing-card-content {
            padding-left: 8px;
            padding-right: 8px;

            .address.title {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-weight: 200 !important;
                font-size: 18px !important;
                line-height: 20px !important;
                background: #1F2937 !important;
                color: #fff !important;

                p {
                    color: #fff !important;
                    padding: 0 4px;
                }

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
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
    padding: 24px;
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;
    transition: 0.3s all ease;
    flex-direction: column;

    @include for-phone-only {
        padding: 8px;
    }

    button {
        height: 48px;
        background: #1F2937;
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
    .blured:hover {
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


.addresses {
    font-size: 14px;
    display: flex;
    font-weight: 300;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 3px;

    @include for-phone-only {
        margin-top: 0;
    }

    img {
        height: 12px !important;
        width: 14px !important;
        border-radius: 0 !important;
        margin-right: 4px;
        object-fit: contain !important;
        min-width: 12px !important;
    }

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

        @include for-phone-only {
            border: none;
            padding: 0;
            background: transparent;

        }
    }
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
        background: rgb(19, 156, 120);
        background: linear-gradient(90deg, rgba(19, 156, 120, 1) 0%, rgba(34, 201, 154, 1) 100%);
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
    }
}

.red-label {
    background: #ff0000;
    color: #fff;
    border-radius: 7px;
    padding: 4px;
    font-weight: 600;
}

.swiper-lazy-preloader {
    width: 42px;
    height: 42px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -21px;
    margin-top: -21px;
    z-index: 10;
    transform-origin: 50%;
    animation: swiper-preloader-spin 1s infinite linear;
    box-sizing: border-box;
    border: 4px solid var(--swiper-preloader-color, var(--swiper-theme-color));
    border-radius: 50%;
    border-top-color: transparent;

}

.swiper-lazy-preloader-white {
    --swiper-preloader-color: #f1f1f1;
}

@keyframes swiper-preloader-spin {
    100% {
        transform: rotate(360deg);
    }
}

.tooltip-wrapper {
    position: absolute;
    bottom: 0;
    z-index: 999;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    top: inherit;

    #tooltip3 {
        height: fit-content;
        overflow-y: scroll;
        border-radius: 7px;

        p {
            font-size: 14px !important;
        }
    }
}

.more-info {
    min-width: fit-content;
    color: #fff;
    font-size: 14px !important;

}

.option-btn {
    margin-top: 12px;

    @include for-phone-only {
        margin-top: 6px;
    }
}

.new.cross {
    text-decoration: line-through;
    font-size: 13px !important;
}

.image-wrapper {
    height: 120px;
    min-height: 120px;
    max-height: 120px;
    margin-right: 16px;

    .gallery-wrap {
        height: 100%;
        width: 150px;
    }

    img {
        height: 100%;
        width: 100%;
    }
}
</style>
