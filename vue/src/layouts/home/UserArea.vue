<template>
  <main class="w-full h-auto flex flex-col items-center gap-6">
    <!-- 头部 -->
    <header class="w-full flex justify-between">
      <h1 class="text-2xl font-bold">员工总览</h1>
      <el-button 
        v-if="['ADMIN'].includes(this.$store.getters.getUser.role)" 
        type="success" 
        @click="setRegisterFormVisible(true)" 
        size="small"
      >添加员工</el-button>
    </header>
    <!-- 用户列表 -->
    <UserTableVue class="w-full flex flex-col items-center gap-6"/>

    <!-- 用户详情 -->
    <UserDetailVue/>
    <!-- 编辑表单 -->
    <UserEditVue/>
    <!-- 注册用户表单 -->
    <UserRegisterVue/>
  </main>
</template>

<script>
import UserTableVue from '@/views/home/user-area/UserTable.vue'
import UserDetailVue from '@/views/home/user-area/UserDetail.vue'
import UserEditVue from '@/views/home/user-area/UserEdit.vue'
import UserRegisterVue from '@/views/home/user-area/UserRegister.vue'
import { createNamespacedHelpers } from "vuex"
const { mapMutations } = createNamespacedHelpers("userArea")
export default {
  name: "UserArea",
  components: {
    UserTableVue, UserDetailVue, UserEditVue, UserRegisterVue
  },
  methods: {
    ...mapMutations([
      "setRegisterFormVisible"
    ])
  }
}
</script>

<style>

</style>