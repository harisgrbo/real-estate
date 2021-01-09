<template>
  <ul>
    <li v-for="(cat, index) in categories" @click="selectCategory(cat)">
      <div class="img-wrapper" :class="[ selectedCategory !== null? (cat.id === selectedCategory.id? 'selected': ''): null ]">
        <img :src="cat.icon" alt="cat">
      </div>
      <p>{{cat.title}}</p>
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Prop, Watch} from "nuxt-property-decorator";

@Component({
})

export default class Categories extends Vue {

  categories = []
  selectedCategory = null;

  async fetchCategories() {
    try {
      let response = await this.$axios.get('/categories');
      this.categories = response.data.data;
      console.log(this.categories)
    } catch(e) {
      console.log(e)
    }
  }

  selectCategory(c) {
    this.selectedCategory = c;
    this.$emit('selected-category', c);
    console.log(this.selectedCategory)
  }

  async created() {
    await this.fetchCategories();
  }
}
</script>

<style scoped lang="scss">
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      .img-wrapper {
        background: #f1f1f1;
        height: 40px;
        width: 40px;
        margin-bottom: 12px;
        border-radius: 5px;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      p {
        font-size: 14px;
      }
    }
    .selected {
      border: 1px solid #757B9A;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 1px 12px;
    }
  }

</style>
