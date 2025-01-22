<template>
  <view style="box-sizing: border-box;padding: 0 40px;align-items:center;display: flex;flex-direction: column">
    <top-placeholder></top-placeholder>
    <template v-if="isLogin">
      <view class="user-box" @click="showUserBox">
        <view style="width: 120px;height: 120px;margin-right: 10px">
          <u-image
              shape="circle"
              :showMenuByLongpress="false"
              :lazyLoad="false"
              width="120px"
              height="120px"
              :src="userInfo.avatarImg"
          ></u-image>
        </view>
        <view class="right">
          <user-grade-tag :score="userActivityFile.score_total"></user-grade-tag>
          <text style="line-height:40px;color:#fff;font-size: 25px;">ID:</text>
          <text class="name" style="line-height:40px;color:#fff;font-size: 25px;font-family: alm">{{ userInfo.name}}</text>
        </view>
      </view>
      <view class="score-box">
        <view style="box-sizing: border-box;padding: 0 10px">
          <text style="font-size: 22px;color: #fff;margin-right: 10px">{{rankTxt.title}}</text>
          <text style="font-size: 14px;color: #fff">{{rankTxt.subTitle}}</text>
        </view>
        <view class="score-inner">
          <text class="score">{{userActivityFile.score_total}}</text>
          <text class="i-text">已获积分</text>
          <text class="i-text" style="font-size: 70px">POINT</text>
        </view>
        <view class="tip-text">完成任务，即可获取积分</view>
      </view>
      <view style="width: 70%;margin-top: 20px">
        <u-button :custom-style="giftButtonStyle" size="large" text="兑换礼物"></u-button>
      </view>
    </template>


    <user-box ref="userBoxRef"></user-box>
  </view>
</template>

<script>
import {mapState} from "vuex";
import TopPlaceholder from "@/components/top-placeholder.vue";
import UserGradeTag from "@/components/user-grade-tag.vue";
import UserBox from "@/components/user-box.vue";

export default {
  components: {UserBox, UserGradeTag, TopPlaceholder},
  created() {

  },
  mounted() {

  },
  watch: {
    pageIndex(){
      this.$refs.userBoxRef.onClose()
    }
  },
  computed: {
    ...mapState(['pageIndex','user_id','isLogin','userInfo','userActivityFile']),
    rankTxt(){
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
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 18px;
  border: 3px solid rgba(255,255,255,0.9);
  .i-text{
    font-size: 55px;
    color: rgba(255,255,255,0.2);
    font-family: alm;
    word-spacing: 5px;
  }
}
.score{
  font-size:80px;
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
