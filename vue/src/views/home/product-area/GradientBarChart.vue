<template>
    <main ref="chart"></main>
</template>

<script>
import echarts from "@/plugins/echarts.js"
import {
  TitleComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  GridComponent,
  DataZoomComponent,
  BarChart,
  SVGRenderer
]);

export default {
    name: "GradientBarChart",
    props: [
        "title", "value", "rate", "color", "isActived", "index"
    ],
    mounted() {
        this.InitChart()
    },
    data() {
        return {
            // prettier-ignore
            dataAxis: ['点', '击', '柱', '子', '或', '者', '两', '指'],
            // prettier-ignore
            source: [220, 182, 191, 234, 290, 330, 310, 123],
            yMax: 500,
            zoomSize: 6,
            dataShadow: []
        }
    },
    computed: {
        option() {
            return {
  title: {
    text: '特性示例：渐变色 阴影 点击缩放',
  },
  xAxis: {
    data: this.dataAxis,
    axisLabel: {
      inside: true,
      color: '#fff'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  },
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  series: [
    {
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#b481f9' },
          { offset: 0.5, color: '#ff9ff3' },
          { offset: 1, color: '#ede1fe' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#a162f7' },
            { offset: 0.7, color: '#b481f9' },
            { offset: 1, color: '#ff9ff3' }
          ])
        }
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
            })
            for (let i = 0; i < this.source.length; i++) {
                this.dataShadow.push(this.yMax);
            }
            // Enable data zoom when user click bar.
            this.chart.on('click', (params) => {
                console.log(this.dataAxis[Math.max(params.dataIndex - this.zoomSize / 2, 0)]);
                this.chart.dispatchAction({
                    type: 'dataZoom',
                    startValue: this.dataAxis[Math.max(params.dataIndex - this.zoomSize / 2, 0)],
                    endValue:
                    this.dataAxis[Math.min(params.dataIndex + this.zoomSize / 2, this.source.length - 1)]
                })
            })
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