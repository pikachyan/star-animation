<template>
  <view class="background-content">
    <view
        class="item fade"
        :style="getBackgroundStyle"
    ></view>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      currentBackground: '#4cd964',
      transitionBackground: '#4cd964',
    };
  },
  computed: {
    ...mapState(['pageIndex']),
    getBackgroundStyle() {
      return `background: ${this.transitionBackground}; transition: background-color 1s cubic-bezier(0.4, 0.0, 0.2, 1);`;
    }
  },
  watch: {
    pageIndex(newIndex) {
      const colors = ['#4cd964', '#cc9f2d', '#b11124'];
      this.transitionBackground = colors[newIndex];
    }
  }
}
</script>

<style lang='scss' scoped>
.background-content {
  position: fixed;
  top:0;
  left: 0;
  z-index: $background-components-z-index;
  height: 100vh;
  width: 100vw;
  .item {
    height: 100%;
    width: 100%;
  }
}
</style>
