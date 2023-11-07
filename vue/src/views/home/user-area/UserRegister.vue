<template>
    <!-- 员工注册 -->
    <el-dialog 
        title="员工注册" 
        :visible.sync="registerFormVisible"
        :close-on-click-modal="false"
        center
        width="600px"
    >
        <el-form ref="form" v-if="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="姓名">
                <el-input v-model="form.username" class="max-w-xs"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone" class="max-w-xs"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" class="max-w-xs"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="form.passwordConfirmed" class="max-w-xs"></el-input>
            </el-form-item>
            <el-form-item label="职位">
                <el-select v-model="form.role" placeholder="请选择职位">
                    <el-option label="职员" value="USER"></el-option>
                    <el-option label="管理员" value="ADMIN"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入职时间">
                <el-row class="flex justify-start max-w-md">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" class="mr-6"></el-date-picker>
                    <el-time-picker placeholder="选择时间" v-model="form.time"></el-time-picker>
                </el-row>
            </el-form-item>
            <el-form-item label="家庭住址">
                <el-input type="textarea" v-model="form.address" class="max-w-md"></el-input>
            </el-form-item>
        </el-form>
        <section slot="footer" class="dialog-footer">
            <el-button @click="setRegisterFormVisible(false)">取 消</el-button>
            <el-button @click="handleUserChange" type="success">注册</el-button>
        </section>
    </el-dialog>
</template>

<script>
import { sleep } from "@/util/sleep"
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("userArea")
export default {
    data() {
        return {
            form: {
                username: '',
                phone: '',
                password: '',
                passwordConfirmed: '',
                role: '',
                date: new Date(),
                time: new Date(),
                address: ''
            }
        }
    },
    computed: {
        ...mapGetters([
            "getRegisterFormVisible", "getUserTotal", "getPageSize"
        ]),
        registerFormVisible: {
            get() {
                return this.getRegisterFormVisible
            },
            set(newValue) {
                this.setRegisterFormVisible(newValue)
            }
        }
    },
    methods: {
        ...mapMutations([
            "setRegisterFormVisible", "setPage", "setSource", "setDataReady"
        ]),
        ...mapActions([
            "registerUser", "fetchSource"
        ]),
        async handleUserChange() {
            const { username, phone, password, passwordConfirmed, role, address } = this.form
            // 合并表单中的日期与时间
            const date = new Date(this.form.date)
            const time = new Date(this.form.time)
            const year = date.getFullYear()
            const month = date.getMonth()
            const day = date.getDate()
            const hours = time.getHours()
            const minutes = time.getMinutes()
            const seconds = time.getSeconds()
            const joined_date = new Date(year, month, day, hours, minutes, seconds)
            await this.registerUser({
                username,
                phone,
                password,
                passwordConfirmed,
                role,
                address,
                joined_date
            })
            this.setDataReady(false)
            await sleep()
            this.setPage(Math.ceil(this.getUserTotal / this.getPageSize))
            const { userList } = await this.fetchSource()
            this.setSource(userList)
            this.setRegisterFormVisible(false)
            this.setDataReady(true)
        }
    }
}
</script>

<style>

</style>