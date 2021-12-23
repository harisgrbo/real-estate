<template>
  <div class="terms-filter">
    <label>
      {{ displayName }}
    </label>
    <div v-if="filter.values" class="options-wrap">
      <button
        v-for="option in filter.values"
        :key="option.id"
        :class="options.indexOf(option) >= 0 ? 'active': ''"
        @click="handleChange($event, option)"
      >{{ option }}</button>
    </div>
  </div>
</template>

<script>
import FilterMixin from "./FilterMixin.js";
import { Vue, Component } from "nuxt-property-decorator";

@Component({
  mixins: [FilterMixin]
})
export default class TermsFilter extends Vue {
  options = []

  created() {
    if (this.set && this.value.value.length) {
      this.options = [...this.value.value];
    }
  }

  handleChange(e, option) {
    this.toggleOption(option);

    if (this.options.length) {
      this.$emit("input", this.buildValue("terms", this.options));
    } else {
      this.clear();
    }
  }

  toggleOption(option) {
    let index = this.options.indexOf(option);
    if (index === -1) {
      this.options.push(option);
    } else {
      this.options.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.terms-filter {
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  label {
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 12px;
  }

  .options-wrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 12px;
    grid-column-gap: 12px;

    @include for-phone-only {
      grid-template-columns: repeat(2, 1fr);
    }

    button {
      background: #f3f4f5;
      border-radius: 4px;
      box-shadow: none;
      box-sizing: border-box;
      height: 48px;
      line-height: .733rem;
      margin: initial;
      overflow: hidden;
      padding: 1px 2px;
      white-space: normal;
      width: 100%;

      &:focus {
        outline: none;
      }

      &.active {
        background: #cacdd2;

      }
    }
  }
}
</style>
