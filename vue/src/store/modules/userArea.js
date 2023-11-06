import api from "@/api/api"

export default {
    namespaced: true,
    state() {
        return {
            // 用户列表
            source: new Array(),
            page: 1,
            pageSize: 15,
            // other
            dataReady: false,
            userTotal: 0,
        }
    },
    getters: {
        getPage(state) {
            return state.page
        },
        getPageSize(state) {
            return state.pageSize
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
        setSource(state, payload) {
            state.source = payload
        }
    },
    actions: {
        // 请求 - 用户列表
        async fetchSource({ state }) {
            const { data } = await api.get(`/api/user?page=${state.page}&pageSize=${state.pageSize}`, {
                token: "eyJwYXJhbXMiOnsicGhvbmUiOiIxMjM0NTY3ODkwMCIsImhhc2giOiIyNDBiZTUxOGZhYmQyNzI0ZGRiNmYwNGVlYjFkYTU5Njc0NDhkN2U4MzFjMDhjOGZhODIyODA5Zjc0YzcyMGE5In0sInNpZ24iOiJjYXJzYWxlIiwiaWF0IjoxNjk5MjQwMjk4LCJleHAiOjE3MDE4MzIyOTh9"
            })
            return data
        }
    }
}