<template>
  <view class="content" >
    <text style="color:#f6f6f6;font-family: alm;position: fixed;top:-20px;left: 0">1</text>
    <view v-if="showVideoBox" class="video-content">
      <video
          autoplay
          object-fit="fill"
          @ended="onPlayEnd"
          :show-loading="false"
          :show-center-play-btn="false"
          :controls="false"
          :enable-progress-gesture="false"
          style="width: 100vw"
          :style="{height:videoHeight+'px',marginTop:paddingTop+'px'}"
          :src="videoUrl"
      >
      </video>
    </view>
    <template v-else >
      <text v-if="checking" style="font-size: 20px;" class="waiting">请稍等......</text>
      <template v-else>
<!--    有数据    -->
          <text style="display:flex;text-align:center;line-height: 25px;font-size: 22px;justify-content:center;width: 100%;font-family: alm">
            检查到有上一届活动创建的角色
              你还有印象吗？
          </text>
        <view style="margin:20px 0;width: 120px;height: 120px">
          <u-image width="120px" height="120px" shape="circle" :src="userInfo.avatarImg"></u-image>
        </view>
        <text style="font-family: alm;font-size: 16px">{{userInfo.name}}</text>
        <view style="width: 240px;margin-top: 20px">
          <u-button @click="userContinue" size="large" type="warning" plain shape="circle" text="我记得，继续使用该数据"></u-button>
        </view>
        <view style="width: 240px;margin-top: 20px">
          <u-button size="large" shape="circle" text="我忘了，转生到下一世吧"></u-button>
        </view>
        <view style="width: 240px;margin-top: 20px">
          <u-text @click="userContinue(1)" align="center"  decoration="underline" text="先随便看看"></u-text>
        </view>
      </template>
    </template>

  </view>
</template>

<script>
import {mapState,mapGetters, mapActions, mapMutations} from 'vuex';
import {getUserInfo} from "@/api/userApi";

export default {
  components: {},
  mixins: [],
  beforeCreate() {
    if(uni.getStorageSync('skip_login_2025')){
      uni.reLaunch({
        url:'/pages/index/index'
      })
    }
  },
  created() {
    uni.getSystemInfo({
      success:(res)=> {
        const screenWidth = res.screenWidth; // 屏幕宽度
        const screenHeight = res.screenHeight; // 屏幕高度

        // 计算屏幕比例
        const ratio = screenHeight / screenWidth;
        if (Math.abs(ratio - 16 / 9) < 0.01) {
          console.log("屏幕比例接近 16:9");
          this.videoUrl='cloud://find-star-0gi8dl41091136d1.6669-find-star-0gi8dl41091136d1-1316449395/开屏.mp4'
        } else {
          console.log("屏幕比例为:", ratio);
          this.videoUrl='cloud://find-star-0gi8dl41091136d1.6669-find-star-0gi8dl41091136d1-1316449395/开屏.mp4'
        }
      }
    });
    this.videoHeight=(1920/1080)*uni.getWindowInfo().screenWidth
    this.paddingTop=uni.getMenuButtonBoundingClientRect().bottom+3
    if(uni.getStorageSync('opening_2025')){
      this.showVideoBox=false
    }

  },
  mounted() {

  },
  onLoad(ctx) {

  },
  onReady() {

  },
  onShow() {

  },
  watch: {
  },
  computed: {
    ...mapState([])
  },
  props: [],
  data() {
    return {
      videoUrl:'',
      userInfo:{},
      videoHeight:0,
      paddingTop:0,
      showVideoBox:true,
      // 有没有上一年的id
      haveUserId:false,
      checking:true
    }
  },

  methods: {
    onPlayEnd(e){
      console.log('播放结束')
      this.showVideoBox=false
      uni.setStorageSync('opening_2025',1)
    },
    // 继续使用原数据
    userContinue(e){
      if(e){
        this.$store.commit('logOut')
      }
      uni.setStorageSync('skip_login_2025',1)
      uni.reLaunch({
        url:'/pages/index/index'
      })
    }
  },

}
</script>
<style>page{background: #f2f2f2;}</style>
<style lang='scss' scoped>
.video-content{
  position: fixed;
  top: 0;
  height:100vh;
  width: 100vw;
  left: 0;
  display: flex;

}
@keyframes fade {
  0%{
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
.waiting{
  font-family: alm;
  animation:fade infinite ;
}
.create-user-box{
  display: flex;
  font-family: alm;
  animation:fade  1s linear;
}
.content{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content:center;
  align-items: center;
  flex-direction: column;
}
</style>
