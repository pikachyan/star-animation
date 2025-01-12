<template>
	<view class="content">
    <top-placeholder></top-placeholder>

<!--    <lottie-animation :animation-data="GotPoints"></lottie-animation>-->

    <dynamic-background></dynamic-background>
    <cus-tabbar></cus-tabbar>
    <user-box></user-box>
	</view>
</template>

<script>
	import TopPlaceholder from "@/components/top-placeholder.vue";
  import DynamicBackground from "@/components/dynamic-background.vue";
  import UserBox from "@/components/user-box.vue";
  import LottieAnimation from "@/components/lottie-animation/lottie-animation.vue";

  import GotPoints from '@/components/lottie-animation/ani/GotPoints.js';
  export default {
    components: {LottieAnimation, UserBox, DynamicBackground, TopPlaceholder},
		data() {
			return {
				title: 'Hello',
        GotPoints:GotPoints,

			}
		},
		onLoad() {

		},
    onReady() {

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
