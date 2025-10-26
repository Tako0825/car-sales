<template>
  <!-- 编辑供应商信息 -->
  <el-dialog
    title="编辑供应商信息"
    :visible.sync="dialogEditVisible"
    center
    width="600px"
  >
    <el-form
      :model="getSupplier"
      v-if="getSupplier"
      ref="form"
      status-icon
      label-width="80px"
      label-position="left"
    >
      <el-row class="flex justify-between">
        <el-form-item label="联系电话" prop="phone" class="mr-6">
          <el-input type="text" v-model="getSupplier.phone"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="name">
          <el-input type="text" v-model="getSupplier.name"></el-input>
        </el-form-item>
      </el-row>
      <el-form-item label="公司" prop="company" class="w-full">
        <el-input type="textarea" v-model="getSupplier.company"></el-input>
      </el-form-item>
    </el-form>
    <!-- 取消 & 保存 -->
    <section slot="footer" class="dialog-footer">
      <el-button @click="setDialogEditVisible(false)">取 消</el-button>
      <el-button @click="handleSupplierChange" type="primary">保 存</el-button>
    </section>
  </el-dialog>
</template>

<script>
import { sleep } from "@/util/sleep";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations, mapActions } =
  createNamespacedHelpers("supplierArea");
export default {
  name: "SupplierEdit",
  computed: {
    ...mapGetters(["getDialogEditVisible", "getSupplier"]),
    dialogEditVisible: {
      get() {
        return this.getDialogEditVisible;
      },
      set(newValue) {
        this.setDialogEditVisible(newValue);
      },
    },
  },
  methods: {
    ...mapMutations(["setDialogEditVisible", "setDataReady", "setSource"]),
    ...mapActions(["updateSupplier", "fetchSource"]),
    // 处理修改供应商信息
    async handleSupplierChange() {
      const supplier = this.getSupplier;
      const { id, company, phone, name } = supplier;
      await this.updateSupplier({
        id,
        data: {
          company,
          phone,
          name,
        },
      });
      this.setDialogEditVisible(false);
      this.setDataReady(false);
      const { supplierList } = await this.fetchSource();
      this.setSource(supplierList);
      await sleep();
      this.setDataReady(true);
    },
  },
};
</script>

<style></style>
