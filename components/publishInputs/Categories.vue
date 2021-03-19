<template>
  <div class="categories-list-wrap">
    <ul v-if="loading === false">
      <li v-for="(cat, index) in categories" :key="index" @click="selectCategory(cat)"
          :class="[ selectedCategory !== null? (cat.id === selectedCategory.id? 'selected': ''): null ]"
      >
        <div class="img-wrapper">
          <img :src="cat.icon" alt="cat">
        </div>
        <p>{{cat.title}}</p>
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
  align-items: center;
  justify-content: center;
  position: relative;

  .loading {
    height: 40px;
  }
}
  ul {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 32px;

    @include for-phone-only {
      grid-template-columns: repeat(1, 1fr) !important;
      grid-column-gap: 12px !important;
      grid-row-gap: 12px !important;
      margin-top: 0px;
    }
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      border: 1px solid #f1f1f1;
      border-radius: 8px;
      padding-bottom: 12px;

      .img-wrapper {
        //background: #f1f1f1;
        height: 70px;
        width: 70px;
        margin-bottom: 12px;
        border-radius: 5px;
        font-size: 22px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          height: 40px;
        }
      }
      p {
        font-size: 14px;
        font-weight: 500;
      }
    }
    .selected {
      border: 1px solid #757B9A;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 1px 12px;

      @include for-phone-only {
        box-shadow: rgba(0, 0, 0, 0.19) 0px 4px 5px;
        border: none;
        background: #f1f1f1;
        color: #444;
      }
    }
  }

</style>
