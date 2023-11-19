export default {
    path: "/login",
    meta: { auth: false, title: "登录界面"},
    name: "login",
    component: () => import("@/layouts/login/IndexPage.vue"),
}