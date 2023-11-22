<template>
  <main class="w-full h-full bg-white rounded-lg flex justify-center items-center">
    <article class="w-1/3 -auto flex flex-col gap-10">
      <section class="w-full h-auto relative">
        <input type="password" v-model="originalPassword" placeholder="enter your original password" class="w-full h-auto p-3 border-2 border-solid border-gray-400 rounded-md font-bold text-md">
        <span class="text-xs font-bold absolute top-0 left-4 transform -translate-y-1/2 bg-white text-gray-400 px-2">原密码</span>
      </section>
      <section class="w-full h-auto relative">
        <input type="password" v-model="password" @keyup.enter="login" placeholder="enter your new password" class="w-full h-auto p-3 border-2 border-solid border-gray-400 rounded-md font-bold text-md">
        <span class="text-xs font-bold absolute top-0 left-4 transform -translate-y-1/2 bg-white text-gray-400 px-2">密码</span>
      </section>
      <section class="w-full h-auto relative">
        <input type="password" v-model="passwordConfirmed" placeholder="enter your new password again" class="w-full h-auto p-3 border-2 border-solid border-gray-400 rounded-md font-bold text-md">
        <span class="text-xs font-bold absolute top-0 left-4 transform -translate-y-1/2 bg-white text-gray-400 px-2">确认密码</span>
      </section>
      <div class="flex justify-center">
        <el-button type="success" @click="submitForm">修改密码</el-button>
        <el-button @click="resetForm">重 置</el-button>
      </div>
    </article>
  </main>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "SpacePage",
  data() {
    return {
      dataReady: false,
      originalPassword: "",
      password: "",
      passwordConfirmed: ""
    }
  },
  computed: {
    ...mapGetters([
      "getUser"
    ])
  },
  methods: {
    // 提交表单 - 更改密码
    submitForm() {
      if(!this.originalPassword || !this.password || !this.passwordConfirmed) {
        return this.$notify.error({
          title: '表单不允许留空'
        })
      }
      else if(this.password !== this.passwordConfirmed) {
        return this.$notify.error({
          title: '密码与确认密码必须一致'
        })
      }
      const data = {
        originalPassword: this.originalPassword,
        password: this.password,
        passwordConfirmed: this.passwordConfirmed
      }
      console.log(data);
    },
    // 重置表单
    resetForm() {
      this.originalPassword = "",
      this.password = "",
      this.passwordConfirmed = ""
    }
  }
}
</script>

<style scoped>
  /* 输入框聚焦时, 相应的 label 字体颜色变黑 */
  section:focus-within span {
      color: #000;
  }
</style>