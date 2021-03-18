<template>
  <div class="input-wrapper">
    <label>{{ title }}</label>
    <div class="input-inner">
      <input
        :type="type"
        :class="error && error.length? 'hasError' : ''"
        :value="value"
        @input="updateValue($event.target.value)"  @blur="$emit('blur')"/>
      <div class="currency" v-if="currency">
        KM
      </div>
    </div>

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
  @Prop({ type: Boolean }) currency;

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
.input-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  label {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 12px;
  }

  .input-inner {
    display: flex;
    width: 100%;
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 4px;
    align-items: center;
    justify-content: space-between;
    padding: 4px 12px;
    margin-right: 24px;
    transition: 0.1s all ease;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    @include for-phone-only {
      padding: 0 12px;
    }
  }

  .currency {
    height: 100%;
    border-left: 1px solid #dcdcdc;
    padding-left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  input {
    display: flex;
    border: none;
    width: 100%;
    height: auto;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    @include for-phone-only {
      padding: 0 12px;
    }
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
