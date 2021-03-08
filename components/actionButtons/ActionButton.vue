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
  font-family: 'Montserrat', sans-serif;
  height: 53px;
  background: #D63946;
  border-radius: 4px;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  padding: 0 24px;
  color: #fff;
  cursor: pointer;
  justify-content: center;
  margin-top: 24px;
  transition: 0.3s all ease;

  &:hover {
    background: #a72f39;
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
