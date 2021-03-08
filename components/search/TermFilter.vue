<template>
    <div class="term-wrapper">
      <label>{{ displayName }}</label>
        <select v-if="filter.values" @change="handleChange">
            <option value="">...</option>
            <option v-for="option in filter.values" :value="option">{{ option }}</option>
        </select>
        <input v-else :value="set ? value.value: null" @keyup.prevent="handleChange" />
    </div>
</template>

<script>
import FilterMixin from "./FilterMixin.js";
import { Vue, Component } from "nuxt-property-decorator";

@Component({
  mixins: [FilterMixin]
})
export default class TermFilter extends Vue {
  handleChange(e) {
    if(e.target.value.length) {
      this.$emit('input', this.buildValue('term', e.target.value))
    } else {
      this.clear()
    }
  }
}
</script>

<style scoped lang="scss">
.term-wrapper {
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
