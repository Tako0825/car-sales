export default {
    namespaced: true,
    state() {
        return {
            // 分类列表
            categoryList: new Array(),
            pageNum: 1,
            pageSize: 10
        }
    },
    getters: {
        // 获取 - 分类列表
        getCategoryList(state) {
            return state.categoryList
        }
    },
    mutations: {
        // 修改 - 分类列表
        setCategoryList(state, payload) {
            state.categoryList = payload
        }
    },
    actions: {
        // 请求 - 分类列表
        async fetchCategoryList({ state }) {
            const { data } = await http("/articles/category/all", {
                method: "GET",
                data: {
                    pageNum: state.pageNum,
                    pageSize: state.pageSize
                }
            })
            return data
        }
    }
}