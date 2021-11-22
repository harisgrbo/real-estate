<template>
  <div class="terms-wrapper">
    <label>{{ attr.name }} {{ attr.required ? '*': '' }}</label>
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
  props: ["attr", 'init'],
  data() {
    return {
      val: null
    };
  },
  created() {
    this.val = this.init;
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

    @include for-phone-only {
      grid-row-gap: 16px;
      grid-column-gap: 16px;
    }

    button {
      background: #f3f4f5;
      border-radius: 4px;
      box-shadow: none;
      box-sizing: border-box;
      height: 40px;
      line-height: .733rem;
      margin: initial;
      overflow: hidden;
      padding: 1px 2px;
      white-space: normal;
      width: 100%;

      &:focus {
        outline: none;
      }

      &.selected {
        background: #cacdd2;

      }
    }
  }

}
</style>
