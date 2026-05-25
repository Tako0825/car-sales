<template>
  <main ref="chart"></main>
</template>

<script>
import echarts from "@/plugins/echarts";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  SVGRenderer,
]);

export default {
  name: "TrackerLineChart",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    series: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    this.chart?.dispose();
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    option() {
      return {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          top: 0,
        },
        grid: {
          top: 50,
          left: 30,
          right: 20,
          bottom: 30,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.categories,
        },
        yAxis: {
          type: "value",
        },
        series: this.series.map((item) => ({
          ...item,
          type: "line",
          smooth: true,
          showSymbol: true,
        })),
      };
    },
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart, null, {
        renderer: "svg",
      });
      this.chart.setOption(this.option);
    },
    handleResize() {
      this.chart?.resize();
    },
  },
  watch: {
    option: {
      deep: true,
      handler() {
        this.chart?.setOption(this.option, true);
      },
    },
  },
};
</script>

<style></style>
