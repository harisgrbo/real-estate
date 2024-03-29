<template>
    <div class="term-wrapper">
        <label :for="'checkbox' + $vnode.key" class="switch-label checkbox bounce">
            {{ displayName }}
            <select v-if="filter.values" @change="handleChange">
                <option value="">...</option>
                <option v-for="option in filter.values" :key="option.id" :value="option">{{ option }}</option>
            </select>
            <input :id="'checkbox' + $vnode.key" v-else v-model="checked" type="checkbox" @input="handleChange"/>
            <svg viewBox="0 0 21 21">
                <path
                    d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
            </svg>
        </label>
    </div>
</template>

<script>
import FilterMixin from "./FilterMixin.js";
import {Component, Vue} from "nuxt-property-decorator";

@Component({
    mixins: [FilterMixin]
})
export default class TermFilter extends Vue {
    checked = false

    created() {
        this.checked = this.set ? this.value.value : false;
    }

    handleChange(e) {
        if (this.checked === false) {
            this.$emit('input', this.buildValue('term', (!this.checked) + ''))
        } else {
            this.clear()
        }
    }
}
</script>

<style scoped lang="scss">
.term-wrapper {
    padding: 6px 0;
}

.checkbox {
    --background: #fff;
    --border: #D1D6EE;
    --border-hover: #BBC1E1;
    --border-active: #1E2235;
    --tick: #fff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    input,
    svg {
        width: 21px;
        height: 21px;
        display: block;
    }

    input {
        -webkit-appearance: none;
        -moz-appearance: none;
        position: relative;
        outline: none;
        background: var(--background);
        border: none;
        margin: 0;
        padding: 0px;
        cursor: pointer;
        border-radius: 5px;
        transition: box-shadow .3s;
        box-shadow: inset 0 0 0 var(--s, 1px) var(--b, var(--border));

        &:hover {
            --s: 2px;
            --b: var(--border-hover);
        }

        &:checked {
            --b: var(--border-active);
        }
    }

    svg {
        pointer-events: none;
        fill: none;
        stroke-width: 2px;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: var(--stroke, var(--border-active));
        position: absolute;
        top: 0;
        right: 0;
        width: 21px;
        height: 21px;
        transform: scale(var(--scale, 1)) translateZ(0);
    }

    &.path {
        input {
            &:checked {
                --s: 2px;
                transition-delay: .4s;

                & + svg {
                    --a: 16.1 86.12;
                    --o: 102.22;
                }
            }
        }

        svg {
            stroke-dasharray: var(--a, 86.12);
            stroke-dashoffset: var(--o, 86.12);
            transition: stroke-dasharray .6s, stroke-dashoffset .6s;
        }
    }

    &.bounce {
        --stroke: var(--tick);

        input {
            &:checked {
                --s: 11px;

                & + svg {
                    animation: bounce .4s linear forwards .2s;
                }
            }
        }

        svg {
            --scale: 0;
        }
    }
}

@keyframes bounce {
    50% {
        transform: scale(1.2);
    }
    75% {
        transform: scale(.9);
    }
    100% {
        transform: scale(1);
    }
}

</style>
