export default   {
    path: "/space",
    component: () => import("@/layouts/home/IndexPage.vue"),
    meta: { title: "我的" },
    children: [
      {
        path: "",
        name: "space",
        meta: { auth: true, role: [ "USER", "ADMIN", "ROOT" ]},
        component: () => import("@/layouts/space/IndexPage.vue"),
      }
    ]
  }