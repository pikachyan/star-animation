<template>
  <view class="content">
    <top-placeholder></top-placeholder>
    <text class="top-param">
      一份烦恼落在了平平无奇的“金沙小肆”中:
      在城中的某个梦境里，似乎有虚妄的阴影正在蠢蠢欲动。
      小肆中靓丽的少女店员向你发来邀函，她们自称星浔和夜穹:
      “真界的生灵正遭受梦魇袭击……被选召的入梦使，请您随我们一起前往梦境，破除即将到来的危机……"

      Tips:完成一个任务即可解锁一个章节，活动结束解锁全部章节
    </text>
      <view class="chapter" v-for="(item,index) in chapterList" :key="index">
        <text style="font-family: alm">{{item.title}}</text>
      </view>
      <view style="height: 50px"></view>

  </view>
</template>

<script>
import TopPlaceholder from "@/components/top-placeholder.vue";

export default {
  components: {TopPlaceholder},
  created() {

  },
  mounted() {

  },
  watch: {},
  computed: {},
  props: [],
  data() {
    return {
      chapterList:[
        {title:'序章 金沙小肆的闲谈', unlockCount:0},
        {title:'一章 深夜来客', unlockCount:0},
        {title:'二章 梦中的日常', unlockCount:1},
        {title:'三章 沦陷', unlockCount:2},
        {title:'四章 恶意袭击', unlockCount:3},
        {title:'五章 梦中的好友', unlockCount:4},
        {title:'六章 课堂', unlockCount:5},
        {title:'七章 转机', unlockCount:6},
        {title:'八章 开树断流', unlockCount:7},
        {title:'终章 约定的时节', unlockCount:8},
      ]
    }
  },

  methods: {},

}
</script>

<style lang='scss' scoped>
  .content{
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    box-sizing: border-box;
    .top-param{
      font-family: alm;
      font-size: 12px;
      width: 100%;
      text-align: center;
      line-height: 16px;
      margin-bottom: 10px;
      color:#fff;
    }
    .chapter{
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      margin-bottom: 15px;
      border-radius: 8px;
    }
  }
</style>
