import { RegisterElement } from "./element";
import { RegisterRouter } from "./router";
import { RegisterStore } from "./store";
import { RegisterMarkdown } from "./markdown";

export const store = RegisterStore()
export const router = RegisterRouter()
RegisterElement()
RegisterMarkdown()