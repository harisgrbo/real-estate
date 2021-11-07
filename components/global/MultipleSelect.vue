<template>
  <div class="multiple-select">
    <div class="selected-options" @click="showDropdown = !showDropdown">
      <div class="selected-options-array">
        <div v-for="(item, index) in selectedOptions">{{ item.name }}
        <button @click="removeFromSelected(item, index)">x</button>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" :class="['h-6 w-6', showDropdown ? 'transform rotate-180' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    <div class="options" v-show="showDropdown">
      <input   v-model="searchTerm"
               @input="showResults"
               type="text"
      >
      <ul v-show="options.length">
        <li v-for="option in options" @click="addOptionToSelected(option)">{{ option }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {
  }
})

export default class MultipleSelect extends Vue{
  options = []
  showDropdown = false;
  searchTerm = ''

  addOptionToSelected(o) {
    this.selectedOptions.push(o)
  }

  showResults() {
    let q = this.searchTerm;

    if(q.length > 1) {
      //uradi nesto
    } else {
      //isto
    }
  }

  removeFromSelected(item, index) {
    //do sth
  }
}
</script>

<style scoped lang="scss">
.multiple-select {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  .selected-options {
    height: 48px;
    border: 1px solid #dddd;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .selected-options-array {
      height: 100%;
      width: 100%;
    }

    svg {
      width: fit-content;
      padding: 0 16px;
    }
  }

  .options {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px;
    background: #fff;

    input {
      height: 48px;
      width: 100%;
      border: 1px solid #ddd;
    }

    ul {
      margin-top: 12px;
      width: 100%;
      display: flex;
      flex-direction: column;

      li {
        display: flex;
        align-items: center;
        height: 25px;
        width: 100%;
      }
    }
  }
}

</style>
