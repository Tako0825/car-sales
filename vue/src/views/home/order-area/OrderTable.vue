<template>
    <main class="w-full flex flex-col gap-6">
        <!-- 头部 -->
        <header class="w-full flex justify-between">
            <h1 class="text-2xl font-bold">订单管理</h1>
            <el-button type="success" @click="setDialogFormVisible(true)" size="medium">添加订单</el-button>
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
                label="订单号"
                width="80"
            ></el-table-column>
            <el-table-column
                prop="brand"
                label="品牌"
            ></el-table-column>
            <el-table-column
                prop="model"
                label="型号"
            ></el-table-column>
            <el-table-column
                prop="user"
                label="负责人"
            ></el-table-column>
            <el-table-column
                prop="phone"
                label="负责人电话"
            ></el-table-column>
            <el-table-column
                prop="warehouse"
                label="来源仓库"
            ></el-table-column>
            <el-table-column
                prop="createtime"
                label="交易时间"
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
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("orderArea")
export default {
    name: "OrderTable",
    async created() {
        const { orderList } = await this.fetchSource()
        this.setSource(orderList)
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