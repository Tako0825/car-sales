<template>
  <main class="w-full h-auto">
    <header class="w-full h-auto text-2xl font-bold pb-8">汽车总览</header>
    <article class="w-full h-auto grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-4">
      <ProductCard 
        v-for="(product, index) in getSource" 
        :key="index" 
        :product="product"
        class="aspect rounded-xl bg-white cursor-pointer transition duration-500 hover:bg-purple-400 hover:text-white"
      />
    </article>
  </main>
</template>

<script>
import ProductCard from '@/views/home/product-area/ProductCard.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("productArea")
export default {
  name: "ProductArea",
  async created() {
    const { source } = await this.fetchSource()
    this.setSource(source)
  },  
  components: {
    ProductCard
  },
  computed: {
    ...mapGetters([
      "getSource"
    ])
  },
  methods: {
    ...mapMutations([
      "setSource"
    ]),
    ...mapActions([
      "fetchSource"
    ])
  }
}
</script>

<style scoped>
  .aspect {
    aspect-ratio: 4/3;
  }
</style>