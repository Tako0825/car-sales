<template>
    <!-- 编辑员工信息 -->
    <el-dialog 
        title="编辑员工信息" 
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        center
        width="600px"
    >
        <el-form 
            :model="getUser" 
            v-if="getUser" 
            ref="form" 
            :rules="rules" 
            status-icon
            label-width="80px" 
            label-position="left"
        >
            <el-form-item label="姓名" prop="username">
                <el-input v-model="getUser.username" class="max-w-xs"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="role">
                <el-select v-model="getUser.role" placeholder="请选择职位">
                    <el-option label="职员" value="USER"></el-option>
                    <el-option label="管理员" value="ADMIN"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入职时间" required>
                <el-row class="flex justify-start max-w-md">
                    <el-form-item prop="date">
                        <el-date-picker type="date" placeholder="选择日期" v-model="getUser.date" class="mr-2"></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="time">
                        <el-time-picker placeholder="选择时间" v-model="getUser.time"></el-time-picker>
                    </el-form-item>
                </el-row>
            </el-form-item>
            <el-form-item label="家庭住址" prop="address">
                <el-input type="textarea" v-model="getUser.address" class="max-w-md"></el-input>
            </el-form-item>
        </el-form>
        <section slot="footer" class="dialog-footer">
            <el-button @click="setDialogFormVisible(false)">取 消</el-button>
            <el-button @click="handleUserChange" type="primary">保 存</el-button>
        </section>
    </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("userArea")
export default {
    data() {
        return {
            rules: {
                username: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                role: { required: true, message: '请选择员工职位', trigger: 'change' },
                date: { required: true, message: '请选择入职日期', trigger: 'change' },
                time: { required: true, message: '请选择入职时间', trigger: 'change' },
                address: { required: true, message: '请输入家庭住址', trigger: 'blur' }
            }
        }
    },
    computed: {
        ...mapGetters([
            "getDialogFormVisible", "getUser"
        ]),
        dialogFormVisible: {
            get() {
                return this.getDialogFormVisible
            },
            set(newValue) {
                this.setDialogFormVisible(newValue)
            }
        }
    },
    methods: {
        ...mapMutations([
            "setDialogFormVisible", "setSource", "setDataReady"
        ]),
        ...mapActions([
            "fetchSource", "fetchUser", "updateUser"
        ]),
        async handleUserChange() {
            const user = this.getUser
            const { id, username, role, address } = user
            // 合并表单中的日期与时间
            const date = new Date(user.date)
            const time = new Date(user.time)
            const year = date.getFullYear()
            const month = date.getMonth()
            const day = date.getDate()
            const hours = time.getHours()
            const minutes = time.getMinutes()
            const seconds = time.getSeconds()
            const joined_date = new Date(year, month, day, hours, minutes, seconds)
            await this.updateUser({
                id,
                data: {
                    username,
                    role,
                    joined_date,
                    address
                }
            })
            this.setDialogFormVisible(false)
            this.setDataReady(false)
            const { userList } = await this.fetchSource()
            this.setSource(userList)
            this.setDataReady(true)
        }
    }
}
</script>

<style>

</style>