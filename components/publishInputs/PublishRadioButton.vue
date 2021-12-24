<template>
  <div class="publish-radio-buttons">
    <div class="bg-white rounded-md grid grid-cols-1 gap-4">
      <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
      <label class="relative p-4 flex cursor-pointer focus:outline-none border border-gray-100 rounded-sm hover:shadow-sm cursor-pointer" v-for="option in options" :class="[value && value.id === option.id? 'selected': '']" :key="option.id" @change="selectOption(option)">
        <input :id="option.id" :value="option.title" :checked="value && value.id === option.id" type="radio"  class="h-4 w-4 mt-0.5 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
        <div class="ml-3 flex flex-col">
          <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
          <span id="privacy-setting-0-label" class="block text-sm font-medium">
          {{ option.title }}
        </span>
          <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
          <span id="privacy-setting-0-description" class="block text-sm">
        </span>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
})

export default class PublishRadioButton extends Vue{
  @Prop({ type: Array }) options;
  @Prop({ type: Object }) value;

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
  border-radius: 4px;
}
</style>
