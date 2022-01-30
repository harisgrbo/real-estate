<template>
  <div id="chart">
    <apexchart type="donut" height="300" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {
  },
})

export default class PieChart extends Vue {
  @Prop({type: Object, default: () => null}) data;

  series = [];

  chartOptions = {
    chart: {
      width: '500px',
      type: 'donut',
    },
    labels: [],
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

  created() {
    this.series = Object.values(this.data);
    this.chartOptions.labels = Object.keys(this.data);
  }
}
</script>

<style scoped lang="scss">
#chart {
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-radius: 6px;
  padding-top: 12px;
  margin-top: 24px;
  width: 500;
  box-sizing: border-box;
}
</style>
