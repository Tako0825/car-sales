<template>
    <main class="relative w-full h-auto">
        <article class="w-full h-auto absolute top-0 left-0 flex flex-col items-center gap-4 pb-12">
            <!-- 表格 -->
            <el-table
                :data="getSource"
                v-loading="!getDataReady"
                v-if="getSource"
                stripe
                style="width: 100%"
                header-cell-class-name="text-black" 
                class="rounded-xl"
            >
                <!-- 占位列 -->
                <el-table-column width="50"></el-table-column>
                <el-table-column
                    prop="id"
                    label="序号"
                    width="80"
                ></el-table-column>
                <el-table-column
                    prop="location"
                    label="地址"
                ></el-table-column>
                <!-- 编辑 -->
                <el-table-column v-if="['ADMIN'].includes($store.getters.getUser.role)" fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button @click="handelLocationChange(scope.row)" type="text">修改</el-button>
                        <el-button @click="handleWarehouseDelete(scope.row)" type="text">删除</el-button>
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
                :total="getWarehouseTotal"
            ></el-pagination>
        </article>
    </main>
</template>

<script>
import { sleep } from "@/util/sleep"
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("warehouseArea")
export default {
    name: "WarehouseTable",
    async created() {
        this.setDataReady(false)
        const { warehouseList } = await this.fetchSource()
        this.setSource(warehouseList)
        await sleep()
        this.setDataReady(true)
    },
    computed: {
        ...mapGetters([
            "getSource", "getDataReady", "getPage", "getPageSize", "getWarehouseTotal"
        ])
    },
    methods: {
        ...mapMutations([
            "setSource", "setDialogEditVisible", "setDataReady", "setWarehouse"
        ]),
        ...mapActions([
            "fetchSource", "fetchWarehouse", "deleteWarehouse"
        ]),
        // 处理修改地址
        async handelLocationChange({ id }) {
            const warehouse = await this.fetchWarehouse(id)
            this.setWarehouse(warehouse)
            this.setDialogEditVisible(true)
        },
        // 处理删除仓库
        async handleWarehouseDelete({ id }) {
            this.$confirm('此操作将永久删除该仓库, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(async () => {
                await this.deleteWarehouse(id)
                this.setDataReady(false)
                const { warehouseList } = await this.fetchSource()
                this.setSource(warehouseList)
                await sleep()
                this.setDataReady(true)
            }).catch(() => {})
        },
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