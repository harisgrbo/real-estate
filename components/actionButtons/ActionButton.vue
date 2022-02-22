<template>
    <button @click="action" :style="styleOptions" :disabled="loading === true">
      <span v-if="loading === false">{{ placeholder }}</span>
      <img v-else src="/loader.svg" alt="">
    </button>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
})
export default class ActionButton extends Vue {
  @Prop({ type: String }) placeholder;
  @Prop({ type: Object, default: ()=>{}}) styleOptions;
  @Prop({ type: Boolean, default: false }) loading


  action() {
    this.$emit('action');
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
div {
  width: 100%;
}
button {
  display: flex;
  align-items: center;
  width: auto;
  -webkit-transition: background-color 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  cursor: pointer;
    padding: 11px 15px;
  border-width: 2px;
  border-color: #232e3f;
  background-color: #ffffff;
  color: #232e3f !important;
  justify-content: center;

  &:hover {
    background-color: #f2f3f4 !important;
  }

  svg {
    margin-right: 8px;
  }

  &:focus {
    outline: none;
  }
  img {
    height: 14px;
    max-height: 14px;
  }
}
</style>
