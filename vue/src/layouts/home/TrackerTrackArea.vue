<template>
  <main class="w-full h-auto flex flex-col gap-6" v-loading="loading">
    <header class="w-full flex flex-col gap-2">
      <h1 class="text-2xl font-bold">埋点</h1>
      <p class="text-sm text-gray-500">
        关注用户行为相关数据，包含页面访问、活跃用户、访问页面排行和设备分布。
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
        <h2 class="text-lg font-bold">近 7 天页面访问趋势</h2>
        <TrackerLineChart
          class="w-full h-96"
          :categories="eventTrend.dates"
          :series="trendSeries"
        />
      </section>
      <section class="bg-white rounded-xl p-6 flex flex-col gap-4">
        <h2 class="text-lg font-bold">设备分布</h2>
        <TrackerPieChart class="w-full h-96" :source="deviceDistribution" />
      </section>
    </article>

    <article class="bg-white rounded-xl p-6 flex flex-col gap-4">
      <h2 class="text-lg font-bold">页面访问排行</h2>
      <TrackerBarChart
        class="w-full h-96"
        :categories="routeRanking.routes"
        :values="routeRanking.counts"
        horizontal
      />
    </article>
  </main>
</template>

<script>
import TrackerLineChart from "@/views/home/tracker-dashboard/TrackerLineChart.vue";
import TrackerBarChart from "@/views/home/tracker-dashboard/TrackerBarChart.vue";
import TrackerPieChart from "@/views/home/tracker-dashboard/TrackerPieChart.vue";
import {
  createDefaultDashboardState,
  formatNumber,
  loadDashboardData,
} from "@/views/home/tracker-dashboard/dashboard-data";

export default {
  name: "TrackerTrackArea",
  components: {
    TrackerLineChart,
    TrackerBarChart,
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
          key: "pageViews",
          label: "页面访问",
          value: formatNumber(this.summary.pageViews),
          desc: "已记录的 page_view 事件数",
          icon: "el-icon-reading",
          color: "#3b82f6",
        },
        {
          key: "activeUsers",
          label: "活跃用户数",
          value: formatNumber(this.summary.activeUsers),
          desc: "按 uid 去重后的用户数量",
          icon: "el-icon-user",
          color: "#14b8a6",
        },
        {
          key: "activeSessions",
          label: "会话数",
          value: formatNumber(this.summary.activeSessions),
          desc: "按 sid 去重后的会话数量",
          icon: "el-icon-connection",
          color: "#f59e0b",
        },
        {
          key: "totalEvents",
          label: "总事件数",
          value: formatNumber(this.summary.totalEvents),
          desc: "当前已落库的全部埋点与监控事件",
          icon: "el-icon-data-line",
          color: "#8b5cf6",
        },
      ];
    },
    trendSeries() {
      return [
        {
          name: "页面访问",
          data: this.eventTrend.pageView,
        },
        {
          name: "总事件",
          data: this.eventTrend.total,
        },
      ];
    },
  },
};
</script>

<style></style>
