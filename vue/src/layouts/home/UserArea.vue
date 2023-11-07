<template>
  <main class="pb-10">
    <UserTableVue/>
    <UserDetailVue/>
    <UserEditVue/>
    <UserRegisterVue/>
  </main>
</template>

<script>
import UserTableVue from '@/views/home/user-area/UserTable.vue'
import UserDetailVue from '@/views/home/user-area/UserDetail.vue'
import UserEditVue from '@/views/home/user-area/UserEdit.vue'
import UserRegisterVue from '@/views/home/user-area/UserRegister.vue'
export default {
  name: "UserArea",
  components: {
    UserTableVue, UserDetailVue, UserEditVue, UserRegisterVue
  }
}
</script>

<style>

</style>