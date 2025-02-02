<template>
	<view class="content">
<!--    <top-placeholder></top-placeholder>-->
    <u-transition :show="!storyReading">
      <swiper
          v-if="!storyReading"
          easing-function="easeInOutCubic"
          skip-hidden-item-layout
          @change="pageChange"
          :current="pageIndex"
          style="height: 100vh">
        <swiper-item  >
          <scroll-view :style="{height:scrollHeight+'px'}" scroll-y class="page-item">
            <score :mgTop="mgTop"></score>
          </scroll-view>
        </swiper-item>
        <swiper-item >
          <image
              :lazy-load="false"
              mode="widthFix"
              style="width:100vw"
              :src="notOpenImg1"
              v-if="!isLogin"></image>
          <template v-else>
            <image
                :lazy-load="false"
                mode="widthFix"
                style="width:100vw"
                :src="notOpenImg2"
                v-if="activityType==='wait'"></image>
            <scroll-view v-else :style="{height:scrollHeight+'px'}" scroll-y class="page-item">
              <task :mgTop="mgTop"></task>
            </scroll-view>
          </template>

        </swiper-item>
        <swiper-item  >
          <scroll-view :style="{height:scrollHeight+'px'}" scroll-y class="page-item">
            <story></story>
          </scroll-view>


        </swiper-item>
        <swiper-item  >
          <scroll-view :style="{height:scrollHeight+'px'}" class="page-item">
            <contact :mgTop="mgTop"></contact>
          </scroll-view>
        </swiper-item>
      </swiper>
      <cus-tabbar id="custabbar"></cus-tabbar>
    </u-transition>

    <dynamic-background></dynamic-background>
    <communicate v-if="storyReading"></communicate>
    <user-box></user-box>
	</view>
</template>

<script>
import login from "@/pages/login/index.vue";

let userInfoHandler,userActivityFileHandler
	import TopPlaceholder from "@/components/top-placeholder.vue";
  import DynamicBackground from "@/components/dynamic-background.vue";
  import UserBox from "@/components/user-box.vue";
  import {mapState} from "vuex";
  import Task from "./task.vue";
  import Score from "@/pages/index/score.vue";
  import Contact from "@/pages/index/contact.vue";
  import Story from "@/pages/index/story.vue";
  import Communicate from "@/pages/index/communicate.vue";
  const db=wx.cloud.database()
  const _=db.command
  export default {
    components: {Communicate, Story, Contact, Score, Task, UserBox, DynamicBackground, TopPlaceholder},
    computed:{
      ...mapState(['storyReading','isLogin','taskList','pageIndex','activeActivityConfig','activityType'])
    },
		data() {
			return {
        notOpenImg1:'',
        notOpenImg2:'',
        currentTime: new Date().getTime(),
        scrollHeight:0,
        mgTop:uni.getMenuButtonBoundingClientRect().top+5+'px',
      }
		},
		onLoad() {
      if(uni.getStorageSync('user_id')){
        db.collection('user').doc(uni.getStorageSync('user_id'))
            .get().then(res=>{
          console.log(res)
          if(res.errMsg.includes('get:ok')){
            this.$store.commit('updateUser',res.data)
            console.log('登陆成功')
          }
        })
      }

      // 计算屏幕比例
      const ratio = uni.getWindowInfo().screenHeight / uni.getWindowInfo().screenWidth;
      if (Math.abs(ratio - 16 / 9) < 0.01) {
        console.log("屏幕比例接近 16:9");
        this.notOpenImg1='cloud://find-star-0gi8dl41091136d1.6669-find-star-0gi8dl41091136d1-1316449395/请登录16-9.png'
        this.notOpenImg2='cloud://find-star-0gi8dl41091136d1.6669-find-star-0gi8dl41091136d1-1316449395/建设中02.png'
      } else {
        console.log("屏幕比例为:", ratio);
        this.notOpenImg1='cloud://find-star-0gi8dl41091136d1.6669-find-star-0gi8dl41091136d1-1316449395/请登录19-9.png'
        this.notOpenImg2='cloud://find-star-0gi8dl41091136d1.6669-find-star-0gi8dl41091136d1-1316449395/建设中0219-9.png'
      }
		},
    watch:{
      // 以定时器监听活动开始结束
      currentTime(n,o){
        let {startTime,endTime} = this.activeActivityConfig
        if(n>=startTime&&n<endTime){
          // 活动开始
          this.$store.state.activityType='start'
        }else if(n>=endTime){
          //   活动结束
          this.$store.state.activityType='end'
          //   活动结束后移除第一次刷新的缓存
          uni.removeStorageSync('first_fresh')
          // uni.removeStorageSync('story_is_read_arr_2025')
          clearInterval(this.interval);
        }else {
          // 活动前
          this.$store.state.activityType='wait'
        }
      }
    },
    onReady() {
      console.log(this.$store.state)
      //活动时间监听器
      this.interval = setInterval(() => {
        this.currentTime = new Date().getTime();
      }, 1000);
      this.scrollHeight=uni.getWindowInfo().screenHeight
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
