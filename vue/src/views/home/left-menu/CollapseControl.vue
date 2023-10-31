<template>
    <!-- 折叠控件 -->
    <el-menu-item @click="$emit('toggleCollapse')">
        <i v-if="collapse" class="el-icon-s-unfold"></i>
        <i v-else class="el-icon-s-fold"></i>
        <span slot="title">展开/收起</span>
    </el-menu-item>
</template>

<script>
export default {
    props: [
        "collapse"
    ]
}
</script>

<style>

</style>