<template>
  <main class="w-full h-auto flex flex-col gap-6" v-loading="loading">
    <header class="w-full flex flex-col gap-2">
      <h1 class="text-2xl font-bold">埋点分析</h1>
      <p class="text-sm text-gray-500">
        基于 `track_event` 当前已落库数据，展示事件概览、趋势、页面访问分布和性能均值。
      </p>
    </header>

    <article class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
        <h2 class="text-lg font-bold">近 7 天事件趋势</h2>
        <TrackerLineChart
          class="w-full h-96"
          :categories="eventTrend.dates"
          :series="trendSeries"
        />
      </section>
      <section class="bg-white rounded-xl p-6 flex flex-col gap-4">
        <h2 class="text-lg font-bold">事件类型分布</h2>
        <TrackerPieChart class="w-full h-96" :source="eventTypes" />
      </section>
    </article>

    <article class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <section class="bg-white rounded-xl p-6 flex flex-col gap-4">
        <h2 class="text-lg font-bold">页面访问排行</h2>
        <TrackerBarChart
          class="w-full h-96"
          :categories="routeRanking.routes"
          :values="routeRanking.counts"
          horizontal
        />
      </section>
      <section class="bg-white rounded-xl p-6 flex flex-col gap-4">
        <h2 class="text-lg font-bold">设备分布</h2>
        <TrackerPieChart class="w-full h-96" :source="deviceDistribution" />
      </section>
    </article>

    <article class="bg-white rounded-xl p-6 flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold">性能均值</h2>
        <span class="text-xs text-gray-400">单位：ms</span>
      </div>
      <TrackerBarChart
        class="w-full h-96"
        :categories="performanceAverages.names"
        :values="performanceAverages.values"
      />
    </article>
  </main>
</template>

<script>
import api from "@/api";
import TrackerLineChart from "@/views/home/tracker-dashboard/TrackerLineChart.vue";
import TrackerBarChart from "@/views/home/tracker-dashboard/TrackerBarChart.vue";
import TrackerPieChart from "@/views/home/tracker-dashboard/TrackerPieChart.vue";

export default {
  name: "TrackerDashboardArea",
  components: {
    TrackerLineChart,
    TrackerBarChart,
    TrackerPieChart,
  },
  async created() {
    const dashboard = await api.get("/api/track/dashboard");
    this.summary = dashboard.summary || {};
    this.eventTrend = dashboard.eventTrend || this.eventTrend;
    this.eventTypes = dashboard.eventTypes || [];
    this.routeRanking = dashboard.routeRanking || this.routeRanking;
    this.deviceDistribution = dashboard.deviceDistribution || [];
    this.performanceAverages =
      dashboard.performanceAverages || this.performanceAverages;
    this.loading = false;
  },
  data() {
    return {
      loading: true,
      summary: {},
      eventTypes: [],
      deviceDistribution: [],
      routeRanking: {
        routes: [],
        counts: [],
      },
      eventTrend: {
        dates: [],
        total: [],
        pageView: [],
        apiError: [],
        jsError: [],
        performance: [],
      },
      performanceAverages: {
        names: [],
        values: [],
        load: 0,
      },
    };
  },
  computed: {
    summaryCards() {
      return [
        {
          key: "totalEvents",
          label: "事件总数",
          value: this.formatNumber(this.summary.totalEvents),
          desc: "当前已落库的埋点与监控事件总量",
          icon: "el-icon-data-line",
          color: "#8b5cf6",
        },
        {
          key: "pageViews",
          label: "页面访问",
          value: this.formatNumber(this.summary.pageViews),
          desc: "已记录的 page_view 事件数",
          icon: "el-icon-reading",
          color: "#3b82f6",
        },
        {
          key: "monitorEvents",
          label: "监控事件",
          value: this.formatNumber(this.summary.monitorEvents),
          desc: "包含 performance、api_error 等监控数据",
          icon: "el-icon-warning-outline",
          color: "#ef4444",
        },
        {
          key: "activeUsers",
          label: "活跃用户数",
          value: this.formatNumber(this.summary.activeUsers),
          desc: "按 uid 去重后的用户数量",
          icon: "el-icon-user",
          color: "#14b8a6",
        },
        {
          key: "activeSessions",
          label: "会话数",
          value: this.formatNumber(this.summary.activeSessions),
          desc: "按 sid 去重后的会话数量",
          icon: "el-icon-connection",
          color: "#f59e0b",
        },
        {
          key: "avgLoad",
          label: "平均加载耗时",
          value: `${this.formatNumber(this.summary.avgLoad)} ms`,
          desc: "performance 事件中的 load 均值",
          icon: "el-icon-timer",
          color: "#10b981",
        },
      ];
    },
    trendSeries() {
      return [
        {
          name: "总事件",
          data: this.eventTrend.total,
        },
        {
          name: "页面访问",
          data: this.eventTrend.pageView,
        },
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
  },
  methods: {
    formatNumber(value) {
      const numeric = Number(value || 0);
      return Number.isInteger(numeric) ? numeric : numeric.toFixed(2);
    },
  },
};
</script>

<style></style>
