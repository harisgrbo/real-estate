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
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
.terms-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  label {
    font-size: 18px;
    font-weight: 500;
    text-transform: capitalize;
    margin-bottom: 16px;
  }

  .option-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 24px;
    grid-column-gap: 24px;
    margin-bottom: 24px;

    button {
      height: 60px;
      border-radius: 7px;
      background: #f9f9f9;
      border: 1px solid #ddd;
      margin-bottom: 0;
      cursor: pointer;
      width: 100%;
      font-weight: 400;
      color: #717171;
      font-size: 16px;

      &:focus {
        outline: none;
      }

      &.selected {
        background: #f9f9f9;
        font-weight: 500;
        border: 2px solid #000;
        color: #000;

      }
    }
  }

}
</style>
