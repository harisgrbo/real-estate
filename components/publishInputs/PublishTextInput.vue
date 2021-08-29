<template>
  <div class="relative">
    <label for="price" class="block text-sm font-medium text-gray-700">{{ title }}</label>
    <div class="mt-1 relative rounded-md">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      </div>
      <input :type="type"
             :value="value"
             @input="updateValue($event.target.value)"  @blur="$emit('blur')" name="price" id="price" :class="['focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md', error && error.length ? 'border-red-300 text-red-900 placeholder-red-300' : '']" aria-describedby="price-currency">
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span v-if="currency" class="text-gray-500 sm:text-sm" id="price-currency">
          KM
        </span>
      </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600" id="email-error">{{ error }}</p>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
})

export default class PublishTextInput extends Vue{
  @Prop({ type: String, required: true}) type;
  @Prop({ type: String }) error;
  @Prop({ type: String }) title;
  @Prop({ type: String }) value;
  @Prop({ type: Boolean }) currency;

  updateValue(value) {
    this.$emit('input', value)
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

input {
  height: 48px;
  border: 1px solid #dcdcdc;
}
</style>
