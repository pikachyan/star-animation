<script>
	import {mapState} from "vuex";
  let userInfoHandler,userActivityFileHandler
  wx.cloud.init({
    env:'find-star-0gi8dl41091136d1',
    traceUser: true,
  });
  const db = wx.cloud.database()
  const _=db.command
  export default {
    globalData:{
      // 图片路径前缀
      BASE_URL:"",
      safeArea:null,
      env:null
    },
		onLaunch() {
      let env=uni.getAccountInfoSync().miniProgram.envVersion
      console.log("----当前运行环境："+env)
      this.globalData.env=env

      uni.loadFontFace({
        global:true,
        family:'DingTalk-JinBuTi',
        source:'url("https://api.ow123.net/statics/garden/DingTalk-JinBuTi.ttf")',
        success: res=>{
          console.log(res)
        },
        fail:err=>{
          console.log(err)
        }
      })
      uni.loadFontFace({
        global:true,
        family:'alm',
        source:'url("https://api.ow123.net/statics/garden/alm.ttf")',
        success: res=>{
          console.log(res)
        },
        fail:err=>{
          console.log(err)
        }
      })
      //  监听活动配置
      db.collection('activity').watch({
        onChange:snapshot=>{
          console.log('活动配置变化', snapshot)
          this.$store.commit('updateActivityList',snapshot.docs)
        },
        onError: err=> {
          console.error('活动配置变化监听出错', err)
        }
      })

      //  监听任务表
      db.collection('task').watch({
        onChange:snapshot=>{
          console.log('任务表变化', snapshot)
          this.$store.commit('updateTaskList',snapshot.docs)
        },
        onError: err=> {
          console.error('任务表变化监听出错', err)
        }
      })
      console.log('当前生效的活动配置',this.activeActivityConfig)

		},
    watch:{
      '$store.state.isLogin':{
        deep: true,
        handler(){
          console.log('app 登录状态',this.$store.state.isLogin)
          if(this.$store.state.isLogin){
            // 监听用户信息
            userInfoHandler = db.collection('user')
                .doc(uni.getStorageSync('user_id'))
                .watch({
                  onChange:snapshot=>{
                    console.log('用户信息变化', snapshot)
                    this.$store.commit('updateUser',snapshot.docs[0])
                  },
                  onError: err=> {
                    console.error('用户信息监听出错', err)
                  }
                })
            //   检查用户的活动配置 如无则创建
            db.collection('user-activity-2025').where({
              user_id: _.eq(uni.getStorageSync('user_id'))
            }).get().then(res=>{
              console.log(res)
              if(res.data.length===0){
                let params={
                  user_id:this.$store.state.user_id,
                  // 是否已领取礼物
                  getGiftType:0,
                  // 有无刷新次数
                  hasMissionRefresh:0,
                  // 完成任务的总分
                  score_total:0,
                }
                console.log('没有配置')
                db.collection('user-activity-2025').add({
                  data:params
                }).then(res=>{
                  console.log(res)
                  if(res.errMsg.includes('add:ok')){
                    this.$store.commit('updateUserActivityFile',params)
                  }
                })
              }else{
                userActivityFileHandler= db.collection('user-activity-2025').where({
                  user_id:_.eq(this.$store.state.user_id)
                }).watch({
                  onChange:snapshot=>{
                    console.log('用户活动档案信息变化', snapshot)
                    this.$store.commit('updateUserActivityFile',snapshot.docs[0])
                  },
                  onError: err=> {
                    console.error('用户活动档案信息监听出错', err)
                  }
                })
              }
            })
          }else{
            userActivityFileHandler.close()
            userInfoHandler.close()
            userActivityFileHandler=null
            userInfoHandler=null
            // this.$store.commit('logOut')
          }

        }

      }
    },
    computed:{
      ...mapState(['isLogin','user_id'])
    }
	}
</script>
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
@import "static/iconfont/iconfont.css";
view,text,div,page,body{
  font-family: DingTalk-JinBuTi;
}

</style>
