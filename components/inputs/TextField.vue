<template>
  <div class="relative w-full">
    <label for="price" class="block text-sm font-medium text-gray-700 mb-3" v-if="label">{{ label }}</label>
    <div :class="['block w-full sm:text-sm border-gray-300 rounded-md mt-0 relative rounded-md text-input', error && error.length ? 'border-red-300 text-red-900 placeholder-red-300' : '']">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      </div>
      <input     :type="type"
                 :value="value"
                 @input="updateValue($event.target.value)" id="price" aria-describedby="price-currency">
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span v-if="currency" class="text-gray-500 sm:text-sm font-medium" id="price-currency">
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
  @Prop({ type: String }) error;
  @Prop({ type: String }) label;
  @Prop({}) value;
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

.text-input {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 0 12px;
  background: #F3F3F4;
  flex: 2;
  position: relative;
  transition: 0.3s all ease;
  max-width: 600px;
  margin-top: 0;
}

input {
  padding: 0 12px;
  height: 100%;
  background: transparent;
  width: 100%;
  font-weight: 500;
  font-size: 14px;

  &:focus {
    outline: none;
  }

}

::placeholder {
  color: #797979;
}
</style>
