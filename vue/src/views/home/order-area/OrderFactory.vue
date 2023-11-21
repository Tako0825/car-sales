<template>
    <!-- 添加订单 -->
    <el-dialog 
        title="添加订单" 
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
            <el-form-item label="销售员" prop="userId">
                <el-select v-model="form.userId" filterable placeholder="请选择销售员" clearable>
                    <el-option
                        v-for="item in users"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 请选择产品 -->
            <el-form-item label="产品" prop="productId">
                <el-select v-model="form.productId" filterable placeholder="请选择产品" clearable>
                    <el-option
                        v-for="item in products"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 请选择仓库 -->
            <el-form-item label="仓库" prop="warehouseId">
                <el-select v-model="form.warehouseId" filterable placeholder="请选择仓库" clearable>
                    <el-option
                        v-for="item in warehouses"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
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
        this.users = await this.fetchUsers().then(users => users.map(user => ({
            value: user.id,
            label: user.username
        })))
        this.products = await this.fetchProducts().then(products => products.map(product => ({
            value: product.id,
            label: product.name + "-" + product.model
        })))
        this.warehouses = await this.fetchWarehouses().then(warehouses => warehouses.map(warehouse => ({
            value: warehouse.id,
            label: warehouse.location
        })))
    },
    data() {
        return {
            form: {
                userId: '',
                productId: '',
                warehouseId: '',
                date: new Date(),
                time: new Date()
            },
            users: [],
            products: [],
            warehouses: [],
            rules: {
                userId: { required: true, message: '请输入当前订单销售员', trigger: 'blur' },
                productId: { required: true, message: '请输入当前订单产品', trigger: 'blur' },
                warehouseId: { required: true, message: '请输入当前订单所属仓库', trigger: 'blur' },
                date: { required: true, message: '请输入具体成交日期', trigger: 'blur' },
                time: { required: true, message: '请输入具体成交时间', trigger: 'blur' },
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
            "fetchSource", "createOrder", "fetchUsers", "fetchProducts", "fetchWarehouses"
        ]),
        // 提交表单 - 添加新供应商
        async submitForm(formName) {
            await this.$refs[formName].validate(async valid => {
                if(valid) {
                    const { userId, productId, warehouseId } = this.form
                    // 合并表单中的日期与时间
                    const date = new Date(this.form.date)
                    const time = new Date(this.form.time)
                    const year = date.getFullYear()
                    const month = date.getMonth()
                    const day = date.getDate()
                    const hours = time.getHours()
                    const minutes = time.getMinutes()
                    const seconds = time.getSeconds()
                    const createtime = new Date(year, month, day, hours, minutes, seconds)
                    // 表单验证通过后...
                    await this.createOrder({
                        userId,
                        productId,
                        warehouseId,
                        createtime
                    })
                    this.setDataReady(false)
                    await sleep()
                    this.setPage(Math.ceil(this.getOrderTotal / this.getPageSize) || 0)
                    const { orderList } = await this.fetchSource()
                    this.setSource(orderList)
                    this.setDialogFormVisible(false)
                    this.setDataReady(true)
                    await this.resetForm(formName)
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