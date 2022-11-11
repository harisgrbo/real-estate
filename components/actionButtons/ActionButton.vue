<template>
    <button @click="action" :style="styleOptions" :disabled="loading === true">
        <span v-if="loading === false">{{ placeholder }}</span>
        <img v-else src="/loader.svg" alt="">
    </button>
</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component({})
export default class ActionButton extends Vue {
    @Prop({type: String}) placeholder;
    @Prop({
        type: Object, default: () => {
        }
    }) styleOptions;
    @Prop({type: Boolean, default: false}) loading


    action() {
        this.$emit('action');
    }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

div {
    width: 100%;
}

button {
    display: flex;
    align-items: center;
    width: auto;
    -webkit-transition: background-color 0.15s ease-in-out;
    transition: background-color 0.15s ease-in-out;
    border-radius: 4px;
    outline: none;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    cursor: pointer;
    padding: 11px 15px;
    background-color: #f1f1f1;
    color: #343434 !important;
    justify-content: center;

    svg {
        margin-right: 8px;
    }

    &:focus {
        outline: none;
    }

    img {
        height: 14px;
        max-height: 14px;
        filter: invert(1);
    }
}
</style>
