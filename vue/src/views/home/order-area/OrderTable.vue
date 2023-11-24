<template>
    <!-- 表格 -->
    <main class="relative">
        <article class="w-full h-auto absolute top-0 left-0">
            <el-table
                :data="getSource"
                v-loading="!getDataReady"
                stripe
                style="width: 99%"
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
            "getSource", "getDataReady"
        ])
    },
    methods: {
        ...mapMutations([
            "setSource", "setDialogFormVisible", "setDataReady"
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
        }
    }
}
</script>