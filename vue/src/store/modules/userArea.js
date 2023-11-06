import api from "@/api/api"

export default {
    namespaced: true,
    state() {
        return {
            // 用户列表
            source: new Array(),
            userTotal: 0,
            // 下列状态可设置默认值
            page: 1,
            pageSize: 15
        }
    },
    getters: {
        getPage(state) {
            return state.page
        },
        getPageSize(state) {
            return state.pageSize
        },
        getUserTotal(state) {
            return state.userTotal
        },
        getSource(state) {
            return state.source
        }
    },
    mutations: {
        setPage(state, payload) {
            state.page = payload
        },
        setPageSize(state, payload) {
            state.pageSize = payload
        },
        setUserTotal(state, payload) {
            state.userTotal = payload
        },
        setSource(state, payload) {
            state.source = payload
        }
    },
    actions: {
        // 请求 - 用户列表
        async fetchSource({ state }) {
            return await api.get(`/api/user?page=${state.page}&pageSize=${state.pageSize}`, {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsicGhvbmUiOiIxODU3NjY5NDM2NiIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5MjU1NDc0LCJleHAiOjE3MDE4NDc0NzR9.9ivnO8lYXlw9ews3ioPj3QjIc8Ij2ef7mLawPx6bhfw"
            })
        }
    }
}