<template>
  <div class="input-wrapper">
    <label>{{ attr.name }}</label>
    <input type="number" v-model="val" @input="handleChange" />
  </div>
</template>

<script>
export default {
  name: "RangeInput",
  props: ["attr"],
  data() {
    return {
      val: false
    };
  },
  methods: {
    handleChange() {
      this.$emit('changed', {
        id: this.attr.id,
        name: this.attr.name,
        value: this.val
      })
    }
  }
};
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
