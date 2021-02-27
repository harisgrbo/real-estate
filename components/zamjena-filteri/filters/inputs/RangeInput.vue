<template>
  <div>
    <input :name="name" type="number" />
  </div>
</template>

<script>
export default {
  name: "RangeInput",
  props: ["attribute", "name"]
};
</script>

<style scoped>
</style>