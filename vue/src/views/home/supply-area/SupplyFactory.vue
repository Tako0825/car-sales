<template>
  <!-- 添加供应记录 -->
  <el-dialog
    title="添加供应记录"
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
      <!-- 请选择供应商 -->
      <el-form-item label="供应商" prop="supplierId">
        <el-select
          v-model="form.supplierId"
          filterable
          placeholder="请选择供应商"
          clearable
        >
          <el-option
            v-for="item in suppliers"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 请选择产品 -->
      <el-form-item label="产品" prop="productId">
        <el-select
          v-model="form.productId"
          filterable
          placeholder="请选择产品"
          clearable
        >
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
        <el-select
          v-model="form.warehouseId"
          filterable
          placeholder="请选择仓库"
          clearable
        >
          <el-option
            v-for="item in warehouses"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 请填写供应数量 -->
      <el-form-item label="供应量" prop="quantity">
        <el-input v-model="form.quantity"></el-input>
      </el-form-item>
      <!-- 请选择入职时间 -->
      <el-form-item label="供应时间" required>
        <el-row class="flex justify-start max-w-md">
          <el-form-item prop="date">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date"
              class="mr-6"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item prop="time">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.time"
            ></el-time-picker>
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
import { sleep } from "@/util/sleep";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations, mapActions } =
  createNamespacedHelpers("supplyArea");
export default {
  name: "SupplyFactory",
  async created() {
    this.suppliers = await this.fetchSuppliers().then((suppliers) =>
      suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.company,
      })),
    );
    this.products = await this.fetchProducts().then((products) =>
      products.map((product) => ({
        value: product.id,
        label: product.name + "-" + product.model,
      })),
    );
    this.warehouses = await this.fetchWarehouses().then((warehouses) =>
      warehouses.map((warehouse) => ({
        value: warehouse.id,
        label: warehouse.location,
      })),
    );
  },
  data() {
    let validateInteger = (rule, value, callback) => {
      if (!Number.isInteger(+value) || +value <= 0) {
        callback(new Error("必须是正整数"));
      } else {
        callback();
      }
    };
    return {
      form: {
        quantity: "",
        supplierId: "",
        productId: "",
        warehouseId: "",
        date: new Date(),
        time: new Date(),
      },
      suppliers: [],
      products: [],
      warehouses: [],
      rules: {
        supplierId: {
          required: true,
          message: "请输入供应商",
          trigger: "blur",
        },
        productId: {
          required: true,
          message: "请输入供应产品",
          trigger: "blur",
        },
        warehouseId: {
          required: true,
          message: "请输入入库仓库",
          trigger: "blur",
        },
        quantity: [
          { required: true, message: "请输入供应数量", trigger: "blur" },
          { validator: validateInteger, trigger: "blur" },
        ],
        date: {
          required: true,
          message: "请输入具体供应日期",
          trigger: "blur",
        },
        time: {
          required: true,
          message: "请输入具体供应时间",
          trigger: "blur",
        },
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getDialogFormVisible", "getSupplyTotal", "getPageSize"]),
    dialogFormVisible: {
      get() {
        return this.getDialogFormVisible;
      },
      set(newValue) {
        this.setDialogFormVisible(newValue);
      },
    },
  },
  methods: {
    ...mapMutations([
      "setDialogFormVisible",
      "setPage",
      "setSource",
      "setDataReady",
    ]),
    ...mapActions([
      "fetchSource",
      "createSupply",
      "fetchSuppliers",
      "fetchProducts",
      "fetchWarehouses",
    ]),
    // 提交表单 - 添加新供应记录
    async submitForm(formName) {
      await this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { quantity, supplierId, productId, warehouseId } = this.form;
          // 合并表单中的日期与时间
          const date = new Date(this.form.date);
          const time = new Date(this.form.time);
          const year = date.getFullYear();
          const month = date.getMonth();
          const day = date.getDate();
          const hours = time.getHours();
          const minutes = time.getMinutes();
          const seconds = time.getSeconds();
          const createtime = new Date(
            year,
            month,
            day,
            hours,
            minutes,
            seconds,
          );
          // 表单验证通过后...
          await this.createSupply({
            quantity,
            supplierId,
            productId,
            warehouseId,
            createtime,
          });
          this.setDataReady(false);
          await sleep();
          this.setPage(Math.ceil(this.getSupplyTotal / this.getPageSize) || 1);
          const { supplyList } = await this.fetchSource();
          this.setSource(supplyList);
          this.setDialogFormVisible(false);
          this.setDataReady(true);
          await this.resetForm(formName);
        } else return false;
      });
    },
    // 重置表单
    async resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped></style>
