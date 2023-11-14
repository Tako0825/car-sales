<template>
<!-- 员工详情 -->
<el-dialog 
  title="员工详情" 
  :visible.sync="dialogTableVisible"
  top="1rem"
>
  <!-- 表格 -->
  <el-table
    :data="source"
    stripe
    style="width: 100%"
    header-cell-class-name="text-black" 
    class="rounded-xl"
  >
    <!-- 占位列 -->
    <el-table-column width="50"></el-table-column>
    <el-table-column prop="id" label="订单号" width="80"></el-table-column>
    <el-table-column prop="name" label="品牌"></el-table-column>
    <el-table-column prop="model" label="型号"></el-table-column>
    <el-table-column prop="location" label="来源仓库"></el-table-column>
    <el-table-column prop="createtime" label="交易时间"></el-table-column>
  </el-table>
</el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers("userArea")
export default {
  name: "UserDetail",
  computed: {
    source() {
      return this.getUserDetail?.source || []
    },
    ...mapState([
      "dialogTableVisible"
    ]),
    ...mapGetters([
      "getDialogTableVisible", "getUserDetail"
    ]),
    dialogTableVisible: {
      get() {
        return this.getDialogTableVisible
      },
      set(newValue) {
        this.setDialogTableVisible(newValue)
      }
    }
  },
  methods: {
    ...mapMutations([
      "setDialogTableVisible"
    ])
  }
}
</script>

<style>

</style>