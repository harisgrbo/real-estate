<template>
  <div class="relative w-full flex flex-col items-start">
    <label for="price" class="block text-md font-semibold text-gray-900 mb-2" v-if="label">{{ label }}</label>
    <div :class="['block w-full sm:text-sm border-gray-300 rounded-md mt-0 relative rounded-md text-input', error && error.length ? 'border-red-300 text-red-900 placeholder-red-300' : '']">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      </div>
      <input     :type="type"
                 :value="value"
                 :placeholder="placeholder"
                 @change="updateValue($event.target.value)" id="price" aria-describedby="price-currency">
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span v-if="currency" class="text-gray-900 sm:text-sm font-semibold flex flex-row items-center" id="price-currency">
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
  @Prop({ type: String, required: true}) type;
  @Prop({ type: String }) error;
  @Prop({ type: String }) label;
  @Prop({ type: String }) placeholder;
  @Prop({ type: Boolean }) square;
  @Prop({ type: Boolean }) discount;
  @Prop({}) value;
  @Prop({type: Boolean}) currency;

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

.text-input {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #ddd;
  flex: 2;
  position: relative;
  transition: 0.3s all ease;
  max-width: 600px;
  margin-top: 0;
  min-height: 48px;
}

input {
  padding: 0 12px;
  height: 100%;
  background: transparent;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  min-height: 48px;

  &:focus {
    outline: 1px solid #000;
    border-radius: 4px;
  }

}

::placeholder {
  color: #b1b1b1;
}
</style>
