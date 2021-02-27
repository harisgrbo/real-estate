<template>
  <div class="w-full">
    <div class="w-full flex justify-start flex-wrap">
      <button
        class="select"
        v-for="option in attribute.values"
        :class="[val === option ? 'selected': '']"
        @click.prevent="val = option"
      >{{ option }}</button>
    </div>

    <input :name="name" type="hidden" :value="val" />
  </div>
</template>

<script>
export default {
  name: "TermsInput",
  props: ["attribute", "name"],
  data() {
    return {
      val: null
    };
  }
};
</script>

<style scoped>
.selected {
  border: 2px solid blue;
}
</style>