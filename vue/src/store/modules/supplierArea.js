import api from "@/api/api"

export default {
    namespaced: true,
    state() {
        return {
            // 供应商相关配置
            source: new Array(),
            supplierTotal: 0,
            supplier: null,
            // 分页相关配置
            page: 1,
            pageSize: 10,
            // 状态相关配置
            dataReady: false,
            dialogEditVisible: false,
            dialogFormVisible: false,
            // ----- SKYWORTH TOKEN - ADMIN -----
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxODg3NzQ0NTM2NiIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNzAwMDI1NTQ1LCJleHAiOjE3MDI2MTc1NDV9.WhJEmZw8r0zDUNLAm3CuwNyzhCRUQ_ZP4B4KUyMmgec",
            // ----- SKYWORTH TOKEN - USER ------
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxMjM0NTY3ODkwMCIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5MjgxNjg1LCJleHAiOjE3MDE4NzM2ODV9.55c8CWU1Qkl8OSARjsAjbfp5wLDYJMX7uxneNfP7kk8",
            // ----- LENOVO TOKEN USER -----
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxODU3NjY5NDM2NiIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5MjU1NDc0LCJleHAiOjE3MDE4NDc0NzR9.9ivnO8lYXlw9ews3ioPj3QjIc8Ij2ef7mLawPx6bhfw",
            // ----- LENOVO TOKEN ADMIN -----
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxMTExMTExMTExMSIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5Mjc0NzE0LCJleHAiOjE3MDE4NjY3MTR9.RxTk50d4UWxXt-Ar21XfrtKjBbgrUUbYogadvhIH56w"
        }
    },
    getters: {
        getSource: state => state.source,
        getSupplierTotal: state => state.supplierTotal,
        getSupplier: state => state.supplier,
        getPage: state => state.page,
        getPageSize: state => state.pageSize,
        getDataReady: state => state.dataReady,
        getDialogEditVisible: state => state.dialogEditVisible,
        getDialogFormVisible: state => state.dialogFormVisible,
    },
    mutations: {
        setSource: (state, payload) => { state.source = payload },
        setSupplierTotal: (state, payload) => { state.supplierTotal = payload },
        setSupplier: (state, payload) => { state.supplier = payload },
        setPage: (state, payload) => { state.page = payload },
        setPageSize: (state, payload) => { state.pageSize = payload },
        setDataReady: (state, payload) => { state.dataReady = payload },
        setDialogEditVisible: (state, payload) => { state.dialogEditVisible = payload },
        setDialogFormVisible: (state, payload) => { state.dialogFormVisible = payload },
    },
    actions: {
        // 请求接口 - 分页获取供应商信息
        async fetchSource({ state, commit }) {   
            const response = await api.get(`/api/supplier?page=${state.page}&pageSize=${state.pageSize}`,{ token: state.token })
            commit("setSupplierTotal", response.supplierTotal)
            return response
        },
        // 请求接口 - 创建供应商
        async createSupplier({ state }, payload) {
            await api.post(`/api/supplier`, payload, { token: state.token })
        },
        // 请求接口 - 获取指定的供应商信息
        async fetchSupplier({ state }, payload) {
            const response = await api.get(`/api/supplier/${payload}`, { token: state.token })
            return response.supplier
        },
        // 请求接口 - 修改供应商信息
        async updateSupplier({ state }, payload) {
            await api.patch(`/api/supplier/${payload.id}`, payload.data, { token: state.token })
        },
        // 请求接口 - 删除供应商
        async deleteSupplier({ state }, payload) {
            await api.delete(`/api/supplier/${payload}`, { token: state.token })
        }
    }
}