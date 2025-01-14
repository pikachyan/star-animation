import Vue from 'vue'
import App from './App'
import '@/static/font.css'
import CusTabbar from "@/components/cus-tabbar/cus-tabbar.vue";
// import lottie from '@/common/lottie-miniprogram.js'
import store from "@/store/index";
import uView from "uview-ui";

Vue.config.productionTip = false
Vue.component('cus-tabbar',CusTabbar)
App.mpType = 'app'
import vuex from 'vuex'
Vue.use(uView);
Vue.use(vuex);



store.subscribe((mutation, state) => {
  console.log('Vuex state:', state);
})
const app = new Vue({
  ...App,store
})
app.$mount()
