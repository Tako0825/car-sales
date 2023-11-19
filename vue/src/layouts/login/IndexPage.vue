<template>
  <main class="w-full h-full overflow-hidden flex justify-center items-center bg-white">
    <article class="w-1/3 h-auto flex flex-col transform -translate-y-20 gap-4">
      <h1>123</h1>
      <h2>456</h2>
      <LoginForm class="w-full h-auto p-4 rounded-lg" :style="{ 'boxShadow': '0 10px 110px 1px rgba(0,0,0,.1)' }"/>
    </article>
  </main>
</template>

<script>
import LoginForm from "./LoginForm"
export default {
  name: "LoginPage",
  components: { LoginForm }
}
</script>

<style>

</style>