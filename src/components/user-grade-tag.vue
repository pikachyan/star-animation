<template>
    <view class="tag-box">
      <text style="color:#fff;font-size:18px;font-family: alm;">入梦使</text>
      <!--  star-list  -->
      <image v-for="i in parseInt(score/10+1)" :key="i" style="margin-left: 2px;width: 18px;height: 18px" src="@/static/icons/star.png"></image>
    </view>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState([ 'isLogin']),
  },
  props: [],
  data() {
    return {
      score:24
    }
  },

}
</script>

<style lang='scss' scoped>
.tag-box{
  background-color: #d8d042;
  padding: 5px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  width: fit-content
}
</style>
