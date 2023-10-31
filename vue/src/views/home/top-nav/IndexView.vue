<template>
    <!-- 顶部导航 -->
    <div class="w-full h-16 px-8 bg-white flex justify-between items-center">
        <!-- 搜索框 -->
        <div class="w-80">
            <el-input 
                v-model="input" 
                placeholder="Searching for car" 
                maxlength="20"
                size="medium"
            >
                <template slot="prepend"><i class="el-icon-search transform scale-150"></i></template>
            </el-input>
        </div>
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
    </div>
</template>

<script>
import avatar from "@/assets/avatar/wechat.jpg"
export default {
    name: "TopNav",
    data() {
        return {
            input: "",
            avatar
        }
    }
}
</script>

<style>

</style>