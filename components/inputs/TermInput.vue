<template>
  <div class="checkbox-wrap">
    <div>
      <input type="checkbox" id="_checkbox" :id="attr.name" name="option1" @click="checkedOption"/>
      <label :for="attr.name">{{ attr.name }}</label>
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

  @include for-phone-only {
    label {
      font-size: 14px;
    }
  }
}


</style>
