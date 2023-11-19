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
    name: "PieChart",
    props: [
        "title", "source"
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
                title: {
                    text: this.title,
                    left: 'center',
                    top: "10px"
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        center: ["center", "55%"],
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '80%'],
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
                            fontSize: 16,
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: this.source
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
        source() {
            this.chart.setOption(this.option)
        }
    }
}
</script>

<style>

</style>