<template>
  <view
      class="background-container"
      :style="{ width: '100%', height: `${180}px` }"
  >
    <canvas
        id="canvas"
        type="2d"
        style="width:100%;background:rgba(0,0,0,0);"
    ></canvas>
  </view>

</template>

<script>
import lottie from "lottie-miniprogram";
export default {
  components: {},
  created() {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.pixelRatio = res.pixelRatio
      }
    })
    this.canvasHeight = (1920 / 1080) * uni.getWindowInfo().screenWidth;
  },
  mounted() {
    uni.createSelectorQuery().in(this).select('#canvas').node(res => {
      const canvas = res.node
      const context = canvas.getContext('2d')
      if (this.pixelRatio) {
        context.scale(this.pixelRatio, this.pixelRatio)
        canvas.height = uni.getWindowInfo().screenHeight
      }
      lottie.setup(canvas)
      lottie.loadAnimation({
        animationData:this.animationData,
        rendererSettings: {
          context,
        },
        autoplay: true,
      })
    }).exec()
  },
  watch: {},
  computed: {},
  props: ['animationData'],
  data() {
    return {
      pixelRatio:0,
      canvasHeight:''
    }
  },

  methods: {},

}
</script>

<style lang='scss' scoped>
.background-container {
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0); /* 可选背景色 */
}
</style>
