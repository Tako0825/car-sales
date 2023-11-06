<template>
  <main class="pb-10">
    <UserTableVue/>
  </main>
</template>

<script>
import UserTableVue from '@/views/home/user-area/UserTable.vue'
export default {
  name: "UserArea",
  components: {
    UserTableVue
  }
}
</script>

<style>

</style>