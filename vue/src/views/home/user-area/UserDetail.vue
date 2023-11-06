<template>
    <!-- 用户详情 -->
    <el-dialog title="用户详情" :visible.sync="getDialogTableVisible"></el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapGetters, mapMutations } = createNamespacedHelpers("userArea")
export default {
  computed: {
    ...mapGetters([
      "getDialogTableVisible"
    ])
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