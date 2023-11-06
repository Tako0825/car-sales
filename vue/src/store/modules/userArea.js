import api from "@/api/api"

export default {
    namespaced: true,
    state() {
        return {
            // 用户列表
            source: new Array(),
            userTotal: 0,
            // 分页配置
            page: 1,
            pageSize: 10,
            // 用户详情 & 编辑卡片
            dialogTableVisible: false,
            dialogFormVisible: false,
        }
    },
    getters: {
        getPage: state => state.page,
        getPageSize: state => state.pageSize,
        getUserTotal: state => state.userTotal,
        getSource: state => state.source,
        getDialogTableVisible: state => state.dialogTableVisible,
        getDialogFormVisible: state => state.dialogFormVisible
    },
    mutations: {
        setPage: (state, payload) => { state.page = payload },
        setPageSize: (state, payload) => { state.pageSize = payload },
        setUserTotal: (state, payload) => { state.userTotal = payload },
        setSource: (state, payload) => { state.source = payload },
        setDialogTableVisible: (state, payload) => { state.dialogTableVisible = payload },
        setDialogFormVisible: (state, payload) => { state.dialogFormVisible = payload },
    },
    actions: {
        // 请求接口 - 分页获取用户信息
        async fetchSource({ state }) {
            return await api.get(`/api/user?page=${state.page}&pageSize=${state.pageSize}`, {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxODU3NjY5NDM2NiIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5MjU1NDc0LCJleHAiOjE3MDE4NDc0NzR9.9ivnO8lYXlw9ews3ioPj3QjIc8Ij2ef7mLawPx6bhfw"
            })
        }
    }
}