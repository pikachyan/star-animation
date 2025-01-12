<template>
  <view class="background-content"   :class="'move-' + pageIndex">
    <u-image src="https://6669-find-star-0gi8dl41091136d1-1316449395.tcb.qcloud.la/bkg.png?sign=abe787a572d85cea701f038efc6cb39c&t=1736701645"
             :show-menu-by-longpress="false"
             height="120vh"
             mode="heightFix"
             bgColor="#3e3088"
             duration="5000"
    ></u-image>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapState(['pageIndex']),

  },
  watch: {

  }
}
</script>

<style lang='scss' scoped>
.background-content {
  position: fixed;
  top:0;
  right: 0%;
  background: #3e3088;
  z-index: $background-components-z-index;
  transition:right 500ms cubic-bezier(0.6, 0, 0.12, 0.7); /* 平移动画 */
  height: 120vh;
  width: 100vw;
}

.move-0 {
  right: 0%;
}

.move-1 {
  right: 15%;
}

.move-2 {
  right:30%;
}

.move-3 {
  right: 40%;
}
</style>
