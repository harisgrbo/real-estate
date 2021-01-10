<template>
  <div class="input-wrapper">
    <label>{{ title }}</label>
    <textarea @input="$emit('input', $event.target.value)">{{ value }}</textarea>
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
label {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 12px;
}
textarea {
  display: flex;
  width: 100%;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  margin-right: 24px;
  transition: 0.1s all ease;
  box-sizing: border-box;
  cursor: pointer;
&:focus {
   outline: none;
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

</style>
