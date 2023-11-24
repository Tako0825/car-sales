export default [
  {
    path: "/",
    component: () => import("@/layouts/home/IndexPage.vue"),
    meta: { title: "工作台", icon: "el-icon-pie-chart" },
    children: [
      {
        path: "",
        name: "dashboard",
        meta: { auth: true, role: [ "USER", "ADMIN", "ROOT" ]},
        component: () => import("@/layouts/home/DashboardArea.vue"),
      }
    ]
  },
  {
    path: "/user",
    component: () => import("@/layouts/home/IndexPage.vue"),
    meta: { title: "员工总览", icon: "el-icon-user" }, 
    children: [
      {
        path: "",
        name: "user",
        meta: { auth: true, role: [ "USER", "ADMIN", "ROOT" ] },
        component: () => import("@/layouts/home/UserArea.vue"),
      }
    ]
  },
  {
    path: "/product",
    component: () => import("@/layouts/home/IndexPage.vue"),
    meta: { title: "汽车总览", icon: "el-icon-shopping-cart-2" },
    children: [
      {
        path: "",
        name: "product",
        meta: { auth: true, role: [ "USER", "ADMIN", "ROOT" ]},
        component: () => import("@/layouts/home/ProductArea.vue"),
      }
    ]
  },
  {
    path: "/warehouse",
    component: () => import("@/layouts/home/IndexPage.vue"),
    meta: { title: "仓库总览", icon: "el-icon-box" },
    children: [
      {
        path: "",
        name: "warehouse",
        meta: { auth: true, role: [ "USER", "ADMIN", "ROOT" ]},
        component: () => import("@/layouts/home/WarehouseArea.vue"),
      }
    ]
  },
  {
    path: "/supplier",
    meta: { title: "供应商总览", icon: "el-icon-office-building"},
    component: () => import("@/layouts/home/IndexPage.vue"),
    children: [
      {
        path: "",
        name: "supplier",
        meta: { auth: true, role: [ "USER", "ADMIN", "ROOT" ] },
        component: () => import("@/layouts/home/SupplierArea.vue"),
      }
    ]
  },
  {
    path: "/order",
    meta: { title: "订单管理", icon: "el-icon-document-copy"},
    component: () => import("@/layouts/home/IndexPage.vue"),
    children: [
      {
        path: "",
        name: "order",
        meta: { auth: true, role: [ "USER", "ADMIN", "ROOT" ] },
        component: () => import("@/layouts/home/OrderArea.vue"),
      }
    ]
  },
  {
    path: "/supply",
    meta: { title: "供应记录", icon: "el-icon-view" },
    component: () => import("@/layouts/home/IndexPage.vue"),
    children: [
      {
        path: "",
        name: "supply",
        meta: { auth: true, role: [ "USER", "ADMIN", "ROOT" ] },
        component: () => import("@/layouts/home/SupplyArea.vue"),
      }
    ]
  }
]