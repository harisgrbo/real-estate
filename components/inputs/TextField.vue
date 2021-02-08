<template>
  <div class="input-wrapper">
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
  @Prop({ type: String, required: true}) placeholder;
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
    height: 50px;
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
    color: red;
    font-size: 14px;
    font-weight: 400;
    position: absolute;
    left: 0;
    top: 60px;
  }
}
</style>
