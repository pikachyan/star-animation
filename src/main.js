import Vue from 'vue'
import App from './App'
import '@/static/font.css'
import CusTabbar from "@/components/cus-tabbar/cus-tabbar.vue";
// import lottie from '@/common/lottie-miniprogram.js'

Vue.config.productionTip = false
Vue.component('cus-tabbar',CusTabbar)
App.mpType = 'app'
import uView from "uview-ui";
import vuex from 'vuex'
Vue.use(uView);
Vue.use(vuex);
import store from "@/store/index";
const app = new Vue({
  ...App,store
})
app.$mount()
