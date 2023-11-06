import { RegisterElement } from "./element";
import { RegisterRouter } from "./router";
import { RegisterStore } from "./store";

export default function RegisterPlugins() {
    const store = RegisterStore()
    const router = RegisterRouter()
    RegisterElement()
    return {
        store,
        router
    }
}