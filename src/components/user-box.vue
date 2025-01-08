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
              <u-text text="无敌天线娘" lines="1" size="22px"></u-text>
            </view>
            <view class="bottom">
              <user-tag :role="1"></user-tag>
              <view class="iconfont icon-icon-test" style="font-size: 25px;color: #333333"></view>
              <view class="iconfont icon-erweima" style="font-size: 25px;color: #333333"></view>
            </view>
          </view>
        </view>

        <u-cell-group :border="false" :customStyle="cellStyle">
          <u-cell @click="toPage(1)" clickable icon="setting-fill" title="个人信息"></u-cell>
          <u-cell @click="toPage(2)" clickable :border="false" icon="integral-fill" title="星浔后台"></u-cell>
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
import UserTag from "@/components/user-tag.vue";

export default {
  components: {UserTag},
  created() {

  },
  mounted() {

  },

  watch: {},
  computed: {
    ...mapState(['isLogin']),
    role(){
      return 1
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
      showPopup:true
    }
  },

  methods: {
    onClose(){
      this.showPopup = false
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
