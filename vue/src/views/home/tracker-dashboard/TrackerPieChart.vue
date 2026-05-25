<template>
  <main ref="chart"></main>
</template>

<script>
import echarts from "@/plugins/echarts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";

echarts.use([TooltipComponent, LegendComponent, PieChart, SVGRenderer]);

export default {
  name: "TrackerPieChart",
  props: {
    source: {
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
          trigger: "item",
        },
        legend: {
          bottom: 0,
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "72%"],
            center: ["50%", "46%"],
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              formatter: "{b}: {d}%",
            },
            data: this.source,
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
