import userArea from "./modules/userArea";
import productArea from "./modules/productArea";
import warehouseArea from "./modules/warehouseArea";
import supplierArea from "./modules/supplierArea";
import orderArea from "./modules/orderArea";
import supplyArea from "./modules/supplyArea";

export default () => {
    return {
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