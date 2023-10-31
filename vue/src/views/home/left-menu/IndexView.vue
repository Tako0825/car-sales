<template>
  <!-- 侧边菜单 -->
  <el-menu 
      default-active="1" 
      class="el-menu-vertical-demo content w-72 h-full flex flex-col font-bold" 
      :collapse="isCollapse"
      text-color="#72767c"
      :router="true"
  >
      <!-- LOGO -->
      <LogoSectionVue :collapse="isCollapse"/>

      <!-- 折叠控件 -->
      <CollapseControlVue :collapse="isCollapse" @toggleCollapse="isCollapse=!isCollapse"/>
      
      <!-- 选项 -->
      <MenuOptionsVue/>
  </el-menu>
</template>

<script>
import LogoSectionVue from './LogoSection.vue'
import CollapseControlVue from './CollapseControl.vue'
import MenuOptionsVue from './MenuOptions.vue'
export default {
  components: {
    LogoSectionVue, CollapseControlVue, MenuOptionsVue
  },
  data() {
    return {
      isCollapse: false,
    }
  }
}
</script>

<style>
    i {
        color: #72767c!important;
    }

    .is-active i {
        color: #a162f7!important;
    }
</style>