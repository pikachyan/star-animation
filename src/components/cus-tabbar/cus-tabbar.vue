<template>
  <view class="tabbar-content">
    <view class="bkg">
      <image mode="widthFix" src="@/static/background.svg" :style="{width: '100vw',height: bkgHeight}" :show-menu-by-longpress="false"></image>
    </view>
    <view @click="switchPage(index)" class="tabbar-content-item active-icon" v-for="(item,index) in list"  :key="index">
      <image v-if="index==pageIndex" src="@/static/icons/menu-selected-icon.png" style="width: 50px;height: 50px"></image>
      <text class="title" :style="index===3?'font-size:16px':''" :class="{'title-sele':index==pageIndex}" style="z-index: 5">{{item}}</text>
    </view>
<!-- 底部补色   -->
    <view style="z-index:-1;width:100vw;position: absolute;left: 0;bottom: 0;height: 60rpx;background: #f0f0f0"></view>
  </view>
</template>

<script>
import {mapGetters, mapActions, mapMutations, mapState} from 'vuex';
export default {
  components: {},
  mixins: [],
  created() {
    this.bkgHeight=(uni.getWindowInfo().screenHeight/uni.getWindowInfo().screenWidth)*uni.getWindowInfo().pixelRatio*100+'px'
  },
  mounted() {

  },
  watch: {},
  computed: {
    ...mapState(['pageIndex']),
  },
  props: {
  },
  data() {
    return {
      list:['任务','积分','故事','联系我们'],
      bkgHeight:0,
    }
  },

  methods: {
    switchPage(pageIndex) {
      if(pageIndex!==this.pageIndex)
      this.$store.state.pageIndex=pageIndex;
    }
  },

}
</script>

<style lang='scss' scoped>

.tabbar-content{
  //background: #f0f0f0;
  display: flex;
  position: fixed;
  width: 100vw;
  //height: 105px;
  bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom) ;
  padding-bottom: env(safe-area-inset-bottom) ;
  left:0;
  right:0;
  margin:0 auto;
  &-item{
    z-index: 4;
    height: 100px;
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .title{
      white-space: nowrap;
      position: absolute;
      font-size: 19px;
      left:50%;
      transform: translateX(-50%);
      font-family: alm;
      word-break: normal;
      &-sele{
        color: #009fe7;
        text-shadow: 0px 0px 2px rgba(255, 255, 255, 1);
      }
    }
    .active-icon{

    }
  }
  .bkg{
    position: absolute;
    left: 0;
    bottom: 0;
    width:100%;
  }
}
</style>
