<script>
	export default {
    globalData:{
      // 图片路径前缀
      BASE_URL:"",
      safeArea:null,
      env:null
    },
		onLaunch() {
			// console.log('App Launch')
      wx.cloud.init({
        env:'find-star-0gi8dl41091136d1',
        traceUser: true,
      });
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
      this.globalData.safeArea=uni.getWindowInfo().safeArea
      this.globalData.statusBarHeight=uni.getWindowInfo().statusBarHeight
      this.globalData.version='V1.1.0'
      let env=uni.getAccountInfoSync().miniProgram.envVersion
      console.log("----当前运行环境："+env)
      this.globalData.env=env




      const db = wx.cloud.database()
      //  监听活动配置
      db.collection('activity').watch({
        onChange:snapshot=>{
          console.log('活动配置变化', snapshot)
          this.$store.commit('updateActivityList',snapshot.docs)
        },
        onError: err=> {
          console.error('活动配置变化监听出错', err)
          uni.$u.toast('活动配置变化监听出错')
        }
      })
      // 监听用户信息
      if(uni.getStorageSync('user_id')){
        db.collection('user').doc(uni.getStorageSync('user_id')).watch({
          onChange:snapshot=>{
            console.log('用户信息变化', snapshot)

          },
          onError: err=> {
            console.error('用户信息监听出错', err)
          }
        })
      }
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
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
