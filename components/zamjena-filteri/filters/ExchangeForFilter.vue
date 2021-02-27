<template>
  <div>
    <label class="filter-label">
      <span>{{ displayName }}</span>
    </label>
    <form @submit.prevent="addKeyword">
      <input type="hidden" name="input" :value="input" />

      <div class="flex flex-row justify-between">
        <md-autocomplete v-model="input" :md-options="suggestions" @keyup.native="getSuggestions" @change="addKeyword">
          <label>{{ displayName }}</label>
        </md-autocomplete>
        <button type="submit" class="add-btn">
          <i class="material-icons">add</i>
        </button>
      </div>
    </form>
    <div class="flex flex-row flex-wrap added-wrapper">
      <button v-for="(keyword, i) in keywords" class="btn-added" @click="removeKeyword(i)" :key="i">
        {{ keyword }}
        <div>
          <i class="material-icons">close</i>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import FilterMixin from "../../search/FilterMixin";

export default {
  name: "ExchangeForFilter",
  mixins: [FilterMixin],

    data() {
      return {
        input: '',
        keywords: [],
        suggestions: []
      }
  },

  created() {
    if (this.set && this.value.value.length) {
      this.keywords = [...this.value.value];
    }
  },

  methods: {
    addKeyword(e) {
      let val = e.target[0].value;
      if (val.length) {
        this.keywords.push(val);
        e.target[0].value = "";
      }

      this.handleChange();
    },

    getSuggestions(e) {
      let val = e.target.value;

      if(val.length) {
        window.axios.get(`/api/suggest/${e.target.value}`).then(response => {
          this.suggestions = response.data
          console.log(this.suggestions)
        })
      }
    },

    handleChange() {
      let data = this.buildValue("terms", this.keywords.map(keyword => keyword.toLowerCase()), "exchange_for");
      this.$emit("input", data);
    },

    removeKeyword(i) {
      this.keywords.splice(i, 1);

      this.handleChange();
    }
  }
};
</script>

<style scoped lang="scss">
.filter-label {
  height: 40px;
  display: flex;
  width: 100%;
  background-color: #fbfbfb;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 3px;
  position: relative;
  span {
    margin-left: 16px;
  }
}
.filter-label::before {
  content: "";
  height: 100%;
  width: 3px;
  background: #609bff;
  left: 5;
}

.md-field label {
  font-size: 13px !important;
}
>>>>>>> a15660fa09ddb8685ebd2af156ccd65daa0cbec2

.md-field input {
  padding: 0 8px;
  font-size: 13px !important;
  font-weight: 500;
  max-width: 100%;
}

.add-btn {
  margin-left: 16px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #609bff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    color: #fff;
    font-size: 19px;
    font-weight: 700;
    line-height: 20px;
  }
}

.btn-added {
  background-color: #fff;
  border: 1px solid #609bff;
  border-radius: 3px;
  max-width: 80%;
  height: 32px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 700;
  margin-right: 10px;
  margin-bottom: 10px;
  color: #609bff;
  font-weight: 500;
}

.added-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > div {
      margin-left: 8px;
      height: 15px;
      width: 15px;
      border-radius: 3px;
      background-color: #609bff;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        color: #fff;
        font-size: 11px;
        font-weight: 700;
      }
    }
  }
}
</style>
