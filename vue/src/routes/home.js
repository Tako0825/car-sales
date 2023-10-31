export default [
  {
    path: "/",
    meta: { auto: true, title: "工作台", icon: "el-icon-pie-chart"},
    component: () => import("@/layouts/home/IndexPage.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/views/home/main-area/DashboardView.vue"),
      }
    ]
  },
  {
    path: "/user",
    meta: { auto: true, title: "员工总览", icon: "el-icon-user"},
    component: () => import("@/layouts/home/IndexPage.vue"),
    children: [
      {
        path: "",
        name: "user",
        component: () => import("@/views/home/main-area/UserView.vue"),
      }
    ]
  },
  {
    path: "/product",
    meta: { auto: true, title: "产品总览", icon: "el-icon-shopping-cart-2"},
    component: () => import("@/layouts/home/IndexPage.vue"),
    children: [
      {
        path: "",
        name: "product",
        component: () => import("@/views/home/main-area/UserView.vue"),
      }
    ]
  },
  {
    path: "/warehouse",
    meta: { auto: true, title: "仓库总览", icon: "el-icon-box"},
    component: () => import("@/layouts/home/IndexPage.vue"),
    children: [
      {
        path: "",
        name: "warehouse",
        component: () => import("@/views/home/main-area/UserView.vue"),
      }
    ]
  },
  {
    path: "/supplier",
    meta: { auto: true, title: "供应商总览", icon: "el-icon-office-building"},
    component: () => import("@/layouts/home/IndexPage.vue"),
    children: [
      {
        path: "",
        name: "supplier",
        component: () => import("@/views/home/main-area/UserView.vue"),
      }
    ]
  },
  {
    path: "/order",
    meta: { auto: true, title: "订单管理", icon: "el-icon-document-copy"},
    component: () => import("@/layouts/home/IndexPage.vue"),
    children: [
      {
        path: "",
        name: "order",
        component: () => import("@/views/home/main-area/UserView.vue"),
      }
    ]
  },
  {
    path: "/supply",
    meta: { auto: true, title: "供应记录", icon: "el-icon-view"},
    component: () => import("@/layouts/home/IndexPage.vue"),
    children: [
      {
        path: "",
        name: "supply",
        component: () => import("@/views/home/main-area/UserView.vue"),
      }
    ]
  },
  {
    path: "/move",
    meta: { auto: true, title: "调仓记录", icon: "el-icon-house"},
    component: () => import("@/layouts/home/IndexPage.vue"),
    children: [
      {
        path: "",
        name: "move",
        component: () => import("@/views/home/main-area/UserView.vue"),
      }
    ]
  },
]