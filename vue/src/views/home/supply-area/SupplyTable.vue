<template>
    <main class="flex flex-col gap-6">
        <!-- 头部 -->
        <header class="w-full flex justify-between">
            <h1 class="text-2xl font-bold">供应记录</h1>
            <el-button type="success" @click="setDialogFormVisible(true)" size="medium">添加供应记录</el-button>
        </header>
        <!-- 表格 -->
        <el-table
            :data="getSource"
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
                prop="supplier"
                label="供应商"
            ></el-table-column>
            <el-table-column
                prop="brand"
                label="品牌"
                width="80"
            ></el-table-column>
            <el-table-column
                prop="model"
                label="型号"
                width="100"
            ></el-table-column>
            <el-table-column
                prop="warehouse"
                label="仓库"
            ></el-table-column>
            <el-table-column
                prop="quantity"
                label="供应数量"
                width="100"
            ></el-table-column>
            <!-- 编辑 -->
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </main>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("supplyArea")
export default {
    name: "SupplyTable",
    async created() {
        const { supplyList } = await this.fetchSource()
        this.setSource(supplyList)
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
        // 处理修改
        handleEdit() {

        }
    }
}
</script>