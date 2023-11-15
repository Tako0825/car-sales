<template>
    <main @click="handleDetail" class="root p-4 flex flex-col font-bold select-none transition duration-200 hover:bg-purple-400 hover:text-white">
        <!-- 品牌 & 型号 -->
        <h1 class="text-lg">{{ product.model }}</h1>
        <p style="color: #a162f7;">{{ product.name }}</p>
        <el-image
            class="w-full flex-1"
            :src="product.poster"
            fit="cover"
        >
            <!-- 加载图片失败 -->
            <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
            </div>
        </el-image>
        <section class="flex justify-between items-center">
            <!-- 销量 -->
            <span class="flex items-center gap-1">
                <i class="el-icon-goods" style="color: #a162f7; font-size: 30px;"></i>
                <span class="text-sm">已售出: {{ product.sales }}</span>
            </span>
            <!-- 售价 -->
            <span>￥{{ product.price }}万</span>
        </section>
        <i class="delete el-icon-error text-gray-700 text-2xl " @click.stop="handleDelete(product.id)"></i>
    </main>
</template>

<script>
import { sleep } from "@/util/sleep"
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapActions } = createNamespacedHelpers("productArea")
export default {
    name: "ProductCard",
    props: [
        "product", "isSeleted"
    ],
    methods: {
        ...mapMutations([
            "setDrawer", "setProduct", "setDataReady", "setSource"
        ]),
        ...mapActions([
            "fetchSource", "fetchProduct", "deleteProduct"
        ]),
        // 处理产品详情
        async handleDetail() {
            const { id } = this.product
            const { product } = await this.fetchProduct(id)
            this.setProduct(product)
            this.setDrawer(true)
        },
        // 处理删除产品
        async handleDelete(id) {
            this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(async () => {
                // 点击确定删除后...
                await this.deleteProduct(id)
                this.setDataReady(false)
                const { source } = await this.fetchSource()
                this.setSource(source)
                await sleep()
                this.setDataReady(true)
            }).catch(() => {})
        }
    }
}
</script>

<style scoped>
    .root {
        position: relative;
    }
    .root:hover .delete {
        visibility: visible;
    }
    .delete {
        visibility: hidden;
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>