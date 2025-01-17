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
        <scroll-view :style="{height:scrollHeight+'px'}" scroll-y class="page-item">
          <task ></task>
        </scroll-view>
      </swiper-item>
      <swiper-item  >
        <scroll-view :style="{height:scrollHeight+'px'}" scroll-y class="page-item">
          <score ></score>
        </scroll-view>
      </swiper-item>
      <swiper-item  >
        <scroll-view :style="{height:scrollHeight+'px'}" scroll-y class="page-item">

        </scroll-view>
      </swiper-item>
      <swiper-item  >
        <scroll-view :style="{height:scrollHeight+'px'}" scroll-y class="page-item">

        </scroll-view>
      </swiper-item>
    </swiper>


    <dynamic-background></dynamic-background>
    <cus-tabbar id="custabbar"></cus-tabbar>
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
  const db=wx.cloud.database()
  const _=db.command
  export default {
    components: {Score, Task, UserBox, DynamicBackground, TopPlaceholder},
    computed:{
      ...mapState(['taskList','pageIndex','activeActivityConfig'])
    },
		data() {
			return {
        currentTime: new Date().getTime(),
        scrollHeight:0,
      }
		},
		onLoad() {

		},
    watch:{
      // 以定时器监听活动开始结束
      currentTime(n,o){
        let {startTime,endTime} = this.activeActivityConfig
        if(o>=startTime){
          // 活动开始
          this.$store.state.activityType='start'


        }else if(o>=endTime){
          //   活动结束
          this.$store.state.activityType='end'
          //   活动结束后移除第一次刷新的缓存
          uni.removeStorageSync('first_fresh')
        }else {
          // 活动前
          this.$store.state.activityType='wait'
        }
      }
    },
    onReady() {
      console.log(this.$store.state)
      // 注册时间监听器
      this.interval = setInterval(() => {
        this.currentTime = new Date().getTime();
      }, 1000);
      this.scrollHeight=uni.getWindowInfo().screenHeight
          -(uni.getMenuButtonBoundingClientRect().bottom+5)
          -100
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
		methods: {
      pageChange(e){
        console.log(e)
        this.$store.state.pageIndex=e.detail.current
      },
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
  }
</style>
