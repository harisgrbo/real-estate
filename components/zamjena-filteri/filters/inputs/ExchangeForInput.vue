<template>
  <div class="flex flex-col w-full items-start">
    <label class="filter-label">
      <span>Zamjena za:</span>
    </label>
    <input
      v-for="keyword in keywordsLowerCase"
      type="hidden"
      name="exchange_for[]"
      :value="keyword"
    />

    <form @submit.prevent="addKeyword">
      <div class="flex flex-row justify-between">
        <md-field>
          <label>Upisite sta zelite u zamjenu npr. Iphone X</label>
          <md-input type="text" class="text" name="keyword"></md-input>
        </md-field>
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
export default {
  name: "ExchangeForInput",
  data() {
    return {
      keywords: []
    };
  },

  computed: {
    keywordsLowerCase() {
      return this.keywords.map(keyword => keyword.toLowerCase());
    }
  },

  methods: {
    addKeyword(e) {
      let val = e.target[0].value;
      if (val.length) {
        this.keywords.push(val);
        e.target[0].value = "";
      }
    },

    removeKeyword(i) {
      this.keywords.splice(i, 1);
    }
  }
};
</script>

<style scoped lang="scss">
.filter-label {
  display: flex;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  padding: 0 8px;
  width: 100%;
  color: #444;
  text-transform: uppercase;
  position: relative;
  min-width: 100%;
  height: 40px;
  display: -webkit-box;
  display: flex;
  width: 100%;
  background-color: #fbfbfb;
  -webkit-box-align: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 3px;
}
.filter-label::before {
  content: "";
  position: absolute;
  width: 2px;
  left: 0;
  height: 100%;
  background: #66a7ff;
}

.md-field label {
  font-size: 13px !important;
}

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