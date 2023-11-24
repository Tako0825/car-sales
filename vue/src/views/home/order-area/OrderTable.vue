<template>
    <main class="relative w-full h-auto">
        <article class="w-full h-auto absolute top-0 left-0 flex flex-col items-center gap-4 pb-12">
            <!-- 表格 -->
            <el-table
                :data="getSource"
                v-if="getSource"
                v-loading="!getDataReady"
                stripe
                style="width: 100%"
                header-cell-class-name="text-black" 
                class="rounded-xl"
            >
                <!-- 占位列 -->
                <el-table-column width="10"></el-table-column>
                <el-table-column
                    prop="id"
                    label="订单号"
                    width="70"
                ></el-table-column>
                <el-table-column
                    prop="brand"
                    label="品牌"
                    width="80"
                ></el-table-column>
                <el-table-column
                    prop="model"
                    label="型号"
                ></el-table-column>
                <el-table-column
                    prop="user"
                    label="负责人"
                    width="80"
                ></el-table-column>
                <el-table-column
                    prop="phone"
                    label="负责人电话"
                    width="120"
                ></el-table-column>
                <el-table-column
                    prop="warehouse"
                    label="来源仓库"
                ></el-table-column>
                <el-table-column label="成交时间">
                    <template slot-scope="scope">
                    <p>{{ new Date(scope.row.createtime).toLocaleDateString() + " " + new Date(scope.row.createtime).toLocaleTimeString().slice(0,5) }}</p>
                    </template>
                </el-table-column>
                <!-- 编辑 -->
                <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button @click="handleOrderDelete(scope.row)" type="text">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 空状态 -->
            <el-empty description="" v-else class="bg-white w-full h-96 rounded-xl"></el-empty>
            <!-- 分页 -->
            <el-pagination
                layout="prev, pager, next" 
                :current-page="getPage" 
                @current-change="handleCurrentChange"
                :page-size="getPageSize"
                :total="getOrderTotal"
            ></el-pagination>
        </article>
    </main>
</template>

<script>
import { sleep } from "@/util/sleep"
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("orderArea")
export default {
    name: "OrderTable",
    async created() {
        this.setDataReady(false)
        const { orderList } = await this.fetchSource()
        this.setSource(orderList)
        await sleep()
        this.setDataReady(true)
    },
    computed: {
        ...mapGetters([
            "getSource", "getDataReady", "getPage", "getPageSize", "getOrderTotal"
        ])
    },
    methods: {
        ...mapMutations([
            "setSource", "setDialogFormVisible", "setDataReady", "setPage"
        ]),
        ...mapActions([
            "fetchSource", "deleteOrder"
        ]),
        // 处理删除订单
        handleOrderDelete({ id }) {
            this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(async () => {
                await this.deleteOrder(id)
                this.setDataReady(false)
                const { orderList } = await this.fetchSource()
                this.setSource(orderList)
                await sleep()
                this.setDataReady(true)
            }).catch(() => {})
        },
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

<style scoped></style>