<template>
    <!-- 用户详情 -->
    <el-dialog 
      title="用户详情" 
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
    ></el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers("userArea")
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
    ])
  }
}
</script>

<style>

</style>