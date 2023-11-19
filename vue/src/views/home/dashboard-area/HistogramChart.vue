<template>
    <main ref="chart"></main>
</template>

<script>
import echarts from "@/plugins/echarts"
import { TooltipComponent,GridComponent,LegendComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { SVGRenderer } from 'echarts/renderers'
import api from "@/api/api"

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  SVGRenderer
])
export default {
    name: "HistogramChart",
    async mounted() {
        const { xList, yList, source } = await api.get("/api/chart/ranking/user")
        this.xList = xList
        this.yList = yList.reverse()
        source.map((item, index) => {
            this.source[index] = item.reverse()
        })
        this.InitChart()
    },
    data() {
        return {
            yList: new Array(),
            xList: new Array(),
            source: new Array()
        }
    },
    computed: {
        option() {
            const seriesList = []
            this.source.map((item, index) => {
                seriesList.push({
                    name: this.xList[index],
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.source[index]
                })
            })
            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {},
                // 柱状图布局
                grid: {
                    left: '5%',
                    right: '2%',
                    bottom: '0%',
                    containLabel: true
                },
                // X轴配置
                xAxis: {
                    show: false,
                    type: 'value'
                },
                // Y轴配置
                yAxis: {
                    type: 'category',
                    data: this.yList
                },
                series: seriesList
            }
        }
    },
    methods: {
        InitChart() {
            let dom = this.$refs.chart
            let chart = echarts.init(dom, null, {
                renderer: 'svg'
            })
            this.option && chart.setOption(this.option)
        }
    }
}
</script>

<style>

</style>