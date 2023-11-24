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
    "source", "title"
  ],
  mounted() {
    this.InitChart()
  },
  data() {
    return {
      yMax: 500,  
      zoomSize: 6,
      dataShadow: []
    }
  },
  computed: {
    x() {
      return this.source?.gradientBarX || []
    },
    y() {
      return this.source?.gradientBarY || []
    },
    option() {
      return {
        title: {
          text: this.title,
          left: "center",
          top: "20px"
        },
        xAxis: {
          data: this.x,
          axisLabel: {
            inside: true,
            color: '#000'
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
            data: this.y
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
      for (let i = 0; i < this.y?.length; i++) {
          this.dataShadow.push(this.yMax);
      }
      // Enable data zoom when user click bar.
      this.chart.on('click', (params) => {
          this.chart.dispatchAction({
              type: 'dataZoom',
              startValue: this.x[Math.max(params.dataIndex - this.zoomSize / 2, 0)],
              endValue:
              this.x[Math.min(params.dataIndex + this.zoomSize / 2, this.y?.length - 1)]
          })
      })
      this.option && this.chart.setOption(this.option)
    }
  },
  watch: {
    x() {
      this.chart.setOption(this.option)
    },
    y() {
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style>

</style>