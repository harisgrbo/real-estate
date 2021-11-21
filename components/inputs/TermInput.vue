<template>
  <div class="checkbox-wrap">
    <div>
      <input ref="checkbox" type="checkbox" id="_checkbox" :id="attr.name" name="option1" @click="checkedOption"/>
      <label :for="attr.name">{{ attr.name }}</label>
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

.checkbox-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;

    label {
      font-size: 15px;
      font-weight: 500;
      margin-left: 8px;
      width: 100%;
      min-width: 100%;
    }

}


</style>
