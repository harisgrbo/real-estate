<template>
  <div class="not-found-wrapper">
    <img :src="src" alt="">
    <p>{{ text }}</p>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ActionButton from "../actionButtons/ActionButton";

@Component({
  components: {ActionButton}
})

export default class NotFound extends Vue {
  @Prop({
    type: String,
    required: true
  }) text;
  @Prop({
    type: String,
    required: true
  }) src;
  @Prop({
    type: Boolean,
  }) show;

}
</script>

<style scoped lang="scss">
.not-found-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 500px;
  width: 100%;

  img {
    height: 100px !important;
    width: fit-content !important;
  }

  p {
    font-size: 20px;
    font-weight: 400;
    margin-top: 24px;
  }
}

</style>
