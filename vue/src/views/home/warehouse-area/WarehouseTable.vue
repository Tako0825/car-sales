<template>
    <!-- 表格 -->
    <el-table
        :data="getSource"
        v-loading="!getDataReady"
        stripe
        style="width: 99%"
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
        <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
                <el-button @click="handelLocationChange(scope.row)" type="text">修改</el-button>
                <el-button @click="handleWarehouseDelete(scope.row)" type="text">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
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
            "getSource", "getDataReady"
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
        }
    }
}
</script>