export default {
  path: "/notice",
  meta: { title: "通知" },
  component: () => import("@/layouts/home/IndexPage.vue"),
  children: [
    {
      path: "",
      name: "notice",
      meta: { auth: true, role: ["USER", "ADMIN", "ROOT"] },
      component: () => import("@/layouts/notice/IndexPage.vue"),
    },
  ],
};
