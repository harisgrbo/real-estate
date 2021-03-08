<template>
  <div class="checkbox-wrap">
    <div>
      <input type="checkbox" :id="attr.name" name="option1" @click="checkedOption"/><label :for="attr.name"></label>
    </div>
    <p>{{ attr.name }}</p>
  </div>
</template>

<script>
export default {
  name: "TermsInput",
  props: ["attr"],
  data() {
    return {
      checked: false
    };
  },
  methods: {
    checkedOption() {
      this.$emit('changed', {
        id: this.attr.id,
        name: this.attr.name,
        value: !this.checked
      })
    }
  }
};
</script>

<style scoped lang="scss">

.checkbox-wrap {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

input[type=checkbox]{
  height: 0;
  width: 0;
  visibility: hidden;
  transition: 0.3s;
  display: none;
}

label {
  cursor: pointer;
  width: 80px;
  height: 30px;
  background: #f1f1f1;
  display: flex;
  border-radius: 100px;
  position: relative;
  transition: 0.3s;

}

label:after {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 15px;
  transition: 0.3s;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;

}

input:checked + label {
  background: #ddd;
}

input:checked + label:after {
  left: 100%;
  transform: translateX(-100%);
  background: #D63946;
}

label:active:after {
  width: 90px;
}

</style>
