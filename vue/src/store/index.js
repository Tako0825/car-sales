import userArea from "./modules/userArea";
import productArea from "./modules/productArea";

export default () => {
    return {
        modules: {
            userArea,
            productArea
        }
    }
}