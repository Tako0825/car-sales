<template>
  <el-row>
    <template v-for="(item, index) in home">
      <el-submenu
        v-if="hasSubMenu(item)"
        :key="`${index}-${item.path}`"
        :index="item.path"
      >
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="(child, childIndex) in item.children"
          :key="`${index}-${childIndex}-${child.path}`"
          :index="resolveChildPath(item.path, child.path)"
        >
          {{ child.meta.title }}
        </el-menu-item>
      </el-submenu>

      <el-menu-item v-else :key="`${index}-${item.path}`" :index="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-row>
</template>

<script>
import home from "@/routes/home.js";
export default {
  name: "MenuOptions",
  data() {
    return {
      home,
    };
  },
  methods: {
    hasSubMenu(item) {
      return item.children?.length > 1;
    },
    resolveChildPath(parentPath, childPath) {
      return childPath ? `${parentPath}/${childPath}` : parentPath;
    },
  },
};
</script>

<style></style>
