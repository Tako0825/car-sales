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
            <!-- 请选择销售员 -->
            <el-form-item label="销售员" prop="user">
                <el-select v-model="form.user" placeholder="请选择销售员" clearable>
                    <el-option
                        v-for="item in fetchAllUser"
                        :key="item.user"
                        :label="item.label"
                        :value="item.user"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 请选择产品 -->
            <el-form-item label="产品" prop="product">
                <el-select v-model="form.product" placeholder="请选择产品" clearable>
                    <el-option
                        v-for="item in products"
                        :key="item.product"
                        :label="item.label"
                        :value="item.product"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 请选择仓库 -->
            <el-form-item label="仓库" prop="warehouse">
                <el-select v-model="form.warehouse" placeholder="请选择仓库" clearable>
                    <el-option
                        v-for="item in warehouses"
                        :key="item.warehouse"
                        :label="item.label"
                        :value="item.warehouse"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 请选择入职时间 -->
            <el-form-item label="入职时间" required>
                <el-row class="flex justify-start max-w-md">
                    <el-form-item prop="date">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date" class="mr-6"></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="time">
                        <el-time-picker placeholder="选择时间" v-model="form.time"></el-time-picker>
                    </el-form-item>
                </el-row>
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
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("orderArea")
export default {
    name: "OrderFactory",
    async created() {
        this.users = await this.fetchAllUser()
        console.log(this.users);
    },
    data() {
        return {
            form: {
                user: '',
                product: '',
                warehouse: '',
                date: new Date(),
                time: new Date()
            },
            users: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
            products: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
            warehouses: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
            rules: {
                company: [
                    { required: true, message: '请输入当前供应商公司地址', trigger: 'blur' },
                    { min: 1, max: 50, message: '公司地址应当在 50 个字符', trigger: 'blur' },
                ],
                name: { required: true, message: '请输入当前供应商公司地址', trigger: 'blur' }
            }
        }
    },
    computed: {
        ...mapGetters([
            "getDialogFormVisible", "getOrderTotal", "getPageSize"
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
            "fetchSource", "createOrder", "fetchAllUser"
        ]),
        // 提交表单 - 添加新供应商
        async submitForm(formName) {
            await this.$refs[formName].validate(async valid => {
                if(valid) {
                    // 表单验证通过后...
                    await this.createOrder(this.form)
                    this.setDataReady(false)
                    await sleep()
                    this.setPage(Math.ceil(this.getOrderTotal / this.getPageSize))
                    const { orderList } = await this.fetchSource()
                    this.setSource(orderList)
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