<template>
  <div class="input-wrapper">
    <label>{{ title }}</label>
    <input
      :type="type"
      :class="error && error.length? 'hasError' : ''"
      :value="value"
      @input="updateValue($event.target.value)"  @blur="$emit('blur')"/>
    <span v-if="error">{{ error }}</span>
    {{ error }}
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
  label {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 12px;
  }
  input {
    display: flex;
    width: 100%;
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 4px;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    margin-right: 24px;
    transition: 0.1s all ease;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    &:focus {
      outline: none;
    }
    &.hasError {
      border: 1px solid red;
    }
  }
  span {
    color: red;
    font-size: 14px;
    font-weight: 400;
    position: absolute;
    left: 0;
    top: 60px;
  }
}
</style>
