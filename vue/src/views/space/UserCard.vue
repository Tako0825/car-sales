<template>
  <main class="w-full h-auto flex flex-col xl:flex-row items-start gap-4">
    <aside class="xl:w-96 w-full h-auto flex flex-col gap-4">
      <!-- 我的头像 -->
      <el-card v-loading="!getUser" shadow="never">
        <h1 slot="header" class="clearfix text-xl font-bold">我的头像</h1>
        <el-image :src="getUser?.avatar" fit="cover" class="w-full rounded-lg" style="aspect-ratio: 1;"></el-image>
      </el-card>

      <!-- 我的信息 -->
      <el-card v-loading="!getUser || !count || !sales" shadow="never">
        <h1 slot="header" class="clearfix text-xl font-bold">我的信息</h1>
        <el-descriptions :border="true" :column="1" :labelStyle="{ 'color': 'black', 'white-space': 'nowrap' }">
          <el-descriptions-item label="用户名">{{ getUser?.username }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{ getUser?.phone }}</el-descriptions-item>
          <el-descriptions-item label="居住地">{{ getUser?.address }}</el-descriptions-item>
          <el-descriptions-item label="入职时间">{{ joined_date }}</el-descriptions-item>
          <el-descriptions-item label="职位">
            <el-tag v-if="getUser?.role==='USER'" size="small">职员</el-tag>
            <el-tag v-if="getUser?.role==='ADMIN'" size="small">管理员</el-tag>
            <el-tag v-if="getUser?.role==='ROOT'" size="small">超级管理</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="出货量">{{ count }}</el-descriptions-item>
          <el-descriptions-item label="营业额">{{ sales }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </aside>

    <!-- 我的订单 -->
    <el-card v-loading="!source?.length" shadow="nnever" class="w-full h-auto">
      <h1 slot="header" class="clearfix text-xl font-bold">我的订单</h1>
      <article class="w-full flex flex-col justify-start items-start p-4 rounded-lg relative overflow-hidden" style="height: 960px;">
        <section class="w-full h-full overflow-auto absolute top-0 left-0">
          <el-table
            :data="source"
            stripe
            style="width: 100%;"
            header-cell-class-name="text-black" 
          >
            <el-table-column prop="id" fixed label="订单号" width="80"></el-table-column>
            <el-table-column prop="name" label="品牌"></el-table-column>
            <el-table-column prop="model" label="型号"></el-table-column>
            <el-table-column prop="location" label="来源仓库"></el-table-column>
            <el-table-column prop="createtime" fixed label="交易时间" width="150" :formatter="formatCreatetime"></el-table-column>
          </el-table>
        </section>
      </article>
    </el-card>
  </main>
</template>

<script>
import api from "@/api/api"
import { sleep } from "@/util/sleep"
import { mapGetters } from "vuex"
import { createNamespacedHelpers } from "vuex"
const { mapActions: mapUserActions } = createNamespacedHelpers("userArea")
export default {
  name: "UserCard",
  async created() {
    await sleep()
    const response = await api.get(`/api/user/${this.getUser?.id}/order`, { token: localStorage.getItem("token") })
    this.source = response?.source || []
    this.average_count = response?.average_count
    this.average_sales = response?.average_sales
    this.count = response?.count
    this.sales = response?.sales
  },
  data() {
    return {
      source: [],
      average_count: "",
      average_sales: "",
      count: "",
      sales: ""
    }
  },
  computed: {
    ...mapGetters([
      "getUser"
    ]),
    joined_date() {
      return new Date(this.getUser?.joined_date).toLocaleDateString()
    }
  },
  methods: {
    ...mapUserActions([
      "fetchUserDetail"
    ]),
    // 格式化 - createtime
    formatCreatetime(row) {
      const date = new Date(row.createtime)
      return date.toLocaleString()
    }
  }
}
</script>

<style>

</style>