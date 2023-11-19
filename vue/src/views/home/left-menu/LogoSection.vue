<template>
    <!-- LOGO -->
    <main class="w-full h-24 pl-4 flex justify-start items-center">
        <img src="@/assets/icon/logo.png" alt="LOGO" class="w-8 h-8">
        <article 
            v-if="!collapse" 
            class="pl-1 whitespace-nowrap text-xl"
            style="color: #1f2128;"
        >{{ slogan }}</article>
    </main>
</template>

<script>
export default {
    name: "LogoSection",
    props: [
        "collapse"
    ],
    data() {
        return {
            slogan: "CarSale."
        }
    }
}
</script>

<style>

</style>