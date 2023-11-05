<template>
  <!-- 侧边菜单 -->
  <el-menu 
      default-active="/" 
      class="el-menu-vertical-demo content w-72 h-full flex flex-col font-bold select-none" 
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
import LogoSectionVue from '@/views/home/left-menu/LogoSection.vue'
import CollapseControlVue from '@/views/home/left-menu/CollapseControl.vue'
import MenuOptionsVue from '@/views/home/left-menu/MenuOptions.vue'
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

</style>