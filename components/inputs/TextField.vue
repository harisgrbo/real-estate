<template>
  <div class="relative">
    <label for="price" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="mt-1 relative rounded-md">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      </div>
      <input     :type="type"
                 :placeholder="placeholder"
                 :value="value"
                 @input="updateValue($event.target.value)" id="price" :class="['block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md', error && error.length ? 'border-red-300 text-red-900 placeholder-red-300' : '']" aria-describedby="price-currency">
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

export default class TextField extends Vue{
  @Prop({ type: String, required: true}) type;
  @Prop({ type: String, default: ""}) placeholder;
  @Prop({ type: String }) error;
  @Prop({ type: String }) label;
  @Prop({ type: String }) value;
  @Prop({type: Boolean}) currency;

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
  height: 50px;
  background: #f9f9f9;
  border-radius: 10px;
  padding-right: 24px !important;

  &:hover,
  &:focus,
  &:visited {
    outline: none;
  }
}
</style>
