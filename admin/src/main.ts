import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import router from './router'
import axios from 'axios'
import Crud from './plugins/crud'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
Vue.use(Crud)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
