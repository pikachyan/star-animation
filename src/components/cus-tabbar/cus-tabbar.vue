<template>
  <view class="tabbar-content">
    <view @click="switchPage(0)" class="tabbar-content-item">
      <u-icon labelSize="10px" width="30px" height="30px" label-pos="bottom" :name="pageIndex==0?'/static/icons/main-act.png':'/static/icons/main.png'"></u-icon>
    </view>
    <view class="tabbar-content-item">
      <view @click="switchPage(1)" class="circle-icon" :class="pageIndex==1?'circle-inactive':'circle-deactive'">
        <u-icon labelSize="10px" width="30px" height="30px"  label-pos="bottom" :name="pageIndex==1?'/static/icons/call-act.png':'/static/icons/call.png'"></u-icon>
      </view>
<!--      <text style="margin-bottom: 5px">主会场</text>-->
    </view>
    <view @click="switchPage(2)" class="tabbar-content-item">
      <u-icon labelSize="10px" width="30px" height="30px"  label-pos="bottom" :name="pageIndex==2?'/static/icons/news-act.png':'/static/icons/news.png'"></u-icon>
    </view>
  </view>
</template>

<script>
import {mapGetters, mapActions, mapMutations, mapState} from 'vuex';
export default {
  components: {},
  mixins: [],
  created() {

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
  display: flex;
  position: fixed;
  width: 70vw;
  height: 55px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 0 19px 1px #dfdfdf;
  bottom: calc(5px + constant(safe-area-inset-bottom)) ;
  bottom: calc(5px + env(safe-area-inset-bottom)) ;
  left:0;
  right:0;
  margin:0 auto;
  &-item{
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .circle-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    width: 50px;
    height: 50px;
  }
  .circle-inactive{
    margin-bottom: 50px;
    width: 60px;
    box-shadow: 0 0 19px 1px #dfdfdf;
    background: #4cd964;
    height: 60px;
    transition: all ease-in-out 0.3s;
  }
  .circle-deactive{
    transition: all ease-in-out 0.3s;
  }
}
</style>
