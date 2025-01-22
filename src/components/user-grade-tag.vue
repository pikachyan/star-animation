<template>
    <view class="tag-box">
      <text style="color:#fff;font-size:18px;font-family: alm;">入梦使</text>
      <!--  star-list  -->
      <image v-for="i in Math.min(4, score / 10)" :key="i" style="margin-left: 2px;width: 18px;height: 18px" src="@/static/icons/star.png"></image>
    </view>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState([ 'isLogin']),
  },
  props: ['score'],
  data() {
    return {
    }
  },

}
</script>

<style lang='scss' scoped>
.tag-box{
  background-color: #f19c50;
  padding: 5px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  width: fit-content
}
</style>
