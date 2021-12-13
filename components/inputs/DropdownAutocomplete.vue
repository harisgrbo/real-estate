<template>
  <div class="main-wrapper">
    <label class="block text-md font-semibold text-gray-700 mb-2">{{ label }}</label>
    <div :class="['input-wrapper', showAutoCompleteDropdown ? 'shadow-sm' : '']">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <input type="text"
               :placeholder="placeholder"
               @input="showAddressAutocomplete"
               v-model="address"
        >
        <svg xmlns="http://www.w3.org/2000/svg" :class="['h-6 w-6', recommendedAddresses.length ? 'transform rotate-180' : '']" @click="showAutoCompleteDropdown = !showAutoCompleteDropdown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <!-- Autocomplete dropdown -->
      <div class="autocomplete-dropdown shadow-sm" v-if="showAutoCompleteDropdown">
        <ul>
          <li v-for="address in recommendedAddresses" @click="selectOption(address)">
            {{ address.description }}
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
  @Prop({ type: String }) label;
  @Prop({ type: String }) placeholder;
  @Prop({ type: Array }) options;

  showAutoCompleteDropdown = false;
  selectedCity = '';
  recommendedAddresses = []

  selectOption(s) {
    this.selectedCity = s.name;
    this.$emit('select-option', s);
    this.showAutoCompleteDropdown = false;
  }

  async showAddressAutocomplete() {
    try {
      let res = await this.$axios.get('/address/autocomplete/' + this.address);
      this.recommendedAddresses = res.data.predictions;

      if(this.recommendedAddresses.length > 0) {
        this.showAutoCompleteDropdown = true;
      }

      console.log(res)

      console.log(this.recommendedAddresses)
    } catch(e) {
      console.log(e)
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
  max-height: 48px;
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
