<template>
  <div class="terms-wrapper">
    <label>{{ attr.name }}</label>
    <div class="option-wrapper">
      <button
        class="select"
        v-for="option in attr.values"
        :key="option.id"
        :class="[val === option ? 'selected': '']"
        @click.prevent="selectOption(option)"
      >{{ option }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TermsInput",
  props: ["attr"],
  data() {
    return {
      val: null
    };
  },
  methods: {
    selectOption(o) {
      this.val = o;
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
.terms-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  label {
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

}
</style>
