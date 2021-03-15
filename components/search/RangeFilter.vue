<template>
  <div class="range-wrapper">
    <label>
      {{ displayName }}
    </label>
    <small v-if="avgPrice">Prosječna cijena nekretnine za izabranu kategoriju je {{ parseInt(avgPrice).toLocaleString() }}</small>
    <div class="input-wrapper">
      <div>
        <label>min cijena</label>
        <input v-model="from" type="number" @change="handleChange">
      </div>
      <div>
        <label>max cijena</label>
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
export default class RangeFilter extends Vue {
  @Prop({}) avgPrice
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
  margin-top: 24px;
  label {
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  small {
    margin-bottom: 16px;
    color: #1B1E31;
    font-weight: 500;
  }

  .input-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      flex-direction: column;
      padding: 12px;
      border: 1px solid #dddddd;
      border-radius: 5px;
      flex: 1;

      &:first-child {
        margin-right: 8px;
      }

      &:last-child {
        margin-left: 8px;
      }

      label {
        font-size: 12px;
        font-weight: 400;
        color: #4AAE9B;
        text-transform: none;
      }

      input {
        border: none;

        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
