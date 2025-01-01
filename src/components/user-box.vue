<template>
  <u-popup
    :show="showPopup"
    @close="onClose"
    @open="onOpen"
    :round="10"
    mode="center"
    :safeAreaInsetBottom="false"
  >
    <view class="content">
      <!--  登录态  -->
      <template v-if="!isLogin">
        <view class="user-info">
          <view class="left">
            <u-image
                :showMenuByLongpress="false"
                src="https://cdn.uviewui.com/uview/album/1.jpg"
                width="70" height="70"
                shape="circle"></u-image>
          </view>

          <view class="right">
            <view>
              <u-text text="无敌天线娘" size="18px"></u-text>
            </view>
          </view>
        </view>
        <view class="bottom">
          <view class="iconfont icon-icon-test" style="font-size: 25px;color: #333333"></view>
          <view class="iconfont icon-erweima" style="font-size: 25px;color: #333333"></view>
        </view>
        <u-cell-group :border="false" :customStyle="cellStyle">
          <u-cell clickable icon="setting-fill" title="个人信息"></u-cell>
          <u-cell  clickable :border="false" icon="integral-fill" title="星浔管理仓"></u-cell>
        </u-cell-group>
      </template>
      <!--  未登录  -->
      <template v-else>

      </template>
    </view>

  </u-popup>
</template>

<script>
import {mapState} from "vuex";

export default {
  components: {},
  created() {

  },
  mounted() {

  },

  watch: {},
  computed: {
    ...mapState(['isLogin']),
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
      showPopup:true
    }
  },

  methods: {
    onClose(){
      this.showPopup = false
    },
    onOpen(){
      this.showPopup = true
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
    transform: translateY(-40%);
    border-radius: 70px;
    box-shadow: 0 0 10px 0 #e2e2e2
  }
  .right{
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-right: 10px;
  }
}
.bottom{
  width: 100%;
  display: flex;

}
</style>
