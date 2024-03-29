<template>
    <div class="border-t border-gray-200 flex w-full items-center justify-center my-6 pagination-wrapper">
        <button class="-mt-px rounded-sm mr-4 flex prev justify-end items-center justify-center text-black prev-next"
                @click.prevent="handlePageClick(currentPage - 1)" :disabeld="currentPage === 1">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#1F2937"
                 aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clip-rule="evenodd"/>
            </svg>
        </button>
        <div class="flex items-center justify-center" v-if="!$device.isMobile">
            <button class="md:-mt-px md:flex flex items-center justify-between rounded-full py-2"
                    @click.prevent="handlePageClick(page)" v-for="(page, index) in computedPages" :key="index">
                <div class="link"
                     :class="['border-transparent text-gray-900 font-semibold hover:text-gray-700 hover:border-gray-300 standard', page === currentPage ? 'active text-indigo-600': '']">
                    {{ page }}
                </div>
            </button>
        </div>
        <button class="-mt-px rounded-full ml-4 next flex justify-end items-center justify-center text-black prev-next"
                @click.prevent="handlePageClick(currentPage + 1)" :disabled="currentPage === totalPages">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#1F2937"
                 aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"/>
            </svg>
        </button>
    </div>
</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component({})
export default class Pagination extends Vue {
    @Prop({type: Number, required: true}) currentPage;
    @Prop({type: Number, required: true}) totalPages;

    pages = [];

    get computedPages() {
        let result = []

        if (this.totalPages < 7) {
            for (let i = 1; i <= this.totalPages; ++i) {
                result.push(i)
            }

            return result;
        }

        if (this.currentPage < 5) {
            for (let i = 1; i <= 5; ++i) {
                result.push(i)
            }

            result.push('...');
            result.push(this.totalPages)

            return result;
        }

        if (this.totalPages - this.currentPage < 4) {
            result.push(1);
            result.push('...');

            for (let i = this.totalPages - 4; i <= this.totalPages; ++i) {
                result.push(i)
            }

            return result;
        }

        result.push(1);
        result.push('...');
        result.push(this.currentPage - 1);
        result.push(this.currentPage);
        result.push(this.currentPage + 1);
        result.push('...');
        result.push(this.totalPages)

        return result;
    }

    handlePageClick(page) {
        if (page === '...' || page < 1 || page > this.totalPages) return

        this.$emit('page-change', page)
    }
}
</script>

<style scoped lang="scss">

@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.standard {
    -webkit-box-pack: center !important;
    -webkit-box-align: center !important;
    font-size: 13px !important;
    line-height: 18px !important;
    font-weight: 500 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    border: none !important;
    border-radius: 50% !important;
    width: 32px !important;
    height: 32px !important;
    margin: 0px !important;
    padding: 0px !important;
    transition: -ms-transform 0.25s ease 0s, -webkit-transform 0.25s ease 0s, transform 0.25s ease 0s !important;
    outline: none !important;
    background: #fff !important;
    color: rgb(34, 34, 34) !important;
}

.active {
    -webkit-box-pack: center !important;
    -webkit-box-align: center !important;
    font-size: 14px !important;
    line-height: 18px !important;
    font-weight: 700 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    border: none !important;
    border-radius: 8px !important;
    width: 34px !important;
    height: 34px !important;
    margin: 0px!important;
    padding: 0px !important;
    transition: -ms-transform 0.25s ease 0s, -webkit-transform 0.25s ease 0s, transform 0.25s ease 0s !important;
    outline: none !important;
    color: #000 !important;
    text-decoration: underline;
}

.counter {
    width: fit-content;
}

.link {
    &:last-child {
        margin-right: 0;
    }
}

.prev-next {
    -webkit-box-pack: center !important;
    -webkit-box-align: center !important;
    appearance: none !important;
    display: inline-flex !important;
    border-radius: 8px !important;
    border: 1px solid rgba(0, 0, 0, 0.08) !important;
    outline: none !important;
    margin: 0px !important;
    background-color: rgba(255, 255, 255, 0.9) !important;
    cursor: pointer !important;
    touch-action: manipulation !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0px !important;
    background-clip: padding-box !important;
    background: #f9f9f9;
    color: rgb(34, 34, 34) !important;
    transition: -ms-transform 0.25s ease 0s, -webkit-transform 0.25s ease 0s, transform 0.25s ease 0s !important;
    width: 36px !important;
    height: 36px !important;
}

button:disabled,
button[disabled] {
    opacity: 0.5 !important;
    cursor: not-allowed !important;
}

.prev {
    margin-right: 16px !important;
}

.next {
    margin-left: 16px !important;
}

.pagination-wrapper {
    @include for-phone-only {
        justify-content: space-between;
        padding: 0 12px;
    }
}
</style>
