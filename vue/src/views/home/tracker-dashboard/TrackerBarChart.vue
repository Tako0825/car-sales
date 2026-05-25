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
import { BarChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  SVGRenderer,
]);

export default {
  name: "TrackerBarChart",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    values: {
      type: Array,
      default: () => [],
    },
    horizontal: {
      type: Boolean,
      default: false,
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
      const categoryAxis = {
        type: "category",
        data: this.categories,
      };
      const valueAxis = {
        type: "value",
      };

      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: 20,
          left: this.horizontal ? 90 : 30,
          right: 20,
          bottom: this.horizontal ? 30 : 50,
          containLabel: true,
        },
        xAxis: this.horizontal ? valueAxis : categoryAxis,
        yAxis: this.horizontal ? categoryAxis : valueAxis,
        series: [
          {
            type: "bar",
            data: this.values,
            label: {
              show: true,
              position: this.horizontal ? "right" : "top",
            },
            itemStyle: {
              borderRadius: 8,
              color: "#8b5cf6",
            },
          },
        ],
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
