import api from "@/api/api"

export default {
    namespaced: true,
    state() {
        return {
            // 用户相关配置
            source: new Array(),
            orderTotal: 0,
            order: null,
            // 分页相关配置
            page: 1,
            pageSize: 15,
            // 状态相关配置
            dataReady: false,
            dialogTableVisible: false,
            dialogFormVisible: false,
        }
    },
    getters: {
        getSource: state => state.source,
        getOrderTotal: state => state.orderTotal,
        getOrder: state => state.order,
        getPage: state => state.page,
        getPageSize: state => state.pageSize,
        getDataReady: state => state.dataReady,
        getDialogTableVisible: state => state.dialogTableVisible,
        getDialogFormVisible: state => state.dialogFormVisible,
    },
    mutations: {
        setSource: (state, payload) => { state.source = payload },
        setOrderTotal: (state, payload) => { state.orderTotal = payload },
        setOrder: (state, payload) => { state.order = payload },
        setPage: (state, payload) => { state.page = payload },
        setPageSize: (state, payload) => { state.pageSize = payload },
        setDataReady: (state, payload) => { state.dataReady = payload },
        setDialogTableVisible: (state, payload) => { state.dialogTableVisible = payload },
        setDialogFormVisible: (state, payload) => { state.dialogFormVisible = payload },
    },
    actions: {
        // 请求接口 - 分页获取供应商信息
        async fetchSource({ state, commit }) {   
            const response = await api.get(`/api/order?page=${state.page}&pageSize=${state.pageSize}`,{ token: localStorage.getItem("token") })
            commit("setOrderTotal", response.orderTotal)
            return response
        },
        // 请求接口 - 获取所有用户
        async fetchUsers() {
            return await api.get(`/api/user`, { token: localStorage.getItem("token") })
        },
        // 请求接口 - 获取所有产品
        async fetchProducts() {
            return await api.get(`/api/product`, { token: localStorage.getItem("token") })
        },
        // 请求接口 - 获取所有仓库
        async fetchWarehouses() {
            return await api.get(`/api/warehouse`, { token: localStorage.getItem("token") })
        },
        // 请求接口 - 获取相应产品的库存 
        async fetchProductInventory(context, payload) {
            return await api.get(`/api/product/${payload}/inventory`, { token: localStorage.getItem("token") })
        },
        // 请求接口 - 获取相应仓库的库存 
        async fetchWarehouseInventory(context, payload) {
            return await api.get(`/api/warehouse/${payload}/inventory`, { token: localStorage.getItem("token") })
        },
        // 请求接口 - 创建订单
        async createOrder(context, payload) {
            await api.post(`/api/order`, payload, { token: localStorage.getItem("token") })
        },
        // 请求接口 - 删除订单
        async deleteOrder(context, payload) {
            await api.delete(`/api/order/${payload}`, { token: localStorage.getItem("token") })
        }
    }
}