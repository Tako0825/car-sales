<template>
    <main ref="chart"></main>
</template>

<script>
import echarts from "@/plugins/echarts.js"
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    LabelLayout,
    SVGRenderer
]);
export default {
    name: "DashboardChart",
    props: [
        "title", "value", "rate", "color", "isActived", "index"
    ],
    mounted() {
        this.InitChart()
    },
    data() {
        return {
            fontSize: 20,
            base: "transparent",
            chart: null
        }
    },
    computed: {
        option() {
            return {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        center: ["center", "60%"],
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ]
            }
        }
    },
    methods: {
        InitChart() {
            let dom =  this.$refs.chart
            this.chart = echarts.init(dom, null, {
                renderer: 'svg'
            });
            this.option && this.chart.setOption(this.option)
        }
    },
    watch: {
        value() {
            this.chart.setOption(this.option)
        }
    }
}
</script>

<style>

</style>