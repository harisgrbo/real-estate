<template>
  <div class="range-wrapper">
    <label class="filter-label">
      <span>{{ displayName }}</span>
    </label>
    <div v-if="filter.values" class="flex justify-between">
      <button
        v-for="option in filter.values"
        :class="options.indexOf(option) >= 0 ? 'active': ''"
        @click="handleChange($event, option)"
      >{{ option }} ({{ aggregationFor(option) }})</button>
    </div>
  </div>
</template>

<script>
import FilterMixin from "./FilterMixin";

export default {
  name: "TermsFilter",
  mixins: [FilterMixin],
  data() {
    return {
      options: []
    };
  },
  created() {
    if (this.set && this.value.value.length) {
      this.options = [...this.value.value];
    }
  },

  methods: {
    handleChange(e, option) {
      this.toggleOption(option);
      console.log(this.buildValue("terms", this.options), "clclclclc");

      if (this.options.length) {
        this.$emit("input", this.buildValue("terms", this.options));
      } else {
        console.log("clear");
        this.clear();
      }
    },

    aggregationFor(key) {
      if (this.filter.buckets) {
        let obj = this.filter.buckets.find(item => item.key === key);
        if (obj) {
          return obj.doc_count;
        }
      }

      return 0;
    },

    toggleOption(option) {
      let index = this.options.indexOf(option);
      if (index === -1) {
        this.options.push(option);
      } else {
        this.options.splice(index, 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  color: blue;
}

.range-wrapper {
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: fit-content;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    button {
      background-color: #fff;
      border: 1px solid #a5a5a5;
      border-radius: 3px;
      max-width: 80%;
      height: 32px;
      padding: 0 8px;
      font-size: 12px;
      font-weight: 700;
      margin-right: 10px;
      margin-bottom: 10px;
      color: #a5a5a5;
      font-weight: 500;
      &:focus {
        outline: none;
      }
      &.active {
        border: 1px solid #609bff;
        color: #609bff;
      }
    }
  }
}
.filter-label {
  height: 40px;
  display: flex;
  width: 100%;
  background-color: #fbfbfb;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 3px;
  position: relative;
  span {
    margin-left: 16px;
  }
}
.filter-label::before {
  content: "";
  height: 100%;
  width: 3px;
  background: #609bff;
  left: 5;
}
</style>