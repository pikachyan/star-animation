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
