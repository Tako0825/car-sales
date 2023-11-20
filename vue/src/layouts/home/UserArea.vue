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
    <UserTableVue class="w-full h-auto"/>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :current-page="getPage"
      @current-change="handleCurrentChange"
      :page-size="getPageSize"
      :total="getUserTotal"
      :hide-on-single-page="true"
    ></el-pagination>
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
import { sleep } from '@/util/sleep'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("userArea")
export default {
  name: "UserArea",
  components: {
    UserTableVue, UserDetailVue, UserEditVue, UserRegisterVue
  },
  computed: {
    ...mapGetters([
      "getPage", "getPageSize", "getUserTotal"
    ])
  },
  methods: {
    ...mapMutations([
      "setRegisterFormVisible", "setDataReady", "setPage", "setSelectedId", "setSource"
    ]),
    ...mapActions([
      "fetchSource"
    ]),
    // 处理页数切换
    async handleCurrentChange(newPage) {
        this.setSelectedId(null)
        this.setDataReady(false)
        this.setPage(newPage)
        const { userList } = await this.fetchSource()
        this.setSource(userList)
        await sleep()
        this.setDataReady(true)
    },
  }
}
</script>

<style>

</style>