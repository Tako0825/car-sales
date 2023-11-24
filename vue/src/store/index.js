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
        },
        getters: {
            getUser: (state) => state.user,
        },
        mutations: {
            setUser: (state, payload) => { state.user = payload },
            clearUser: (state) => { state.user = null }
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