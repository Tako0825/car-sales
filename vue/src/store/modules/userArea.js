import api from "@/api/api"

export default {
    namespaced: true,
    state() {
        return {
            // 用户相关配置
            source: new Array(),
            user: null,
            userTotal: 0,
            userDetail: null,
            selectedId: null,
            // 上传相关配置
            file: null,
            previewImage: '',
            // 分页相关配置
            page: 1,
            pageSize: 10,
            // 状态相关配置
            dataReady: false,
            dialogTableVisible: false,
            dialogFormVisible: false,
            registerFormVisible: false,
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
        getUserTotal: state => state.userTotal,
        getUserDetail: state => state.userDetail,
        getUser: state => state.user,
        getSelectedId: state => state.selectedId,
        getFile: state => state.file,
        getPreviewImage: state => state.previewImage,
        getPage: state => state.page,
        getPageSize: state => state.pageSize,
        getDataReady: state => state.dataReady,
        getDialogTableVisible: state => state.dialogTableVisible,
        getDialogFormVisible: state => state.dialogFormVisible,
        getRegisterFormVisible: state => state.registerFormVisible
    },
    mutations: {
        setSource: (state, payload) => { state.source = payload },
        setUserTotal: (state, payload) => { state.userTotal = payload },
        setUserDetail: (state, payload) => { state.userDetail = payload },
        setUser: (state, payload) => { state.user = payload },
        setSelectedId: (state, payload) => { state.selectedId = payload },
        setFile: (state, payload) => { state.file = payload },
        setPreviewImage: (state, payload) => { state.previewImage = payload },
        setPage: (state, payload) => { state.page = payload },
        setPageSize: (state, payload) => { state.pageSize = payload },
        setDataReady: (state, payload) => { state.dataReady = payload },
        setDialogTableVisible: (state, payload) => { state.dialogTableVisible = payload },
        setDialogFormVisible: (state, payload) => { state.dialogFormVisible = payload },
        setRegisterFormVisible: (state, payload) => { state.registerFormVisible = payload },
    },
    actions: {
        // 请求接口 - 分页获取用户信息
        async fetchSource({ state, commit }) {
            const response = await api.get(`/api/user?page=${state.page}&pageSize=${state.pageSize}`, { token: state.token })
            commit("setUserTotal", response.userTotal)
            return response
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
            await api.patch(`/api/user/${payload.id}`, payload.data , { token: state.token })
        },
        // 请求接口 - 注册用户
        async registerUser({ state }, payload) {
            await api.post(`/api/auth/register`, payload, { token: state.token })
        },
        // 请求接口 - 判断电话是否已注册
        async isPhoneExisted({ state }, payload) {
            const response = await api.get(`/api/user/phone/${payload}`, { token: state.token })
            return response
        },
        // 请求接口 - 删除用户
        async deleteUser({ state }, payload) {
            await api.delete(`/api/user/${payload}`, { token: state.token })
        },
        // 请求接口 - 查询用户详情
        async fetchUserDetail({ state, commit }, payload) {
            const response = await api.get(`/api/user/${payload}/order`, { token: state.token })
            commit("setUserDetail", response)
            return response
        }
    }
}