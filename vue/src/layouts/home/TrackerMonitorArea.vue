<template>
  <main class="w-full h-auto flex flex-col gap-6" v-loading="loading">
    <header class="w-full flex flex-col gap-2">
      <h1 class="text-2xl font-bold">监控</h1>
      <p class="text-sm text-gray-500">
        聚焦系统维护相关事件，查看接口报错、JS 报错和当前监控事件分布。
      </p>
    </header>

    <article class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <section
        v-for="card in summaryCards"
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
        <h2 class="text-lg font-bold">近 7 天异常趋势</h2>
        <TrackerLineChart
          class="w-full h-96"
          :categories="eventTrend.dates"
          :series="trendSeries"
        />
      </section>
      <section class="bg-white rounded-xl p-6 flex flex-col gap-4">
        <h2 class="text-lg font-bold">监控类型分布</h2>
        <TrackerPieChart class="w-full h-96" :source="monitorTypes" />
      </section>
    </article>
  </main>
</template>

<script>
import TrackerLineChart from "@/views/home/tracker-dashboard/TrackerLineChart.vue";
import TrackerPieChart from "@/views/home/tracker-dashboard/TrackerPieChart.vue";
import {
  createDefaultDashboardState,
  formatNumber,
  loadDashboardData,
} from "@/views/home/tracker-dashboard/dashboard-data";

export default {
  name: "TrackerMonitorArea",
  components: {
    TrackerLineChart,
    TrackerPieChart,
  },
  async created() {
    await loadDashboardData(this);
  },
  data() {
    return createDefaultDashboardState();
  },
  computed: {
    summaryCards() {
      return [
        {
          key: "monitorEvents",
          label: "监控事件",
          value: formatNumber(this.summary.monitorEvents),
          desc: "已采集的监控事件总量",
          icon: "el-icon-warning-outline",
          color: "#ef4444",
        },
        {
          key: "apiError",
          label: "接口报错",
          value: formatNumber(this.sumValues(this.eventTrend.apiError)),
          desc: "近 7 天 api_error 累计次数",
          icon: "el-icon-link",
          color: "#f97316",
        },
        {
          key: "jsError",
          label: "JS 报错",
          value: formatNumber(this.sumValues(this.eventTrend.jsError)),
          desc: "近 7 天 js_error 累计次数",
          icon: "el-icon-warning",
          color: "#dc2626",
        },
        {
          key: "performance",
          label: "性能上报",
          value: formatNumber(this.sumValues(this.eventTrend.performance)),
          desc: "近 7 天 performance 累计次数",
          icon: "el-icon-monitor",
          color: "#8b5cf6",
        },
      ];
    },
    trendSeries() {
      return [
        {
          name: "接口报错",
          data: this.eventTrend.apiError,
        },
        {
          name: "JS 报错",
          data: this.eventTrend.jsError,
        },
        {
          name: "性能上报",
          data: this.eventTrend.performance,
        },
      ];
    },
    monitorTypes() {
      return this.eventTypes.filter((item) =>
        ["api_error", "js_error", "resource_error", "api_slow", "performance"].includes(
          item.name,
        ),
      );
    },
  },
  methods: {
    sumValues(list = []) {
      return list.reduce((total, item) => total + Number(item || 0), 0);
    },
  },
};
</script>

<style></style>
