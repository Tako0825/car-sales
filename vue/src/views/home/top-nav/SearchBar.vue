<template>
  <!-- 搜索栏 -->
  <main class="w-80">
    <el-input
      v-model="input"
      placeholder="敬请期待"
      maxlength="20"
      size="medium"
      disabled
    >
      <template slot="prepend"
        ><i class="el-icon-search transform scale-150"></i
      ></template>
    </el-input>
  </main>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style></style>
