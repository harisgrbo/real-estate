<template>
  <div class="main-wrapper">
    <label class="block text-md font-medium text-gray-700 mb-2">{{ title }}</label>
    <div :class="['input-wrapper', showAutoCompleteDropdown ? 'shadow-sm' : '']">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <input type="text"
               :placeholder="placeholder"
               @input="showSuggests"
               v-model="selectedCity"
        >
      </div>
      <!-- Autocomplete dropdown -->
      <div class="autocomplete-dropdown shadow-sm" v-if="showAutoCompleteDropdown">
        <ul>
          <li v-for="suggest in suggestions" @click="selectOption(suggest)">
            {{ suggest.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import {mixin as clickaway} from "vue-clickaway";

@Component({
  mixins: [ clickaway ],

})

export default class PublishDropdown extends Vue{
  @Prop({ type: String }) title;
  @Prop({ type: String }) placeholder;

  showAutoCompleteDropdown = false;
  suggestions = [];
  selectedCity = '';

  selectOption(s) {
    this.selectedCity = s.name;
    this.$emit('select-option', s);
    this.showAutoCompleteDropdown = false;
  }

  async showSuggests(e) {
    let q = e.target.value;
    if(q.length) {
      this.showAutoCompleteDropdown = true;
      let res = await this.$axios.get('/cities?q=' + q);
      this.suggestions = res.data.data;
    } else {
      this.showAutoCompleteDropdown = false;
    }
  }

  away() {
    this.showAutoCompleteDropdown = false;
  }
}
</script>

<style scoped lang="scss">
.main-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 0 12px;
  background: #fff;
  flex: 2;
  position: relative;
  transition: 0.3s all ease;
  max-width: 600px;
  margin-top: 0;
  min-height: 48px;
  height: fit-content;
  border: 1px solid #ddd;

  div {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    border-radius: 10px;
  }
  input {
    width: 100%;
    border: none;
    height: 100%;
    font-size: 14px;
    font-weight: 500;
    background: transparent;
    border: none !important;
    &:focus {
      outline: none;
    }
  }
  i {
    font-size: 16px !important;
    color: #757B9A;
    margin-right: 10px;
  }

  .autocomplete-dropdown {
    background: #fff;
    width: 100%;
    height: fit-content;
    position: absolute;
    top: 49px;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 12px;
    left: 0;
    z-index: 1;
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      max-height: 300px;
      overflow: scroll;
      padding: 0px 0;

      li {
        width: 100%;
        font-size: 14px;
        font-weight: 500;
        color: #444;
        border-radius: 4px;
        padding: 8px;
        cursor: pointer;

        &:last-child {
          margin-bottom: 0 !important;
        }

        &:hover {
          background: #f9f9f9;
        }
      }
    }
  }
}

::placeholder {
  font-size: 14px;
  font-weight: 500;
  color: #000;
}
</style>
