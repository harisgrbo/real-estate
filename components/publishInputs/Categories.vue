<template>
  <ul>
    <li v-for="(cat, index) in categories" :id="index" @click="selectCategory(cat)"
        :class="[ selectedCategory !== null? (cat.id === selectedCategory.id? 'selected': ''): null ]"
    >
      <div class="img-wrapper">
        <img :src="cat.icon" alt="cat">
      </div>
      <p>{{cat.title}}</p>
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Prop, Watch} from "nuxt-property-decorator";

@Component({})
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
  }

  async created() {
    await this.fetchCategories();
  }
}
</script>

<style scoped lang="scss">
  ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 32px;
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
    }
  }

</style>
