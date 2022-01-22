<template>
  <div id="chart">
    <apexchart type="donut" height="300" :options="chartOptions" :series="series" :labels="labels"></apexchart>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
})

export default class PieChart extends Vue {
  series = [23, 11, 54, 72, 12]
  labels = ["Apple", "Mango", "Banana", "Papaya", "Orange"]

  chartOptions = {
    chart: {
      width: '500px',
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: true
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    }
  }
}
</script>

<style scoped lang="scss">
#chart {
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-radius: 10px;
  padding-top: 12px;
  margin-top: 24px;
  width: 500;
  box-sizing: border-box;
}
</style>
