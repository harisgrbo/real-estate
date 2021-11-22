<template>
    <div class="term-wrapper">
      <label :for="'checkbox' + $vnode.key">{{ displayName }} </label>
      <select v-if="filter.values" @change="handleChange">
          <option value="">...</option>
          <option v-for="option in filter.values" :value="option">{{ option }}</option>
      </select>
      <input :id="'checkbox' + $vnode.key" v-else v-model="checked" type="checkbox" @input="handleChange" />
    </div>
</template>

<script>
import FilterMixin from "./FilterMixin.js";
import { Vue, Component } from "nuxt-property-decorator";

@Component({
  mixins: [FilterMixin]
})
export default class TermFilter extends Vue {
  checked = false

  created() {
    this.checked = this.set ? this.value.value: false;
  }

  handleChange(e) {
    if(this.checked === false) {
      this.$emit('input', this.buildValue('term', (! this.checked) + ''))
    } else {
      this.clear()
    }
  }
}
</script>

<style scoped lang="scss">
.term-wrapper {
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  label {
    font-weight: 400;
    font-size: 13px;
    width: 100%;
    cursor: pointer;
  }

}
</style>
