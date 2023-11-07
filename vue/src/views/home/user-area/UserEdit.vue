<template>
    <!-- 编辑员工信息 -->
    <el-dialog 
        title="编辑员工信息" 
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        center
        width="600px"
    >
        <el-form ref="form" v-if="getUser" :model="getUser" label-width="80px" label-position="left">
            <el-form-item label="姓名">
                <el-input v-model="getUser.username" class="max-w-xs"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="getUser.phone" class="max-w-xs"></el-input>
            </el-form-item>
            <el-form-item label="职位">
                <el-select v-model="getUser.role" placeholder="请选择职位">
                    <el-option label="职员" value="USER"></el-option>
                    <el-option label="管理员" value="ADMIN"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入职时间">
                <el-row class="flex justify-start max-w-md">
                    <el-date-picker type="date" placeholder="选择日期" v-model="getUser.date" class="mr-6"></el-date-picker>
                    <el-time-picker placeholder="选择时间" v-model="getUser.time"></el-time-picker>
                </el-row>
            </el-form-item>
            <el-form-item label="家庭住址">
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
import { sleep } from "@/util/sleep"
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("userArea")
export default {
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
            const { id, username, phone, role, address } = user
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
                    phone,
                    role,
                    joined_date,
                    address
                }
            })
            this.setDialogFormVisible(false)
            this.setDataReady(false)
            await sleep()
            const { userList } = await this.fetchSource()
            this.setSource(userList)
            this.setDataReady(true)
        }
    }
}
</script>

<style>

</style>