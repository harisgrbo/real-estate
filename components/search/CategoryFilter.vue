<template>
  <div class="category-filter">
    <label>
      Kategorija
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
.category-filter {
  display: flex;
  flex-direction: column;
  label {
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  ul {
    padding: 12px;
    border-radius: 5px;
    background: #f8f8f8;

    li {
      display: flex;
      height: 30px;
      align-items: center;
      justify-content: flex-start;

      &.active {
        color: #1B1E31;
        font-weight: 600;
      }
    }
  }
}

</style>
