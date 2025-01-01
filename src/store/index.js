import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin:false,
        // 当前页面的ID
        pageIndex: 0,
        // 用户id
        user_id:'',
        // 用户信息
        userInfo:{

        }
    },
    mutations: {

    },
    actions:{
         async createUser(commit,data){

        }
    }
})
