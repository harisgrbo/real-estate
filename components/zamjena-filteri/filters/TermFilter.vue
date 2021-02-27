<template>
    <div>
        {{ displayName }}
        <select v-if="filter.values" @change="handleChange">
            <option value="">...</option>
            <option v-for="option in filter.values" :value="option">{{ option }}</option>
        </select>
        <input v-else :value="set ? value.value: null" @keyup.prevent="handleChange" />
    </div>
</template>

<script>
  import FilterMixin from "../../search/FilterMixin";

  export default {
    name: "TermFilter",
    mixins: [FilterMixin],

    methods: {
      handleChange(e) {
        if(e.target.value.length) {
          this.$emit('input', this.buildValue('term', e.target.value))
        } else {
          this.clear()
        }
      }
    }
  }
</script>

<style scoped>

</style>
