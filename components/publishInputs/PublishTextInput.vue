<template>
  <div class="relative">
<!--    <label for="price" class="block text-sm font-medium text-gray-700">{{ title }}</label>-->
    <div class="mt-1 relative rounded-md input-wrap">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      </div>
      <input :type="type"
             :value="value"
             @input="updateValue($event.target.value)"  @blur="$emit('blur')" :placeholder="title" name="price" id="price" :class="['block w-full pl-4 pr-24 sm:text-sm rounded-md', error && error.length ? 'border-red-300 text-red-900 placeholder-red-300' : '']" aria-describedby="price-currency">
      <div class="absolute inset-y-0 right-0 bg-gray-200 rounded-md m-2 flex items-center pointer-events-none">
        <span v-if="currency" class="text-gray-500 flex flex-row items-center" id="price-currency">
          KM
          <p v-if="showSquareM" class="pl-1">/ m²</p>
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

export default class PublishTextInput extends Vue{
  @Prop({ type: String, required: true}) type;
  @Prop({ type: String }) error;
  @Prop({ type: String }) title;
  @Prop({ type: String }) value;
  @Prop({ type: String }) square;
  @Prop({ type: Boolean }) currency;

  showSquareM = false;

  updateValue(value) {
    this.$emit('input', value)
  }

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

input {
  height: 60px;
  font-weight: 500;
  color: #000;
  font-size: 18px;
  transition: 0.3s all ease;
  border: none;
  background: transparent;

  &:focus {
    outline: none;
  }
}

::placeholder {
  font-weight: 400;
  color: #9F9FAF;
  font-size: 16px;
}

#price-currency {
  font-weight: bold;
  font-size: 18px;
  color: black !important;
  padding: 0 24px;
}

.input-wrap {
  background: #F7F6F9;
  border-radius: 7px;
}
</style>
