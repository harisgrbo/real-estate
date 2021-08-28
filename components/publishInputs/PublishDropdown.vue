<template>
  <div class="main-wrapper">
    <label>{{ title }}</label>
    <div class="input-wrapper">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <div class="autocomplete-dropdown" v-if="showAutoCompleteDropdown">
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

@Component({
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
}
</script>

<style scoped lang="scss">
.main-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  label {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 0px;
  }
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50px;
  min-height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  margin-right: 24px;
  transition: 0.1s all ease;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  height: fit-content;
  position: relative;

  div {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
  }
  input {
    width: 100%;
    border: none;
    height: 49px;
    font-size: 14px;
    font-weight: 500;
    &:focus {
      outline: none;
    }
  }
  i {
    font-size: 20px !important;
    color: #757B9A;
    margin-right: 10px;
  }

  .autocomplete-dropdown {
    background: #fff;
    width: 100%;
    height: fit-content;
    position: absolute;
    top: 44px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1px solid #ddd;
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      max-height: 300px;
      overflow: scroll;
      padding: 8px 0;

      li {
        width: 100%;
        font-size: 14px;
        font-weight: 500;
        color: #444;
        border-radius: 5px;
        padding: 8px;
        margin-bottom: 4px;
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
}
</style>
