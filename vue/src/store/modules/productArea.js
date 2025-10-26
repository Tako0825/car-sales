import api from "@/api";

export default {
  namespaced: true,
  state() {
    return {
      // 产品相关配置
      source: new Array(),
      productTotal: 0,
      product: null,
      // 图表相关配置
      chartSource: null,
      // 分页相关配置
      page: 1,
      pageSize: 12,
      // 状态相关配置
      dataReady: false,
      drawer: false,
      dialogFormVisible: false,
    };
  },
  getters: {
    getSource: (state) => state.source,
    getChartSource: (state) => state.chartSource,
    getProductTotal: (state) => state.productTotal,
    getProduct: (state) => state.product,
    getPage: (state) => state.page,
    getPageSize: (state) => state.pageSize,
    getDataReady: (state) => state.dataReady,
    getDrawer: (state) => state.drawer,
    getDialogFormVisible: (state) => state.dialogFormVisible,
  },
  mutations: {
    setSource: (state, payload) => {
      state.source = payload;
    },
    setChartSource: (state, payload) => {
      state.chartSource = payload;
    },
    setProductTotal: (state, payload) => {
      state.productTotal = payload;
    },
    setProduct: (state, payload) => {
      state.product = payload;
    },
    setPage: (state, payload) => {
      state.page = payload;
    },
    setPageSize: (state, payload) => {
      state.pageSize = payload;
    },
    setDataReady: (state, payload) => {
      state.dataReady = payload;
    },
    setDrawer: (state, payload) => {
      state.drawer = payload;
    },
    setDialogFormVisible: (state, payload) => {
      state.dialogFormVisible = payload;
    },
  },
  actions: {
    // 请求接口 - 分页获取产品信息
    async fetchSource({ state, commit }) {
      const response = await api.get(
        `/api/product?page=${state.page}&pageSize=${state.pageSize}`,
        { token: localStorage.getItem("token") },
      );
      commit("setProductTotal", response.productTotal);
      return response;
    },
    // 请求接口 - 获取指定产品信息
    async fetchProduct(context, payload) {
      return await api.get(`/api/product/${payload}`, {
        token: localStorage.getItem("token"),
      });
    },
    // 请求接口 - 创建产品
    async createProduct(context, payload) {
      await api.post(`/api/product`, payload, {
        token: localStorage.getItem("token"),
      });
    },
    // 请求接口 - 删除产品
    async deleteProduct(context, payload) {
      await api.delete(`/api/product/${payload}`, {
        token: localStorage.getItem("token"),
      });
    },
  },
};
