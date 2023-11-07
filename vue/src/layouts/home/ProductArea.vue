<template>
  <main class="w-full h-auto">
    <header class="w-full h-auto text-2xl font-bold pb-8">汽车总览</header>
    <article class="w-full h-auto grid grid-cols-3 grid-flow-row gap-4">
      <ProductCardVue v-for="(item, index) in 10" :key="index" class="aspect rounded-xl bg-white"/>
    </article>
  </main>
</template>

<script>
import ProductCardVue from '@/views/home/product-area/ProductCard.vue'
export default {
  name: "ProductArea",
  components: {
    ProductCardVue
  }
}
</script>

<style scoped>
  .aspect {
    aspect-ratio: 4/3;
  }
</style>