<template>
  <div class="range-wrapper">
    <label>
      {{ displayName }}
    </label>
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4" v-if="false">
      <div class="flex">
        <div class="ml-3">
          <p class="text-sm text-yellow-700">
            Prosječna cijena nekretnine za izabranu kategoriju je {{ /*parseInt(avgPrice).toLocaleString()*/ }}
          </p>
        </div>
      </div>
    </div>
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
import FilterMixin from "./FilterMixin.js";

@Component({
  mixins: [FilterMixin]
})
export default class RangeFilter extends Vue {
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
    font-size: 12px;
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 12px;

    > div {
      display: flex;
      flex-direction: column;
      padding: 12px;
      background: #fff;
      border: 1px solid #000;
      border-radius: 10px;
      font-weight: 600;
      color: #000;
      font-size: 18px;

      label {
        font-size: 12px;
        font-weight: 400;
        color: #4AAE9B;
        text-transform: none;
      }

      input {
        border: none;
        display: flex;
        width: 100%;

        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
