<template>
  <div class="categories-list-wrap w-full">
    <ul v-if="loading === false" role="list" class="border-t border-b border-gray-200 pb-6 flex flex-col lg:grid up:grid xl:grid xl:grid-cols-2 lg:grid-cols-2 up:grid-cols-2 gap-5 w-full">
      <li v-for="(cat, index) in categories" :key="index" @click="selectCategory(cat)" class="flow-root border bg-gray-100 rounded-md"
          :class="[ 'flow-root', selectedCategory !== null? (cat.id === selectedCategory.id? 'selected': ''): null ]">
        <div class="w-full">
            <a href="#" class="focus:outline-none">
              <span aria-hidden="true"></span>
              {{ cat.title }}
            </a>
        </div>
        <div class="relative flex items-center space-x-4 rounded-md hover:bg-gray-50">
          <div class="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg p-1 svg-wrap">
            <!-- Heroicon name: outline/clock -->
            <img :src="'/cats/' + cat.slug + '.png'" alt="">
          </div>
        </div>
      </li>
    </ul>
    <img v-else src="/load.svg" class="loading" alt="">
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch} from "nuxt-property-decorator";

@Component({})
export default class Categories extends Vue {
  categories = []
  selectedCategory = null;
  loading = false;

  async fetchCategories() {
    this.loading = true;
    try {
      let response = await this.$axios.get('/categories');
      this.categories = response.data.data;

      this.loading = false;
    } catch(e) {
      console.log(e)
    }
  }

  selectCategory(c) {
    this.selectedCategory = c;
    this.$emit('selected-category', c);
  }

  async created() {
    await this.fetchCategories();
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
.categories-list-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  @include for-phone-only {
    padding-bottom: 15px;
  }

  .loading {
    height: 40px;
  }
}

.selected {
  border: 2px solid #023246;
  font-weight: 600 !important;


  @include for-phone-only {
    background: #f9f9f9 !important;
    border: 2px solid #000 !important;
  }
}

a {
  font-weight: 400;
  color: #000;
  font-size: 16px;

  &:hover, &:active, &:visited {
    outline: none;
    border: none;
  }
}

ul li {
  @include for-phone-only {
    background: #f9f9f9 !important;
    color: #222222 !important;
    padding: 16px !important;
    width: 100% !important;
    min-height: 76px;
    height: 76px;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    font-weight: 500 !important;
    display: flex;

    .svg-wrap {
      height: 50px;
      width: 50px;
      border-radius: 7px;
    }
  }
}
</style>
