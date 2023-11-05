<template>
  <main class="w-full h-auto flex flex-col gap-6">
    <!-- 块行容器 -->
    <article class="w-full h-80 flex justify-between gap-6">
      <!-- 仪表盘遍历 -->
      <section
        v-for="(chart,index) in charts" 
        :key="index" 
        class="flex-1 h-full pt-5 flex flex-col justify-around items-center gap-4 overflow-hidden bg-white rounded-lg relative transition duration-300 hover:bg-purple-400"
      >
        <i :class="chart.icon" class="text-3xl"></i>
        <div class="w-full h-full">
          <component
            :is="chart.component"
            :title="chart.title"
            :value="chart.value"
            :rate="chart.rate"
            :color="chart.color"
            class="w-full h-full"
          />
        </div>
        <div class="w-full h-full absolute top-0 left-0 z-10 cursor-pointer"></div>
      </section>
    </article>
    <!-- 块行容器 -->
    <article class="w-full h-96 flex gap-6">
      <!-- 柱状图 -->
      <section class="flex-1 h-full bg-white rounded-lg">
        <HistogramChart class="w-full h-full"/>
      </section>
      <!-- 折线图 -->
      <section class="flex-1 h-full bg-white rounded-lg">
        <LineChart class="w-full h-full"/>
      </section>
    </article>
  </main>
</template>

<script>
const DashboardChart = () => import('@/views/home/dashboard-area/DashboardChart.vue')
const HistogramChart = () => import('@/views/home/dashboard-area/HistogramChart.vue')
const LineChart = () => import("@/views/home/dashboard-area/LineChart.vue")
export default {
  name: "DashboardArea",
  components: {
    DashboardChart, HistogramChart, LineChart
  },
  data() {
    return {
      charts: [
        {
          icon: "el-icon-s-flag text-3xl",
          title: "汽车营业额(万元)",
          value: 5678.56,
          rate: 0.64,
          color: "#a162f7",
          component: DashboardChart
        },
        {
          icon: "el-icon-s-marketing text-3xl",
          title: "汽车成交量(万单)",
          value: 23.42,
          rate: 0.52,
          color: "#ff7e86",
          component: DashboardChart
        },
        {
          icon: "el-icon-s-data text-3xl",
          title: "全国仓库总数",
          value: 16,
          rate: 0.42,
          color: "#f6cc0d",
          component: DashboardChart
        },
        {
          icon: "el-icon-menu",
          title: "员工总数",
          value: 2048,
          rate: 0.77,
          color: "#70cf97",
          component: DashboardChart
        }
      ]
    }
  }
}
</script>

<style>

</style>