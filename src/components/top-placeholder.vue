<template>
  <view :style="{height:height,paddingTop:pdTop}" class="top-placeholder">
    <slot></slot>
  </view>
</template>

<script>
export default {
  components: {},
  created() {
    this.height=uni.getMenuButtonBoundingClientRect().bottom+5+'px'
    const {safeAreaInsets} =uni.getWindowInfo()
    console.log(uni.getWindowInfo())
    this.pdTop=safeAreaInsets.top+'px'
  },
  mounted() {

  },
  props: [],
  data() {
    return {
      height:0,
      pdTop:0,
    }
  },

  methods: {},

}
</script>

<style lang='scss' scoped>
.top-placeholder {
  width: 100vw;
  box-sizing: border-box;
  //background: #007aff;
}
</style>
