import api from "@/api/api"

export default {
    namespaced: true,
    state() {
        return {
            // 仓库相关配置
            source: new Array(),
            warehouseTotal: 0,
            warehouse: null,
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
        getWarehouseTotal: state => state.warehouseTotal,
        getWarehouse: state => state.warehouse,
        getPage: state => state.page,
        getPageSize: state => state.pageSize,
        getDataReady: state => state.dataReady,
        getDialogEditVisible: state => state.dialogEditVisible,
        getDialogFormVisible: state => state.dialogFormVisible,
    },
    mutations: {
        setSource: (state, payload) => { state.source = payload },
        setWarehouseTotal: (state, payload) => { state.warehouseTotal = payload },
        setWarehouse: (state, payload) => { state.warehouse = payload },
        setPage: (state, payload) => { state.page = payload },
        setPageSize: (state, payload) => { state.pageSize = payload },
        setDataReady: (state, payload) => { state.dataReady = payload },
        setDialogEditVisible: (state, payload) => { state.dialogEditVisible = payload },
        setDialogFormVisible: (state, payload) => { state.dialogFormVisible = payload },
    },
    actions: {
        // 请求接口 - 分页获取仓库信息
        async fetchSource({ state, commit }) {   
            const response = await api.get(`/api/warehouse?page=${state.page}&pageSize=${state.pageSize}`,{ token: state.token })
            commit("setWarehouseTotal", response.warehouseTotal)
            return response
        },
        // 请求接口 - 创建仓库
        async createWarehouse({ state }, payload) {
            await api.post(`/api/warehouse`, payload, { token: state.token })
        },
        // 请求接口 - 获取指定的仓库信息
        async fetchWarehouse({ state }, payload) {
            const response = await api.get(`/api/warehouse/${payload}`, { token: state.token })
            return response.warehouse
        },
        // 请求接口 - 修改仓库信息
        async updateWarehouse({ state }, payload) {
            await api.patch(`/api/warehouse/${payload.id}`, payload.data, { token: state.token })
        },
        // 请求接口 - 删除仓库信息
        async deleteWarehouse({ state }, payload) {
            await api.delete(`/api/warehouse/${payload}`, { token: state.token })
        }
    }
}