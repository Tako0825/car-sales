import App from "./App.vue";
import { store, router } from "./plugins";
import { setupTracker } from "./tracker";

// IGNORE WARNING(忽略警告)
Vue.config.productionTip = false;

setupTracker({ router, store });

// PLUGINS(注册插件)
const app = new Vue({
  store,
  router,
  render: (h) => h(App),
});
app.$mount("#app");
