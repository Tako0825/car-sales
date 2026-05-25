<template>
  <main class="w-full h-auto flex flex-col gap-6" v-loading="loading">
    <header class="w-full flex flex-col gap-2">
      <h1 class="text-2xl font-bold">性能</h1>
      <p class="text-sm text-gray-500">
        展示当前 performance 事件的均值指标和近 7 天性能采样趋势。
      </p>
    </header>

    <article class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
      <section
        v-for="card in metricCards"
        :key="card.key"
        class="bg-white rounded-xl p-6 flex flex-col gap-3 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">{{ card.label }}</span>
          <i :class="card.icon" class="text-xl" :style="{ color: card.color }"></i>
        </div>
        <strong class="text-3xl text-gray-800">{{ card.value }}</strong>
        <span class="text-xs text-gray-400">{{ card.desc }}</span>
      </section>
    </article>

    <article class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <section class="xl:col-span-2 bg-white rounded-xl p-6 flex flex-col gap-4">
        <h2 class="text-lg font-bold">近 7 天性能上报趋势</h2>
        <TrackerLineChart
          class="w-full h-96"
          :categories="eventTrend.dates"
          :series="trendSeries"
        />
      </section>
      <section class="bg-white rounded-xl p-6 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold">性能均值</h2>
          <span class="text-xs text-gray-400">单位：ms</span>
        </div>
        <TrackerBarChart
          class="w-full h-96"
          :categories="performanceAverages.names"
          :values="performanceAverages.values"
        />
      </section>
    </article>
  </main>
</template>

<script>
import TrackerLineChart from "@/views/home/tracker-dashboard/TrackerLineChart.vue";
import TrackerBarChart from "@/views/home/tracker-dashboard/TrackerBarChart.vue";
import {
  createDefaultDashboardState,
  formatNumber,
  loadDashboardData,
} from "@/views/home/tracker-dashboard/dashboard-data";

export default {
  name: "TrackerPerformanceArea",
  components: {
    TrackerLineChart,
    TrackerBarChart,
  },
  async created() {
    await loadDashboardData(this);
  },
  data() {
    return createDefaultDashboardState();
  },
  computed: {
    metricCards() {
      return [
        {
          key: "fp",
          label: "FP",
          value: `${formatNumber(this.performanceAverages.fp)} ms`,
          desc: "首次绘制时间均值",
          icon: "el-icon-time",
          color: "#3b82f6",
        },
        {
          key: "fcp",
          label: "FCP",
          value: `${formatNumber(this.performanceAverages.fcp)} ms`,
          desc: "首次内容绘制时间均值",
          icon: "el-icon-data-analysis",
          color: "#8b5cf6",
        },
        {
          key: "ttfb",
          label: "TTFB",
          value: `${formatNumber(this.performanceAverages.ttfb)} ms`,
          desc: "首字节返回时间均值",
          icon: "el-icon-upload2",
          color: "#14b8a6",
        },
        {
          key: "domReady",
          label: "DOM Ready",
          value: `${formatNumber(this.performanceAverages.domReady)} ms`,
          desc: "DOM 可交互时间均值",
          icon: "el-icon-s-operation",
          color: "#f59e0b",
        },
        {
          key: "load",
          label: "Load",
          value: `${formatNumber(this.performanceAverages.load)} ms`,
          desc: "页面 load 时间均值",
          icon: "el-icon-timer",
          color: "#ef4444",
        },
      ];
    },
    trendSeries() {
      return [
        {
          name: "性能上报",
          data: this.eventTrend.performance,
        },
      ];
    },
  },
};
</script>

<style></style>
