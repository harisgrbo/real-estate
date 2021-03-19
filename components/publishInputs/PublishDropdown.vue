<template>
  <div class="main-wrapper">
    <label>{{ title }}</label>
    <div class="input-wrapper">
      <div>
        <input type="text"
               :placeholder="placeholder"
               @input="showSuggests"
               v-model="selectedCity"
        >
        <i class="material-icons">room</i>
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
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  height: fit-content;

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
    border-radius: 10px;
    padding: 12px;
    background: #fff;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
    height: fit-content;
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      max-height: 300px;
      overflow: scroll;
      margin-top: 15px;

      li {
        width: 100%;
        font-size: 14px;
        font-weight: 500;
        color: #444;
        background: #F3F5FB;
        border-radius: 5px;
        padding: 8px;
        margin-bottom: 8px;
        cursor: pointer;

        &:last-child {
          margin-bottom: 0 !important;
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
