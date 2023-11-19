<template>
    <el-row>
        <!-- 选项 -->
        <el-menu-item 
            v-for="(item,index) in home" 
            :key="index"
            :index="item.path"
        >
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
    </el-row>
</template>

<script>
import home from "@/routes/home.js"
export default {
    name: "MenuOptions",
    data() {
        return {
            home
        }
    }
}
</script>

<style>

</style>