<template>
    <main class="flex flex-col gap-6">
        <!-- 头部 -->
        <header class="w-full flex justify-between">
        <h1 class="text-2xl font-bold">仓库总览</h1>
        <el-button type="success" @click="setDialogFormVisible(true)" size="medium">添加仓库</el-button>
        </header>
        <!-- 表格 -->
        <el-table
            :data="getSource"
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
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="handelLocationChange(scope.row)" type="text">修改地址</el-button>
                </template>
            </el-table-column>
        </el-table>
    </main>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("warehouseArea")
export default {
    name: "WarehouseTable",
    async created() {
        const { warehouseList } = await this.fetchSource()
        this.setSource(warehouseList)
    },
    computed: {
        ...mapGetters([
            "getSource"
        ])
    },
    methods: {
        ...mapMutations([
            "setSource", "setDialogFormVisible"
        ]),
        ...mapActions([
            "fetchSource"
        ]),
        // 处理修改地址
        handelLocationChange() {

        }
    }
}
</script>