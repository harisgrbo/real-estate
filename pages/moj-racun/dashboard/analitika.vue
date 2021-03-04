<template>
  <div class="analitika-wrapper">
    <h2>Analitika</h2>
    <StandardChart></StandardChart>
    <div class="pie-grid">
      <PieChart></PieChart>
      <PieChart></PieChart>
      <PieChart></PieChart>
    </div>
    <StandardChart></StandardChart>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import PieChart from "@/components/analytics/PieChart";
import StandardChart from "@/components/analytics/StandardChart";

@Component({
  components: {
  },
})

export default class Analitika extends Vue {
}
</script>

<style scoped lang="scss">
.analitika-wrapper {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  h2 {
    font-size: 20px;
    font-weight:500;
    margin-bottom: 24px;

  }

  .pie-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 36px;
    margin-bottom: 36px;
    box-sizing: border-box;
  }
}
</style>
