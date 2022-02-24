<template>
  <div class="w-full flex flex-col">
    <label>Lokacija</label>
    <div class="multiple-select">
      <div class="selected-options" @click="showDropdown = !showDropdown">
        <div class="selected-options-array cursor-pointer">
          <p v-if="selectedOptions.length === 0" class="text-gray-900">Izaberite lokaciju</p>
          <div v-for="(item, index) in selectedOptions" :key="index">{{ item.name }}
            <svg @click="removeFromSelected(item, index)" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 bg-gray-100 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" :class="['h-6 w-6 cursor-pointer arrow-down', showDropdown ? 'transform rotate-180' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div class="options" v-show="showDropdown">
        <input   v-model="searchTerm"
                 @input="showResults"
                 type="text"
                 placeholder="npr. novo sarajevo ili sarajevo"
        >
        <ul v-show="cities.length">
          <li v-for="option in cities" :key="option.id" class="cursor-pointer" @click="addOptionToSelected(option)">{{ option.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({})
export default class CitiesMultipleSelect extends Vue{
  @Prop({ type: Array, default: () => [] }) initialCities;
  selectedOptions = [];
  showDropdown = false;
  searchTerm = '';
  cities = [];

  created() {
    this.initialCities.forEach(async (item) => {
      this.selectedOptions.push(item);
    })
  }

  emitValues() {
    this.$emit('cities', this.selectedOptions.map(item => item.id));
    this.$emit('citynames', this.selectedOptions.map(item => item.name));
  }

  addOptionToSelected(o) {
    let index = this.selectedOptions.findIndex(item => item.id === o.id);

    if (index === -1) {
      console.log('push')
      this.selectedOptions.push(o)
    } else {
      console.log('splice')
      this.selectedOptions.splice(index, 1);
    }

    this.emitValues();
  }

  async showResults() {
    let q = this.searchTerm;

    if (q.length >= 3) {
      try {
        let res = await this.$axios.get('/cities?q=' + q);

        this.cities = res.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  }

  removeFromSelected(item, index) {
    this.selectedOptions.splice(index, 1);

    this.emitValues()
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.multiple-select {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border-radius: 4px;
  background: #f3f4f5;
  box-shadow: none;
  box-sizing: border-box;
  line-height: .733rem;
  margin: initial;
  overflow: hidden;
  padding: 10px;
  white-space: normal;
  width: 100%;
  border: none;

  .selected-options {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .selected-options-array {
      display: flex;
      overflow-x: scroll;
      align-items: center;
      height: 40px;
      width: 100%;

      > div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background: #fff;
        border-radius: 4px;
        margin-right: 4px;
        height: 25px;
        padding: 0 8px;
        min-width: fit-content;
      }
    }

    svg {
      width: 18px !important;
      margin-left: 8px;
    }
  }

  .options {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;

    input {
      height: 40px;
      width: 100%;
      border-radius: 4px;
      padding: 0 12px;
      background: #fff;
      border: none;
      border-bottom: 1px solid #f3f4f5;

      &:focus {
        outline: none;
      }
    }

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 10px;

      li {
        display: flex;
        align-items: center;
        height: 35px;
        width: 100%;
        font-weight: 400;
        font-size: 13px;
      }
    }
  }
}

label {
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 12px;
  margin-top: 24px;
}

.arrow-down {
  @include for-phone-only {
    width: 18px !important;
    min-width: 18px !important;
    max-width: 18px !important;
  }

}
</style>
