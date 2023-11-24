<template>
    <main class="relative w-full h-auto">
        <article class="w-full h-auto absolute top-0 left-0 flex flex-col items-center gap-4 pb-12">
            <!-- 用户列表 -->
            <el-table 
                header-cell-class-name="text-black" 
                :data="getSource" 
                v-if="getSource" 
                v-loading="!getDataReady" 
                class="rounded-xl font-bold" 
                style="width: 100%;" 
                highlight-current-row 
                @current-change="handleSelectedUser" 
            >
                <!-- 第 1 列: 用户(头像 & 姓名) -->
                <el-table-column prop="username" fixed label="用户" min-width="150">
                    <template slot-scope="scope">
                    <section class="flex gap-6 items-center">
                        <el-avatar :src="scope.row.avatar"></el-avatar>
                        <p>{{ scope.row.username }}</p>
                    </section>
                    </template>
                </el-table-column>
                <!-- 第 2 列: 电话 -->
                <el-table-column prop="phone" label="电话" min-width="150"></el-table-column>
                <!-- 第 2 列: 电话 -->
                <el-table-column label="职位">
                    <template slot-scope="scope">
                        <p v-if="scope.row.role === 'ADMIN'">管理员</p>
                        <p v-else-if="scope.row.role === 'USER'">职员</p>
                        <p v-else-if="scope.row.role === 'ROOT'">超级管理</p>
                    </template>
                </el-table-column>
                <!-- 第 3 列: 家庭住址 -->
                <el-table-column prop="address" label="住址"  min-width="300"></el-table-column>
                <!-- 第 4 列: 入职日期 -->
                <el-table-column label="入职日期"  min-width="120">
                    <template slot-scope="scope">
                        <p>{{ new Date(scope.row.joined_date).toLocaleDateString() }}</p>
                    </template>
                </el-table-column>
                <!-- 第 5 列: 其他操作(详情 & 编辑) -->
                <el-table-column fixed="right" label="其他操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleDetail(scope.row)" type="text">详情</el-button>
                        <el-button v-if="['ROOT'].includes($store.getters.getUser?.role)" @click="handleEdit(scope.row)" type="text">编辑</el-button>
                        <el-popconfirm
                            v-if="['ROOT'].includes($store.getters.getUser?.role)"
                            confirm-button-text='确 定'
                            confirm-button-type="danger"
                            cancel-button-text='取 消'
                            icon="el-icon-info"
                            icon-color="#ff7d89"
                            title="确定删除该员工吗？"
                            @confirm="handleDeleteUser(scope.row.id)"
                            class="ml-2"
                        >
                            <el-button 
                                slot="reference" 
                                v-show="scope.row.id===getSelectedId" 
                                type="text"
                                :style="{ 'color': '#ff6370' }"
                                class="transition duration-1000"
                            >删除</el-button>
                        </el-popconfirm>
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
                :total="getUserTotal"
            ></el-pagination>
        </article>
    </main>
</template>

<script>
import { sleep } from "@/util/sleep" 
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("userArea")
export default {
    name: "UserTable",
    async created() {
        this.setDataReady(false)
        const { userList, userTotal } = await this.fetchSource()
        this.setSource(userList)
        this.setUserTotal(userTotal)
        await sleep()
        this.setDataReady(true)
    },  
    computed: {
        ...mapGetters([
            "getUser", "getSource", "getDataReady", "getUserDetail", "getSelectedId", "getPage", "getPageSize", "getUserTotal"
        ])
    },
    methods: {
        ...mapMutations([
            "setUser", "setPage", "setPageSize", "setSource", "setUserTotal", "setDialogTableVisible", "setDialogFormVisible", "setRegisterFormVisible", "setDataReady", "setUserDetail", "setSelectedId"
        ]),
        ...mapActions([
            "fetchSource", "fetchUser", "deleteUser", "fetchUserDetail"
        ]),
        // 处理用户详情
        async handleDetail({ id }) {
            this.setUserDetail(await this.fetchUserDetail(id))
            this.setDialogTableVisible(true)
        },
        // 处理用户编辑
        async handleEdit({ id }) {
            const user = await this.fetchUser(id)
            this.setUser(user)
            this.setDialogFormVisible(true)
        },
        // 处理选中的用户
        handleSelectedUser(value) {
            if (value?.id) {
                this.setSelectedId(value.id)
            }
        },
        // 处理删除用户
        async handleDeleteUser(id) {
            await this.deleteUser(id)
            this.setSelectedId(null)
            this.setDataReady(false)
            const { userList } = await this.fetchSource()
            this.setSource(userList)
            await sleep()
            this.setDataReady(true)
        },
        // 处理页数切换
        async handleCurrentChange(newPage) {
            this.setSelectedId(null)
            this.setDataReady(false)
            this.setPage(newPage)
            const { userList } = await this.fetchSource()
            this.setSource(userList)
            await sleep()
            this.setDataReady(true)
        },
    }
}
</script>

<style>

</style>