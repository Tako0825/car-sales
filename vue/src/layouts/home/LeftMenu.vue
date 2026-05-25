<template>
  <!-- 侧边菜单 -->
  <el-menu
    :default-active="currentActive"
    :default-openeds="openedMenus"
    :collapse="isCollapse"
    text-color="#72767c"
    :router="true"
  >
    <!-- LOGO -->
    <LogoSectionVue :collapse="isCollapse" />
    <!-- 选项 -->
    <MenuOptionsVue />
    <!-- 折叠控件 -->
    <CollapseControlVue
      :collapse="isCollapse"
      @toggleCollapse="isCollapse = !isCollapse"
    />
  </el-menu>
</template>

<script>
import LogoSectionVue from "@/views/home/left-menu/LogoSection.vue";
import CollapseControlVue from "@/views/home/left-menu/CollapseControl.vue";
import MenuOptionsVue from "@/views/home/left-menu/MenuOptions.vue";
import home from "@/routes/home";
export default {
  name: "LeftMenu",
  components: {
    LogoSectionVue,
    CollapseControlVue,
    MenuOptionsVue,
  },
  data() {
    return {
      isCollapse: false,
      currentActive: this.$route.path, // 在组件创建时，根据当前路由来设置初始的菜单激活项
    };
  },
  computed: {
    openedMenus() {
      return home
        .filter(
          (item) =>
            item.children?.length > 1 && this.$route.path.startsWith(item.path),
        )
        .map((item) => item.path);
    },
  },
  watch: {
    $route(to) {
      this.currentActive = to.path;
    },
  },
};
</script>

<style></style>
