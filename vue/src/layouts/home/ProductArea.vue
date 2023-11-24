<template>
  <main class="w-full h-auto flex flex-col items-center gap-6">
    <!-- 头部 -->
    <header class="w-full flex justify-between">
      <h1 class="text-2xl font-bold">汽车总览</h1>
      <el-button 
        v-if="['ADMIN', 'ROOT'].includes($store.getters.getUser?.role)" 
        type="success" 
        @click="setDialogFormVisible(true)" 
        size="small"
      >添加产品</el-button>
    </header>
    <!-- 汽车列表 -->
    <article v-if="getSource" v-loading="!getDataReady" class="w-full h-auto grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  grid-flow-row gap-4">
      <!-- 遍历汽车卡片 -->
      <ProductCard
        v-for="(product, index) in getSource" 
        :key="index"
        :product="product"
        class="aspect rounded-xl bg-white cursor-pointer"
      />
    </article>
    <!-- 空状态 -->
    <el-empty description="" v-else class="bg-white w-full h-96 rounded-xl"></el-empty>
    <!-- 分页 -->
    <el-pagination
        layout="prev, pager, next"
        :current-page="getPage"
        @current-change="handleCurrentChange"
        :page-size="getPageSize"
        :total="getProductTotal"
        :hide-on-single-page="true"
    ></el-pagination>
    <!-- 产品详情 -->
    <ProductDetail/>
    <!-- 表单 - 用于添加产品 -->
    <ProductFactory/>
  </main>
</template>

<script>
import { sleep } from '@/util/sleep'
import ProductCard from '@/views/home/product-area/ProductCard.vue'
import ProductFactory from '@/views/home/product-area/ProductFactory.vue'
import ProductDetail from '@/views/home/product-area/ProductDetail.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("productArea")
export default {
  name: "ProductArea",
  components: {
    ProductCard, ProductFactory, ProductDetail
  },
  async created() {
    this.setDataReady(false)
    const { source } = await this.fetchSource()
    this.setSource(source)
    await sleep()
    this.setDataReady(true)
  },
  computed: {
    ...mapGetters([
      "getSource", "getPage", "getPageSize", "getProductTotal", "getDataReady"
    ])
  },
  methods: {
    ...mapMutations([
      "setSource", "setPage", "setDataReady", "setDialogFormVisible"
    ]),
    ...mapActions([
      "fetchSource"
    ]),
    // 处理页数切换
    async handleCurrentChange(newPage) {
      this.setDataReady(false)
      this.setPage(newPage)
      const { source } = await this.fetchSource()
      this.setSource(source)
      await sleep()
      this.setDataReady(true)
    }
  }
}
</script>

<style scoped>
  .aspect {
    aspect-ratio: 4/3;
  }
</style>