<template>
    <main class="flex flex-col gap-6 transform scale-105">
        <section class="w-full h-auto relative">
            <input type="text" placeholder="enter your phone number" class="w-full h-auto p-3 border-2 border-solid border-gray-400 rounded-md font-bold text-lg">
            <span class="text-xs font-bold absolute top-0 left-4 transform -translate-y-1/2 bg-white text-gray-400 px-2">用户名</span>
        </section>
        <section class="w-full h-auto relative">
            <input type="password" placeholder="enter your password" class="w-full h-auto p-3 border-2 border-solid border-gray-400 rounded-md font-bold text-lg">
            <span class="text-xs font-bold absolute top-0 left-4 transform -translate-y-1/2 bg-white text-gray-400 px-2">密&nbsp;&nbsp;&nbsp;码</span>
        </section>
        <el-button class="login-button" type="primary" icon="el-icon-right">登 录</el-button>
    </main>
</template>

<script>
export default {
    name: "LoginForm"
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