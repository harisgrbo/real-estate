<template>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <fieldset>
        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:gap-x-4">
            <!--
              Checked: "border-transparent", Not Checked: "border-gray-300"
              Active: "ring-2 ring-indigo-500"
            -->
            <label class="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
                   v-for="option in options"
                   :class="[value && value.id === option.id? 'ring-2 ring-gray-900 border-transparent': 'border-gray-300']"
                   :key="option.id" @change="selectOption(option)"
            >
                <input
                    :id="option.id" :value="option.title" :checked="value && value.id === option.id"
                    type="radio" name="project-type" value="Newsletter" class="sr-only"
                    aria-labelledby="project-type-0-label"
                    aria-describedby="project-type-0-description-0 project-type-0-description-1">
                <div class="flex-1 flex">
                    <div class="flex flex-col">
          <span id="project-type-0-label" class="block text-md mb-2 font-semibold text-gray-900">
            {{ option.title }}
          </span>
                        <span id="project-type-0-description-0" class="mt-1 flex items-center text-sm text-gray-500">
            {{ option.description }}
          </span>
                    </div>
                </div>
                <svg v-show="value && value.id === option.id" class="h-5 w-5 text-gray-900"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"/>
                </svg>
                <!--
                  Active: "border", Not Active: "border-2"
                  Checked: "border-indigo-500", Not Checked: "border-transparent"
                -->
                <div class="absolute -inset-px rounded-lg border-2 pointer-events-none" aria-hidden="true"></div>
            </label>

        </div>
    </fieldset>

</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component({})

export default class PublishRadioButton extends Vue {
    @Prop({type: Array}) options;
    @Prop({type: Object}) value;

    selected = false;

    selectOption(option) {
        this.$emit('input', option)
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
    border: 1px solid #f1f1f1;
    border-radius: 8px;
}
</style>
