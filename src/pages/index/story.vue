<template>
  <view class="content">
    <top-placeholder>
      <view style="color:#fff;display: flex;align-items: center;height: 100%">完成任务数：<text style="font-size: 18px">{{count}}</text></view>
    </top-placeholder>
    <text class="top-param">
      一份烦恼落在了平平无奇的“金沙小肆”中:
      在城中的某个梦境里，似乎有虚妄的阴影正在蠢蠢欲动。
      小肆中靓丽的少女店员向你发来邀函，她们自称星浔和夜穹:
      “真界的生灵正遭受梦魇袭击……被选召的入梦使，请您随我们一起前往梦境，破除即将到来的危机……"

      Tips:完成一个任务即可解锁一个章节，活动结束解锁全部章节
    </text>
    <scroll-view style="height: 100%" scroll-y>

      <template v-for="(item,index) in chapterList">
        <view  v-if="item.unlockCount<=count||activityType==='end'" class="chapter" @click="openRead(index)" :key="index">
          <view style="position:relative;font-family: alm">
            <view class="new-tag">
              <image
                  v-if="!item.isRead"
                  :show-menu-by-longpress="false"
                  src="cloud://find-star-0gi8dl41091136d1.6669-find-star-0gi8dl41091136d1-1316449395/new.png"
                  style="width: 40px"
                  mode="widthFix"
              ></image>
            </view>
            {{item.title}}
          </view>
        </view>
      </template>

      <view v-if="count<8&&activityType!=='end'" class="chapter">
        <u-icon name="lock" label="完成任务继续解锁" label-position="right"></u-icon>
      </view>
      <view style="height: 50px"></view>
    </scroll-view>

  </view>
</template>

<script>
import TopPlaceholder from "@/components/top-placeholder.vue";
import {mapState} from "vuex";

export default {
  components: {TopPlaceholder},
  created() {
    if(!uni.getStorageSync('story_is_read_arr_2025')){
      uni.setStorageSync('story_is_read_arr_2025', [0,0,0,0,0,0,0,0,0,0]);
    }
    this.chapterList=uni.getStorageSync('story_is_read_arr_2025').map((item,index) => ({
      ...this.chapterList[index], // 保留原有字段
      isRead: item === 1
    }))
    const db=wx.cloud.database();
    const _=db.command
    console.log(this.user_id)
    this.countWatcher=db.collection('user-mission-2025').where({
      user_id:uni.getStorageSync('user_id'),
      complete_type:_.eq(2).or(_.eq(4))
    }).watch({
      onChange:sn=>{
        console.log('完成任务数量监听',sn)
        this.count=sn.docs.length;
      },
      onError:e=>{
        console.log(e)
      }
    })
  },
  mounted() {

  },
  destroyed() {
    this.countWatcher.close()
  },
  watch: {
    '$store.state.user_id':  {
      deep: true,
      immediate: true,
      handler: function(val) {
        // 注册任务数监听器

        console.log('wwwwwwwwwwwwwwwwwww',this.countWatcher)
      }
    }
  },
  computed: {
    ...mapState(['isLogin','user_id','activityType'])
  },
  props: [],
  data() {
    return {
      storyTitle:'',
      reading:false,
      scrollHeight:0,
      count:0,
      countWatcher:null,
      chapterList:[
        {title:'序章 金沙小肆的闲谈', unlockCount:0,isRead:false},
        {title:'一章 深夜来客', unlockCount:0,isRead:false},
        {title:'二章 梦中的日常', unlockCount:1,isRead:false},
        {title:'三章 沦陷', unlockCount:2,isRead:false},
        {title:'四章 恶意袭击', unlockCount:3,isRead:false},
        {title:'五章 梦中的好友', unlockCount:4,isRead:false},
        {title:'六章 课堂', unlockCount:5,isRead:false},
        {title:'七章 转机', unlockCount:6,isRead:false},
        {title:'八章 开树断流', unlockCount:7,isRead:false},
        {title:'终章 约定的时节', unlockCount:8,isRead:false},
      ]
    }
  },

  methods: {
    openRead(i){
      this.chapterList[i].isRead=true;
      this.$store.state.storyReading=true
      this.$store.state.storyIndex=i
      this.$store.state.storyTitle=this.chapterList[i].title
      uni.setStorageSync('story_is_read_arr_2025',
          this.chapterList.map(item=>item.isRead?1:0)
      );
    }
  }

}
</script>

<style lang='scss' scoped>
  .new-tag{
    position: absolute;
    top: 50%;
    transform: translateY(-35%);
    left: -40px;
  }
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
      overflow: hidden;
      position: relative;
    }
  }
</style>
