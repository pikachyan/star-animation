<template>
  <view style="box-sizing: border-box;padding: 0 30px;align-items:center;display: flex;flex-direction: column">
    <top-placeholder></top-placeholder>
    <template v-if="!loading">
      <view class="user-box" @click="showUserBox">
        <view style="width: 120px;height: 120px;margin-right: 10px">
          <u-image
              shape="circle"
              :showMenuByLongpress="false"
              :lazyLoad="false"
              width="120px"
              height="120px"
              :src="isLogin?userInfo.avatarImg:'https://6669-find-star-0gi8dl41091136d1-1316449395.tcb.qcloud.la/%E6%B8%B8%E5%AE%A2.png'"
          ></u-image>
        </view>
        <view class="right">
          <user-grade-tag :score="isLogin?userActivityFile.score_total:0"></user-grade-tag>
          <text style="line-height:40px;color:#fff;font-size: 25px;">{{isLogin?'ID:':'Tourist'}}</text>
          <text class="name" style="line-height:40px;color:#fff;font-size: 25px;font-family: alm">
            {{isLogin?userInfo.name:'游客'}}
          </text>
        </view>
      </view>
      <view class="score-box">
        <view style="box-sizing: border-box;padding: 0 10px">
          <text style="font-size: 22px;color: #fff;margin-right: 10px">{{rankTxt.title}}</text>
          <text style="font-size: 14px;color: #fff">{{rankTxt.subTitle||'创建角色进行活动'}}</text>
        </view>
        <view class="score-inner">
          <text class="score">{{isLogin?userActivityFile.score_total:'**'}}</text>
          <text class="i-text">已获积分</text>
          <text class="i-text" style="font-size: 140rpx">POINT</text>
        </view>
        <view class="tip-text">完成任务，即可获取积分</view>
      </view>
      <view style="width: 70%;margin-top: 20px" v-if="isLogin">
        <u-button
            :disabled="userActivityFile.getGiftType===1"
            @click="showGiftQRcode=true"
            :custom-style="giftButtonStyle"
            size="large"
            :text="userActivityFile.getGiftType===1?'已完成兑换':'兑换礼物'"
        ></u-button>
      </view>
    </template>
    <u-modal
      :show="showGiftQRcode"
      :showConfirmButton="false"
      closeOnClickOverlay
      @close="showGiftQRcode=false"
    >
      <canvas type="2d"  id="qrcode" canvas-id="qrcode" style="width: 150px;height:150px;align-self: center;margin:5px 0" />
    </u-modal>
    <user-box ref="userBoxRef"></user-box>
  </view>
</template>

<script>
import weappQRcode from "@/utils/weapp.qrcode.esm";
import {mapState} from "vuex";
import TopPlaceholder from "@/components/top-placeholder.vue";
import UserGradeTag from "@/components/user-grade-tag.vue";
import UserBox from "@/components/user-box.vue";

export default {
  components: {UserBox, UserGradeTag, TopPlaceholder},
  created() {
    uni.showLoading()
  },
  mounted() {
    setTimeout(()=>{
      this.$nextTick(()=>{
        uni.hideLoading()
        this.loading=false
      })
    },500)
  },
  watch: {
    showGiftQRcode(){
      if(this.showGiftQRcode){
        this.$nextTick(()=>{
          const query = wx.createSelectorQuery().in(this)
          query.select('#qrcode')
              .fields({
                node: true,
                size: true
              })
              .exec(async res => {
                const canvas = res[0].node
                // 调用方法drawQrcode生成二维码
                await weappQRcode({
                  canvas: canvas,
                  canvasId: 'qrcode',
                  width: 150,
                  height: 150,
                  background: '#ffffff',
                  foreground: '#000000',
                  text:this.userActivityFile._id,
                })
              })
        })
      }
    },
    pageIndex(){
      this.$refs.userBoxRef.onClose()
    },
    '$store.state.userActivityFile.getGiftType':{
      deep:true,
      handler(n,o){
        if(0===1){
          this.showGiftQRcode=false
        }
      }
    }
  },
  computed: {
    ...mapState(['pageIndex','user_id','isLogin','userInfo','userActivityFile']),
    rankTxt(){
        if(!this.userActivityFile)return null
        return [
                {title:'初韵级',subTitle:'初入梦境，尚需精进'},
                {title:'精湛级',subTitle:'技力纯熟，经验丰厚'},
                {title:'登峰级',subTitle:'凤毛麟角，佼佼天骄'},
                {title:'绮星级',subTitle:'浩浩天地，悠悠星海，从此任君行'},
              ][this.userActivityFile.score_total < 40 ? parseInt(this.userActivityFile.score_total / 10) : 3]
    }
  },
  props: [],
  data() {
    return {
      showGiftQRcode:false,
      loading:true,
      giftButtonStyle:{
        borderRadius:'8px',
        color:'#fff',
        fontFamily:'alm',
        border:'3px solid #fce370',
        backgroundColor:'#f19c50',
      },
      scoreBackUrl:'cloud://find-star-0gi8dl41091136d1.6669-find-star-0gi8dl41091136d1-1316449395/GotPoints01-024.svg'
    }
  },

  methods: {
    showUserBox(){
      if(!this.isLogin)return
      this.$refs.userBoxRef.onOpen();
    }
  },

}
</script>

<style lang='scss' scoped>
button{font-family: alm}
.user-box {
  display: flex;
  .right{
    display: flex;
    flex-direction: column;
  }
}
.score-box{
  margin-top:40px;

}
.score-inner{
  margin-top: 10px;
  position: relative;
  width: 100%;
  height: 300rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 18px;
  border: 3px solid rgba(255,255,255,0.9);
  .i-text{
    font-size: 110rpx;
    color: rgba(255,255,255,0.2);
    font-family: alm;
    word-spacing: 5px;
  }
}
.score{
  font-size:160rpx;
  color:rgba(255,255,255,1);
  position: absolute;
  top:50%;left: 50%;
  transform: translate(-50%,-50%);
  font-family: alm;
}
.tip-text{
  width: 100%;
  text-align: center;
  color: #fff;
  line-height: 40px;
  font-size: 16px;
  font-family: alm;
}
.name{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
