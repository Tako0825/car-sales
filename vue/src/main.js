import Vue from 'vue';
import App from './App.vue';
import RegisterPlugins from './plugins';
import "../theme/message.css"

// IGNORE WARNING(忽略警告)
Vue.config.productionTip = false

// PLUGINS(注册插件)
const { store, router } = RegisterPlugins()
const app = new Vue({
  store,  
  router,
  render: h => h(App),
})
app.$mount('#app')