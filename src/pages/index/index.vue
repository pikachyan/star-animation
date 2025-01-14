<template>
	<view class="content">
    <top-placeholder></top-placeholder>

    <swiper
        easing-function="easeInOutCubic"
        skip-hidden-item-layout
        @change="pageChange"
        :current="pageIndex"
        style="height: 100vh">
      <swiper-item  >
        <scroll-view  scroll-y class="page-item">
          <task ></task>
        </scroll-view>
      </swiper-item>
      <swiper-item  >
        <scroll-view  scroll-y class="page-item">
          <score ></score>
        </scroll-view>
      </swiper-item>
      <swiper-item  >
        <scroll-view  scroll-y class="page-item">

        </scroll-view>
      </swiper-item>
      <swiper-item  >
        <scroll-view  scroll-y class="page-item">

        </scroll-view>
      </swiper-item>
    </swiper>


    <dynamic-background></dynamic-background>
    <cus-tabbar></cus-tabbar>
    <user-box></user-box>
	</view>
</template>

<script>
	import TopPlaceholder from "@/components/top-placeholder.vue";
  import DynamicBackground from "@/components/dynamic-background.vue";
  import UserBox from "@/components/user-box.vue";
  import {mapState} from "vuex";
  import Task from "./task.vue";
  import Score from "@/pages/index/score.vue";

  export default {
    components: {Score, Task, UserBox, DynamicBackground, TopPlaceholder},
    computed:{
      ...mapState(['pageIndex'])
    },
		data() {
			return {}
		},
		onLoad() {

		},
    onReady() {
      console.log(this.$store.state)
    },
		methods: {
      pageChange(e){
        console.log(e)
        this.$store.state.pageIndex=e.detail.current
      }
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
  .page-item{
    width: 100vw;
    height: 100%;
  }
</style>
