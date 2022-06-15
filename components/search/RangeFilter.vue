<template>
    <div class="range-wrapper">
        <label class="first-one">
            {{ displayName }}
        </label>
        <div class="input-wrapper">
            <input v-model="from" type="number" placeholder="Od" @input="showConfirmButton">
            <input v-model="to" type="number" placeholder="Do" @input="showConfirmButton">
        </div>
        <action-button v-show="showBtn" :style-options="{ color: '#fff', width: 'fit-content' }" class="mt-4"
                       placeholder="Osvježi rezultate" @action="handleBtn"></action-button>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import FilterMixin from "./FilterMixin.js";
import ActionButton from "../actionButtons/ActionButton";

@Component({
    components: {ActionButton},
    mixins: [FilterMixin]
})
export default class RangeFilter extends Vue {
    from = null
    to = null
    showBtn = false;

    created() {
        this.from = this.set ? this.value.value[0] : null;
        this.to = this.set ? this.value.value[1] : null;
    }

    handleChange() {
        this.$emit(
            "input",
            this.buildValue("range", [parseFloat(this.from), parseFloat(this.to)])
        );
    }

    showConfirmButton() {
        this.showBtn = true;
    }

    handleBtn() {
        this.showBtn = false;
        this.handleChange();

        this.$emit('close-filters')
    }
};
</script>

<style lang="scss" scoped>
.range-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 24px;

    label {
        font-size: 14px;
        font-weight: 600;
        text-transform: capitalize;
        margin-bottom: 6px;
    }

    small {
        margin-bottom: 16px;
        color: #1B1E31;
        font-weight: 500;
    }

    .input-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 16px;

        label {
            font-size: 12px;
            font-weight: 400;
            color: #4AAE9B;
            text-transform: none;
        }

        input {
            background: #fff;
            border: 1px solid #adadad;
            border-radius: 4px;
            box-shadow: none;
            box-sizing: border-box;
            height: 40px;
            line-height: .733rem;
            margin: initial;
            overflow: hidden;
            padding: 1px 10px;
            white-space: normal;
            font-size: 14px;
            width: 100%;

            &:focus {
                border: 1px solid #343434;
            }
        }
    }
}
</style>
