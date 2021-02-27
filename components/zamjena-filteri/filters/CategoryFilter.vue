<template>
  <div>
    <label class="filter-label" @click="collapse = !collapse">
      <span>Category</span>
      <i class="material-icons" :class="[ collapse ? 'rotate' : '']">keyboard_arrow_left</i>
    </label>
    <ul v-show="collapse === true">
      <li
        v-for="category in categories"
        :class="[ category.id === value.value ? 'active' : '']"
        @click="handleChange($event, category.id)"
      >{{ category.name }}</li>
    </ul>
  </div>
</template>

<script>
import FilterMixin from "./FilterMixin.js";

export default {
  name: "CategoryFilter",
  props: {
    categories: {
      required: true,
      type: Array
    },
    aggregations: {
      required: true,
      type: Array
    },
    filter: {
      required: false
    }
  },
  mixins: [FilterMixin],
  data() {
    return {
      collapse: false
    };
  },
  methods: {
    handleChange(e, id) {
      let data = this.buildValue("match", id, "category_id");
      this.$emit("input", data);
    },
    agg(key) {
      return this.aggregations.find(item => item.key === key).doc_count;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-label {
  height: 40px;
  display: flex;
  width: 100%;
  background-color: #fbfbfb;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  span {
    margin-left: 16px;
  }
  i {
    transform: rotate(-90deg);
    &.rotate {
      transform: rotate(-270deg) !important;
    }
  }
}

.filter-label::before {
  position: absolute;
  content: "";
  height: 100%;
  width: 3px;
  background: #609bff;
  left: 0;
}

ul {
  margin-bottom: 10px;
  padding-left: 16px;
  li {
    font-weight: 600;
    &.active {
      font-weight: 700;
    }
  }
}
</style>