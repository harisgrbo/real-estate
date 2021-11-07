<template>
  <div class="w-full flex flex-col">
    <label class="block text-sm font-medium text-gray-700 mb-3">Lokacija</label>
    <div class="multiple-select">
      <div class="selected-options" @click="showDropdown = !showDropdown">
        <div class="selected-options-array cursor-pointer">
          <p v-if="selectedOptions.length === 0" class="text-gray-500">Izaberite lokaciju</p>
          <div v-for="(item, index) in selectedOptions">{{ item.name }}
            <svg @click="removeFromSelected(item, index)" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 bg-gray-100 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" :class="['h-6 w-6 cursor-pointer', showDropdown ? 'transform rotate-180' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div class="options" v-show="showDropdown">
        <input   v-model="searchTerm"
                 @input="showResults"
                 type="text"
        >
        <ul v-show="cities.length">
          <li v-for="option in cities" class="cursor-pointer" @click="addOptionToSelected(option)">{{ option.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({})
export default class CitiesMultipleSelect extends Vue{
  @Prop({ type: Array, default: () => [] }) initialCityIds;
  selectedOptions = [];
  showDropdown = false;
  searchTerm = '';
  cities = [];

  created() {
    this.initialCityIds.forEach(async (id) => {
      try {
        this.selectedOptions.push((await this.$axios.get('/cities/' + id)).data.data);
      } catch (e) {
        console.log(e)
      }
    })
  }

  emitValues() {
    this.$emit('cities', this.selectedOptions.map(item => item.id));
  }

  addOptionToSelected(o) {
    this.selectedOptions.push(o)

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
.multiple-select {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border: 1px solid #000;
  border-radius: 7px;
  padding: 12px;

  .selected-options {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .selected-options-array {
      display: flex;
      overflow-y: scroll;

      > div {
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 3px 8px;
        min-width: fit-content;
        width: fit-content;
        margin-right: 8px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }

    svg {
      width: fit-content;
      margin-left: 8px;
    }
  }

  .options {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;

    input {
      height: 48px;
      width: 100%;
      border-radius: 7px;
      padding: 0 12px;
      background: #F3F3F4;
      border: none;
      margin-top: 8px;

      &:focus {
        outline: none;
      }
    }

    ul {
      margin-top: 12px;
      width: 100%;
      display: flex;
      flex-direction: column;

      li {
        display: flex;
        align-items: center;
        height: 35px;
        width: 100%;
        font-weight: 500;
      }
    }
  }
}

label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 16px;
  margin-top: 24px;
}

</style>
