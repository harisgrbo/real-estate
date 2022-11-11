<template>
    <div class="relative w-full flex flex-col items-start">
        <div
            class="relative border text-wrap py-1 border-gray-300 rounded-md px-3 shadow-sm focus-within:ring-1 focus-within:text-gray-900 focus-within:ring-gray-900 focus-within:ring-gray-900 focus-within:border-gray-900">
            <label for="name"
                   class="absolute -top-2 left-1 -mt-px inline-block px-2 bg-white text-xs font-semibold text-gray-900"
                   v-if="label">{{ label }}</label>
            <input
                type="text"
                :placeholder="placeholder"
                @input="showAddressAutocomplete"
                v-model="city"
                autocomplete="off"
                name="name" id="name"
                class="block w-full border-0 p-0 text-gray-900 bg-white placeholder-gray-500 focus:ring-0 sm:text-sm">
        </div>
        <div class="autocomplete-dropdown shadow-sm" v-if="showAutoCompleteDropdown && city.length">
            <ul>
                <li v-for="address in recommendedCities" :key="address.id" @click="selectOption(address)">
                    {{ address.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";
import {mixin as clickaway} from "vue-clickaway";

@Component({
    mixins: [clickaway],

})
export default class PublishDropdown extends Vue {
    @Prop({type: String}) label;
    @Prop({type: String}) placeholder;
    @Prop({type: Array}) options;

    showAutoCompleteDropdown = false;
    city = '';
    recommendedCities = []

    selectOption(s) {
        this.city = s.name;
        this.$emit('select-option', s);
        this.showAutoCompleteDropdown = false;
    }

    async showAddressAutocomplete() {
        try {
            let res = await this.$axios.get('/cities?q=' + this.city);
            this.recommendedCities = res.data.data;

            if (this.recommendedCities.length > 0) {
                this.showAutoCompleteDropdown = true;
            }

        } catch (e) {
            console.log(e)
        }
    }

    away() {
        this.showAutoCompleteDropdown = false;
    }
}
</script>

<style scoped lang="scss">
::placeholder {
    font-size: 14px;
    font-weight: 500;
    color: #000;
}

.text-wrap {
    min-height: 36px;
    border: 1px solid #f1f1f1 !important;
    width: 100%;
    background: #fff;

    input {
        min-height: 36px !important;
    }
}

.autocomplete-dropdown {
    background: #fff;
    width: 100%;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    position: absolute;
    top: 59px;
    border-radius: 8px;
    border: 1px solid #f1f1f1;
    padding: 4px;
    left: 0;
    z-index: 1;

    ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        max-height: 300px;
        overflow: scroll;
        padding: 0px 0;

        li {
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            color: #444;
            border-radius: 4px;
            padding: 8px;
            cursor: pointer;

            &:last-child {
                margin-bottom: 0 !important;
            }

            &:hover {
                background: #f9f9f9;
            }
        }
    }
}


label {
    font-size: 14px;
}

::placeholder {
    color: #b1b1b1;
}
</style>
