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

## 立即体验

[http://takoko.top](http://takoko.top) 

> 账号：10000000000（11位）
> 
> 密码：admin123

![image.png](http://cdn.takoko.top/markdown/login1.jpg)

## 运行环境

Node.Js、MySQL

## 如何开始使用

1. 源代码（通过 zip 解压或 git 拉取）
    
```shell
    git clone https://github.com/Tako0825/car-sales.git 
```

2. 配置 .env.example 示例文件为 .env 文件（补充数据库、七牛云等配置信息）

3. 安装 pnpm

```shell
    npm install pnpm -g
```

4. 安装依赖（根目录和 vue 目录下分别执行）

```shell
    pnpm install
```

5. 数据库迁徙


```shell
    npx prisma generate
```

```shell
    npx prisma migrate dev
```
6. 运行 nest 后台（根目录下执行）

```shell
    pnpm dev
```

7. 运行 vue 前台（vue 目录下执行）

```shell
    pnpm run serve
```

8. 访问项目（http://localhost:8080）

## 主要功能模块

### 1. 工作台模块

- 提供 Echarts 可视化图表来展示销售业务的相关数据


![image.png](http://cdn.takoko.top/markdown/dashboard1.jpg)

### 2. 员工模块

- 实现员工信息管理，包括基本信息和权限控制。
- 支持角色和权限系统，确保安全可控的员工管理。


![image.png](http://cdn.takoko.top/markdown/user1.jpg)

![image.png](http://cdn.takoko.top/markdown/user2.jpg)

![image.png](http://cdn.takoko.top/markdown/user3.jpg)

![image.png](http://cdn.takoko.top/markdown/user4.jpg)

### 3. 汽车产品模块

- 提供详细的汽车信息，包括型号、售价、车型、简介等。

![image.png](http://cdn.takoko.top/markdown/product1.jpg)

![image.png](http://cdn.takoko.top/markdown/product2.jpg)

![image.png](http://cdn.takoko.top/markdown/product3.jpg)


### 4. 仓库模块

- 追踪汽车库存情况，包括每辆汽车的状态和位置。

![image.png](http://cdn.takoko.top/markdown/warehouse1.jpg)

![image.png](http://cdn.takoko.top/markdown/warehouse2.jpg)

![image.png](http://cdn.takoko.top/markdown/warehouse3.jpg)

### 5. 供应商模块

- 管理供应商信息，包括基本信息和联系方式。
- 提供报表和统计功能，方便分析供应链表现。

![image.png](http://cdn.takoko.top/markdown/supplier1.jpg)

![image.png](http://cdn.takoko.top/markdown/supplier2.jpg)

![image.png](http://cdn.takoko.top/markdown/supplier3.jpg)

### 6. 订单模块

- 管理订单生命周期，包括创建、编辑和取消订单。
- 记录订单状态，确保对销售流水的完整掌控。

![image.png](http://cdn.takoko.top/markdown/order1.jpg)

![image.png](http://cdn.takoko.top/markdown/order2.jpg)

### 7. 供应记录模块

- 记录与供应商之间的交易信息，包括供应数量、时间、产品等。

![image.png](http://cdn.takoko.top/markdown/supply1.jpg)

![image.png](http://cdn.takoko.top/markdown/supply2.jpg)


## 反馈与支持

如果您在使用过程中遇到任何问题、有建议，或者对我们的项目有任何反馈，请随时联系我们（2060364922@qq.com）。我们欢迎您的反馈，以帮助我们不断改进和优化平台。

这是我们在大学学习过程中一个重要的期末项目，代表了我们对专业技术的深入理解和实际运用，感谢您选择我们的汽车销售管理平台！感谢您的支持！