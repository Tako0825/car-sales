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
                    width="150"
                ></el-table-column>
                <!-- 编辑 -->
                <el-table-column v-if="['ADMIN'].includes($store.getters.getUser.role)" fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="text">修改</el-button>
                        <el-button @click="handleSupplierDelete(scope.row)" type="text">删除</el-button>
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
                :total="getSupplierTotal"
            ></el-pagination>
        </article>
    </main>
</template>

<script>
import { sleep } from "@/util/sleep"
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("supplierArea")
export default {
    name: "SupplierTable",
    async created() {
        this.setDataReady(false)
        const { supplierList } = await this.fetchSource()
        this.setSource(supplierList)
        await sleep()
        this.setDataReady(true)
    },
    computed: {
        ...mapGetters([
            "getSource", "getDataReady", "getPage", "getPageSize", "getSupplierTotal"
        ])
    },
    methods: {
        ...mapMutations([
            "setSource", "setDialogFormVisible", "setDataReady", "setSupplier", "setDialogEditVisible", "setPage"
        ]),
        ...mapActions([
            "fetchSource", "deleteSupplier", "fetchSupplier"
        ]),
        // 处理修改
        async handleEdit({ id }) {
            const supplier = await this.fetchSupplier(id)
            this.setSupplier(supplier)
            this.setDialogEditVisible(true)
        },
        // 处理删除供应商
        async handleSupplierDelete({ id }) {
            this.$confirm('此操作将永久删除该供应商, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(async () => {
                await this.deleteSupplier(id)
                this.setDataReady(false)
                const { supplierList } = await this.fetchSource()
                this.setSource(supplierList)
                await sleep()
                this.setDataReady(true)
            }).catch(() => {})
        },
        // 处理页数切换
        async handleCurrentChange(newPage) {
            this.setDataReady(false)
            this.setPage(newPage)
            const { supplierList } = await this.fetchSource()
            this.setSource(supplierList)
            await sleep()
            this.setDataReady(true)
        }
    }
}
</script>