<template>
    <div class="w-full flex flex-col min-w-min" style="min-width: fit-content; width: fit-content; max-width: fit-content;">
        <label @click="showDropdown = !showDropdown" class="dropdown-label">
            Izaberite državu
        </label>
        <div class="dropdown-menu" v-show="showDropdown">
            <div class="label-wrap" v-if="$device.isMobile">
                <p class="first-one">
                    Izaberite državu
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" @click="showDropdown = false">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="options-wrap">
                <button v-for="country in countries" @click="handleSelectedCountry(country)"
                        :class="[selectedIds.indexOf(country.id) !== -1 ? 'active': '']">{{ country.name }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component({})
export default class CountriesMultipleSelect extends Vue {
    @Prop({type: Array, default: () => []}) initialCountries;
    showDropdown = false;
    countries = [
        {
            "type": "country",
            "id": 1,
            "name": "Bosna i Hercegovina",
            "slug": "bosna-i-hercegovina",
            "shortname": "BA"
        },
        {
            "type": "country",
            "id": 2,
            "name": "Hrvatska",
            "slug": "hrvatska",
            "shortname": "HR"
        },
        {
            "type": "country",
            "id": 3,
            "name": "Crna Gora",
            "slug": "crna-gora",
            "shortname": "ME"
        },
        {
            "type": "country",
            "id": 4,
            "name": "Turska",
            "slug": "turska",
            "shortname": "TR"
        }
    ];

    selectedIds = [];

    async created() {
        this.selectedIds = this.initialCountries.map(item => item.id);
    }

    handleSelectedCountry(country) {
        let id = country.id;

        let index = this.selectedIds.indexOf(id);

        if (index === -1) {
            this.selectedIds.push(id);
        } else {
            this.selectedIds.splice(index, 1);
        }

        this.$emit('countries', this.selectedIds);
    }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.options-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

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
        overflow: hidden;
        padding: 1px 2px;
        white-space: normal;
        width: fit-content;
        font-size: 14px;
        margin-right: 8px;
        margin-bottom: 8px;
        padding-inline: 8px;

        &:focus {
            outline: none;
        }

        &.active {
            background: #FC8709;
            color: #fff;
        }
    }
}
</style>
