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
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 12px;
  }

  .option-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 12px;
    grid-column-gap: 12px;

    @include for-phone-only {
      grid-template-columns: repeat(2, 1fr);

    }

    button {
      height: 48px;
      border-radius: 5px;
      background: #f1f1f1;
      border: none;
      font-size: 15px;
      font-weight: 500;
      font-family: 'Raleway', sans-serif;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &.selected {
        background: #D63946;
        font-weight: 600;
        color: #fff;

      }
    }
  }

}
</style>
