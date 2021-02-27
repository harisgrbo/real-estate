<template>
  <div>
    <label>
      <span>Category</span>
    </label>
    <ul>
      <li
        v-for="category in categories"
        :class="[value && category.id === value.value ? 'active' : '']"
        @click="handleChange($event, category.id)"
      >{{ category.title }}</li>
    </ul>
  </div>
</template>

<script>
import FilterMixin from "./FilterMixin.js";
import { Component, Prop, Vue} from "nuxt-property-decorator";

@Component({
  mixins: [FilterMixin]
})
export default class CategoryFilter extends Vue {
  @Prop({
    required: true,
    type: Array
  }) categories;

  @Prop({
    required: true,
    type: Array
  }) aggregations;

  @Prop({
    required: false
  }) filter;

  handleChange(e, id) {
    let data = this.buildValue("match", id, "category_id");
    this.$emit("input", data);
  }

  agg(key) {
    return this.aggregations.find(item => item.key === key).doc_count;
  }
};
</script>

<style lang="scss" scoped>
.active {
  color: red;
}
</style>
