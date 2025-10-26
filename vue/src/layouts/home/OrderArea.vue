<template>
  <main class="w-full h-auto flex flex-col items-center gap-6">
    <!-- 头部 -->
    <header class="w-full flex justify-between">
      <h1 class="text-2xl font-bold">订单管理</h1>
      <el-button type="success" @click="setDialogFormVisible(true)" size="small"
        >添加订单</el-button
      >
    </header>
    <!-- 订单列表 -->
    <OrderTableVue />
    <!-- 添加仓库 -->
    <OrderFactory />
  </main>
</template>

<script>
import OrderTableVue from "@/views/home/order-area/OrderTable.vue";
import OrderFactory from "@/views/home/order-area/OrderFactory.vue";
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("orderArea");
export default {
  name: "OrderArea",
  components: { OrderTableVue, OrderFactory },
  methods: {
    ...mapMutations(["setDialogFormVisible"]),
  },
};
</script>

<style></style>
