<template>
  <view>
    <view v-if="showVideoBox" class="video-content">
      <video
          autoplay
          @ended="onPlayEnd"
          :show-loading="false"
          :show-center-play-btn="false"
          :controls="false"
          :enable-progress-gesture="false"
          style="width: 100vw"
          :style="{height:videoHeight+'px',paddingTop:paddingTop+'px'}"
          src="cloud://find-star-0gi8dl41091136d1.6669-find-star-0gi8dl41091136d1-1316449395/开屏.mp4"
      >
      </video>
    </view>
    <view v-else class="create-user-box">

    </view>
  </view>
</template>

<script>
import {mapState,mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  components: {},
  mixins: [],
  created() {
    let whRadio=''
    this.videoHeight=uni.getWindowInfo().screenWidth*1920/1080
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
  watch: {},
  computed: {
    ...mapState([])
  },
  props: [],
  data() {
    return {
      videoHeight:0,
      paddingTop:0,
      showVideoBox:true,
      // 有没有上一年的id
      haveUserId:false,
    }
  },

  methods: {
    onPlayEnd(e){
      console.log('播放结束')
      this.showVideoBox=false
      uni.setStorageSync('opening_2025',1)
    }
  },

}
</script>

<style lang='scss' scoped>
.video-content{
  position: fixed;
  top: 0;
  height:100vh;
  width: 100vw;
  left: 0;
  display: flex;
  background: #f2f2f2;
}
.create-user-box{
  display: flex;
  width: 100vw;
  height: 100vh;
}

</style>
