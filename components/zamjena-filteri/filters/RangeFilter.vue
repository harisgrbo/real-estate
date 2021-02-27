<template>
  <div class="range-wrapper">
    <label class="filter-label">
      <span>{{ displayName }}</span>
    </label>
    <div class="range-wrapper-inner">
      <div>
        <md-field>
          <label>{{ displayName }} od</label>
          <md-input v-model="from" type="number" @change="handleChange"></md-input>
        </md-field>
      </div>
      <div>
        <md-field>
          <label>{{ displayName }} do</label>
          <md-input v-model="to" type="number" @change="handleChange"></md-input>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
import FilterMixin from "./FilterMixin.js";

export default {
  name: "RangeFilter",
  mixins: [FilterMixin],

  data() {
    return {
      from: null,
      to: null
    };
  },

  created() {
    this.from = this.set ? this.value.value[0] : null;
    this.to = this.set ? this.value.value[1] : null;
  },

  methods: {
    handleChange(e) {
      this.$emit(
        "input",
        this.buildValue("range", [parseFloat(this.from), parseFloat(this.to)])
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.range-wrapper {
  display: flex;
  flex-direction: column;
  .range-wrapper-inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-top: 10px;
    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      max-width: 48%;
      p {
        font-size: 13px;
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

.md-field label {
  font-size: 13px !important;
}

.md-field input {
  padding: 0 8px;
  font-size: 13px !important;
  font-weight: 500;
  max-width: 100%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>