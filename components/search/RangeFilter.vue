<template>
  <div>
    <label>
      <span>{{ displayName }}</span>
    </label>
    <div>
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
</style>
