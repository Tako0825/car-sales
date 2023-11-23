<template>
  <main class="w-full h-auto flex justify-between items-start gap-4">
    <!-- 左侧卡片 -->
    <el-card shadow="never" class="w-72 h-auto">
      <el-image 
        :src="getUser?.avatar"
        fit="cover"
        class="w-full rounded-full"
        style="aspect-ratio: 1;"
      ></el-image>
      <h1 class="py-2">{{ getUser?.username }}</h1>
      <div class="text-sm text-gray-400">
        <span class="mr-3">{{ joined_date }}</span>
        <span>{{ joined_time }}</span>
      </div>
    </el-card>

    <!-- 右侧卡片 -->
    <el-card shadow="never" class="w-full h-auto overflow-hidden">
      <article class="w-full h-full flex flex-col justify-start items-start gap-4">
        <span class="bg-gray-100 px-4 py-2 rounded-md">{{ getUser?.phone }}</span>
        <span class="bg-gray-100 px-4 py-2 rounded-md">{{ getUser?.address }}</span>
        <el-table
          :data="source"
          stripe
          style="width: 90%"
          header-cell-class-name="text-black" 
        >
          <!-- 占位列 -->
          <el-table-column prop="id" label="订单号" width="80"></el-table-column>
          <el-table-column prop="name" label="品牌" width="80"></el-table-column>
          <el-table-column prop="model" label="型号" width="100"></el-table-column>
          <el-table-column prop="location" label="来源仓库"></el-table-column>
          <el-table-column prop="createtime" label="交易时间" :formatter="formatCreatetime" width="180"></el-table-column>
        </el-table>
      </article>
    </el-card>
  </main>
</template>

<script>
import api from "@/api/api"
import { mapGetters } from "vuex"
import { createNamespacedHelpers } from "vuex"
const { mapActions: mapUserActions } = createNamespacedHelpers("userArea")
export default {
  name: "UserCard",
  async created() {
    const response = await api.get(`/api/user/${this.getUser.id}/order`, { token: this.getToken })
    this.source = response?.source || []
  },
  data() {
    return {
      source: []
    }
  },
  computed: {
    ...mapGetters([
      "getUser", "getToken"
    ]),
    joined_date() {
      return new Date(this.getUser.joined_date).toLocaleDateString()
    },
    joined_time() {
      return new Date(this.getUser.joined_date).toLocaleTimeString()
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
    },
  }
}
</script>

<style>

</style>