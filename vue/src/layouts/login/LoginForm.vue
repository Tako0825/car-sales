<template>
    <main class="flex flex-col gap-6 transform">
        <section class="w-full h-auto relative">
            <input type="text" v-model="phone" placeholder="enter your phone number" class="w-full h-auto p-3 border-2 border-solid border-gray-400 rounded-md font-bold text-md">
            <span class="text-xs font-bold absolute top-0 left-4 transform -translate-y-1/2 bg-white text-gray-400 px-2">用户名</span>
        </section>
        <section class="w-full h-auto relative">
            <input type="password" v-model="password" placeholder="enter your password" class="w-full h-auto p-3 border-2 border-solid border-gray-400 rounded-md font-bold text-md">
            <span class="text-xs font-bold absolute top-0 left-4 transform -translate-y-1/2 bg-white text-gray-400 px-2">密&nbsp;&nbsp;&nbsp;码</span>
        </section>
        <el-button v-loading.fullscreen="!dataReady" :disabled="!dataReady" @click="login" class="login-button" type="primary" icon="el-icon-right">登 录</el-button>
    </main>
</template>

<script>
import api from '@/api/api'
import { sleep } from '@/util/sleep'

export default {
    name: "LoginForm",
    data() {
        return {
            phone: "",
            password: "",
            dataReady: true
        }
    },
    methods: {
        async login() {
            // 手机号 & 密码
            const phone = this.phone
            const password = this.password
            this.dataReady = false
            // 加载动画
            await sleep(500)
            // 表单验证验证规则
            if(!phone || !password) {
                return this.$notify.error({
                    title: '手机号/密码不允许为空',
                })
            }
            // 请求登录接口-表单验证
            const response = await api.post(`/api/auth/login`, { phone, password })
            const token = response.token
            if(token) {
                // 1. token本地存储
                const token = response.token
                localStorage.setItem("token", token)
                // 2. 跳转路由至工作台
                this.$router.push('/');
            }
            this.dataReady = true
        },
        async removeForm() {
            this.phone = ''
            this.password = ''
        } 
    }
}
</script>

<style scoped>
    /* 输入框聚焦时, 相应的 label 字体颜色变黑 */
    section:focus-within span {
        color: #000;
    }

    .login-button {
        font-weight: bold;
        padding: 1.25rem;
        font-size: 1rem;
    }
</style>