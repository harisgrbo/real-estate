<template>
  <div class="chart">
    <apexchart type="area" height="350" width="100%" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout() { return "home" }
})

export default class StandardChart extends Vue {
  series = [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }]

  chartOptions = {
    chart: {
      height: '100%',
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  }
}
</script>

<style scoped lang="scss">
.chart {
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-radius: 10px;
  padding-top: 12px;
}

</style>
