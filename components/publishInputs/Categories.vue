<template>
  <div class="categories-list-wrap w-full">
    <ul v-if="loading === false" role="list" class="border-t border-b border-gray-200 pb-6 grid grid-cols-2 gap-6 w-full">
      <li v-for="(cat, index) in categories" :key="index" @click="selectCategory(cat)" class="flow-root"
          :class="[ 'flow-root', selectedCategory !== null? (cat.id === selectedCategory.id? 'selected': ''): null ]">
        <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-900">
          <div class="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg bg-gray-100 p-1">
            <!-- Heroicon name: outline/clock -->
            <img :src="cat.icon" alt="">
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900">
              <a href="#" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"></span>
                {{ cat.title }}
              </a>
            </h3>
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
  height: 490px;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .loading {
    height: 40px;
  }
}

.selected {
  border-radius: 10px;
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
</style>
