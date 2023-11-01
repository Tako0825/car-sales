<template>
    <main ref="chart" class="w-full h-full"></main>
</template>

<script>
import echarts from "@/plugins/echarts"
import { TooltipComponent,GridComponent,LegendComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  SVGRenderer
]);
export default {
    mounted() {
        this.InitChart()
    },
    data() {
        return {
            yList: ["曹操", "刘备", "孙权", "关羽", "张飞"],
            xList: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            sourse: [
                [320, 302, 301, 334, 390, 330, 320],
                [120, 132, 101, 134, 90, 230, 210],
                [220, 182, 191, 234, 290, 330, 310],
                [150, 212, 201, 154, 190, 330, 410],
                [820, 832, 901, 934, 1290, 1330, 1320]
            ]
        }
    },
    computed: {
        option() {
            const seriesList = []
            this.sourse.map((item, index) => {
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
                    data: this.sourse[index]
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