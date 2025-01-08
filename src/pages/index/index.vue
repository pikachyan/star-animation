<template>
	<view class="content">
    <top-placeholder></top-placeholder>


    <canvas id="canvas" type="2d" style="height: 100vh; width: 100vw;background:rgba(0,0,0,0);display: inline-block; "></canvas>


    <dynamic-background></dynamic-background>
    <cus-tabbar></cus-tabbar>
    <user-box></user-box>
	</view>
</template>

<script>
	import TopPlaceholder from "@/components/top-placeholder.vue";
  import DynamicBackground from "@/components/dynamic-background.vue";
  import UserBox from "@/components/user-box.vue";
  import lottie from "lottie-miniprogram";
  import GotPoints from '@/static/animation/GotPoints.js';

  export default {
    components: {UserBox, DynamicBackground, TopPlaceholder},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
    onReady() {
      uni.createSelectorQuery().select('#canvas').node(res => {
        const canvas = res.node
        const context = canvas.getContext('2d')
        lottie.setup(canvas)
        lottie.loadAnimation({
          renderer:'svg',
          animationData:GotPoints,
          rendererSettings: {
            context,
          },
          autoplay: true,
        })
      }).exec()
    },
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
	}
</style>
