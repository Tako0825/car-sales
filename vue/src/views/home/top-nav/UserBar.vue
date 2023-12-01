<template>
    <!-- 用户栏 -->
    <main class="flex gap-3 items-center">
        <!-- 收件箱 -->
        <router-link :to="{ name: 'notice' }">
            <el-button icon="el-icon-message" circle></el-button>
        </router-link>
        <!-- 我的头像 -->
        <el-dropdown @command="handleCommand" trigger="click">
            <img :src="getUser?.avatar" alt="我的头像" class="w-12 h-12 rounded-full object-cover align-middle">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="space">我的资料</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </main>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
    name: "UserBar",
    computed: {
        ...mapGetters([
            "getUser"
        ])
    },
    methods: {
        ...mapMutations([
            "clearUser"
        ]),
        // 处理下拉菜单的激活指令
        handleCommand(command) {
            switch(command) {
                case "logout": {
                    this.$confirm('你确定要退出登录吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: "warning"
                    }).then(() => {
                        // 1. 清除本地存储中的 token
                        localStorage.removeItem("token")
                        // 2. 清除 vuex 全局状态
                        this.clearUser()
                        // 3. 跳转至登录页面
                        this.$router.push("/login")
                    }).catch(() => {})
                    break
                }
                case "space": {
                    if(this.$route.name !== "space") {
                        this.$router.push({ name: "space" })
                    }
                    break
                }
                default: {
                    break
                }
            }
        }
    }
}
</script>

<style>

</style>