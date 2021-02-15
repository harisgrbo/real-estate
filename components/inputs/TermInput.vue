<template>
  <div class="w-full">
    <div class="w-full flex justify-start flex-wrap">
<!--      <label :for="attr.name">-->
<!--        <div id="tick_mark">{{ attr.name }}</div>-->
<!--      </label>-->
<!--      <input-->
<!--        :id="attr.name"-->
<!--        class="checkbox"-->
<!--        type="checkbox"-->
<!--        v-model="checked"-->
<!--        @input="checkedOption"-->
<!--      />-->

      <div class="inputGroup">
        <input :id="attr.name" name="option1" type="checkbox" @click="checkedOption"/>
        <label :for="attr.name">{{ attr.name }}</label>
      </div>
    </div>
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

.inputGroup {
  background-color: #fff;
  display: flex;
  position: relative;

  label {
    padding: 0 24px;
    height: 48px;
    display: flex;
    align-items: center;
    width: 100%;
    display: flex;
    text-align: left;
    color: #3C454C;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: color 200ms ease-in;
    overflow: hidden;
    border-radius: 4px;
    background: #f1f1f1;

    &:before {
      width: 10px;
      height: 10px;
      content: '';
      background-color: #757B9A;
      border-radius: 4px;
      border: none;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale3d(1, 1, 1);
      transition: all 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
      opacity: 0;
      z-index: -1;
    }

    &:after {
      width: 22px;
      height: 22px;
      content: '';
      border: 2px solid #757B9A;
      background-color: #fff;
      background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
      background-repeat: no-repeat;
      background-position: -2px 0px;
      border-radius: 50%;
      z-index: 2;
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: all 200ms ease-in;
    }
  }

  input:checked ~ label {
    color: #fff;

    &:before {
      transform: translate(-50%, -50%) scale3d(56, 56, 1);
      opacity: 1;
    }

    &:after {
      background-color: #54E0C7;
      border-color: #54E0C7;
    }
  }

  input {
    width: 26px;
    height: 26px;
    order: 1;
    z-index: 2;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    visibility: hidden;
  }
}
</style>
