<template>
  <div class="relative w-full flex flex-col items-start">
    <label for="price" class="block text-md font-semibold text-gray-900 mb-2" v-if="label">{{ label }}</label>
    <div :class="['block w-full min-w-full sm:text-sm border-gray-300 rounded-md mt-0 relative rounded-md text-input', error && error.length ? 'border-red-300 text-red-900 placeholder-red-300' : '']">
      <textarea
       :value="value"
       :placeholder="placeholder"
       @input="updateValue($event.target.value)"
      ></textarea>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600" id="email-error">{{ error }}</p>
  </div>
</template>

<script>
import {Component, Vue, Prop, Watch} from "nuxt-property-decorator";

@Component({
})

export default class TextAreaField extends Vue{
  @Prop({ type: String }) error;
  @Prop({ type: String }) label;
  @Prop({ type: String }) placeholder;
  @Prop({}) value;

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

textarea {
  padding: 12px;
  height: 100%;
  background: transparent;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  min-height: 250px;
  min-width: 100%;

  &:focus {
    outline: 1px solid #000;
    border-radius: 4px;
  }

}

::placeholder {
  color: #b1b1b1;
}
</style>
