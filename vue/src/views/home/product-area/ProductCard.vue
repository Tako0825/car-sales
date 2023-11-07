<template>
    <main class="p-4 flex flex-col font-bold select-none">
        <h1 class="text-lg">{{ product.model }}</h1>
        <p class="text-gray-500">{{ product.name }}</p>
        <el-image
            class="w-full flex-1"
            :src="image"
            fit="cover"
        ></el-image>
        <section class="flex justify-between">
            <span>
                <i class="el-icon-goods"></i>
                <span>{{ product.sales }}</span>
            </span>
            <span>{{ product.price }}</span>
        </section>
    </main>
</template>

<script>
import image from "@/assets/product/product05.png"
export default {
    data() {
        return {
            image,
            product: {
                id: '',
                name: 'Porshe',
                model: '718 Cayman S',
                sales: 20,
                price: 400,
            }
        }
    }
}
</script>

<style>

</style>