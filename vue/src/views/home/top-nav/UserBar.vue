<template>
    <!-- 用户栏 -->
    <main class="flex gap-6 items-center">
        <!-- 收件箱 -->
        <i class="el-icon-message transform scale-150"></i>
        <!-- 我的头像 -->
        <el-dropdown @command="handleCommand" trigger="click">
            <el-avatar :src="avatar" alt="我的头像"></el-avatar>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </main>
</template>

<script>
export default {
    name: "UserBar",
    async mounted() {
        const user = JSON.parse(localStorage.getItem("user"))
        this.avatar = user.avatar
    },
    data() {
        return {
            avatar: ""
        }
    },
    methods: {
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
                        // 2. 清除本地存储中的用户信息
                        localStorage.removeItem("user")
                        // 3. 跳转至登录页面
                        this.$router.push("/login")
                    }).catch(() => {})
                    break
                }
            }
        }
    }
}
</script>

<style>

</style>