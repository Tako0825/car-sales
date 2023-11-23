<template>
<!-- 员工详情 -->
<el-dialog 
  title="员工详情" 
  :visible.sync="dialogTableVisible"
  top="1rem"
  width="800px"
> 
  <el-row class="w-full h-64 flex">
    <DashboardChartVue :title="'共售出(台)'" :value="count" :color="'#a162f7'" :rate="count / average_count" class="w-full h-full"/>
    <DashboardChartVue :title="'总经营(万元)'" :value="sales" :color="'#a162f7'" :rate="sales / average_sales" class="w-full h-full"/>
  </el-row>
  
  <section class="rounded-xl w-full h-96 overflow-auto">
    <!-- 表格 -->
    <el-table
      :data="source"
      v-if="source?.length"
      stripe
      style="width: 100%"
      header-cell-class-name="text-black" 
    >
      <!-- 占位列 -->
      <el-table-column prop="id" label="订单号" width="80"></el-table-column>
      <el-table-column prop="name" label="品牌" width="80"></el-table-column>
      <el-table-column prop="model" label="型号" width="100"></el-table-column>
      <el-table-column prop="location" label="来源仓库"></el-table-column>
      <el-table-column prop="createtime" label="交易时间" :formatter="formatCreatetime" width="180"></el-table-column>
    </el-table>
    <el-empty v-if="!source?.length" class="text-gray-300 font-bold">空空如也</el-empty>
  </section>

</el-dialog>
</template>

<script>
import DashboardChartVue from '../dashboard-area/DashboardChart.vue'
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations } = createNamespacedHelpers("userArea")
export default {
  name: "UserDetail",
  components: { DashboardChartVue },
  computed: {
    count() {
      return this.getUserDetail?.count || 0
    },
    sales() {
      return this.getUserDetail?.sales || 0
    },
    average_count() {
      return this.getUserDetail?.average_count || 0
    },
    average_sales() {
      return this.getUserDetail?.average_sales || 0
    },
    source() {
      return this.getUserDetail?.source || []
    },
    ...mapGetters([
      "getDialogTableVisible", "getUserDetail"
    ]),
    dialogTableVisible: {
      get() {
        return this.getDialogTableVisible
      },
      set(newValue) {
        this.setDialogTableVisible(newValue)
      }
    }
  },
  methods: {
    // 格式化 - createtime
    formatCreatetime(row) {
      const date = new Date(row.createtime)
      return date.toLocaleString()
    },
    ...mapMutations([
      "setDialogTableVisible"
    ])
  }
}
</script>

<style>

</style>