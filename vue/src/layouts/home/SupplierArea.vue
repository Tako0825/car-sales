<template>
    <main>
        <SupplierTableVue/>
        <SupplierEditVue/>
        <SupplierFactoryVue/>
    </main>
</template>

<script>
import SupplierTableVue from '@/views/home/supplier-area/SupplierTable.vue'
import SupplierEditVue from '@/views/home/supplier-area/SupplierEdit.vue'
import SupplierFactoryVue from '@/views/home/supplier-area/SupplierFactory.vue'
export default {
    name: "SupplierArea",
    components: {
        SupplierTableVue, SupplierEditVue, SupplierFactoryVue
    }
}
</script>

<style>

</style>