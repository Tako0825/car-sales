import userArea from "./modules/userArea";
import productArea from "./modules/productArea";
import warehouseArea from "./modules/warehouseArea";
import supplierArea from "./modules/supplierArea";
import orderArea from "./modules/orderArea";
import supplyArea from "./modules/supplyArea";
import moveArea from "./modules/moveArea";

export default () => {
    return {
        modules: {
            userArea,
            productArea,
            warehouseArea,
            supplierArea,
            orderArea,
            supplyArea,
            moveArea
        }
    }
}