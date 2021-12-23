<template>
  <div class="input-wrapper">
    <label class="block text-md font-semibold text-gray-900 mb-2">{{ attr.name }} {{ attr.required ? '*': '' }}</label>
    <input type="number" v-model="val" @input="handleChange" />
  </div>
</template>

<script>
export default {
  name: "RangeInput",
  props: ["attr", "init"],
  data() {
    return {
      val: false
    };
  },
  created() {
    if (this.init) {
      this.val = this.init;
    }
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
    padding: 0 12px;

    &:focus {
      outline: 1px solid #000;
      border-radius: 4px;
    }

  }


}
</style>
