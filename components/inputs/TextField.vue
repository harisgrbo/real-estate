<template>
  <div class="relative w-full flex flex-col items-start">
    <div class="relative border text-wrap border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:text-gray-900 focus-within:ring-gray-900 focus-within:ring-gray-900 focus-within:border-gray-900">
      <label for="name" class="absolute -top-2 left-1 -mt-px inline-block px-2 bg-white text-xs font-medium text-gray-500" v-if="label">{{ label }}</label>
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        autocomplete="off"
        @change="updateValue($event.target.value)"
        name="name" :id="id" class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm">
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span v-if="currency" class="text-gray-500 sm:text-sm font-semibold flex flex-row items-center" id="price-currency">
          KM
           <p v-if="showSquareM" class="pl-1">/ m²</p>
        </span>
        <span v-if="discount" class="text-gray-900 sm:text-sm font-semibold flex flex-row items-center" id="price-currency">
          %
        </span>
      </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600" id="email-error">{{ error }}</p>
  </div>
</template>

<script>
import {Component, Vue, Prop, Watch} from "nuxt-property-decorator";

@Component({
})
export default class TextField extends Vue{
  @Prop({ type: String, default: 'text'}) type;
  @Prop({ type: String }) error;
  @Prop({ type: String }) label;
  @Prop({ type: String }) placeholder;
  @Prop({ type: Boolean }) square;
  @Prop({ type: Boolean }) discount;
  @Prop({}) value;
  @Prop({ type: String, default: '' }) id;
  @Prop({type: Boolean}) currency;
  @Prop() max

  updateValue(value) {
    this.$emit('input', value)
  }

  showSquareM = false;

  @Watch('square', { deep: true })
  onSquareChange(val, oldVal) {
    this.showSquareM = !this.showSquareM;
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.text-wrap {
  min-height: 36px;
  border: 1px solid #f1f1f1 !important;
  width: 100%;
  input {
    min-height: 36px !important;
  }
}

label {
  font-size: 14px;
}

::placeholder {
  color: #b1b1b1;
}
</style>
