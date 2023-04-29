<template>
    <div class="flex flex-col">
        <label>
            Izaberite državu
        </label>
        <div class="options-wrap">
            <button v-for="country in countries" @click="handleSelectedCountry(country)"
                    :class="[selectedIds.indexOf(country.id) !== -1 ? 'active': '']">{{ country.name }}
            </button>
        </div>
    </div>
</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component({})
export default class CountriesMultipleSelect extends Vue {
    @Prop({type: Array, default: () => []}) initialCountries;

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

label {
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 10px;
    margin-top: 24px;
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
