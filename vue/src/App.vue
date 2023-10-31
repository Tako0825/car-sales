<template>
  <div id="app" class="w-screen h-screen m-auto">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  @import "./main.css";

  #app {
    min-width: 960px;
    max-width: 1920px;
    background-color: #f5f5f5;
  }
</style>
