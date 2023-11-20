import userArea from "./modules/userArea";
import productArea from "./modules/productArea";
import warehouseArea from "./modules/warehouseArea";
import supplierArea from "./modules/supplierArea";
import orderArea from "./modules/orderArea";
import supplyArea from "./modules/supplyArea";

export default () => {
    return {
        state: {
            user: null,
            token: ""
        },
        getters: {
            getUser: (state) => state.user,
            getToken: (state) => state.token 
        },
        mutations: {
            setUser: (state, payload) => { state.user = payload },
            setToken: (state, payload) => { state.token = payload },
            clearUser: (state) => { state.user = null },
            clearToken: (state) => { state.token = "" }
        },
        modules: {
            userArea,
            productArea,
            warehouseArea,
            supplierArea,
            orderArea,
            supplyArea
        }
    }
}