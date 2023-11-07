<template>
    <!-- 添加产品 -->
    <el-dialog 
        title="添加产品" 
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        center
        width="600px"
    >
        <el-form ref="form" v-if="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="品牌">
                <el-input v-model="form.name" class="max-w-xs"></el-input>
            </el-form-item>
            <el-form-item label="型号">
                <el-input v-model="form.model" class="max-w-xs"></el-input>
            </el-form-item>
            <el-form-item label="售价">
                <el-input v-model="form.price" class="max-w-xs"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea" v-model="form.introduce" class="max-w-md"></el-input>
            </el-form-item>
        </el-form>
        <section slot="footer" class="dialog-footer">
            <el-button @click="setDialogFormVisible(false)">取 消</el-button>
            <el-button @click="handleCreateProduct" type="success">确 定</el-button>
        </section>
    </el-dialog>
</template>

<script>
import { sleep } from "@/util/sleep"
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("productArea")
export default {
    data() {
        return {
            form: {
                name: '',
                model: '',
                price: '',
                introduce: '',
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
        async handleCreateProduct() {
            await this.createProduct(this.form)
            this.setDataReady(false)
            await sleep()
            this.setPage(Math.ceil(this.getProductTotal / this.getPageSize))
            const { source } = await this.fetchSource()
            this.setSource(source)
            this.setDialogFormVisible(false)
            this.setDataReady(true)
        }
    }
}
</script>

<style>

</style>