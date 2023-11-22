<template>
    <!-- 编辑仓库信息 -->
    <el-dialog 
        title="编辑仓库信息" 
        :visible.sync="dialogEditVisible"
        center
        width="600px"
    >
        <el-form 
            :model="getWarehouse" 
            v-if="getWarehouse" 
            ref="form" 
            status-icon
            label-width="80px" 
            label-position="left"
        >
            <el-form-item label="地址" prop="location" class="w-full">
                <el-input type="textarea" v-model="getWarehouse.location" rows="1"></el-input>
            </el-form-item>
        </el-form>
        <!-- 取消 & 保存 -->
        <section slot="footer" class="dialog-footer">
            <el-button @click="setDialogEditVisible(false)">取 消</el-button>
            <el-button @click="handleWarehouseChange" type="primary">保 存</el-button>
        </section>
    </el-dialog>
</template>

<script>
import { sleep } from "@/util/sleep"
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("warehouseArea")
export default {
    name: "WarehouseEdit",
    computed: {
        ...mapGetters([
            "getDialogEditVisible", "getWarehouse"
        ]),
        dialogEditVisible: {
            get() {
                return this.getDialogEditVisible
            },
            set(newValue) {
                this.setDialogEditVisible(newValue)
            }
        }
    },
    methods: {
        ...mapMutations([
            "setDialogEditVisible", "setDataReady", "setSource"
        ]),
        ...mapActions([
            "updateWarehouse", "fetchSource"
        ]),
        // 处理修改地址
        async handleWarehouseChange() {
            const warehouse = this.getWarehouse
            const { id, location } = warehouse
            await this.updateWarehouse({
                id,
                data: {
                    location
                }
            })
            this.setDialogEditVisible(false)
            this.setDataReady(false)
            const { warehouseList } = await this.fetchSource()
            this.setSource(warehouseList)
            await sleep()
            this.setDataReady(true)
        }
    }
}
</script>

<style>

</style>