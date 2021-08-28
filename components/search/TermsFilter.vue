<template>
  <div class="terms-filter">
    <label>
      <span>{{ displayName }}</span>
    </label>
    <div v-if="filter.values" class="options-wrap">
      <button
        v-for="option in filter.values"
        :class="options.indexOf(option) >= 0 ? 'active': ''"
        @click="handleChange($event, option)"
      >{{ option }} ({{ aggregationFor(option) }})</button>
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
      console.log("clear");
      this.clear();
    }
  }

  aggregationFor(key) {
    if (this.filter.buckets) {
      let obj = this.filter.buckets.find(item => item.key === key);
      if (obj) {
        return obj.doc_count;
      }
    }

    return 0;
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
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .options-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 12px;
    grid-column-gap: 12px;

    @include for-phone-only {
      grid-template-columns: repeat(2, 1fr);
    }

    button {
      font-family: 'Montserrat', sans-serif;
      cursor: pointer;
      height: 40px;
      border: none;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 400;
      font-size: 13px;
      background: #fff;

      &:focus {
        outline: none;
      }

      &.active {
        border:1px solid #1F2937;
        color: #1F2937;
        font-weight: 500;
      }
    }
  }
}
</style>
