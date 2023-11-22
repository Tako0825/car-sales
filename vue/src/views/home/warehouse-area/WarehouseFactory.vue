<template>
    <!-- 添加仓库 -->
    <el-dialog 
        title="添加仓库" 
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
            <el-form-item label="地址" prop="location" class="w-full">
                <el-input type="textarea" v-model="form.location" rows="1"></el-input>
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
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("warehouseArea")
export default {
    name: "WarehouseFactory",
    data() {
        return {
            form: {
                location: ''
            },
            rules: {
                location: [
                    { required: true, message: '请输入当前仓库地址', trigger: 'blur' },
                    { min: 1, max: 50, message: '简介应当在 50 个字符', trigger: 'blur' },
                ]
            }
        }
    },
    computed: {
        ...mapGetters([
            "getDialogFormVisible", "getWarehouseTotal", "getPageSize"
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
            "fetchSource", "createWarehouse"
        ]),
        // 提交表单 - 创建新产品
        async submitForm(formName) {
            await this.$refs[formName].validate(async valid => {
                if(valid) {
                    // 表单验证通过后...
                    await this.createWarehouse(this.form)
                    this.setDataReady(false)
                    await sleep()
                    this.setPage(Math.ceil(this.getWarehouseTotal / this.getPageSize) || 1)
                    const { warehouseList } = await this.fetchSource()
                    this.setSource(warehouseList)
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