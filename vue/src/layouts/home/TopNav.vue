<template>
    <!-- 顶部导航 -->
    <main>
        <!-- 搜索栏 -->
        <SearchBarVue/>
        <!-- 用户栏 -->
        <UserBarVue/>
    </main>
</template>

<script>
import SearchBarVue from '@/views/home/top-nav/SearchBar.vue'
import UserBarVue from '@/views/home/top-nav/UserBar.vue'
export default {
    name: "TopNav",
    components: {
        SearchBarVue, UserBarVue
    }
}
</script>

<style>

</style>