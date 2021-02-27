<template>
  <div class="match-wrapper">
    <label>{{ displayName }}</label>
    <input :value="set ? value.value: null" @keyup.prevent="handleChange" />
  </div>
</template>

<script>
import FilterMixin from "./FilterMixin.js";
import { Vue, Component } from "nuxt-property-decorator";

@Component({
  mixins: [FilterMixin]
})
export default class MatchFilter extends Vue {
  handleChange(e) {
    if (e.target.value.length) {
      this.$emit("input", this.buildValue("match", e.target.value));
    } else {
      this.clear();
    }
  }
};
</script>

<style lang="scss" scoped>
.match-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  label {
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

}
</style>
