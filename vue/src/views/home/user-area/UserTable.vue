<template>
<main class="relative w-full flex flex-col items-center gap-6">   
    <!-- 用户列表 -->
    <el-table 
        header-cell-class-name="text-black" 
        :data="getSource" 
        v-if="getSource.length" 
        v-loading="!getDataReady" 
        class="rounded-xl font-bold"
        style="width: 99%;"
        highlight-current-row
        @current-change="handleSelectedUser"
    >
        <!-- 第 1 列: 用户(头像 & 姓名) -->
        <el-table-column prop="username" label="用户" min-width="150">
            <template slot-scope="scope">
            <section class="flex gap-6 items-center">
                <el-avatar :src="scope.row.avatar"></el-avatar>
                <p>{{ scope.row.username }}</p>
            </section>
            </template>
        </el-table-column>
        <!-- 第 2 列: 电话 -->
        <el-table-column prop="phone" label="电话" min-width="120"></el-table-column>
        <!-- 第 3 列: 家庭住址 -->
        <el-table-column prop="address" label="住址"  min-width="200"></el-table-column>
        <!-- 第 4 列: 入职日期 -->
        <el-table-column label="入职日期"  min-width="120">
            <template slot-scope="scope">
            <p>{{ new Date(scope.row.joined_date).toLocaleDateString() }}</p>
            </template>
        </el-table-column>
        <!-- 第 5 列: 其他操作(详情 & 编辑) -->
        <el-table-column fixed="right" label="其他操作" min-width="120">
            <template slot-scope="scope">
                <el-button @click="handleDetail(scope.row)" type="text">详情</el-button>
                <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
                <span class="ml-2">
                    <el-popconfirm
                        confirm-button-text='确 定'
                        confirm-button-type="danger"
                        cancel-button-text='取 消'
                        icon="el-icon-info"
                        icon-color="#ff7d89"
                        title="确定删除该员工吗？"
                        @confirm="handleDeleteUser(scope.row.id)"
                    >
                        <el-button 
                            slot="reference" 
                            v-show="scope.row.id===selectedId" 
                            type="text"
                            :style="{ 'color': '#ff6370' }"
                            class="transition duration-1000"
                        >删除</el-button>
                    </el-popconfirm>
                </span>
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
        :hide-on-single-page="true"
    ></el-pagination>
</main>
</template>

<script>
import { sleep } from "@/util/sleep" 
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("userArea")
export default {
    data() {
        return {
            selectedId: null
        }
    },
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
            "getUser", "getPage", "getPageSize", "getSource", "getUserTotal", "getDataReady", "getUserDetail"
        ])
    },
    methods: {
        ...mapMutations([
            "setUser", "setPage", "setPageSize", "setSource", "setUserTotal", "setDialogTableVisible", "setDialogFormVisible", "setRegisterFormVisible", "setDataReady", "setUserDetail"
        ]),
        ...mapActions([
            "fetchSource", "fetchUser", "deleteUser", "fetchUserDetail"
        ]),
        // 处理页数切换
        async handleCurrentChange(newPage) {
            this.selectedId = null
            this.setDataReady(false)
            this.setPage(newPage)
            const { userList } = await this.fetchSource()
            this.setSource(userList)
            await sleep()
            this.setDataReady(true)
        },
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
                this.selectedId = value.id
            }
        },
        // 处理删除用户
        async handleDeleteUser(id) {
            await this.deleteUser(id)
            this.selectedId = null
            this.setDataReady(false)
            const { userList } = await this.fetchSource()
            this.setSource(userList)
            await sleep()
            this.setDataReady(true)
        }
    }
}
</script>

<style>

</style>