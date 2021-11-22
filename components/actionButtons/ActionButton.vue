<template>
    <button @click="action" :style="styleOptions" :disabled="loading === true">
      <font-awesome-icon v-if="icon" :icon="icon"></font-awesome-icon>
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
  @Prop({ type: String }) icon;
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
  font-family: 'Lato', sans-serif;
  height: 48px;
  border-radius: 8px;
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  padding: 0 24px;
  color: #fff;
  cursor: pointer;
  justify-content: center;
  transition: 0.3s all ease;
  background: hsla(218, 34%, 30%, 1);
  background: radial-gradient(circle, hsla(218, 34%, 30%, 1) 0%, hsla(217, 47%, 22%, 1) 80%);
  background: -moz-radial-gradient(circle, hsla(218, 34%, 30%, 1) 0%, hsla(217, 47%, 22%, 1) 80%);
  background: -webkit-radial-gradient(circle, hsla(218, 34%, 30%, 1) 0%, hsla(217, 47%, 22%, 1) 80%);

  @include for-phone-only {
    background: #fff !important;
    border: 1px solid #023246;
    color: #023246;
  }

  svg {
    margin-right: 8px;
  }

  &:focus {
    outline: none;
  }
  img {
    height: 70%;
  }
}
</style>
