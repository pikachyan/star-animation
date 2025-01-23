<template>
  <view class="content" >
    <text style="color:#f6f6f6;font-family: alm;position: fixed;top:-20px;left: 0">1</text>
    <view v-if="videoDownloadIng">
      <view class="downloadTxt" style="width:200px;">正在加载资源</view>
      <u-line-progress inactiveColor="#fff" height="20px" :percentage="progress" activeColor="#9fcbf2"></u-line-progress>
    </view>
    <template v-else>
      <view v-if="showVideoBox" class="video-content">
        <video
            id="video"
            autoplay
            object-fit="fill"
            @ended="onPlayEnd"
            :show-loading="false"
            :show-center-play-btn="false"
            :controls="false"
            :enable-progress-gesture="false"
            style="width: 100vw"
            :style="{height:videoHeight+'px'}"
            :src="videoUrl"
        >
        </video>
      </view>
      <template v-else >
        <text v-if="checking"  class="waiting">请稍等……</text>
        <template v-else>
          <!--    有数据    -->
          <template v-if="showUsedUser">
            <text style="display:flex;text-align:center;line-height:35px;font-size: 22px;justify-content:center;width: 100%;">
              发现了一个休眠中的角色
              你还记得他吗？
            </text>
            <view style="margin:20px 0;width: 120px;height: 120px">
              <u-image width="120px" height="120px" shape="circle" :src="userInfo.avatarImg"></u-image>
            </view>
            <text style="font-family: alm;font-size: 16px">{{userInfo.name}}</text>
            <view style="width: 240px;margin-top: 20px">
              <u-button @click="userContinue" size="large" type="warning" plain shape="circle" text="我记得，继续使用该角色"></u-button>
            </view>
            <view style="width: 240px;margin-top: 20px">
              <u-button size="large" @click="toCreateUser" shape="circle" text="我忘了，转生到下一世吧"></u-button>
            </view>
          </template>
          <!--     创建角色    -->
          <template v-if="showCreateUser">
            <text style="color:#4c77c5;font-family:alm;font-size: 60rpx;margin-bottom: 50px">“入梦使”</text>
            <view style="line-height:60rpx;color:#4c77c5;font-family:alm;font-size: 50rpx">请告诉<text @click="showTakeUser=true" style="font-family:alm;color:#24b0a8">我</text><text style="font-family:alm;color:#c44c74">们</text></view>
            <text style="line-height:60rpx;color:#4c77c5;font-family:alm;font-size: 50rpx">你的身份</text>
            <view style="margin:20px 0;">
              <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <view style="height:100%;color:#ddd;display:flex;justify-content:center;align-items:center;font-size: 60px" v-if="img===''">?</view>
                <image v-else :lazy-load="false" style="height: 100%;width: 100%" class="avatar" :src="img" mode="widthFix"></image>
              </button>
            </view>
            <view style="width: 130px">
              <u-input
                  v-model="userName"
                  type="nickname"
                  fontSize="20px"
                  placeholderStyle="font-size:21px;font-family:alm;"
                  clearable
                  inputAlign="center"
                  placeholder="你的名称是"
                  border="bottom"
              ></u-input>
            </view>
            <view style="margin-top: 30px">
              <button @click="$u.debounce(register,1000,true)" style="box-shadow:0 3px 2px 2px #bababa;border-radius:100px;align-items:center;display:flex;justify-content:center;width: 100px;height: 100px;background: #fdad13">
                <text style="font-size:22px;font-family:alm;height: 100%;display: flex;align-items: center">登录</text>
              </button>
            </view>
          </template>
          <view style="width: 240px;margin-top: 20px;display: flex">
            <u-text @click="userContinue(1)" align="center"  decoration="underline" text="先随便看看"></u-text>
            <u-text @click="videoPlay" align="center" text="再次播放OP"></u-text>
          </view>
          <view v-if="showCreateUser&&hasUserId" style="width: 240px;margin-top: 20px;display: flex">
            <u-text @click="showUsedUser=true;showCreateUser=false" color="#C8C5C5" align="center" text="使用已保存的注册资料"></u-text>
          </view>
        </template>
      </template>
    </template>

    <u-modal
        title="取回角色"
        asyncClose
      :show="showTakeUser"
      :showCancelButton="false"
      @close="showTakeUser=false"
        closeOnClickOverlay
        @confirm="takeUser"
    >
      <u-input v-model="id_value" placeholder="输入用户id" border="bottom"></u-input>
    </u-modal>
  </view>
</template>

<script>
import {mapState} from 'vuex';
import {getUserInfo} from "@/api/userApi";
import {createUser} from "../../api/userApi";

export default {
  components: {},
  mixins: [],
  beforeCreate() {

  },
  created() {
    this.hasUserId=!!uni.getStorageSync('user_id')
    if(uni.getStorageSync('skip_login_2025')&&uni.getStorageSync('user_id')){
      uni.switchTab({
        url:'/pages/index/index'
      })
    }
    this.paddingTop=uni.getMenuButtonBoundingClientRect().bottom+3
    let videoDownUrl=''
    uni.getSystemInfo({
      success:(res)=> {
        const screenWidth = res.screenWidth; // 屏幕宽度
        const screenHeight = res.screenHeight; // 屏幕高度

        // 计算屏幕比例
        const ratio = screenHeight / screenWidth;
        if (Math.abs(ratio - 16 / 9) < 0.01) {
          console.log("屏幕比例接近 16:9");
          this.videoHeight=(1920/1080)*uni.getWindowInfo().screenWidth
          videoDownUrl='https://6669-find-star-0gi8dl41091136d1-1316449395.tcb.qcloud.la/%E5%BC%80%E5%B1%8F.mp4'
        } else {
          console.log("屏幕比例为:", ratio);
          this.videoHeight=(2280/1080)*uni.getWindowInfo().screenWidth
          videoDownUrl='https://6669-find-star-0gi8dl41091136d1-1316449395.tcb.qcloud.la/%E5%BC%80%E5%B1%8F19-9.mp4'
        }
      }
    });
    if(uni.getStorageSync('opening_2025')){
      this.showVideoBox=false
      this.checkUser()
      this.videoDownloadIng=false
    }else{
      this.videoDownloadIng=true
      const downLoad =  uni.downloadFile({
        url:videoDownUrl,
        timeout:10000,
        success:res=>{
          console.log('下载',res)
          // fs.saveFileSync({
          //   tempFilePath: res.tempFilePath,
          //   filePath: wx.env.USER_DATA_PATH + "/" + videoDownUrl.includes('19-9')?'op2.mp4':'op1.mp4',
          // })
          this.videoUrl=res.tempFilePath
        }
      })
      downLoad.onProgressUpdate(res=>{
        this.progress=res.progress
      })
    }
  },
  watch: {
    progress(){
      if(this.progress===100){
        setTimeout(()=>{
          this.videoDownloadIng=false
        },1000)
      }
    }
  },
  computed: {
    ...mapState([])
  },
  props: [],
  data() {
    return {
      id_value:'',
      showTakeUser:false,
      hasUserId:false,
      videoDownloadIng:false,
      progress:0,

      videoUrl:'',
      userInfo:{},
      videoHeight:0,
      paddingTop:0,
      showVideoBox:true,
      // 有没有上一年的id
      haveUserId:false,
      checking:true,
      showCreateUser:false,
      showUsedUser:false,



      userName:'',
      img:''
    }
  },

  methods: {
    takeUser(){
      getUserInfo(this.id_value).then(res=>{
        console.log(res)
        this.$store.commit('updateUser',res.data)
        uni.$u.toast('取回角色成功')
        uni.reLaunch({
          url:'/pages/index/index'
        })
      }).catch(e=>{
        uni.$u.toast('取回角色异常')
      })
    },
    videoPlay(){
      // this.showVideoBox=true
      // const videoCtx = uni.createVideoContext('video')
      // console.log(videoCtx)
      // videoCtx.play()
      uni.removeStorageSync('opening_2025')
      uni.reLaunch({
        url:'/pages/login/index'
      })
    },
    register(){
      console.log(111111111)
      if(this.userName===''){
       return  uni.$u.toast('请输入名字/ᐠ𝅒 ‸ 𝅒ᐟ\\ﾉ')
      }else if(this.img===''){
        return  uni.$u.toast('请上传头像/ᐠ𝅒 ‸ 𝅒ᐟ\\ﾉ')
      }
      uni.showLoading({mask:true})
      createUser(this.userName,this.img).then(res=>{
        console.log('创建角色',res)
        if(res.errMsg.includes('add:ok')){
          this.$store.commit('updateUser',{_id:res._id})
          uni.hideLoading()
          uni.$u.toast('创建角色成功')
          uni.setStorageSync('skip_login_2025',1)
          setTimeout(()=>{
            uni.reLaunch({
              url:'/pages/index/index'
            })
          },1000)

        }else{
          uni.$u.toast('创建角色异常')
        }
      })
    },
    onChooseAvatar(e){
      console.log(e)
      const { avatarUrl } = e.detail
      this.img = 'data:image/jpeg;base64,' + wx.getFileSystemManager().readFileSync(avatarUrl, 'base64')

    },
    toCreateUser(){
      setTimeout(()=>{
        this.checking=false
        this.showUsedUser=false
        this.showCreateUser=true
      },1000)
    },
    checkUser(){
      const id=uni.getStorageSync("user_id");
      if(id){
        getUserInfo(id).then(res=>{
          console.log(res)
          this.userInfo=res.data
          setTimeout(()=>{
            this.checking=false
            this.showUsedUser=true
            this.showCreateUser=false
          },1000)
        }).catch(e=>{
          console.log('登录页登录异常')
          this.toCreateUser()
        })
      }else{
        this.toCreateUser()
      }

    },
    onPlayEnd(e){
      console.log('播放结束')
      this.showVideoBox=false
      uni.setStorageSync('opening_2025',1)
      this.checkUser()
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
<style>
page{background: #f2f2f2;}
button::after{
  border: none;
}
button{
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0px;
  padding-right: 0px;
  box-sizing: border-box;

  text-align: center;
  text-decoration: none;

  line-height: 1.35;

  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: #000000;
  background-color: #fff;
  width: 100%;
  height: 100%;
}
</style>
<style lang='scss' scoped>
.avatar-wrapper{
  width: 90px;
  height: 90px;
  border-radius: 8px;
  box-shadow: 0 0 2px 2px #e4e4e4;
}
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
.downloadTxt{
  margin-bottom:15px;
  color:#4c4c4c;
  font-family: alm;
  font-size: 24px;
  line-height: 30px;
  animation: fade linear 4s  infinite;
}
.waiting{
  font-size: 26px;
  font-family: alm;
  animation:fade linear 2s infinite;
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
