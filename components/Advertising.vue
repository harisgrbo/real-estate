<template>
    <div :class="['advertising-options-wrapper', publish ? 'remove-width' : '']">
        <div :class="['inner', publishing ? 'full' : '']">
            <h2 class="test">
                Sponzorisanje oglasa
            </h2>
            <fieldset>
                <div class="rounded-md bg-yellow-50 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <!-- Heroicon name: solid/exclamation -->
                            <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                 fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-yellow-800">Cijene u testnoj fazi su isključivo pokaznog
                                karaktera.</h3>
                        </div>
                    </div>
                </div>
                <div class="mt-4 grid grid-cols-1 gap-y-6 sm:gap-x-4 padding-box">
                    <label
                        class="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
                        v-for="(option, index) in advertising_options"
                        :class="[selectedAdvertisement === option.id? 'ring-2 ring-gray-900 border-transparent': 'border-gray-300 overlay']"
                        :key="option.id" @change="selectAdvertisement(option)"
                    >
                        <input
                            :id="option.id" :value="option.title" :checked="value && value.id === option.id"
                            type="radio" name="project-type" value="Newsletter" class="sr-only"
                            aria-labelledby="project-type-0-label"
                            aria-describedby="project-type-0-description-0 project-type-0-description-1">
                        <div class="flex-1 flex w-full">
                            <div class="flex flex-col w-full">
                                <div class="flex flex-row justify-between w-full justify-between items-center">
                                    <div class="h-full w-full mr-6 flex flex-col justify-between">
                                        <div class="flex flex-col w-full">
                      <span id="project-type-0-label" class="block text-lg mb-2 font-semibold text-gray-900">
                        {{ option.title }}
                      </span>

                                            <div class="flex flex-row items-center w-full mobile-flex">
                                                <h3 class="text-gray-600 w-full mobile-margin-delete mr-3"
                                                    v-if="selectedDuration !== null && selectedAdvertisement === option.id">
                                                    Trajanje sponzorisanja: {{
                                                        selectedDuration ? selectedDuration.name : 'Izaberite broj dana'
                                                    }}</h3>
                                                <div class="relative w-full flex flex-col items-start mobile-margin">
                                                    <div
                                                        class="relative select-border border w-full text-wrap border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:text-gray-900 focus-within:ring-gray-900 focus-within:ring-gray-900 focus-within:border-gray-900">
                                                        <label for="name"
                                                               class="absolute -top-2 left-1 -mt-px inline-block px-2 bg-white text-xs font-semibold text-gray-900">Broj
                                                            dana</label>
                                                        <select id="language" name="language"
                                                                class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                                                @change="durationSelected">
                                                            <option class="font-medium text-sm"
                                                                    v-for="(duration, index) in advertising_days_options.find(item => item.id === option.id).options"
                                                                    :value="JSON.stringify(duration)" :key="index">
                                                                {{ duration.name }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <span id="project-type-0-description-0"
                                                  class="block text-xl mt-2 font-medium text-gray-900">
                        {{ option.description }}
                      </span>
                                        </div>
                                        <div class="text-2xl font-semibold"
                                             v-if="selectedDuration !== null && selectedAdvertisement === option.id">
                                            <div v-if="calculatedPriceLoaded">{{
                                                    calculatedPrice.price + ' KM - ' + (calculatedPrice.discount * 100.0).toFixed(0) + ' % popusta'
                                                }}
                                            </div>
                                            <img class="loading" src="/loader.svg" alt="" v-else>
                                        </div>
                                    </div>

                                    <img class="preview-img" :src="'/' + option.title + '.png'" alt="">
                                </div>
                            </div>
                        </div>
                        <svg v-show="selectedAdvertisement === option.id"
                             class="h-5 w-5 text-gray-900 absolute top-4 right-4" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clip-rule="evenodd"/>
                        </svg>
                        <div class="absolute -inset-px rounded-lg border-2 pointer-events-none"
                             aria-hidden="true"></div>
                    </label>

                </div>
            </fieldset>


            <div class="advertising-calculator">
                <ActionButton @action="sponsor(publishing ? id : $route.params.id)" placeholder="Sponzoriši"
                              :style-options="{ color: '#fff', height: '48px' }"></ActionButton>
                <span class="mx-6 bg-gray-50 rounded-full p-5 font-semibold" v-if="!$device.isMobile">ili</span>
                <ActionButton @action="publishing ? $router.push('/oglas/' + slug) : $router.push('/oglas/' + slug) "
                              placeholder="Nastavi na oglas bez sponzorisanja"
                              :style-options="{ color: '#fff', height: '48px' }"></ActionButton>

            </div>
        </div>
    </div>
</template>

<script>
import TextField from "@/components/inputs/TextField";
import ActionButton from "@/components/actionButtons/ActionButton"

import {Component, Prop, Vue, Watch} from "nuxt-property-decorator";

@Component({
    components: {
        TextField,
        ActionButton
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings'
})
export default class Advertising extends Vue {
    @Prop({default: false, type: Boolean}) publishing;
    @Prop({default: 0, type: Number}) id;
    @Prop({default: "", type: String}) slug;
    advertising_options = []
    selectedAdvertisement = 1;
    duration_in_days = 7;
    calculatedPrice = 0;
    calculatedPriceLoaded = false;
    selectedDuration = {
        name: '7'
    };
    advertising_days_options = [
        {
            type: 'Advanced',
            id: 1,
            options: [
                {
                    name: '7'
                },
                {
                    name: '14'
                },
                {
                    name: '30'
                },
            ]
        },
        {
            type: 'Premium',
            id: 2,
            options: [
                {
                    name: '7'
                },
                {
                    name: '14'
                },
                {
                    name: '30'
                },
            ]
        }
    ]
    selected = {};

    async created() {
        await this.fetchSponsorship();
    }


    @Watch('selectedAdvertisement', {
        immediate: true
    })
    handleWatcher(newVal, oldVal) {
        if (newVal) {
            this.calculatePrice(newVal, this.selectedDuration.name);
        }
    }

    async durationSelected(duration) {
        this.selectedDuration = JSON.parse(duration.target.value);

        await this.calculatePrice(this.selectedAdvertisement, this.selectedDuration.name);
    }

    selectAdvertisement(o) {
        this.selectedAdvertisement = o.id;
    }

    async fetchSponsorship() {
        try {
            let res = await this.$axios.get('/sponsorship/packages');
            this.advertising_options = res.data.data;

            console.log(res.data.data)
            if (this.advertising_options.length) {
                this.selectedAdvertisement = this.advertising_options[0].id;
            }
        } catch (e) {
            console.log(e)
        }
    }

    async calculatePrice(id, days) {
        this.calculatedPriceLoaded = false;
        try {
            let res = await this.$axios.get(`/sponsorships/${id}/calculate?days=${days}`);

            this.calculatedPriceLoaded = true;
            return this.calculatedPrice = res.data.data;
        } catch (e) {
            console.log(e)
        }
    }

    async sponsor(id) {
        try {
            await this.$axios.post(`/listings/${id}/sponsor`, {
                sponsorship_id: this.selectedAdvertisement,
                duration_in_days: this.duration_in_days
            })

            await this.$auth.fetchUser();

            await this.$router.push('/oglas/' + id)

        } catch (e) {
            console.log(e);

            return false;
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

.advertising-options-wrapper {
    display: flex;
    justify-content: space-between;
    width: 1280px;
    margin: 0 auto;
    padding: 0 3px;

    @supports not (-webkit-touch-callout: none) {
        height: 100vh;
    }

    @supports (-webkit-touch-callout: none) {
        height: calc(100vh - 170px);
    }

    &.remove-width {
        width: 100%;
    }

    @include for-phone-only {
        width: 100%;
    }

    .inner {
        width: 60%;
        margin: 0 auto;
        padding-top: 60px;
        padding-bottom: 200px;
        overflow-y: scroll;
        padding-right: 4px;
        padding-left: 4px;

        @supports (-webkit-touch-callout: none) {
            overflow-y: scroll;
            padding-bottom: 120px;
        }

        &.full {
            width: 100%;
        }

        @include for-phone-only {
            width: 100%;
            padding-top: 0;
        }
    }

    @include for-phone-only {
        flex-direction: column;
    }

    .advertising-options {
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: 100%;

        ul {
            display: flex;
            width: 100%;
            flex-direction: column;

            @include for-phone-only {
                display: grid;
                grid-template-columns: repeat(1, 1fr);
                grid-column-gap: 12px;
                grid-row-gap: 12px;
            }

            li {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                height: fit-content;
                cursor: pointer;
                padding: 12px;

                @include for-phone-only {
                    height: fit-content;
                    flex-direction: row;
                }

                img {
                    margin-right: 24px;
                    height: 30px;

                    @include for-phone-only {
                    }

                    &.main {
                        height: 100px;

                        @include for-phone-only {
                            height: 60px;
                            margin-bottom: 0;
                        }
                    }

                }

                &.selected {
                    background: #f1f1f1;
                    border-radius: 6px;
                }
            }
        }

        svg {
            font-size: 56px;
            color: #dcdcdc;
        }

        .text-wrapper {
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: flex-start;

            @include for-phone-only {
                align-items: center;
            }

            p {
                &:first-child {
                    font-size: 18px;
                    font-weight: 500;
                    margin-bottom: 12px;

                    @include for-phone-only {
                        font-size: 16px;
                        text-align: left;
                        margin-bottom: 12px;
                        margin-top: 12px;
                        line-height: 20px;
                        text-align: center;
                    }
                }

                &:last-child {
                    font-size: 15px;
                    font-weight: 400;

                    @include for-phone-only {
                        font-size: 14px;
                        line-height: 20px;
                        text-align: center;

                    }
                }
            }
        }
    }

    .advertising-calculator {
        display: flex;
        flex-direction: row;
        height: fit-content;
        align-items: center;
        margin-top: 36px;

        @include for-phone-only {
            flex-direction: column;
        }

        span {
            min-width: fit-content;
        }

        @include for-phone-only {
            margin-left: 0;
        }

        .inner {
            border: 1px solid #dcdcdc;
            border-radius: 6px;
            padding: 12px;
            box-sizing: border-box;
        }

        ::v-deep button {
            width: 100%;
        }

    }
}

.preview-img {
    width: 90px;
    height: fit-content;

    @include for-phone-only {
        max-height: 90px !important;
    }
}

h2.test {
    font-size: 28px !important;
    font-weight: 600 !important;
    margin-bottom: 28px !important;
    color: #000;
    line-height: 32px;
}


select {
    min-height: 36px;
    background: #fff;

    &:focus {
        outline: none;
    }
}

.select-border {
    border: 1px solid #f1f1f1 !important;
}

.overlay {
    opacity: 0.5;
}

.loading {
    height: 32px;
    width: 32px;
}

.mobile-flex {
    @include for-phone-only {
        flex-direction: column;
    }
}

.mobile-margin {
    @include for-phone-only {
        margin-top: 24px;
    }
}

.mobile-margin-delete {
    @include for-phone-only {
        margin-right: 0 !important;
    }
}

#project-type-0-description-0 {
    @include for-phone-only {
        font-size: 16px;
    }
}

.padding-box {
    @include for-phone-only {
        padding: 2px;
    }
}
</style>
