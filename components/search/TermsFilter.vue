<template>
    <div class="terms-filter">
        <label @click="showDropdown = !showDropdown" class="dropdown-label">
            {{ displayName }}
        </label>
        <div class="dropdown-menu" v-show="showDropdown">
            <div class="label-wrap" v-if="$device.isMobile">
                <p class="first-one">
                    {{ displayName }}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" @click="showDropdown = false">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div v-if="filter.values" class="options-wrap">
                <button
                    v-for="option in filter.values"
                    :key="option.id"
                    :class="options.indexOf(option) >= 0 ? 'active': ''"
                    @click="handleChange($event, option)"
                >{{ option }}
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import FilterMixin from "./FilterMixin.js";
import {Component, Vue} from "nuxt-property-decorator";

@Component({
    mixins: [FilterMixin]
})
export default class TermsFilter extends Vue {
    options = []
    showDropdown = false;

    created() {
        if (this.set && this.value.value.length) {
            this.options = [...this.value.value];
        }
    }

    handleChange(e, option) {
        this.toggleOption(option);

        if (this.options.length) {
            this.$emit("input", this.buildValue("terms", this.options));
        } else {
            this.clear();
        }
    }

    toggleOption(option) {
        let index = this.options.indexOf(option);
        if (index === -1) {
            this.options.push(option);
        } else {
            this.options.splice(index, 1);
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.terms-filter {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    min-width: fit-content;

    .options-wrap {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-row-gap: 16px;
        grid-column-gap: 16px;

        @include for-phone-only {
            grid-template-columns: repeat(2, 1fr);
        }

        button {
            background: #f3f4f5;
            border-radius: 4px;
            box-shadow: none;
            box-sizing: border-box;
            height: 40px;
            line-height: .733rem;
            margin: initial;
            overflow: hidden;
            padding: 1px 2px;
            white-space: normal;
            width: 100%;

            &:focus {
                outline: none;
            }

            &.active {
                background: #cacdd2;

            }
        }
    }
}
</style>
