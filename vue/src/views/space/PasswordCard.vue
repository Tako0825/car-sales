<template>
    <!-- 修改我的密码 -->
    <main class="w-full h-auto bg-white p-10 rounded-lg">
        <section v-for="input in inputs" :key="input.title" class="flex items-center gap-8">
            <h2 class="whitespace-nowrap w-24">{{ input.title }}</h2>
            <el-input 
                type="password" 
                v-model="form[input.value]" 
                :placeholder="input.placeholder"
                show-password
            ></el-input>
        </section>
        <div class="flex justify-center">
            <el-button 
                type="success" 
                @click="submitForm" 
                :disabled="!form.originalPassword||!form.password||!form.passwordConfirmed"
            >修 改</el-button>
            <el-button @click="resetForm">清 空</el-button>
        </div>
    </main>
</template>

<script>
import api from '@/api/api'
import { mapGetters, mapMutations } from "vuex"
export default {
    name: "PasswordCard",
    data() {
        return {
            form: {
                originalPassword: "",
                password: "",
                passwordConfirmed: ""
            }
        }
    },
    computed: {
        ...mapGetters([
            "getUser"
        ]),
        inputs() {
            return [
                {
                    title: "原密码",
                    value: "originalPassword",
                    placeholder: "original password"
                },
                {
                    title: "新密码",
                    value: "password",
                    placeholder: "password"
                },
                {
                    title: "确认密码",
                    value: "passwordConfirmed",
                    placeholder: "confirmed password"
                }
            ]
        }
    },
    methods: {
        ...mapMutations([
            "clearUser"
        ]),
        // 提交表单 - 更改密码
        async submitForm() {
            const { originalPassword, password, passwordConfirmed } = this.form
            if(!originalPassword || !password || !passwordConfirmed) {
                return this.$notify.error({
                    title: '表单不允许留空'
                })
            }
            else if(password !== passwordConfirmed) {
                return this.$notify.error({
                    title: '密码与确认密码必须一致'
                })
            }
            // 请求修改密码 API
            const response = await api.patch(`/api/user/${this.getUser.id}/password`, {
                originalPassword,
                password,
                passwordConfirmed
            }, { token: localStorage.getItem("token") })
            // API 调用错误 - 输出提示
            if(!response.success) {
                return this.$notify.error({
                title: response.message
                })
            }
            // API 调用成功 - 清除登录状态
            else {
                localStorage.removeItem("token")
                this.clearUser()
                this.$router.push("/login")
            }
        },
        // 重置表单
        resetForm() {
            for(const key in this.form) {
                this.form[key] = ""
            }
        }
    } 
}
</script>

<style>

</style>