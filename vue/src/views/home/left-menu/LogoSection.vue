<template>
    <!-- LOGO -->
    <el-row class="w-full h-24 pl-4 flex justify-start items-center">
        <img src="@/assets/icon/logo.png" alt="系统LOGO" class="w-8 h-8">
        <span v-if="!collapse" class="pl-1 whitespace-nowrap">Car Sale.</span>
    </el-row>
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