<template>
  <main class="w-full h-full px-24 overflow-hidden flex bg-white">
    <!-- 左半部分 -->
    <aside class="w-5/12 h-full flex flex-col justify-center items-center" style="background-color: #a162f7;">
      <el-image :src="'http://cdn.tako.top/CarSale%20Poster.png'" fit="cover" class="transform -translate-y-20"></el-image>
    </aside>
    <!-- 右半部分 -->
    <article class="w-7/12 h-auto flex flex-col gap-16 justify-center items-center transform -translate-y-12">
      <!-- 头部 -->
      <header class="flex flex-col gap-4 items-center">
        <section class="flex gap-2 items-center">
          <!-- LOGO -->
          <img src="@/assets/icon/logo.png" alt="LOGO" class="w-16 h-16">
          <!-- 系统名称 -->
          <h1 class="font-bold text-3xl">{{ title }}</h1>
        </section>
        <!-- 系统描述 -->
        <span class="fonr-bold text-2xl">{{ introduce }}</span>
      </header>
      <!-- 登录表单 -->
      <LoginForm class="w-96 h-auto rounded-lg"/>
    </article>
  </main>
</template>

<script>
import LoginForm from "./LoginForm"
export default {
  name: "LoginPage",
  components: { LoginForm },
  data() {
    return {
      title: "Car Sale",
      introduce: "汽车销售管理平台"
    }
  }
}
</script>

<style>

</style>