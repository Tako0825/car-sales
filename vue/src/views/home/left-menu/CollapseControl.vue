<template>
    <!-- 折叠控件 -->
    <el-menu-item @click="$emit('toggleCollapse')" class="menu-controls">
        <i v-if="collapse" class="el-icon-s-unfold"></i>
        <i v-else class="el-icon-s-fold"></i>
        <span slot="title">展开/收起</span>
    </el-menu-item>
</template>

<script>
export default {
    name: "CollapseControl",
    props: [
        "collapse"
    ]
}
</script>

<style>
    .el-menu-item i {
        color: #72767c!important;
    }

    .is-active i {
        color: #a162f7!important;
    }
</style>