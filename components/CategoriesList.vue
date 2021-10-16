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
  components: {
    Categories
  }
})

export default class CategoriesList extends Vue{
  handleSelectedCat(e) {
    this.$emit('selectedCat', e);
  }
}
</script>

<style scoped lang="scss">
@mixin for-laptop {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}
@mixin for-desktop-up {
  @media (min-width: 1200px) {
    @content;
  }
}
@mixin for-big-desktop-up {
  @media (min-width: 1800px) {
    @content;
  }
}
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.categories-list {
  display: flex;
  flex-direction: column;
  padding: 0 24px;

  @include for-phone-only {
    padding: 0 12px;
  }

  .content {
    padding: 24px 0;

    ::v-deep ul {
      grid-template-columns: repeat(2, 1fr);

      .img-wrapper {
        margin-bottom: 0;
      }
    }
  }
}
</style>
