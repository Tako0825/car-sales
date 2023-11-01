<template>
  <div class="content w-full h-full overflow-hidden flex gap-1">
    <LeftMenuVue/>
    <main class="w-full h-full flex flex-col">
      <TopNavVue/>
      <article class="w-full h-full p-8 overflow-y-auto">
        <router-view></router-view>
      </article>
    </main>
  </div>
</template>

<script>
import LeftMenuVue from './LeftMenu.vue'
import TopNavVue from './TopNav.vue'
export default {
  name: "HomePage",
  components: {
    LeftMenuVue, TopNavVue
  }
}
</script>

<style>

</style>