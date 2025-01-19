<template>
  <view class="content" :style="{paddingTop:mgTop}">
    <image
        :lazy-load="false"
      src="cloud://find-star-0gi8dl41091136d1.6669-find-star-0gi8dl41091136d1-1316449395/contact-background.png"
      mode="widthFix"
      style="width: 100%"
      :show-menu-by-longpress="false"
    ></image>
    <view class="list-content">
      <text class="title">联系我们</text>
      <view class="list-box">
        <view @click="copy(item.code)" :key="index" class="item" v-for="(item,index) in list">
          <text style="font-family: alm;font-size: 14px">{{item.title}}</text>
          <text style="font-family: alm;font-size: 22px">{{item.code}}</text>
        </view>
        <view style="margin-top:40px;display: flex;justify-content: space-between">
          <text></text>
          <text style="font-family: alm;font-size: 22px;color:#7c7c7c">点击复制号码</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  components: {},
  created() {

  },
  mounted() {

  },
  onLoad(context) {

  },
  onShow() {

  },
  watch: {},
  computed: {},
  props: ['mgTop'],
  data() {
    return {
      list:[
        {title:'天线娘星浔QQ号:',code:'2779029840'},
        {title:'平南星浔漫展QQ群:',code:'341686332'},
        {title:'星浔漫展节目征集群:',code:'547833647'},
        {title:'星浔漫展自由行群:',code:'938131423'},
        {title:'星浔漫展NPC征集群:',code:'726389528'},
      ]
    }
  },

  methods: {
    copy(code){
      uni.setClipboardData({
        data:code,
        success:r=>uni.$u.toast('复制成功/ᐠ .⋏. ᐟ\\ﾉ')
      })
    }
  },

}
</script>

<style lang='scss' scoped>
.content{
  position: relative;
  .list-content{
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%,-70%);
    display: flex;
    flex-direction: column;
    .title{
      width: 100%;
      text-align: right;
      font-family: alm;
      font-size: 60rpx;
      color:#f19c50;
      margin-bottom: 5px;
    }
    .list-box{
      width: 75vw;
      background: #fff;
      border-radius: 16px;
      border: 3px solid #f19c50;
      display: flex;
      flex-direction: column;
      padding: 30rpx 10px;
      .item{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-family: alm;
        border-bottom: 1px solid #7c7c7c;
        height: 45px;
        padding-bottom: 3px;
      }
    }
  }
}
</style>
