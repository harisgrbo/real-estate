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
.terms-filter {
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  label {
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .options-wrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 12px;
    grid-column-gap: 12px;

    button {
      font-family: 'Montserrat', sans-serif;
      cursor: pointer;
      height: 40px;
      border: none;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 14px;

      &:focus {
        outline: none;
      }

      &.active {
        background: #D63946;
        color: #fff;
      }
    }
  }
}
</style>
