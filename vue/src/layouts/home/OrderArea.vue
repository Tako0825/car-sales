<template>
    <main class="w-full h-auto flex flex-col items-center gap-6">
        <!-- 头部 -->
        <header class="w-full flex justify-between">
            <h1 class="text-2xl font-bold">订单管理</h1>
            <el-button type="success" @click="setDialogFormVisible(true)" size="medium">添加订单</el-button>
        </header>
        <!-- 订单列表 -->
        <OrderTableVue/>
        <!-- 分页 -->
        <el-pagination
        layout="prev, pager, next"
        :current-page="getPage"
        @current-change="handleCurrentChange"
        :page-size="getPageSize"
        :total="getOrderTotal"
        :hide-on-single-page="true"
        ></el-pagination>
        <!-- 添加仓库 -->
        <OrderFactory/>
    </main>
</template>

<script>
import OrderTableVue from '@/views/home/order-area/OrderTable.vue'
import OrderFactory from '@/views/home/order-area/OrderFactory.vue';
import { sleep } from '@/util/sleep';
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("orderArea")
export default {
    name: "OrderArea",
    components: {
        OrderTableVue, OrderFactory
    },
    computed: {
        ...mapGetters([
            "getPage", "getPageSize", "getOrderTotal"
        ])
    },
    methods: {
        ...mapMutations([
            "setDialogFormVisible", "setDataReady", "setPage", "setSource"
        ]),
        ...mapActions([
            "fetchSource"
        ]),
        // 处理页数切换
        async handleCurrentChange(newPage) {
            this.setDataReady(false)
            this.setPage(newPage)
            const { orderList } = await this.fetchSource()
            this.setSource(orderList)
            await sleep()
            this.setDataReady(true)
        }
    }
}
</script>

<style>

</style>