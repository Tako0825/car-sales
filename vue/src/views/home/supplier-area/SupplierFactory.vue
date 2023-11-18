<template>
    <!-- 添加供应商 -->
    <el-dialog 
        title="添加供应商" 
        :visible.sync="dialogFormVisible"
        center
        width="600px"
    >   
        <el-form 
            ref="form" 
            :model="form" 
            v-if="form" 
            :rules="rules" 
            status-icon
            label-width="80px" 
            label-position="left"
            class="flex flex-col items-start"
        >
            <el-form-item label="公司" prop="company" class="w-full">
                <el-input type="textarea" v-model="form.company"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone" class="w-full">
                <el-input type="text" v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="name" class="w-full">
                <el-input type="text" v-model="form.name"></el-input>
            </el-form-item>
        </el-form>
        <section slot="footer" class="dialog-footer">
            <el-button type="success" @click="submitForm('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">重 置</el-button>
        </section>
    </el-dialog>
</template>

<script>
import { sleep } from "@/util/sleep"
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("supplierArea")
export default {
    name: "SupplierFactory",
    data() {
        let validatePhone = async (rule, value, callback) => {
            if(!/^1\d{10}$/.test(value)) {
                callback(new Error("必须以 1 开头且长度为 11 个数字"))
            }
            else {
                callback()
            }
        }
        return {
            form: {
                company: '',
                phone: '',
                name: ''
            },
            rules: {
                company: [
                    { required: true, message: '请输入当前供应商公司地址', trigger: 'blur' },
                    { min: 1, max: 50, message: '公司地址应当在 50 个字符', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '请输入当前供应商联系电话', trigger: 'blur' },
                    { validator: validatePhone, trigger: 'blur' },
                ],
                name: { required: true, message: '请输入当前供应商联系人姓名', trigger: 'blur' }
            }
        }
    },
    computed: {
        ...mapGetters([
            "getDialogFormVisible", "getSupplierTotal", "getPageSize"
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
            "setDialogFormVisible", "setPage", "setSource", "setDataReady"
        ]),
        ...mapActions([
            "fetchSource", "createSupplier"
        ]),
        // 提交表单 - 添加新供应商
        async submitForm(formName) {
            await this.$refs[formName].validate(async valid => {
                if(valid) {
                    // 表单验证通过后...
                    await this.createSupplier(this.form)
                    this.setDataReady(false)
                    await sleep()
                    this.setPage(Math.ceil(this.getSupplierTotal / this.getPageSize))
                    const { supplierList } = await this.fetchSource()
                    this.setSource(supplierList)
                    this.setDialogFormVisible(false)
                    this.setDataReady(true)
                    // 重置表单
                    this.resetForm(formName)
                }
                else return false
            })
        },
        // 重置表单
        async resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style>

</style>