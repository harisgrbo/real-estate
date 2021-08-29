<template>
    <button @click="action" :style="styleOptions">
      <font-awesome-icon v-if="icon" :icon="icon"></font-awesome-icon>
      <span v-if="loading === false">{{ placeholder }}</span>
      <img v-else src="/load.svg" alt="">
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
a
<style scoped lang="scss">
div {
  width: 100%;
}
button {
  font-family: 'Raleway', sans-serif;
  height: 48px;
  background: #1F2937;
  border-radius: 10px;
  border: none;
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  padding: 0 24px;
  color: #fff;
  cursor: pointer;
  justify-content: center;
  transition: 0.3s all ease;

  &:hover {
    background: #171e2a;
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
