<template>
  <div class="border-t border-gray-200 px-4 flex items-center justify-between my-20">
    <div class="-mt-px w-0 flex-1 flex">
      <a @click="handlePageClick(currentPage - 1)" :disabeld="currentPage === 1" href="#" class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
        <svg class="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <a @click="handlePageClick(page)" v-for="(page, index) in computedPages" :key="index" :class="['border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', page === currentPage ? 'border-indigo-500 text-indigo-600': '']" href="#">
        {{ page }}
      </a>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <a @click="handlePageClick(currentPage + 1)" href="#" class="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
        <svg class="ml-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({})

export default class Pagination extends Vue {
  @Prop({ type: Number, required: true}) currentPage;
  @Prop({ type: Number, required: true}) totalPages;

  pages = [];

  get computedPages() {
    let result = []

    if (this.totalPages < 7) {
      for(let i = 1; i <= this.totalPages; ++i) {
        result.push(i)
      }

      return result;
    }

    if (this.currentPage < 5) {
      for(let i = 1; i <= 5; ++i) {
        result.push(i)
      }

      result.push('...');
      result.push(this.totalPages)

      return result;
    }

    if (this.totalPages - this.currentPage < 4) {
      result.push(1);
      result.push('...');

      for(let i = this.totalPages - 4; i <= this.totalPages; ++i) {
        result.push(i)
      }

      return result;
    }

    result.push(1);
    result.push('...');
    result.push(this.currentPage - 1);
    result.push(this.currentPage);
    result.push(this.currentPage + 1);
    result.push('...');
    result.push(this.totalPages)

    return result;
  }

  handlePageClick(page) {
    if (page === '...' || page < 1 || page > this.totalPages) return

    this.$emit('page-change', page)
  }
}
</script>

<style scoped lang="scss">

@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
</style>
