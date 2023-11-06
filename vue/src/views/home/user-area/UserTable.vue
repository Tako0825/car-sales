<template>
<main class="relative flex flex-col items-center gap-6">    
    <el-table :data="source" v-loading="!dataReady"  class="rounded-xl font-bold w-full">
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
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
        </template>
    </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
    v-if="dataReady"
    layout="prev, pager, next"
    :current-page="page"
    @current-change="handleCurrentChange"
    :page-size="pageSize"
    :total="userTotal"
    >
    </el-pagination>
</main>
</template>

<script>
import api from '@/api/api';

export default {
    async created() {
        await this.httpGetUser(this.page, this.pageSize)
        this.dataReady = true
    },  
    data() {
        return {
            dataReady: false,
            source: new Array(),
            page: 1,
            pageSize: 15,
            userTotal: 0,
        }
    },
    methods: {
        handleCurrentChange(newValue) {
        this.page = newValue
        this.httpGetUser(newValue, this.pageSize)
        },
        async httpGetUser(page, pageSize) {
        this.dataReady = false
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxMjM0NTY3ODkwMCIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5MjQwMjk4LCJleHAiOjE3MDE4MzIyOTh9.OK9p2QDdpmV1up-kBBDXfHs51aBOLgGyX4bO-NnzGkg"
        const { userList, userTotal } = await api.get(`/api/user?page=${page}&pageSize=${pageSize}`, { token })
        this.userTotal = userTotal
        this.source = userList
        this.dataReady = true
        }
    }
}
</script>

<style>

</style>