<template>
    <!-- 员工注册 -->
    <el-dialog 
        title="员工注册" 
        :visible.sync="registerFormVisible"
        center
        width="600px"
        top="2%"
    >
        <el-form 
            :model="form" 
            ref="form" 
            :rules="rules" 
            status-icon
            label-width="80px" 
            label-position="left"
            class="flex flex-col items-start"
        >
            <!-- 上传头像 -->
            <UploadAvatarVue class="self-center mb-6"/>
            <el-row class="flex justify-between">
                <el-form-item label="姓名" prop="username" class="mr-6">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone" required>
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
            </el-row>
            <el-row class="flex justify-between">
                <el-form-item label="密码" prop="password" class="mr-6">
                    <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordConfirmed">
                    <el-input type="password" v-model="form.passwordConfirmed" autocomplete="off"></el-input>
                </el-form-item>
            </el-row>
            <el-form-item label="职位" prop="role">
                <el-select v-model="form.role" placeholder="请选择职位">
                    <el-option label="职员" value="USER"></el-option>
                    <el-option label="管理员" value="ADMIN"></el-option>
                    <el-option label="超级管理" value="ROOT"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入职时间" required>
                <el-row class="flex justify-start max-w-md">
                    <el-form-item prop="date">
                        <el-date-picker 
                            type="date" 
                            placeholder="选择日期" 
                            v-model="form.date" 
                            class="mr-6"
                            :picker-options="pickerOptions"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="time">
                        <el-time-picker placeholder="选择时间" v-model="form.time"></el-time-picker>
                    </el-form-item>
                </el-row>
            </el-form-item>
            <el-form-item label="家庭住址" prop="address" class="w-full">
                <el-input type="textarea" v-model="form.address"></el-input>
            </el-form-item>
        </el-form>
        <section slot="footer" class="dialog-footer">
            <el-button type="success" @click="submitForm('form')">立即注册</el-button>
            <el-button @click="resetForm('form')">重 置</el-button>
        </section>
    </el-dialog>
</template>

<script>
import { sleep } from "@/util/sleep"
import { uploadQiniuImage, hostname } from "@/api/upload"
import UploadAvatarVue from './UploadAvatar.vue'
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("userArea")
export default {
    name: "UserRegister",
    components: {
        UploadAvatarVue
    },
    data() {
        let validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback();
            }
        };
        let validatePhone = async (rule, value, callback) => {
            if(!/^1\d{10}$/.test(value)) {
                callback(new Error("必须以 1 开头且长度为 11 个数字"))
            }
            else if(await this.isPhoneExisted(value)) {
                callback(new Error("该电话已被注册"))
            }
            else {
                callback()
            }
        }
        return {
            form: {
                username: '',
                phone: '',
                password: 'admin123',
                passwordConfirmed: 'admin123',
                role: '',
                date: new Date(),
                time: new Date(),
                address: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                phone: [
                    { validator: validatePhone, trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                passwordConfirmed: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePassword, trigger: 'blur' }
                ],
                role: { required: true, message: '请选择员工职位', trigger: 'change' },
                date: { required: true, message: '请选择入职日期', trigger: 'change' },
                time: { required: true, message: '请选择入职时间', trigger: 'change' },
                address: { required: true, message: '请输入家庭住址', trigger: 'blur' }
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            }
        }
    },
    computed: {
        ...mapGetters([
            "getRegisterFormVisible", "getUserTotal", "getPageSize", "getFile"
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
            "setRegisterFormVisible", "setPage", "setSource", "setDataReady", "setFile", "setPreviewImage"
        ]),
        ...mapActions([
            "registerUser", "fetchSource", "isPhoneExisted"
        ]),
        // 提交表单 - 注册员工
        async submitForm(formName) {
            // 表单验证
            await this.$refs[formName].validate(async valid => {
                if(valid) {
                    // 清空预览图片
                    this.setPreviewImage(null)
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
                    let avatar = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    // 判断有没有上传头像
                    if(this.getFile) {
                        const { key } = await uploadQiniuImage(this.getFile)
                        avatar = `${hostname}/${key}`
                        this.setFile(null)
                    }
                    await this.registerUser({
                        username,
                        phone,
                        password,
                        passwordConfirmed,
                        role,
                        address,
                        joined_date,
                        avatar
                    })
                    this.setDataReady(false)
                    await sleep()
                    this.setPage(Math.ceil(this.getUserTotal / this.getPageSize))
                    const { userList } = await this.fetchSource()
                    this.setSource(userList)
                    this.setRegisterFormVisible(false)
                    this.setDataReady(true)
                    this.$refs[formName].resetFields()
                }
                else return false
            })
        },
        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style>

</style>