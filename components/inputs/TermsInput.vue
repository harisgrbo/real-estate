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
