<template>
  <div class="pagination-wrapper">
    <button @click="handlePageClick(currentPage - 1)" :disabeld="currentPage === 1">
      <font-awesome-icon icon="angle-left"/>
    </button>
    <ul>
      <li v-for="page in computedPages" :class="[page === currentPage ? 'active': '']" @click="handlePageClick(page)">{{ page }}</li>
    </ul>
    <button @click="handlePageClick(currentPage + 1)">
      <font-awesome-icon icon="angle-right"/>
    </button>
  </div>
</template>

<script>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

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

.pagination-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  margin: 36px auto;
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      margin: 0 8px;
      font-size: 14px !important;
      line-height: 18px !important;
      font-weight: 600 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
      border: none !important;
      border-radius: 50% !important;
      cursor: pointer;
      width: 32px !important;
      height: 32px !important;
      @include for-phone-only {
        margin: 0 5px !important;
      }
      &:hover {
        background: rgb(247, 247, 247) !important;
      }
      &.active {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background: #002F34 !important;
        color: #fff;
      }
    }
  }
}
.prev {
  transform: rotate(90deg);
  font-size: 16px;
  font-weight: 600;
}

.next {
  transform: rotate(-90deg);
  font-weight: 600;
  font-size: 16px;
}

button {
  margin: 0 8px;
  font-size: 14px !important;
  line-height: 18px !important;
  font-weight: 600 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
  border: none !important;
  border-radius: 50% !important;
  cursor: pointer;
  width: 55px !important;
  height: 55px !important;
  background: rgb(247, 247, 247) !important;

  &:hover {
    border: 1px solid rgb(190, 181, 181) !important;
  }
  &:focus {
    outline: none;
  }
}
</style>
