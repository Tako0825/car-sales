import api from "@/api";

export default {
  namespaced: true,
  state() {
    return {
      // 供应记录相关配置
      source: new Array(),
      supplyTotal: 0,
      supply: null,
      // 分页相关配置
      page: 1,
      pageSize: 15,
      // 状态相关配置
      dataReady: false,
      dialogFormVisible: false,
    };
  },
  getters: {
    getSource: (state) => state.source,
    getSupplyTotal: (state) => state.supplyTotal,
    getSupply: (state) => state.supply,
    getPage: (state) => state.page,
    getPageSize: (state) => state.pageSize,
    getDataReady: (state) => state.dataReady,
    getDialogFormVisible: (state) => state.dialogFormVisible,
  },
  mutations: {
    setSource: (state, payload) => {
      state.source = payload;
    },
    setSupplyTotal: (state, payload) => {
      state.supplyTotal = payload;
    },
    setSupply: (state, payload) => {
      state.supply = payload;
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
    setDialogFormVisible: (state, payload) => {
      state.dialogFormVisible = payload;
    },
  },
  actions: {
    // 请求接口 - 分页获取供应记录
    async fetchSource({ state, commit }) {
      const response = await api.get(
        `/api/supply?page=${state.page}&pageSize=${state.pageSize}`,
        { token: localStorage.getItem("token") },
      );
      commit("setSupplyTotal", response.supplyTotal);
      return response;
    },
    // 请求接口 - 获取所有供应商
    async fetchSuppliers() {
      return await api.get(`/api/supplier`, {
        token: localStorage.getItem("token"),
      });
    },
    // 请求接口 - 获取所有产品
    async fetchProducts() {
      return await api.get(`/api/product`, {
        token: localStorage.getItem("token"),
      });
    },
    // 请求接口 - 获取所有仓库
    async fetchWarehouses() {
      return await api.get(`/api/warehouse`, {
        token: localStorage.getItem("token"),
      });
    },
    // 请求接口 - 创建供应记录
    async createSupply(context, payload) {
      await api.post(`/api/supply`, payload, {
        token: localStorage.getItem("token"),
      });
    },
    // 请求接口 - 删除供应记录
    async deleteSupply(context, payload) {
      await api.delete(`/api/supply/${payload}`, {
        token: localStorage.getItem("token"),
      });
    },
  },
};
