<template>
    <div id="chart">
        <apexchart type="donut" height="300" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component({
    components: {},
})

export default class Histogram extends Vue {
    @Prop({type: Object, default: () => null}) data;

    series = [];

    chartOptions = {
        chart: {
            width: '500px',
            type: 'line',
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
