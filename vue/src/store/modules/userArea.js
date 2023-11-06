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
            user: null,
            dialogTableVisible: false,
            dialogFormVisible: false,
            // ----- SKYWORTH TOKEN - ADMIN -----
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxMTExMTExMTExMSIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5MjgzMTQ5LCJleHAiOjE3MDE4NzUxNDl9.R4rJQ0fTZJ4Boa1gnmDj6QuLRMZiSO75QfD-6VWaNjE",
            // ----- SKYWORTH TOKEN - USER ------
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxMjM0NTY3ODkwMCIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5MjgxNjg1LCJleHAiOjE3MDE4NzM2ODV9.55c8CWU1Qkl8OSARjsAjbfp5wLDYJMX7uxneNfP7kk8",
            // ----- LENOVO TOKEN -----
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxODU3NjY5NDM2NiIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5MjU1NDc0LCJleHAiOjE3MDE4NDc0NzR9.9ivnO8lYXlw9ews3ioPj3QjIc8Ij2ef7mLawPx6bhfw",
        }
    },
    getters: {
        getUser: state => state.user,
        getPage: state => state.page,
        getPageSize: state => state.pageSize,
        getUserTotal: state => state.userTotal,
        getSource: state => state.source,
        getDialogTableVisible: state => state.dialogTableVisible,
        getDialogFormVisible: state => state.dialogFormVisible
    },
    mutations: {
        setUser: (state, payload) => { state.user = payload },
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
            return await api.get(`/api/user?page=${state.page}&pageSize=${state.pageSize}`, { token: state.token })
        },
        // 请求接口 - 获取指定用户
        async fetchUser({ state }, payload) {
            const response = await api.get(`/api/user/${payload}`, { token: state.token })
            const user = response.user
            user.date = new Date(user.joined_date).getTime()
            user.time = new Date(user.joined_date).getTime()
            return user
        },
        // 请求接口 - 修改指定用户
        async updateUser({ state }, payload) {
            console.log(`/api/user/${payload.id}`);
            console.log(payload.data);
            await api.patch(`/api/user/${payload.id}`, payload.data , { token: state.token })
        }
    }
}