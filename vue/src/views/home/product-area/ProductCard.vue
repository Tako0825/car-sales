<template>
    <main @click="handleDetail" class="root p-4 flex flex-col font-bold select-none transition duration-500 hover:bg-purple-400 hover:text-white">
        <!-- 品牌 & 型号 -->
        <h1 class="text-lg">{{ product.model }}</h1>
        <p style="color: #a162f7;">{{ product.name }}</p>
        <el-image
            class="w-full flex-1"
            :src="images[Math.floor(Math.random() * (images.length))]"
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
        <el-button class="delete" @click.stop="deleteProduct">删除</el-button>
    </main>
</template>

<script>
import image1 from "@/assets/product/product01.png"
import image2 from "@/assets/product/product02.png"
import image3 from "@/assets/product/product03.png"
import image4 from "@/assets/product/product04.png"
import image5 from "@/assets/product/product05.png"
import image6 from "@/assets/product/product06.png"
import image7 from "@/assets/product/product07.png"
import image8 from "@/assets/product/product08.png"
import image9 from "@/assets/product/product09.png"
import image10 from "@/assets/product/product10.png"
import image11 from "@/assets/product/product11.png"
import image12 from "@/assets/product/product12.png"
import image13 from "@/assets/product/product13.png"
import image14 from "@/assets/product/product14.png"
import image15 from "@/assets/product/product15.png"
import image16 from "@/assets/product/product16.png"
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapActions } = createNamespacedHelpers("productArea")
export default {
    name: "ProductCard",
    props: [
        "product", "isSeleted"
    ],
    data() {
        return {
            images: [
                image1,
                image2,
                image3,
                image4,
                image5,
                image6,
                image7,
                image8,
                image9,
                image10,
                image11,
                image12,
                image13,
                image14,
                image15,
                image16,
            ]
        }
    },
    methods: {
        ...mapMutations([
            "setDialogTableVisible", "setProduct"
        ]),
        ...mapActions([
            "fetchSource", "fetchProduct"
        ]),
        // 处理产品详情
        async handleDetail() {
            const { id } = this.product
            const { product } = await this.fetchProduct(id)
            this.setProduct(product)
            this.setDialogTableVisible(true)
        },
        // 处理删除产品
        deleteProduct() {
            console.log("@");
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