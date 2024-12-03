import Vue from 'vue'
import App from './App'
import CusTabbar from "@/components/cus-tabbar/cus-tabbar.vue";
Vue.config.productionTip = false
Vue.component('cus-tabbar',CusTabbar)
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
