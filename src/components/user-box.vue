<template>
  <u-popup
    :show="showPopup"
    @close="onClose"
    @open="onOpen"
    :round="18"
    mode="center"
    :safeAreaInsetBottom="false"
  >
    <view class="content">
      <!--  登录态  -->
      <template v-if="isLogin">
        <view class="user-info">
          <view class="left">
            <u-image
                :showMenuByLongpress="false"
                :src="userInfo.avatarImg"
                width="70" height="70"
                shape="circle"></u-image>
          </view>

          <view class="right">
            <view>
              <u-text :text="userInfo.name" lines="1" size="22px"></u-text>
            </view>
            <view class="bottom">
              <user-tag :role="role"></user-tag>
              <view class="iconfont icon-icon-test" style="font-size: 25px;color: #333333"></view>

            </view>
          </view>
        </view>

        <u-cell-group v-if="role!==4" :border="false" :customStyle="cellStyle">
<!--          <u-cell @click="toPage(1)" clickable icon="setting-fill" title="个人信息"></u-cell>-->
          <u-cell @click="toPage(2)" clickable :border="false" icon="integral-fill" title="星浔后台"></u-cell>
        </u-cell-group>
        <view @click="showUserQrcode=!showUserQrcode" class=" iconfont icon-erweima" style="width:100%;text-align: center;margin: 10px 0; font-size: 15px;color: #a3a3a3">显示用户二维码</view>
        <canvas type="2d" v-if="showUserQrcode"  id="qrcode" canvas-id="qrcode" style="width: 150px;height:150px;align-self: center;margin:5px 0" />
      </template>
      <!--  未登录  -->
      <template v-else>

      </template>
    </view>

  </u-popup>
</template>

<script>
import weappQRcode from "@/utils/weapp.qrcode.esm";
import {mapState} from "vuex";
import UserTag from "@/components/user-tag.vue";

export default {
  components: {UserTag},
  created() {

  },
  mounted() {

  },

  watch: {
    showUserQrcode(){
      if(this.showUserQrcode){
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
                  text:this.user_id,
                })
              })
        })

      }
    },
  },
  computed: {
    ...mapState(['isLogin','user_id','userInfo']),
    role(){
      return this.$store.state.userInfo.permission
    },
    cellStyle(){
      return{
        'border-radius':'16px',
        'border':'1px solid #d6d6d6',
        'overflow':'hidden',
      }
    }
  },
  props: [],
  data() {
    return {
      showPopup:false,
      showUserQrcode:false
    }
  },

  methods: {

    onClose(){
      this.showPopup = false
      this.showUserQrcode=false
    },
    onOpen(){
      this.showPopup = true
    },
    toPage(i){
      uni.navigateTo({
        url:i==1?
            '':
            '/pages/admin/index'
      })
    }
  },

}
</script>

<style lang='scss' scoped>
.content{
  width: 80vw;
  //background:#fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.user-info{
  display: flex;
  margin-bottom: 10px;
  .left{
    margin-right: 5px;
    transform: translateY(-1%);
    border-radius: 70px;
    box-shadow: 0 0 10px 0 #e2e2e2
  }
  .right{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 10px;
  }
}
.bottom{
  width: 100%;
  display: flex;
}

</style>
