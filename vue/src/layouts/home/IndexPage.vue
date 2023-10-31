<template>
  <div class="content w-full h-full overflow-hidden flex gap-1">
    <LeftMenu/>
    <main class="w-full h-full flex flex-col">
      <TopNav/>
      <article class=" w-full h-full">
        <router-view></router-view>
      </article>
    </main>
  </div>
</template>

<script>
import LeftMenu from '@/views/home/left-menu/IndexView.vue'
import TopNav from "@/views/home/top-nav/IndexView.vue"
export default {
  name: "HomePage",
  components: {
    LeftMenu, TopNav
  }
}
</script>

<style>

</style>