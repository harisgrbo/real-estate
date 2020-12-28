<template>
  <div class="range-wrapper">
    <label class="filter-label">
      <span>{{ displayName }}</span>
    </label>
    <div class="range-wrapper-inner">
      <div>
        <label>{{ displayName }} od</label>
        <input v-model="from" type="number" @change="handleChange">
      </div>
      <div>
        <label>{{ displayName }} do</label>
        <input v-model="to" type="number" @change="handleChange">
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import FilterMixin from "@/components/mixins/FilterMixin.js";

@Component({
  mixins: [FilterMixin]
})

export default class RangeFilter extends Vue{
      from = null
      to = null

  created() {
    this.from = this.set ? this.value.value[0] : null;
    this.to = this.set ? this.value.value[1] : null;
  }

  handleChange(e) {
    this.$emit(
      "input",
      this.buildValue("range", [parseFloat(this.from), parseFloat(this.to)])
    );
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
    padding: 16px 0;
    label {
      margin-bottom: 12px;
      font-size: 14px;
    }
    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
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

label {
  font-size: 13px !important;
}

input {
  padding: 0 8px;
  font-size: 13px !important;
  font-weight: 500;
  max-width: 100%;
  border:1px solid #bfbdbd;
  border-radius: 5px;
  height: 40px;
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
