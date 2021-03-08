<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :class="error && error.length? 'hasError' : ''"
      :value="value"
      @input="updateValue($event.target.value)" />
    <label v-if="error">{{ error }}</label>
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
    font-family: 'Montserrat', sans-serif;
    padding: 0 12px;
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

}
</style>
