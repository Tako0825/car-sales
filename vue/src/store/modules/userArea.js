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
            const response = await api.get(`/api/user?page=${state.page}&pageSize=${state.pageSize}`, { token: localStorage.getItem("token") })
            commit("setUserTotal", response.userTotal)
            return response
        },
        // 请求接口 - 获取指定用户
        async fetchUser(context, payload) {
            const response = await api.get(`/api/user/${payload}`, { token: localStorage.getItem("token") })
            const user = response.user
            user.date = new Date(user.joined_date).getTime()
            user.time = new Date(user.joined_date).getTime()
            return user
        },
        // 请求接口 - 修改指定用户
        async updateUser(context, payload) {
            await api.patch(`/api/user/${payload.id}`, payload.data , { token: localStorage.getItem("token") })
        },
        // 请求接口 - 注册用户
        async registerUser(context, payload) {
            await api.post(`/api/auth/register`, payload, { token: localStorage.getItem("token") })
        },
        // 请求接口 - 判断电话是否已注册
        async isPhoneExisted(context, payload) {
            const response = await api.get(`/api/user/phone/${payload}`, { token: localStorage.getItem("token") })
            return response
        },
        // 请求接口 - 删除用户
        async deleteUser(context, payload) {
            await api.delete(`/api/user/${payload}`, { token: localStorage.getItem("token") })
        },
        // 请求接口 - 查询用户详情
        async fetchUserDetail({ commit }, payload) {
            const response = await api.get(`/api/user/${payload}/order`, { token: localStorage.getItem("token") })
            commit("setUserDetail", response)
            return response
        }
    }
}