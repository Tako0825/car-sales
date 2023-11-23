<template>
  <main class="w-full h-auto flex flex-col 2xl:flex-row gap-4">
    <aside  class="w-96 h-auto flex flex-col gap-4">
      <!-- 我的头像 -->
      <el-card v-loading="!getUser" shadow="never">
        <h1 slot="header" class="clearfix text-xl font-bold">我的头像</h1>
        <el-image :src="getUser?.avatar" fit="cover" class="w-full rounded-lg" style="aspect-ratio: 1;"></el-image>
        <h1 class="py-2">{{ getUser?.username }}</h1>
        <span class="text-sm text-gray-400 mr-3">{{ joined_date }}</span>
      </el-card>

      <!-- 我的信息 -->
      <el-card v-loading="!getUser" shadow="never">
        <h1 slot="header" class="clearfix text-xl font-bold">我的信息</h1>
        <section class="flex flex-col">
            <span>手机号：</span><div class="bg-gray-100 px-4 py-2 rounded-md mt-1 mb-6">{{ getUser?.phone }}</div>
            <span>家庭住址：</span><div class="bg-gray-100 px-4 py-2 rounded-md mt-1">{{ getUser?.address }}</div>
        </section>
      </el-card>

      <!-- 我的业绩 -->
      <el-card v-loading="!count" shadow="never">
        <h1 slot="header" class="clearfix text-xl font-bold">我的业绩</h1>
        <section class="flex flex-col">
            <span>出货量：</span><div class="bg-gray-100 px-4 py-2 rounded-md mt-1 mb-6">{{ count }}</div>
            <span>营业额：</span><div class="bg-gray-100 px-4 py-2 rounded-md mt-1">{{ sales }}</div>
        </section>
      </el-card>
    </aside>

    <article class="w-full h-full flex flex-col justify-start items-start">
      <!-- 我的订单 -->
      <el-card v-loading="!source.length" shadow="never" class="w-full h-full">
        <h1 slot="header" class="clearfix text-xl font-bold">我的订单</h1>
        <section class="w-full h-screen overflow-auto">
          <el-table
            :data="source"
            stripe
            style="width: 90%;"
            :show-header="false"
            header-cell-class-name="text-black w-full" 
          >
            <el-table-column prop="id" label="订单号"></el-table-column>
            <el-table-column prop="name" label="品牌"></el-table-column>
            <el-table-column prop="model" label="型号"></el-table-column>
            <el-table-column prop="location" label="来源仓库"></el-table-column>
            <el-table-column prop="createtime" label="交易时间" :formatter="formatCreatetime"></el-table-column>
          </el-table>
        </section>
      </el-card>
    </article>
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
    const response = await api.get(`/api/user/${this.getUser.id}/order`, { token: this.getToken })
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
      "getUser", "getToken"
    ]),
    joined_date() {
      return new Date(this.getUser.joined_date).toLocaleDateString()
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