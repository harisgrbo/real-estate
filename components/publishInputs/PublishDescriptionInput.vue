<template>
  <div class="input-wrapper">
    <textarea placeholder="Opišite nekretninu" @input="$emit('input', $event.target.value)">{{ value }}</textarea>
  </div>
</template>

<script>
import {Component, Prop, Vue} from 'nuxt-property-decorator'

@Component({})
export default class PublishDescriptionInput extends Vue {
  @Prop({
    type: String
  }) title;

  @Prop() value;
}
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 32px;
label {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 12px;
}
textarea {
  height: 400px;
  border-radius: 10px;
  font-weight: 500;
  color: #000;
  font-size: 18px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 24px;

  &:focus {
      outline: none;
      border: 2px solid #000;
      background: #fff;
  }

&.hasError {
   border: 1px solid red;
 }
}
span {
  color: red;
  font-size: 14px;
  font-weight: 400;
  position: absolute;
  left: 0;
  top: 60px;
}
}

::placeholder {
  font-weight: 400;
  color: #717171;
  font-size: 16px;
}

</style>
