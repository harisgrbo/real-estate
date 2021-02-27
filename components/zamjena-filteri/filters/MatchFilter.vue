<template>
  <div>
    <label class="filter-label">{{ displayName }}</label>
    <input :value="set ? value.value: null" @keyup.prevent="handleChange" />
  </div>
</template>

<script>
import FilterMixin from "../../search/FilterMixin.js";

export default {
  name: "MatchFilter",
  mixins: [FilterMixin],

  methods: {
    handleChange(e) {
      if (e.target.value.length) {
        this.$emit("input", this.buildValue("match", e.target.value));
      } else {
        this.clear();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-label {
  height: 40px;
  display: flex;
  width: 100%;
  background-color: #fbfbfb;
  align-items: center;
  padding: 0 16px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 3px;
  text-transform: uppercase;
}
</style>
