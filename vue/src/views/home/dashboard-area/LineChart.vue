<template>
    <main ref="chart"></main>
</template>

<script>
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';
import api from '@/api/api';

echarts.use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LineChart,
  SVGRenderer,
  LabelLayout,
  UniversalTransition
]);
export default {
    name: "LineChart",
    async mounted() {
        const { xList, source } = await api.get("/api/chart/ranking/car")
        this.xList = xList
        this.source = source
        this.InitChart()
    },
    data() {
        return {
            xName: "年份",
            yName: "销量",
            xList: new Array(),
            source: new Array()
        }
    },
    computed: {
        option() {
            const datasetWithFilters = [];
            const seriesList = [];

            echarts.util.each(this.xList, (product) => {
                let datasetId = 'dataset_' + product
                datasetWithFilters.push({
                    id: datasetId,
                    fromDatasetId: 'dataset_raw',
                    transform: {
                        type: 'filter',
                        config: {
                            and: [
                                { dimension: 'year', gte: 2013 },
                                { dimension: 'product', '=': product }
                            ]
                        }
                    }
                })
                seriesList.push({
                    type: 'line',
                    datasetId: datasetId,
                    showSymbol: false,
                    name: product,
                    endLabel: {
                        show: true,
                        formatter: function (params) {
                            return params.value[1];
                        }
                    },
                    labelLayout: {
                        moveOverlap: 'shiftY'
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    encode: {
                        x: 'year',
                        y: 'sales',
                        label: ['product', 'sales'],
                        itemName: 'year',
                        tooltip: ['sales']
                    }
                })
            })

            return {
                animationDuration: 5000,
                dataset: [
                    {
                        id: 'dataset_raw',
                        source: this.source
                    },
                    ...datasetWithFilters
                ],
                title: {
                    show: false,
                    left: 'center',
                    text: ''
                },
                tooltip: {
                    order: 'valueDesc',
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                },
                yAxis: {
                    name: this.yName,
                    nameLocation: 'end'
                },
                grid: {
                    right: 120,
                    bottom: 30
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