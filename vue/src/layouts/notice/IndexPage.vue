<template>
  <main class="bg-white rounded-lg p-6 mx-auto" style="max-width: 900px">
    <el-page-header
      @back="$router.back()"
      class="py-4"
      content="公告"
    ></el-page-header>
    <v-md-preview :text="content"></v-md-preview>
  </main>
</template>

<script>
export default {
  data() {
    return {
      content: `
# 汽车销售管理平台介绍

## 项目背景

汽车销售管理系统是 2023 - 2024 第一学期的综合性期末项目，跨足以下核心课程：

1. Web 技术与应用

2. 软件工程

3. 数据库原理

我们致力于提供一套完整的汽车销售解决方案，并结合现代技术进行最佳实践。

## 技术栈

- 后端：使用 Nest.Js，基于 Node.Js 和 TypeScript 构建，使用 JWT 鉴权

- 前端：使用 Vue、Element UI、Echarts 和 TailwindCSS 设计用户界面

- 数据库：使用 MySQL，通过 Prisma ORM 和 SQL 进行操作

- 云计算：华为云耀云服务器 HECS、七牛云对象存储 Kodo、七牛云内容分发网络 CDN

- 部署：Ubuntu、使用 Nginx 进行反向代理

## 运行环境

Node.Js、MySQL

## 如何开始使用

1. 源代码（通过 zip 解压或 git 拉取）

\`\`\`shell
    git clone https://github.com/Tako0825/car-sales.git
\`\`\`

2. 配置 .env.example 示例文件为 .env 文件（补充数据库、七牛云等配置信息）

3. 安装 pnpm

\`\`\`shell
    npm install pnpm -g
\`\`\`

4. 安装依赖（nest 目录和 vue 目录下分别执行）

\`\`\`shell
    pnpm install
\`\`\`

5. 数据库迁徙
\`\`\`shell
    npx prisma db pull
\`\`\`

\`\`\`shell
    npx prisma generate
\`\`\`

6. 运行 nest 后台（nest 目录下执行）

\`\`\`shell
    pnpm dev
\`\`\`

7. 运行 vue 前台（vue 目录下执行）

\`\`\`shell
    pnpm run dev
\`\`\`

8. 访问项目（http://localhost:8080）

## 反馈与支持

如果您在使用过程中遇到任何问题、有建议，或者对我们的项目有任何反馈，请随时联系我们（2060364922@qq.com）。我们欢迎您的反馈，以帮助我们不断改进和优化平台。

这是我们在大学学习过程中一个重要的期末项目，代表了我们对专业技术的深入理解和实际运用，感谢您选择我们的汽车销售管理平台！感谢您的支持！
            `,
    };
  },
};
</script>
