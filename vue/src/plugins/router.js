import Vue from "vue"
import VueRouter from "vue-router"
import routes from "@/routes/index"
import api from "@/api/api"

export const RegisterRouter = () => {
    Vue.use(VueRouter)
    // Vue Router 实例
    const router = new VueRouter({
        mode: "history",
        routes: routes()
    })

    // 路由守卫 - 验证路由所需角色权限
    router.beforeEach(async (to, from, next) => {
        console.log(to);
        // 路由需要权限
        if (to.meta.auth) {
            // 获取 token
            const token = localStorage.getItem('token');

            // 没有 token, 重定向到登录页面
            if (!token) {
                next('/login')
            } else {
                // 有 token, 验证 token 的有效性
                try {
                    const response = await api.get(`/api/auth/login`, { token })

                    // 获取用户信息
                    const user = response.user

                    // 用户角色不符合，重定向到登录页面或其他适当的页面
                    if (!to.meta.role.includes(user.role)) {
                        next('/login')
                    } 
                    // 用户角色符合，继续导航
                    else {
                        next()
                    }
                } catch (error) {
                    // 验证 token 失败，重定向到登录页面
                    next('/login')
                }
            }
        }
        // 路由不需要权限，直接继续导航
        else {
            next()
        }
    })

    return router
}