<template>
  <div class="content w-full h-full overflow-hidden flex gap-1">
    <LeftMenuVue/>
    <main class="w-full h-full flex flex-col">
      <header class=" w-full h-16 bg-white">
      </header>
      <article class=" w-full h-full">
        <router-view></router-view>
      </article>
    </main>
  </div>
</template>

<script>
import LeftMenuVue from '../../views/home/left-menu/IndexView.vue'
export default {
  components: {
    LeftMenuVue
  }
}
</script>

<style>

</style>