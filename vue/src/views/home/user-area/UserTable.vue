<template>
<main class="relative flex flex-col items-center gap-6">   
    <!-- 用户列表 -->
    <el-table :data="getSource" v-if="getSource.length" v-loading="!dataReady"  class="rounded-xl font-bold w-full">
        <!-- 第 1 列: 头像 & 姓名 -->
        <el-table-column prop="username" label="头像和姓名">
            <template slot-scope="scope">
            <section class="flex gap-6 items-center">
                <el-avatar :src="scope.row.avatar"></el-avatar>
                <p>{{ scope.row.username }}</p>
            </section>
            </template>
        </el-table-column>
        <!-- 第 2 列: 电话 -->
        <el-table-column prop="phone" label="电话"></el-table-column>
        <!-- 第 3 列: 住址 -->
        <el-table-column prop="address" label="住址"></el-table-column>
        <!-- 第 4 列: 入职时间 -->
        <el-table-column>
            <template slot-scope="scope">
            <p>{{ new Date(scope.row.joined_date).toLocaleDateString() }}</p>
            </template>
        </el-table-column>
        <!-- 第 5 列: 查看 & 编辑 -->
        <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
                <el-button @click="handleDetail(scope.row)" type="text">详情</el-button>
                <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-empty description="" v-else class="bg-white w-full rounded-xl"></el-empty>

    <!-- 分页 -->
    <el-pagination
        layout="prev, pager, next"
        :current-page="getPage"
        @current-change="handleCurrentChange"
        :page-size="getPageSize"
        :total="getUserTotal"
    >
    </el-pagination>
</main>
</template>

<script>
import { sleep } from "@/util/sleep" 
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("userArea")
export default {
    async created() {
        const { userList, userTotal } = await this.fetchSource()
        this.setSource(userList)
        this.setUserTotal(userTotal)
        await sleep()
        this.dataReady = true
    },  
    data() {
        return {
            dataReady: false
        }
    },
    computed: {
        ...mapGetters([
            "getPage", "getPageSize", "getSource", "getUserTotal"
        ])
    },
    methods: {
        ...mapMutations([
            "setPage", "setPageSize", "setSource", "setUserTotal", "setDialogTableVisible", "setDialogFormVisible"
        ]),
        ...mapActions([
            "fetchSource"
        ]),
        async handleCurrentChange(newPage) {
            this.dataReady = false
            this.setPage(newPage)
            const { userList: source, userTotal } = await this.fetchSource()
            this.setSource(source)
            this.setUserTotal(userTotal)
            await sleep()
            this.dataReady = true
        },
        handleDetail(user) {
            console.log(user);
            this.setDialogTableVisible(true)
        },
        handleEdit(user) {
            console.log(user);
            this.setDialogFormVisible(true)
        }
    }
}
</script>

<style>

</style>