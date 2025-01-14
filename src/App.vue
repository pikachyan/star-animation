<script>
	import {mapState} from "vuex";
  wx.cloud.init({
    env:'find-star-0gi8dl41091136d1',
    traceUser: true,
  });
  const db = wx.cloud.database()
  export default {
    globalData:{
      // 图片路径前缀
      BASE_URL:"",
      safeArea:null,
      env:null
    },
		onLaunch() {

      uni.loadFontFace({
        global:true,
        family:'DingTalk-JinBuTi',
        source:'url("https://api.ow123.net/statics/garden/DingTalk-JinBuTi.ttf")',
        success:res=>{
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
        success:res=>{
          console.log(res)
        },
        fail:err=>{
          console.log(err)
        }
      })
      let env=uni.getAccountInfoSync().miniProgram.envVersion
      console.log("----当前运行环境："+env)
      this.globalData.env=env





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
      // 监听用户信息
      if(uni.getStorageSync('user_id')){
        db.collection('user').doc(uni.getStorageSync('user_id')).watch({
          onChange:snapshot=>{
            console.log('用户信息变化', snapshot)
            this.$store.commit('updateUser',snapshot.docs[0])
          },
          onError: err=> {
            console.error('用户信息监听出错', err)
          }
        })
      }
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

		},
    watch:{
      isLogin(){
        if(this.isLogin){
          // 获取任务表
          db.collection('user-activity-2025').where({
            user_id:db.command.eq(this.user_id),
            // 任务完成情况 1未完成2已完成
            complete_type:db.command.eq(1)
          }).get().then(res=>{
            console.log(res)
          })
        }else{
          this.$store.commit('logOut')
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
