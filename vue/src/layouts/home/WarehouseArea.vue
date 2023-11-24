<template>
  <main class="w-full h-auto flex flex-col items-center gap-6">
    <!-- 头部 -->
    <header class="w-full flex justify-between">
        <h1 class="text-2xl font-bold">仓库总览</h1>
        <el-button 
          v-if="['ADMIN', 'ROOT'].includes($store.getters?.getUser?.role)" 
          type="success" 
          @click="setDialogFormVisible(true)" 
          size="small"
        >添加仓库</el-button>
    </header>
    <WarehouseTableVue class="w-full"/>
    <!-- 添加仓库 -->
    <WarehouseFactoryVue/>
    <!-- 编辑仓库 - 修改地址 -->
    <WarehouseEditVue/>
  </main>
</template>

<script>
import WarehouseTableVue from '@/views/home/warehouse-area/WarehouseTable.vue'
import WarehouseFactoryVue from '@/views/home/warehouse-area/WarehouseFactory.vue'
import WarehouseEditVue from '@/views/home/warehouse-area/WarehouseEdit.vue'
import { createNamespacedHelpers } from "vuex"
const { mapMutations } = createNamespacedHelpers("warehouseArea")
export default {
  name: "WarehouseArea",
  components: {
    WarehouseTableVue, WarehouseFactoryVue, WarehouseEditVue
  },
  methods: {
    ...mapMutations([
      "setDialogFormVisible"
    ])
  }
}
</script>

<style>

</style>