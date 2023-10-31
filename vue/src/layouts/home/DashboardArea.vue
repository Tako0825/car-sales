<template>
  <div class="w-full h-full flex justify-between gap-6">
    <!-- 仪表盘遍历 -->
    <div
      v-for="(chart,index) in charts" 
      :key="index" 
      class="flex-1 h-80 pt-5 flex flex-col justify-around items-center gap-4 overflow-hidden bg-white rounded-lg"
    >
      <i :class="chart.icon" class="text-3xl"></i>
      <div class="w-full h-full">
        <component 
          :is="chart.component" 
          :title="chart.title" 
          :value="chart.value"
          :rate="chart.rate"
          :color="chart.color"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardChart from '@/views/home/dashboard-area/DashboardChart.vue'
export default {
  name: "DashboardArea",
  components: {
    DashboardChart
  },
  data() {
    return {
      charts: [
      {
          icon: "el-icon-s-flag text-3xl",
          title: "企业总营业额(万元)",
          value: 5678.56,
          rate: 0.64,
          color: "#a162f7",
          component: DashboardChart
        },
        {
          icon: "el-icon-s-flag text-3xl",
          title: "企业总成交量(万单)",
          value: 23.42,
          rate: 0.52,
          color: "#ff7e86",
          component: DashboardChart
        },
        {
          icon: "el-icon-s-flag text-3xl",
          title: "仓库总数",
          value: 16,
          rate: 0.42,
          color: "#f6cc0d",
          component: DashboardChart
        },
        {
          icon: "el-icon-s-flag text-3xl",
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