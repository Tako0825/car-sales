<template>
    <!-- 用户栏 -->
    <div class="flex gap-6 items-center">
        <!-- 收件箱 -->
        <i class="el-icon-message transform scale-150"></i>
        <!-- 我的头像 -->
        <img 
            :src="avatar"
            alt="我的头像"
            class="w-11 h-11 rounded-md object-cover"
        >
    </div>
</template>

<script>
import avatar from "@/assets/avatar/wechat.jpg"
export default {
    data() {
        return {
            avatar
        }
    }
}
</script>

<style>

</style>