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
  font-family: 'Outfit', sans-serif;
  height: 48px;
  border-radius: 10px;
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600 !important;
  padding: 0 24px;
  color: #fff;
  cursor: pointer;
  justify-content: center;
  transition: 0.3s all ease;
  background: #1F2937;

  @include for-phone-only {
    padding: 0 12px !important;
  }

  svg {
    margin-right: 8px;
  }

  &:focus {
    outline: none;
  }
  img {
    height: 60%;
    filter: brightness(100);
  }
}
</style>
