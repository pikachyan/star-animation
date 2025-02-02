import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 剧情读到哪一篇
        storyIndex:-1,
        storyReading: false,
        activityType:'waiting',
        isLogin:false,
        // 当前页面的ID
        pageIndex: 0,
        // 用户id
        user_id:'',
        // 用户信息
        userInfo:{

        },
        userActivityFile:null,
        activityList:[],
        activeActivityConfig:null,
        // 用户抽取的任务表
        missionList:[
            // {task_info:{task_name:'',task_grade:''}},
            // {task_info:{task_name:'',task_grade:''}},
            // {task_info:{task_name:'',task_grade:''}},
            // {task_info:{task_name:'',task_grade:''}},
        ],
        // 活动总任务表
        taskList:[],
        // 活动总分
        activity_total_score:0,
    },
    getters:{
      getActivityType(state){
          return state.activityType
      }
    },
    mutations: {
        updateUserActivityFile(state,data){
          state.userActivityFile=data
        },
        logOut(state){
            state.isLogin=false
            state.user_id=''
            state.userInfo={}
            uni.removeStorageSync('user_id')
            state.missionList=[]
        },
        updateTaskList(state,data){
           state.taskList=data
        },
        updateOneMission(state,data){
          let {replaceIndex,obj}=data
          state.missionList[replaceIndex]=obj
        },
        updateMissionList(state,data){
            state.missionList=data
        },
        updateUser(state,data){
            uni.setStorageSync('user_id',data._id)
            uni.setStorageSync('user_name',data.name)
            uni.setStorageSync('user_avatar',data.avatarImg)
            state.userInfo=data
            state.user_id=data._id
            state.isLogin=true
        },
        updateActivityList(state,data){
            state.activityList=data
            state.activeActivityConfig=data.filter(item=>item.effectActive)[0]
            console.log('activeActivityConfig',data.filter(item=>item.effectActive)[0])
        }
    },
    actions:{
         async createUser(commit,data){

        },
    },
})
