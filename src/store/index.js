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

        },
        activityList:[]
    },
    mutations: {
        updateUser(state,data){
            uni.setStorageSync('user_id',data._id)
            uni.setStorageSync('user_info',data)
            uni.setStorageSync('isLogin',true)
            state.userInfo=data
            state.user_id=data._id
            state.isLogin=true
        },
        updateActivityList(state,data){
            state.activityList=data
        }
    },
    actions:{
         async createUser(commit,data){

        },
    },
})
