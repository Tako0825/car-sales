<template>
  <div id="app" class="w-screen h-screen m-auto">
    <router-view></router-view>
    <!-- 备案号填写 -->
    <!-- <a
      href="https://beian.miit.gov.cn"
      target="_blank"
      class="fixed bottom-1 left-1/2 z-50 transform -translate-x-1/2 text-gray-500 hover:text-purple-500 transition duration-200 text-sm font-bold"
      >[省份简称]ICP备[备案号码]号</a
    > -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import "./main.css";

#app {
  min-width: 960px;
  max-width: 2560px;
  background-color: #f5f5f5;
}
</style>
