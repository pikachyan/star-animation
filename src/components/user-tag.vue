<template>
  <view class="tag-area">
    <view v-if="role===3" class="tag npc">NPC</view>
    <view v-else-if="role===1"  class="tag super-admin">超级管理员</view>
    <view v-else-if="role===2" class="tag admin">管理员</view>
  </view>
</template>

<script>
export default {
  components: {},
  created() {

  },
  mounted() {

  },
  onLoad(context) {

  },
  onShow() {

  },
  watch: {},
  computed: {},
  props: ['role'],
  data() {
    return {}
  },

  methods: {},
}
</script>

<style lang='scss' scoped>
.tag-area{
  margin-right:5px ;
  display: flex;
  align-items: center;
  //  标签组件开始
  .super-admin{
    transition: all  300ms  ease-in;
    background: #d8d042;
    color: #fbfbfb;
    &:active{
      box-shadow: 0 0 20rpx 0 #ffe200;
      background: #ffe200;
      color:  white;
    }
  }
  .admin{
    transition: all  300ms  ease-in;
    background: #55b3de;
    color: #fbfbfb;
    &:active{
      box-shadow: 0 0 20rpx 0 #00c5ff;
      background: #00c5ff;
      color:  white;
    }
  }
  .npc{
    transition: all  300ms  ease-in;
    background: #ff4949;
    color: #fbfbfb;
    &:active{
      box-shadow: 0 0 20rpx 0 #ff4b4b;
      background: #ff4b4b;
      color:  white;
    }
  }
  .tag{
    height: 15px;
    border-radius: 5px;
    padding: 4px;
    font-size: 15px;
    text-align: center;
    font-family: DingTalk-JinBuTi;
    display: flex;
    align-items: center;
    box-sizing: content-box;
  }
}
</style>
