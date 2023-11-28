<template>
  <main class="content w-full h-full overflow-hidden flex gap-1">
    <LeftMenuVue class="el-menu-vertical-demo content w-72 h-full flex flex-col font-bold select-none"/>
    <article class="w-full h-full flex flex-col">
      <TopNavVue class="w-full h-16 px-8 bg-white flex justify-between items-center select-none"/>
      <section class="w-full h-full p-8 overflow-y-auto">
        <router-view></router-view>
        <el-backtop :visibility-height="100" target="section"></el-backtop>
      </section>
    </article>
  </main>
</template>

<script>
import LeftMenuVue from './LeftMenu.vue'
import TopNavVue from './TopNav.vue'
export default {
  name: "HomePage",
  components: { LeftMenuVue, TopNavVue }
}
</script>

<style>

</style>