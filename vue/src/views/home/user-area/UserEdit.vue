<template>
    <!-- 编辑用户信息 -->
    <el-dialog title="编辑用户信息" :visible.sync="getDialogFormVisible">
        <section slot="footer" class="dialog-footer">
            <el-button @click="setDialogFormVisible(false)">取 消</el-button>
            <el-button @click="setDialogFormVisible(false)" type="primary">确 定</el-button>
        </section>
    </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations } = createNamespacedHelpers("userArea")
export default {
    computed: {
        ...mapGetters([
            "getDialogFormVisible"
        ])
    },
    methods: {
        ...mapMutations([
            "setDialogFormVisible"
        ])
    }
}
</script>

<style>

</style>