<template>
    <main class="w-full h-auto flex flex-col items-center gap-6">
        <!-- 头部 -->
        <header class="w-full flex justify-between">
            <h1 class="text-2xl font-bold">供应商总览</h1>
            <el-button 
                v-if="['ADMIN', 'ROOT'].includes($store.getters.getUser.role)" 
                type="success" 
                @click="setDialogFormVisible(true)" 
                size="small"
            >添加供应商</el-button>
        </header>
        <!-- 供应商列表 -->
        <SupplierTableVue class="w-full h-auto"/>

        <!-- 添加仓库 -->
        <SupplierFactoryVue/>
        <!-- 编辑仓库 - 修改地址 -->
        <SupplierEditVue/>
    </main>
</template>

<script>
import SupplierTableVue from '@/views/home/supplier-area/SupplierTable.vue'
import SupplierEditVue from '@/views/home/supplier-area/SupplierEdit.vue'
import SupplierFactoryVue from '@/views/home/supplier-area/SupplierFactory.vue'
import { createNamespacedHelpers } from "vuex"
const { mapMutations } = createNamespacedHelpers("supplierArea")
export default {
    name: "SupplierArea",
    components: {
        SupplierTableVue, SupplierEditVue, SupplierFactoryVue
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