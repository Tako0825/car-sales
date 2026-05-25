import { trackerContext } from "./context";

export function createTrackerOptions() {
  return {
    endpoint: "http://localhost:3000/api/track/batch",
    appId: "car-sales-admin",
    appName: "Car Sales Admin",
    release: "0.1.0",
    env: "dev",
    getUser: () => trackerContext.store?.getters?.getUser,
    getRoute: () => {
      if (typeof window === "undefined") {
        return "";
      }

      return `${window.location.pathname}${window.location.search}`;
    },
  };
}
