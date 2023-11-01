<template>
    <main ref="chart" class="w-full h-full"></main>
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
    mounted() {
        this.InitChart()
    },
    data() {
        return {
            xName: "年份",
            yName: "销量",
            products: [
                "比亚迪-秦",
                "比亚迪-汉",
                "特斯拉-model 3",
                "特斯拉-model y",
                "奔驰-C260L",
                "奥迪-Q5L",
            ],
            source: [
                ["sales", "product", "year"],
                [1241, "比亚迪-秦", 2000],
                [2332, "比亚迪-汉", 2000],
                [3423, "特斯拉-model 3", 2000],
                [3244, "特斯拉-model y", 2000],
                [2356, "奔驰-C260L", 2000],
                [4523, "奥迪-Q5L", 2000],
                [4513, "比亚迪-秦", 2001],
                [6742, "比亚迪-汉", 2001],
                [2345, "特斯拉-model 3", 2001],
                [2834, "特斯拉-model y", 2001],
                [1235, "奔驰-C260L", 2001],
                [6453, "奥迪-Q5L", 2001],
                [5324, "比亚迪-秦", 2002],
                [5379, "比亚迪-汉", 2002],
                [7686, "特斯拉-model 3", 2002],
                [7836, "特斯拉-model y", 2002],
                [5389, "奔驰-C260L", 2002],
                [7838, "奥迪-Q5L", 2002],
                [8763, "比亚迪-秦", 2003],
                [5438, "比亚迪-汉", 2003],
                [7868, "特斯拉-model 3", 2003],
                [7836, "特斯拉-model y", 2003],
                [7869, "奔驰-C260L", 2003],
                [9876, "奥迪-Q5L", 2003],
                [8756, "比亚迪-秦", 2004],
                [13542, "比亚迪-汉", 2004],
                [5435, "特斯拉-model 3", 2004],
                [7865, "特斯拉-model y", 2004],
                [12445, "奔驰-C260L", 2004],
                [12341, "奥迪-Q5L", 2004]
            ]
        }
    },
    computed: {
        option() {
            const datasetWithFilters = []
            const seriesList = []
            // 数据聚合
            echarts.util.each(this.products, function (product) {
                let datasetId = 'dataset_' + product;
                datasetWithFilters.push({
                    id: datasetId,
                    fromDatasetId: 'dataset_raw',
                    transform: {
                        type: 'filter',
                        config: {
                            and: [
                                { dimension: 'year', gte: 2000 },
                                { dimension: 'product', '=': product }
                            ]
                        }
                    }
                });
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
                    // 数据匹配字段
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
                // 动画持续时间
                animationDuration: 3000,
                dataset: [
                    {
                        id: 'dataset_raw',
                        source: this.source
                    },
                    ...datasetWithFilters
                ],
                // 折线图标题
                title: {
                    show: false,
                    left: 'center',
                    text: ''
                },
                tooltip: {
                    order: 'valueDesc',
                    trigger: 'axis'
                },
                // X轴参数
                xAxis: {
                    type: 'category',
                },
                // Y轴参数
                yAxis: {
                    show: false,
                    name: this.yName,
                    nameLocation: 'end'
                },
                // 折线图布局
                grid: {
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