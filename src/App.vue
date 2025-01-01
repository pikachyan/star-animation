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
@font-face{
  font-family: DingTalk-JinBuTi;
  src:url('https://6669-find-star-0gi8dl41091136d1-1316449395.tcb.qcloud.la/DingTalk-JinBuTi.ttf?sign=38b736662924261e9a6c59284168fcdf&t=1735578761')
}
view,text,input,textarea,div,page,body{
  font-family: DingTalk-JinBuTi;
}
</style>
