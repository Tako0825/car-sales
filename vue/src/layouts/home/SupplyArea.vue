<template>
    <main class="w-full h-auto flex flex-col items-center gap-6">
        <!-- 头部 -->
        <header class="w-full flex justify-between">
            <h1 class="text-2xl font-bold">供应记录</h1>
            <el-button type="success" @click="setDialogFormVisible(true)" size="small">添加供应记录</el-button>
        </header>
        <!-- 供应记录列表 -->
        <SupplyTableVue class="w-full"/>
        <!-- 分页 -->
        <el-pagination
            layout="prev, pager, next"
            :current-page="getPage"
            @current-change="handleCurrentChange"
            :page-size="getPageSize"
            :total="getSupplyTotal"
            :hide-on-single-page="true"
        ></el-pagination>
        <!-- 添加供应记录 -->
        <SupplyFactory/>
    </main>
</template>

<script>
import SupplyTableVue from '@/views/home/supply-area/SupplyTable.vue'
import SupplyFactory from '@/views/home/supply-area/SupplyFactory.vue';
import { sleep } from '@/util/sleep';
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("supplyArea")
export default {
    name: "SupplyArea",
    components: {
        SupplyTableVue, SupplyFactory
    },
    computed: {
        ...mapGetters([
            "getPage", "getPageSize", "getSupplyTotal"
        ])
    },
    methods: {
        ...mapMutations([
            "setDataReady", "setPage", "setSource", "setDialogFormVisible"
        ]),
        ...mapActions([
            "fetchSource"
        ]),
        // 处理页数切换
        async handleCurrentChange(newPage) {
            this.setDataReady(false)
            this.setPage(newPage)
            const { supplyList } = await this.fetchSource()
            this.setSource(supplyList)
            await sleep()
            this.setDataReady(true)
        }
    }
}
</script>

<style>

</style>