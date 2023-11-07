<template>
  <main class="pb-10">
    <header class="pb-8 flex justify-between">
      <h1 class="text-2xl font-bold">员工总览</h1>
      <el-button type="success" @click="setRegisterFormVisible(true)" size="medium">添加员工</el-button>
    </header>
    <UserTableVue/>
    <UserDetailVue/>
    <UserEditVue/>
    <UserRegisterVue/>
  </main>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapMutations } = createNamespacedHelpers("userArea")
import UserTableVue from '@/views/home/user-area/UserTable.vue'
import UserDetailVue from '@/views/home/user-area/UserDetail.vue'
import UserEditVue from '@/views/home/user-area/UserEdit.vue'
import UserRegisterVue from '@/views/home/user-area/UserRegister.vue'
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