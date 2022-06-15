<template>
    <div class="preview-wrapper-inner">
        <ul class="breadcrumbs">
            <li>
                <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                <p>Oglasi koje izdajem</p>
            </li>
        </ul>
        <div class="w-full mt-5">
            <ul role="list" class="divide-y orders divide-gray-200" v-if="bookings.length">
                <li v-for="(booking, index) in bookings" :key="index" class="bg-white rounded-md">
                    <div class="flex items-center sm:items-start mobile-box">
                        <div class="listing-wrap shadow-md rounded-md hover:shadow-lg">
                            <SmallListingCard :listing="booking.listing"></SmallListingCard>
                        </div>
                        <div class="date">
                            <vc-date-picker :value="getDatesFromBooking(booking)" title-position="left" is-range/>
                        </div>
                        <div
                            class="flex-1 sm:ml-0 xl:ml-6 lg:ml-6 up:ml-6 text-sm w-full flex flex-col justify-between content">
                            <div class="font-medium text-gray-900 sm:flex sm:justify-between">
                                <p class="mt-2 sm:mt-0 text-lg font-medium">
                                    {{ booking.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} KM za
                                    {{ booking.days }} dana
                                </p>
                            </div>
                            <div class="mt-6 sm:flex sm:justify-between">
                                <div class="flex items-center">
                                    <!-- Heroicon name: solid/check-circle -->
                                    <svg class="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                    <p class="ml-2 text-sm font-medium text-gray-500">Dobili ste upit
                                        <time datetime="2021-07-12">{{
                                                $moment(booking.created_at).format('DD.MM.YYYY')
                                            }}
                                        </time>
                                    </p>
                                </div>

                                <div
                                    class="mt-6 w-full border-t border-gray-200 pt-4 flex items-center flex justify-between space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">

                                    <div class="flex-1 pr-2 flex justify-end">
                                        <ActionButton placeholder="Poništi upit" :style-options="{ minWidth: '100%'}"
                                                      @action="cancel(booking, index)"></ActionButton>
                                    </div>
                                    <div class="flex-1 pl-2 flex justify-end" v-if="booking.confirmed === false">
                                        <ActionButton placeholder="Prihvati rezervaciju"
                                                      :style-options="{ minWidth: '100%'}"
                                                      @action="confirm(booking)"></ActionButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

            </ul>
            <NotFound v-else src="/noreservation.svg" text="Nemate rezervacija"></NotFound>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import ActionButton from "../../components/actionButtons/ActionButton";
import NotFound from "../../components/global/NotFound";

@Component({
    components: {
        NotFound,
        ActionButton,
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
    middleware: ['auth'],
    async asyncData(ctx) {
        let bookings = [];

        try {
            let res = await ctx.$axios.get('/booking/requests');

            bookings = res.data.data;
        } catch (e) {
            console.log(e);
        }

        return {
            bookings
        }
    }
})
export default class mojeRezervacije extends Vue {
    getDatesFromBooking(booking) {
        return {
            start: this.$moment(booking.starts_at).toDate(),
            end: this.$moment(booking.ends_at).toDate()
        }
    }

    async cancel(booking, index) {
        try {
            this.bookings.splice(index, 1);

            await this.$axios.delete('/bookings/' + booking.id);
        } catch (e) {
            console.log(e);
        }
    }

    async confirm(booking) {
        try {
            booking.confirmed = true;

            await this.$axios.post('/bookings/' + booking.id);

            this.$toast.open({
                message: "Uspješno ste prihvatili upit",
                type: 'success',
                duration: 5000
            });
        } catch (e) {
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

ul.orders li {
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 24px;
    margin-bottom: 24px;

    .main {
        height: 200px;
        width: 240px;

        @include for-phone-only {
            width: 100%;
            height: 200px;
            margin-bottom: 24px;
        }
    }
}

.preview-wrapper-inner {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    border-radius: 6px;
    padding: 24px;

    @include for-phone-only {
        padding: 24px !important;
        height: 100% !important;
    }

    h5 {
        font-size: 20px;
        font-weight: 300;
    }

    span {
        background: #1F2937;
        color: #fff;
    }
}

a {
    color: #1F2937;
}

.opis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* number of lines to show */
    line-clamp: 4;
    font-weight: 200;
    font-size: 15px;
    margin: 16px 0;
    -webkit-box-orient: vertical;
}

.main-image-wrap {
    width: 30%;
    height: 180px;
    border-radius: 6px;

    img {
        width: 180px;
        object-fit: cover !important;

        @include for-phone-only {
            width: 100%;
        }
    }
}

.special {
    div {
        border: 1px solid #ececec;
        border-radius: 6px;
        height: 25px;
        width: fit-content;
        margin-right: 8px;
        padding: 0 4px;
        font-weight: 300 !important;
        background: #f9f9f9;
        font-size: 13px;
        line-height: 8px;
        color: #000;

        img {
            height: 14px;
            max-width: fit-content !important;
            max-width: 15px;
            min-width: 15px;
        }

        @include for-phone-only {
            border: none;
            padding: 0;
            background: transparent;

        }
    }

    a {
        &:hover {
            color: #1F2937 !important;
            text-decoration: underline !important;
        }
    }
}

.mobile-box {
    @include for-phone-only {
        display: flex;
        flex-direction: column;
    }
}

.approval {
    @include for-phone-only {
        margin-top: 12px;
        padding: 0 12px;
        border-radius: 6px;
    }
}

::v-deep .horizontal-card {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
}

.listing-wrap {
    min-width: 40%;

    @include for-phone-only {
        min-width: 100%;
        width: 100%;
    }
}

.content {
    min-height: 145px;
}

.progress {
    width: 380px;

    @include for-phone-only {
        width: 100%;
        margin: 16px 0;
    }
}

.date {
    margin-left: 24px;
    @include for-phone-only {
        margin-left: 0;
        margin: 24px 0;
    }
}
</style>


