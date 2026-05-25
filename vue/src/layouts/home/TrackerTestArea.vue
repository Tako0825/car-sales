<template>
  <main class="w-full h-auto flex flex-col gap-6">
    <header class="w-full flex flex-col gap-2">
      <h1 class="text-2xl font-bold">埋点测试</h1>
      <p class="text-sm text-gray-500">
        使用下面两个按钮快速验证 tako-tracker 的接口错误采集和 JS 异常采集。
      </p>
    </header>

    <section class="w-full bg-white rounded-xl p-8 flex flex-col gap-6">
      <article class="flex flex-wrap gap-4">
        <el-button type="danger" @click="simulateApiError">
          模拟网络请求错误
        </el-button>
        <el-button type="warning" @click="simulateJsError">
          模拟 JS 错误
        </el-button>
      </article>

      <el-alert
        title="建议先打开数据库中的 track_event 表，点击按钮后观察新增的 api_error 和 js_error 数据。"
        type="info"
        :closable="false"
        show-icon
      />

      <article class="text-sm text-gray-500 leading-7">
        <p>网络请求错误：调用一个不存在的后端接口，触发 api_error 上报。</p>
        <p>JS 错误：直接抛出 Vue 运行时异常，由 SDK 接入的 Vue errorHandler 自动捕获并上报。</p>
      </article>
    </section>
  </main>
</template>

<script>
import api from "@/api";

export default {
  name: "TrackerTestArea",
  methods: {
    async simulateApiError() {
      try {
        await api.get("/api/track/mock-error");
      } catch (error) {
        // API 模块已经负责提示和埋点，这里吞掉异常避免页面报错。
      }
    },
    simulateJsError() {
      throw new Error("tako-tracker vue runtime error test");
    },
  },
};
</script>

<style></style>
