<template>
  <view class="tabbar-content">
    <view class="tabbar-content-item"></view>
    <view class="tabbar-content-item"></view>
    <view class="tabbar-content-item"></view>
  </view>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  components: {},
  mixins: [],
  created() {

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

  },
  props: [],
  data() {
    return {}
  },

  methods: {},

}
</script>

<style lang='scss' scoped>
.tabbar-content{
  display: flex;
  position: fixed;
  width: 70vw;
  height: 50px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 0 19px 1px #dfdfdf;
  bottom: calc(16rpx + constant(safe-area-inset-bottom)) ;
  bottom: calc(16rpx + env(safe-area-inset-bottom)) ;
  left:0;
  right:0;
  margin:0 auto;
  &-item{
    flex:1
  }
}
</style>
