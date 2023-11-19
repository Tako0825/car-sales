<template>
    <!-- 搜索栏 -->
    <main class="w-80">
        <el-input 
            v-model="input" 
            placeholder="You can search here" 
            maxlength="20"
            size="medium"
        >
            <template slot="prepend"><i class="el-icon-search transform scale-150"></i></template>
        </el-input>
    </main>
</template>

<script>
export default {
    name: "SearchBar",
    data() {
        return {
            input: ""
        }
    }
}
</script>

<style>

</style>