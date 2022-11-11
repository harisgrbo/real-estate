<template>
    <div class="terms-wrapper">
        <label class="block text-md font-semibold text-gray-900 mb-2">{{ attr.name }} {{
                attr.required ? '*' : ''
            }}</label>
        <div class="option-wrapper">
            <button
                class="select"
                v-for="option in attr.values"
                :key="option.id"
                :class="[val === option ? 'selected': '']"
                @click.prevent="selectOption(option)"
            >{{ option }}
            </button>
        </div>
    </div>
</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component({
    components: {},
})

export default class TermsInput extends Vue {
    @Prop() attr;
    @Prop() init;

    val = null;

    created() {
        this.val = this.init;
    }

    selectOption(o) {
        if (this.val == o) {
            this.val = null;
            this.$emit('changed', {
                id: this.attr.id,
                name: this.attr.name,
                value: null
            });

            return;
        }

        this.val = o;
        this.$emit('changed', {
            id: this.attr.id,
            name: this.attr.name,
            value: this.val
        })
    }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.terms-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    .option-wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-row-gap: 16px;
        grid-column-gap: 16px;

        @include for-phone-only {
            grid-row-gap: 16px;
            grid-column-gap: 16px;
            grid-template-columns: repeat(2, 1fr);

        }

        button {
            background: #f3f4f5;
            border-radius: 4px;
            box-shadow: none;
            box-sizing: border-box;
            height: 48px;
            line-height: .733rem;
            margin: initial;
            overflow: hidden;
            padding: 1px 2px;
            white-space: normal;
            width: 100%;
            font-size: 14px;

            @include for-phone-only {
                background: #fff;
            }

            &:focus {
                outline: none;
            }

            &.selected {
                background: #d8d8db;
                font-weight: 500;

                @include for-phone-only {
                    background: #FC8709;
                    color: #fff;
                }
            }
        }
    }

}
</style>
