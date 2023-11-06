import Vue from "vue"
import VueRouter from "vue-router"
import routes from "@/routes/index"

export const RegisterRouter = () => {
    Vue.use(VueRouter)
    return new VueRouter({
        mode: "history",
        routes: routes()
    })
}