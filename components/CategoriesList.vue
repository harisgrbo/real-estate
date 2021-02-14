<template>
  <div class="categories-list">
    <div class="modal-header">
      <h2>Izaberite kategoriju</h2>
      <i class="material-icons" @click="$emit('close')">close</i>
    </div>
    <div class="content">

      <Categories @selected-category="handleSelectedCat"></Categories>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import Categories from "@/components/publishInputs/Categories";

@Component({
  Categories
})

export default class CategoriesList extends Vue{
  handleSelectedCat(e) {
    this.$emit('selectedCat', e);
  }
}
</script>

<style scoped lang="scss">
.categories-list {
  display: flex;
  flex-direction: column;
  padding: 0 24px;

  .modal-header {
    display: flex;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #dcdcdc;
    justify-content: space-between;

    i {
      cursor: pointer;
    }

    h2 {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .content {
    padding: 24px 0;

    ::v-deep ul {
      grid-template-columns: repeat(3, 1fr);

      .img-wrapper {
        margin-bottom: 0;
      }
    }
  }
}
</style>
