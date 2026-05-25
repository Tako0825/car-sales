import { createTracker } from "tako-tracker";
import { createTrackerOptions } from "./create-options";
import { trackerContext } from "./context";
import { installVueErrorHandler } from "./error-handler";

const tracker = createTracker(createTrackerOptions());

export function setupTracker({ router, store }) {
  trackerContext.store = store;

  installVueErrorHandler(tracker);
  tracker.attachVueRouter(router);
  tracker.init();

  Vue.prototype.$tracker = tracker;
  window.__TAKO_TRACKER__ = tracker;

  return tracker;
}

export default tracker;
