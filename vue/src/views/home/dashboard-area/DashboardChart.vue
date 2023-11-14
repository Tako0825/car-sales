<template>
    <main ref="chart"></main>
</template>

<script>
import echarts from "@/plugins/echarts.js"
import { TitleComponent } from 'echarts/components';
import { GaugeChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, GaugeChart, SVGRenderer]);
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
                backgroundColor: this.base,
                title: {
                    show: true,
                    // 仪表盘标题
                    text: this.title,
                    top: "5%",
                    left: 'center',
                    textStyle: {
                        color: '#242731',
                        fontSize: this.fontSize,
                        fontFamily: 'DM Sans',
                    }
                },
                series: [{
                        type: "gauge",
                        center: ["center", "60%"],
                        axisLine: {
                            lineStyle: {
                                color: [
                                    // 外环占比 & 外环颜色
                                    [this.rate, this.color],
                                    [1, "#f4f5f9"]
                                ],
                                width: this.fontSize
                            }
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,

                        },
                        splitLine: {
                            show: false,
                        },
                        itemStyle: {
                            show: false,
                        },
                        detail: {
                            // 数值格式化
                            formatter: function(value) {
                                return `${value}`
                            },
                            offsetCenter: [0,20],
                            textStyle: {
                                fontSize: this.fontSize,
                                fontWeight: 700,
                                color: '#242731'
                            }
                        },
                        pointer: {
                            show: false
                        },
                        data: [
                            {
                                "name": "",
                                // 仪表盘数值
                                "value": this.value,
                            }
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