<template>
  <div class="w-full">
    <div class="w-full flex justify-start flex-wrap">
      <label :for="attr.name">{{ attr.name }}</label>
      <input
        :id="attr.name"
        type="checkbox"
        v-model="checked"
        @input="checkedOption"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TermsInput",
  props: ["attr"],
  data() {
    return {
      checked: false
    };
  },
  methods: {
    checkedOption() {
      this.$emit('changed', {
        id: this.attr.id,
        name: this.attr.name,
        value: !this.checked
      })
    }
  }
};
</script>

<style scoped>
.selected {
  border: 2px solid blue;
}
</style>
