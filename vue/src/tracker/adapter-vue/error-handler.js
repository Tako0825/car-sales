import { ERROR_KIND } from "tako-tracker";
import { trackerContext } from "./context";

export function createVueErrorHandler(tracker) {
  return (error, vm, info) => {
    tracker.trackError(
      {
        message: error?.message || "Vue runtime error",
        stack: error?.stack,
        filename: vm?.$options?.name || vm?.$options?._componentTag || "anonymous",
        componentName:
          vm?.$options?.name || vm?.$options?._componentTag || "anonymous",
        info,
      },
      ERROR_KIND.VUE,
    );

    if (!trackerContext.hasShownVueErrorTip && Vue.prototype?.$message) {
      trackerContext.hasShownVueErrorTip = true;
      Vue.prototype.$message.error("JS 报错已被 SDK 自动捕获并上报");
      window.setTimeout(() => {
        trackerContext.hasShownVueErrorTip = false;
      }, 1000);
    }
  };
}

export function installVueErrorHandler(tracker) {
  const originalErrorHandler = Vue.config.errorHandler;
  const sdkErrorHandler = createVueErrorHandler(tracker);

  Vue.config.errorHandler = (error, vm, info) => {
    sdkErrorHandler(error, vm, info);

    if (typeof originalErrorHandler === "function") {
      originalErrorHandler.call(Vue, error, vm, info);
    }
  };
}
