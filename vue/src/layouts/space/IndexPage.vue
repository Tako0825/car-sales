<template>
  <el-tabs v-model="activedName" class="w-full h-auto">
    <!-- 个人资料 -->
    <el-tab-pane label="个人资料" name="user">
      <UserCardVue/>
    </el-tab-pane>

    <!-- 修改头像 -->
    <el-tab-pane label="修改头像" name="avatar">
      <AvatarCardVue/>
    </el-tab-pane>

    <!-- 修改密码 -->
    <el-tab-pane label="修改密码" name="password">
      <PasswordCardVue class="w-full h-full flex flex-col items-center gap-6"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AvatarCardVue from '@/views/space/AvatarCard.vue'
import PasswordCardVue from '@/views/space/PasswordCard.vue'
import UserCardVue from '@/views/space/UserCard.vue'
export default {
  name: "SpacePage",
  components: { AvatarCardVue, PasswordCardVue, UserCardVue },
  data() {
    return {
      dataReady: false,
      activedName: "user"
    }
  }
}
</script>

<style scoped>

</style>