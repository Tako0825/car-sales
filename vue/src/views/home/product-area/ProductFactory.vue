<template>
    <!-- 添加产品 -->
    <el-dialog 
        title="添加产品" 
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
        >
            <el-form-item label="品牌" prop="name">
                <el-input v-model="form.name" class="max-w-xs"></el-input>
            </el-form-item>
            <el-form-item label="型号" prop="model">
                <el-input v-model="form.model" class="max-w-xs"></el-input>
            </el-form-item>
            <el-form-item label="售价" prop="price">
                <el-input v-model="form.price" class="max-w-xs"></el-input>
                <span class="ml-2">万</span>
            </el-form-item>
            <el-form-item label="简介" prop="introduce">
                <el-input type="textarea" v-model="form.introduce" class="max-w-md"></el-input>
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
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("productArea")
export default {
    data() {
        let validatePrice = (rule, value, callback) => {
            if(isNaN(+value)) {
                callback(new Error("售价必须是数字"))
            }
            else if(+value >= 2000) {
                callback(new Error("售价不允许超过 2000 万"))
            }
            else {
                callback()
            }
        }
        return {
            form: {
                name: '',
                model: '',
                price: '',
                introduce: '',
            },
            rules: {
                name: { required: true, message: '请输入当前产品品牌', trigger: 'blur' },
                model: { required: true, message: '请输入当前产品型号', trigger: 'blur' },
                price: [
                    { required: true, message: '请输入当前产品售价', trigger: 'blur' },
                    { validator: validatePrice, trigger: 'blur' }
                ],
                introduce: [
                    { required: true, message: '请输入当前产品简介', trigger: 'blur' },
                    { min: 1, max: 200, message: '简介应当在 1 到 200 个字符', trigger: 'blur' },
                ]
            }
        }
    },
    computed: {
        ...mapGetters([
            "getDialogFormVisible", "getProductTotal", "getPageSize"
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
            "fetchSource", "createProduct"
        ]),
        // 提交表单 - 创建新产品
        async submitForm(formName) {
            await this.$refs[formName].validate(async valid => {
                if(valid) {
                    // 表单验证通过后...
                    await this.createProduct(this.form)
                    this.setDataReady(false)
                    await sleep()
                    this.setPage(Math.ceil(this.getProductTotal / this.getPageSize))
                    const { source } = await this.fetchSource()
                    this.setSource(source)
                    this.setDialogFormVisible(false)
                    this.setDataReady(true)
                    this.$refs[formName].resetFields()
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