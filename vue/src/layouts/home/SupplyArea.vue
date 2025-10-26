<template>
  <main class="w-full h-auto flex flex-col items-center gap-6">
    <!-- 头部 -->
    <header class="w-full flex justify-between">
      <h1 class="text-2xl font-bold">供应记录</h1>
      <el-button type="success" @click="setDialogFormVisible(true)" size="small"
        >添加供应记录</el-button
      >
    </header>
    <SupplyTableVue />
    <!-- 添加供应记录 -->
    <SupplyFactory />
  </main>
</template>

<script>
import SupplyTableVue from "@/views/home/supply-area/SupplyTable.vue";
import SupplyFactory from "@/views/home/supply-area/SupplyFactory.vue";
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("supplyArea");
export default {
  name: "SupplyArea",
  components: {
    SupplyTableVue,
    SupplyFactory,
  },
  methods: {
    ...mapMutations(["setDialogFormVisible"]),
  },
};
</script>

<style></style>
