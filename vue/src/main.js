import Vue from 'vue';
import App from './App.vue';
import RegisterPlugins from './plugins';
import { router } from './plugins/router';
import "../theme/message.css"

// IGNORE WARNING(忽略警告)
Vue.config.productionTip = false

// PLUGINS(注册插件)
RegisterPlugins()
const app = new Vue({
  router,
  render: h => h(App),
})
app.$mount('#app')