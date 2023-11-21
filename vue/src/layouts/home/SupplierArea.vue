<template>
    <main class="w-full h-auto flex flex-col items-center gap-6">
    <!-- 头部 -->
    <header class="w-full flex justify-between">
        <h1 class="text-2xl font-bold">供应商总览</h1>
        <el-button 
            v-if="['ADMIN'].includes($store.getters.getUser.role)" 
            type="success" 
            @click="setDialogFormVisible(true)" 
            size="small"
        >添加供应商</el-button>
    </header>
    <!-- 供应商列表 -->
    <SupplierTableVue class="w-full"/>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :current-page="getPage"
      @current-change="handleCurrentChange"
      :page-size="getPageSize"
      :total="getSupplierTotal"
      :hide-on-single-page="true"
    ></el-pagination>
    <!-- 添加仓库 -->
    <SupplierFactoryVue/>
    <!-- 编辑仓库 - 修改地址 -->
    <SupplierEditVue/>
  </main>
</template>

<script>
import { sleep } from '@/util/sleep'
import SupplierTableVue from '@/views/home/supplier-area/SupplierTable.vue'
import SupplierEditVue from '@/views/home/supplier-area/SupplierEdit.vue'
import SupplierFactoryVue from '@/views/home/supplier-area/SupplierFactory.vue'
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("supplierArea")
export default {
    name: "SupplierArea",
    components: {
        SupplierTableVue, SupplierEditVue, SupplierFactoryVue
    },
    computed: {
        ...mapGetters([
            "getPage", "getPageSize", "getSupplierTotal"
        ])
    },
    methods: {
        ...mapMutations([
            "setDialogFormVisible", "setSource", "setDataReady", "setPage"
        ]),
        ...mapActions([
            "fetchSource"
        ]),
        // 处理页数切换
        async handleCurrentChange(newPage) {
            this.setDataReady(false)
            this.setPage(newPage)
            const { supplierList } = await this.fetchSource()
            this.setSource(supplierList)
            await sleep()
            this.setDataReady(true)
        }
    }
}
</script>

<style>

</style>