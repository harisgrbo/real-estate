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

<style scoped>

</style>
