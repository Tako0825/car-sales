<template>
    <main class="flex flex-col gap-6">
        <!-- 头部 -->
        <header class="w-full flex justify-between">
            <h1 class="text-2xl font-bold">供应商总览</h1>
            <el-button type="success" @click="setDialogFormVisible(true)" size="medium">添加供应商</el-button>
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
                prop="company"
                label="公司"
            ></el-table-column>
            <el-table-column
                prop="phone"
                label="联系电话"
                width="150"
            ></el-table-column>
            <el-table-column
                prop="name"
                label="联系人"
                width="100"
            ></el-table-column>
            <!-- 编辑 -->
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text">修改</el-button>
                    <el-button @click="handleSupplierDelete(scope.row)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </main>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("supplierArea")
export default {
    name: "SupplierTable",
    async created() {
        const { supplierList } = await this.fetchSource()
        this.setSource(supplierList)
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

        },
        // 处理删除供应商
        handleSupplierDelete() {

        }
    }
}
</script>