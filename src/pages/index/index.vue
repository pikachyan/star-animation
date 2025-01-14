<template>
	<view class="content">
    <top-placeholder></top-placeholder>

    <swiper @change="pageChange" :current="pageIndex" style="height: 100%">
      <swiper-item  >
        <scroll-view scroll-y class="page-item">
          <task></task>
        </scroll-view>
      </swiper-item>
      <swiper-item  >
        <scroll-view scroll-y class="page-item">

        </scroll-view>
      </swiper-item>
      <swiper-item  >
        <scroll-view scroll-y class="page-item">

        </scroll-view>
      </swiper-item>
      <swiper-item  >
        <scroll-view scroll-y class="page-item">

        </scroll-view>
      </swiper-item>
    </swiper>


<!--    <dynamic-background></dynamic-background>-->
    <cus-tabbar></cus-tabbar>
    <user-box></user-box>
	</view>
</template>

<script>
	import TopPlaceholder from "@/components/top-placeholder.vue";
  import DynamicBackground from "@/components/dynamic-background.vue";
  import UserBox from "@/components/user-box.vue";
  import Task from "./task.vue";
  import {mapState} from "vuex";

  export default {
    components: {Task, UserBox, DynamicBackground, TopPlaceholder},
    computed:{
      ...mapState(['pageIndex'])
    },
		data() {
			return {}
		},
		onLoad() {

		},
    onReady() {

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
