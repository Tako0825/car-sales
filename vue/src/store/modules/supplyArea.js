import api from "@/api/api"

export default {
    namespaced: true,
    state() {
        return {
            // 用户相关配置
            source: new Array(),
            supplyTotal: 0,
            supply: null,
            // 分页相关配置
            page: 1,
            pageSize: 20,
            // 状态相关配置
            dataReady: false,
            dialogTableVisible: false,
            dialogFormVisible: false,
            // ----- SKYWORTH TOKEN - ADMIN -----
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxMTExMTExMTExMSIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5MjgzMTQ5LCJleHAiOjE3MDE4NzUxNDl9.R4rJQ0fTZJ4Boa1gnmDj6QuLRMZiSO75QfD-6VWaNjE",
            // ----- SKYWORTH TOKEN - USER ------
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxMjM0NTY3ODkwMCIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5MjgxNjg1LCJleHAiOjE3MDE4NzM2ODV9.55c8CWU1Qkl8OSARjsAjbfp5wLDYJMX7uxneNfP7kk8",
            // ----- LENOVO TOKEN USER -----
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxODU3NjY5NDM2NiIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5MjU1NDc0LCJleHAiOjE3MDE4NDc0NzR9.9ivnO8lYXlw9ews3ioPj3QjIc8Ij2ef7mLawPx6bhfw",
            // ----- LENOVO TOKEN ADMIN -----
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxMTExMTExMTExMSIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5Mjc0NzE0LCJleHAiOjE3MDE4NjY3MTR9.RxTk50d4UWxXt-Ar21XfrtKjBbgrUUbYogadvhIH56w"
        }
    },
    getters: {
        getSource: state => state.source,
        getSupplyTotal: state => state.supplyTotal,
        getSupply: state => state.supply,
        getPage: state => state.page,
        getPageSize: state => state.pageSize,
        getDataReady: state => state.dataReady,
        getDialogTableVisible: state => state.dialogTableVisible,
        getDialogFormVisible: state => state.dialogFormVisible,
    },
    mutations: {
        setSource: (state, payload) => { state.source = payload },
        setSupplyTotal: (state, payload) => { state.supplyTotal = payload },
        setSupply: (state, payload) => { state.supply = payload },
        setPage: (state, payload) => { state.page = payload },
        setPageSize: (state, payload) => { state.pageSize = payload },
        setDataReady: (state, payload) => { state.dataReady = payload },
        setDialogTableVisible: (state, payload) => { state.dialogTableVisible = payload },
        setDialogFormVisible: (state, payload) => { state.dialogFormVisible = payload },
    },
    actions: {
        // 请求接口 - 分页获取供应商信息
        async fetchSource({ state, commit }) {   
            const response = await api.get(`/api/supply?page=${state.page}&pageSize=${state.pageSize}`,{ token: state.token })
            commit("setSupplyTotal", response.supplyTotal)
            return response
        }
    }
}