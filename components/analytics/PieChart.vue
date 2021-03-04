<template>
  <div id="chart">
    <apexchart type="donut" height="300" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout() { return "home" }
})

export default class PieChart extends Vue {
  series = [44, 55, 41, 17, 15]
  chartOptions = {
    chart: {
      width: '100%',
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    title: {
      text: 'Broj prodanih oglasa po kategoriji nekretnine'
    }
  }
}
</script>

<style scoped lang="scss">
#chart {
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-radius: 10px;
  padding-top: 12px;
  margin-top: 36px;
  width: 100%;
  box-sizing: border-box;
}
</style>
