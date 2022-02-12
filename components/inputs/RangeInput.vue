<template>
  <div class="relative main-input-wrap border text-wrap border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:text-gray-900 focus-within:ring-gray-900 focus-within:ring-gray-900 focus-within:border-gray-900">
    <label for="name" class="absolute -top-2 left-1 -mt-px inline-block px-2 bg-white text-xs font-medium text-gray-500">{{ attr.name }} {{ attr.required ? '*': '' }}</label>
    <input
      type="number" v-model="val" @input="handleChange"
      autocomplete="off"
      name="name" id="name" class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm">
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

.text-wrap {
  min-height: 36px;
  border: 1px solid #f1f1f1 !important;
  width: 100%;
  input {
    min-height: 36px !important;
  }
}

label {
  font-size: 14px;
}

::placeholder {
  color: #b1b1b1;
}
</style>
