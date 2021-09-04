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
  margin-bottom: 36px;
  input {
    height: 60px;
    border: 1px solid #000;
    border-radius: 10px;
    font-weight: 600;
    color: #000;
    font-size: 18px;
    padding: 0 24px;

    &:focus {
      outline: none;
    }
    &.hasError {
      border: 1px solid red;
    }
  }
  label {
    font-size: 18px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 24px;
  }
}
</style>
