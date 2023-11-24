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
            const response = await api.get(`/api/warehouse?page=${state.page}&pageSize=${state.pageSize}`,{ token: localStorage.getItem("token") })
            commit("setWarehouseTotal", response.warehouseTotal)
            return response
        },
        // 请求接口 - 创建仓库
        async createWarehouse(context, payload) {
            await api.post(`/api/warehouse`, payload, { token: localStorage.getItem("token") })
        },
        // 请求接口 - 获取指定的仓库信息
        async fetchWarehouse(context, payload) {
            const response = await api.get(`/api/warehouse/${payload}`, { token: localStorage.getItem("token") })
            return response.warehouse
        },
        // 请求接口 - 修改仓库信息
        async updateWarehouse(context, payload) {
            await api.patch(`/api/warehouse/${payload.id}`, payload.data, { token: localStorage.getItem("token") })
        },
        // 请求接口 - 删除仓库信息
        async deleteWarehouse(context, payload) {
            await api.delete(`/api/warehouse/${payload}`, { token: localStorage.getItem("token") })
        }
    }
}