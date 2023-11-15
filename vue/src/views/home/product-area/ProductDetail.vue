<template>
    <!-- 产品详情 -->
    <el-dialog 
      title="产品详情" 
      :visible.sync="dialogTableVisible"
    ></el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers("productArea")
export default {
  computed: {
    ...mapState([
      "dialogTableVisible"
    ]),
    ...mapGetters([
      "getDialogTableVisible"
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
    ]),
  }
}
</script>

<style>

</style>