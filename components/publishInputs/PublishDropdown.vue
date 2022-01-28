<template>
  <div class="relative w-full flex flex-col items-start">
    <div class="relative border text-wrap border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:text-gray-900 focus-within:ring-gray-900 focus-within:ring-gray-900 focus-within:border-gray-900">
      <label for="name" class="absolute -top-2 left-1 -mt-px inline-block px-2 bg-white text-xs font-medium text-gray-500" v-if="label">{{ label }}</label>
      <input
        type="text"
        :placeholder="placeholder"
        @input="showSuggests"
        v-model="selectedCity"
        name="name" id="name" class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm">
    </div>
    <div class="autocomplete-dropdown shadow-sm" v-if="showAutoCompleteDropdown">
      <ul>
        <li v-for="suggest in suggestions" :key="suggest.id" @click="selectOption(suggest)">
          {{ suggest.name }}
        </li>
      </ul>
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
  @Prop({ type: String }) label;
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

::placeholder {
  font-size: 14px;
  font-weight: 500;
  color: #000;
}

.text-wrap {
  min-height: 36px;
  border: 1px solid #f1f1f1 !important;
  width: 100%;
  input {
    min-height: 36px !important;
  }
}

.autocomplete-dropdown {
  background: #fff;
  width: 100%;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  position: absolute;
  top: 59px;
  border-radius: 8px;
  border: 1px solid #f1f1f1;
  padding: 4px;
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


label {
  font-size: 14px;
}

::placeholder {
  color: #b1b1b1;
}
</style>
