<template>
  <!-- 产品详情 -->
  <el-drawer
    title="产品详情"
    @open="handleDetail"
    :visible.sync="drawer"
    direction="ltr"
    size="800px"
  >
    <main
      v-if="getProduct"
      v-loading="!getProduct"
      class="w-full h-full flex p-6 gap-8 bg-gray-100 overflow-hidden"
    >
      <!-- 左半部分 -->
      <article
        class="flex flex-col gap-4 flex-1 h-5/6 p-8 rounded-xl relative text-gray-100"
        style="background-color: #a78bfa"
      >
        <!-- 名称 & 型号 & 售价 & 简介 -->
        <div class="flex justify-between">
          <h1>名称:</h1>
          <p class="text-white font-bold text-xl w-5/6 text-right">
            {{ getProduct.name }}
          </p>
        </div>
        <div class="flex justify-between">
          <h1 class="whitespace-nowrap">型号:</h1>
          <p class="text-white font-bold text-xl w-5/6 text-right">
            {{ getProduct.model }}
          </p>
        </div>
        <div class="flex justify-between">
          <h1 class="whitespace-nowrap">售价:</h1>
          <p class="text-white font-bold text-xl w-5/6 text-right">
            <span class="px-4 text-red-500 text-2xl italic"
              >￥{{ getProduct.price }}</span
            >万起
          </p>
        </div>
        <h1>简介:</h1>
        <p
          class="h-80 overflow-auto italic font-bold text-xl text-white"
          style="text-indent: 2em"
        >
          {{ getProduct.introduce }}
        </p>
        <!-- 产品图 -->
        <section
          class="w-full h-48 my-6 absolute left-0 bottom-0 transform translate-y-2/3 scale-125"
        >
          <el-image
            v-if="getProduct"
            :src="getProduct?.poster"
            fit="cover"
            class="w-full h-full"
          ></el-image>
        </section>
      </article>
      <!-- 右半部分 -->
      <aside class="flex-1 flex flex-col gap-6">
        <PieChart
          :title="'库存剩余情况'"
          :source="getChartSource?.pie"
          class="w-full flex-1 bg-white rounded-xl"
        />
        <GradientBarChart
          :title="'历史销售情况'"
          :source="getChartSource"
          class="w-full flex-1 bg-white rounded-xl"
        />
      </aside>
    </main>
  </el-drawer>
</template>

<script>
import PieChart from "./PieChart.vue";
import GradientBarChart from "./GradientBarChart.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations, mapActions } =
  createNamespacedHelpers("productArea");
export default {
  name: "ProductDetail",
  components: { PieChart, GradientBarChart },
  computed: {
    ...mapGetters(["getDrawer", "getProduct", "getChartSource"]),
    drawer: {
      get() {
        return this.getDrawer;
      },
      set(newValue) {
        this.setDrawer(newValue);
      },
    },
  },
  methods: {
    ...mapMutations(["setDrawer", "setChartSource"]),
    ...mapActions(["fetchProduct"]),
    // 处理打开抽屉
    async handleDetail() {
      const { id } = this.getProduct;
      this.setChartSource(await this.fetchProduct(id));
    },
  },
};
</script>

<style></style>
