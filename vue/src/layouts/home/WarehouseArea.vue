<template>
  <main class="w-full h-auto flex flex-col items-center gap-6">
    <!-- 头部 -->
    <header class="w-full flex justify-between">
        <h1 class="text-2xl font-bold">仓库总览</h1>
        <el-button 
          v-if="['ADMIN'].includes($store.getters.getUser.role)" 
          type="success" 
          @click="setDialogFormVisible(true)" 
          size="small"
        >添加仓库</el-button>
    </header>
    <WarehouseTableVue class="w-full"/>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :current-page="getPage"
      @current-change="handleCurrentChange"
      :page-size="getPageSize"
      :total="getWarehouseTotal"
      :hide-on-single-page="true"
    ></el-pagination>
    <!-- 添加仓库 -->
    <WarehouseFactoryVue/>
    <!-- 编辑仓库 - 修改地址 -->
    <WarehouseEditVue/>
  </main>
</template>

<script>
import { sleep } from "@/util/sleep"
import WarehouseTableVue from '@/views/home/warehouse-area/WarehouseTable.vue'
import WarehouseFactoryVue from '@/views/home/warehouse-area/WarehouseFactory.vue'
import WarehouseEditVue from '@/views/home/warehouse-area/WarehouseEdit.vue'
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("warehouseArea")
export default {
  name: "WarehouseArea",
  components: {
    WarehouseTableVue, WarehouseFactoryVue, WarehouseEditVue
  },
  computed: {
    ...mapGetters([
      "getPage", "getPageSize", "getWarehouseTotal"
    ]),
  },
  methods: {
    ...mapMutations([
      "setDataReady", "setPage", "setDataReady", "setSource", "setDialogFormVisible"
    ]),
    ...mapActions([
      "fetchSource"
    ]),
    // 处理页面切换
    async handleCurrentChange(newPage) {
      this.setDataReady(false)
      this.setPage(newPage)
      const { warehouseList } = await this.fetchSource()
      this.setSource(warehouseList)
      await sleep()
      this.setDataReady(true)
    }
  }
}
</script>

<style>

</style>