<template>
  <div class="relative w-full flex flex-col items-start">

  <div class="relative border text-wrap border-gray-300 rounded-md">
    <label for="name" class="absolute -top-2 left-1 -mt-px inline-block px-2 bg-white text-xs font-semibold text-gray-900" v-if="label">{{ label }}</label>
    <textarea
      :value="value"
      :placeholder="placeholder"
      @input="updateValue($event.target.value)"
      name="name" id="name" class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"></textarea>
    <p v-if="error" class="mt-2 text-sm text-red-600" id="email-error">{{ error }}</p>
  </div>
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

.text-wrap {
  min-height: 180px;
  border: 1px solid #f1f1f1 !important;
  width: 100%;
  textarea {
    padding: 16px;
    min-height: 180px !important;
    background: #fff !important;
  }
}

label {
  font-size: 14px;
}

::placeholder {
  color: #b1b1b1;
}
</style>
