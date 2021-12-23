<template>
  <div class="checkbox-wrap">
<!--    <div>-->
<!--      <input ref="checkbox" type="checkbox" id="_checkbox" :id="attr.name" name="option1" @click="checkedOption"/>-->
<!--      <label :for="attr.name">{{ attr.name }}</label>-->
<!--    </div>-->


    <div class="switch-wrap">
      <div class="switch">
        <input ref="checkbox" type="checkbox" id="switch-2" :id="attr.name" name="option1" class="switch-input" @click="checkedOption" />
        <label :for="attr.name" class="switch-label">test</label>
      </div>
      {{ attr.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TermsInput",
  props: ["attr", "init"],
  data() {
    return {
      checked: false
    };
  },
  mounted() {
    if (this.checked) {
      this.$refs.checkbox.checked = true;
    }
  },
  created() {
    this.checked = !!this.init;
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
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

//.checkbox-wrap {
//  display: flex;
//  flex-direction: row;
//  align-items: center;
//  justify-content: space-between;
//  width: 100%;
//  cursor: pointer;
//
//    label {
//      font-size: 15px;
//      font-weight: 500;
//      margin-left: 8px;
//      width: 100%;
//      min-width: 100%;
//    }
//
//}
//

.switch {
  position: relative;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 16px;
}
.switch-input {
  display: none;
}
.switch-label {
  display: block;
  width: 48px;
  height: 24px;
  text-indent: -150%;
  clip: rect(0 0 0 0);
  color: transparent;
  user-select: none;
}
.switch-label::before,
.switch-label::after {
  content: "";
  display: block;
  position: absolute;
  cursor: pointer;
}
.switch-label::before {
  width: 50px;
  height: 28px;
  background-color: #dedede;
  border-radius: 9999em;
  -webkit-transition: background-color 0.25s ease;
  transition: background-color 0.25s ease;
}
.switch-label::after {
  top: 2px;
  left: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.45);
  -webkit-transition: left 0.25s ease;
  transition: left 0.25s ease;
}
.switch-input:checked + .switch-label::before {
  background-color: #1F2937;
}
.switch-input:checked + .switch-label::after {
  left: 24px;
}

.switch-wrap {
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 16px !important;
}

label {
  margin-top: 0 !important;
}

</style>
