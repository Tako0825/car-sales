<template>
    <!-- 顶部导航 -->
    <div class="w-full h-16 px-8 bg-white flex justify-between items-center select-none">
        <!-- 搜索栏 -->
        <SearchBarVue/>
        <!-- 用户栏 -->
        <UserBarVue/>
    </div>
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