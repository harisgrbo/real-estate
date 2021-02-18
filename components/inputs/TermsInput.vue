<template>
  <div class="w-full">
    <div class="w-full flex justify-start flex-wrap button-wrap">
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
@mixin for-laptop {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}
@mixin for-desktop-up {
  @media (min-width: 1200px) {
    @content;
  }
}
@mixin for-big-desktop-up {
  @media (min-width: 1800px) {
    @content;
  }
}
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
.button-wrap {
  display: flex;
  flex-direction: column;

  label {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 12px;
    margin-top: 24px;
  }

  .option-wrapper {
    display: flex;
    flex-direction: row;
    height: fit-content;
    flex-wrap: wrap;

    @include for-phone-only {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      row-gap: 12px;
      column-gap: 12px;
    }

    button {
      margin-right: 12px;
      margin-bottom: 12px;
      height: 40px;
      border-radius: 4px;
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-weight: 400;
      background: #f1f1f1;
      outline: none;
      border: none;
      padding: 0 12px;
      cursor: pointer;

      @include for-phone-only {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
      }

      &.selected {
        background: #757B9A !important;
        color: #fff;
        font-weight: 500;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

</style>
