<template>
  <div class="input-wrapper">
    <label>
      <p v-if="required">*</p>{{ title }}
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      :class="error && error.length? 'hasError' : ''"
      :value="value"
      @input="updateValue($event.target.value)" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
})

export default class RangeInput extends Vue{
  @Prop({ type: String }) type;
  @Prop({ type: Boolean }) required;
  @Prop({ type: String }) placeholder;
  @Prop({ type: String }) title;
  @Prop({ type: String }) error;
  @Prop({ type: String }) value;

  updateValue(value) {
    this.$emit('input', value)
  }
}
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  input {
    height: 53px;
    background: #F5F5F5;
    border-radius: 4px;
    border: none;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 24px;
    margin-bottom: 12px;
    font-weight: 500;
    font-size: 14px;
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
    &.hasError {
      border: 1px solid red;
    }
  }
  label {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 12px;
  }
}
</style>
