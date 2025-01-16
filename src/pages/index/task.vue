<template>
  <view style="display: flex;flex-direction: column;padding: 0 15px">
    <view style="height: 60rpx"></view>
    <view style="height: 440px">
      <view class="item" @click="openDialog(index)" v-for="(item,index) in missionList" :key="index">
        <text style="margin-right:5px;font-family: alm;font-size: 45px" :style="{color:gradeColor(item.task_info.task_grade)}">
          {{item.task_info.task_grade}}
        </text>
       <text class="mission-info">{{item.task_info.task_name}}</text>
<!--        <view style="width:50px;">-->
<!--          <text style="font-family: alm" v-if="item.complete_type==2">已完成</text>-->
<!--        </view>-->
      </view>
    </view>
    <view style="align-items:center;margin-bottom:10px;display: flex;justify-content: space-between">
      <text style="font-size:11px;color:#fff;font-family: alm">
        完成一个任务可获取一次刷新列表的机会
        但每批任务只可获得一次机会
      </text>
      <view>
        <u-button
            @click="refreshMission"
            throttleTime="2000"
            :disabled="!userActivityFile.hasMissionRefresh"
            text="刷新"
            size="mini"
            :type="!userActivityFile.hasMissionRefresh?'info':'warning'"
        ></u-button>
      </view>
    </view>
    <text style="line-height:25px;text-align: center;font-family: alm;color: #fff;font-size: 16px"> 怎么玩？</text>
    <text style="line-height:18px;text-align: center;font-family: alm;color: #fff;font-size: 12px">
      前往任务对应的区域，寻找对应的NPC进行任务
      在任务完成后点击对应项目，NPC确认后扫码即可完成任务
      任务完成获取积分，完成4个任务即可刷新一批任务
    </text>
    <u-popup
      :show="showCodeDialog"
      mode="center"
      round="16"
      @close="closeDialog"
      @cancel="closeDialog"
      :start="false"
      overlay-opacity="0.1"
    >
      <view style="display: flex;flex-direction: column;margin: 10px;width: 90vw">
        <text style="font-family: alm;font-size: 18px;font-weight: bold">{{currentMissionInfo.task_info.task_name}}</text>
        <text style="font-family: alm;font-size: 13px;margin: 10px 0">任务玩法：{{currentMissionInfo.task_info.task_info}}</text>
        <text style="font-family: alm">完成该任务可获得{{currentMissionInfo.score}}分</text>
        <template v-if="currentMissionInfo.complete_type==1">
          <canvas type="2d"  id="qrcode" canvas-id="qrcode" style="width: 150px;height:150px;align-self: center;margin:5px 0" />
          <u-text size="12" color="#ddd" text="*请向工作人员出示二维码结算任务" align="center"></u-text>
        </template>
        <view style="margin:20px 0" v-else>
          <u-text type="success" align="center" text="你已完成该任务"></u-text>
        </view>
        <u-button @click="closeDialog" shape="circle" text="关闭"></u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
import UserGradeTag from "../../components/user-grade-tag.vue";

const db=wx.cloud.database();
const _=db.command;
import weappQRcode from "@/utils/weapp.qrcode.esm";
import {mapState} from "vuex";
export default {
  components: { UserGradeTag},
  created() {

  },
  mounted() {
    this.$nextTick( async ()=>{

    })
  },

  watch: {
    pageIndex(){
      this.closeDialog()
    },
    async activityType(){

      // 活动开始构建任务表
      if(this.activityType==='start'){
        // 检查是否生成了任务
        const checkMissionListRes = await db.collection('user-mission-2025').where({
          user_id:db.command.eq(this.user_id),
          // 未完成数量不为零即有任务表
          complete_type:db.command.eq(1),
        }).get()
        console.log(checkMissionListRes)
        if(checkMissionListRes.data.length===0){
          console.log('构建任务表')
          let missionList=this.createMissionList()
          for (const item of missionList) {
            const res= await db.collection('user-mission-2025').add({
              data:item
            })
            console.log(res)
          }
          this.$store.commit('updateMissionList',missionList)
        }else{
          // 获取任务表
          this.userMissionHandler= db.collection('user-mission-2025').where({
                // 任务完成情况 1未完成2已完成3已结算
                complete_type:db.command.eq(1).or(db.command.eq(2)),
                user_id: db.command.eq(this.user_id),
              }).watch({
                onChange:snapshot=>{
                  console.log('用户任务表变化', snapshot)
                  if(snapshot.docChanges[0].dataType==='update'&&snapshot.docChanges[0].doc.complete_type===2){
                    uni.$u.toast('等级+'+snapshot.docChanges[0].doc.score)
                  }
                  //
                  this.$store.commit('updateMissionList',snapshot.docs)
                  // this.closeDialog()
                },
                onError: err=> {
                  console.error('用户任务表变化监听出错', err)
                }
              })
        }


      }
    },
    showCodeDialog(){
        if(this.showCodeDialog){
          if(this.currentMissionInfo.complete_type==2)return
          this.$nextTick(()=>{
            const query = wx.createSelectorQuery().in(this)
            query.select('#qrcode')
                .fields({
                  node: true,
                  size: true
                })
                .exec(async res => {
                  const canvas = res[0].node
                  // 调用方法drawQrcode生成二维码
                  await weappQRcode({
                    canvas: canvas,
                    canvasId: 'qrcode',
                    width: 150,
                    height: 150,
                    background: '#ffffff',
                    foreground: '#000000',
                    text:this.currentMissionInfo._id,
                  })
                })
          })

        }
    },

  },
  beforeDestroy() {
    this.userMissionHandler.close()
  },
  computed: {
    ...mapState(['pageIndex','userActivityFile','activityType','taskList','missionList','isLogin','user_id']),
    currentMissionInfo(){
      return this.missionList[this.selectMissionIndex]
    }
  },
  props: [],
  data() {
    return {
      userMissionHandler:null,
      showCodeDialog:false,
      selectMissionIndex:-1,
    }
  },

  methods: {
    gradeColor(grade){
      return {
        '简单':'#7ad2ff',
        '普通':'#61e797',
        '困难':'#fd7fb7',
        '极难':'#ddc64d',
      }[grade]
    },
    openDialog(index){
      this.selectMissionIndex=index
      this.showCodeDialog=true

    },
    closeDialog(){
      this.showCodeDialog=false
      setTimeout(()=>{
        this.selectMissionIndex=-1
      },500)
    },
    // 抽取任务类型
    selectMissionType(){
      // 基础抽取概率
      const probabilities ={
        '简单':0.5,
        "普通":0.3,
        "困难":0.15,
        "超难":0.05
      }
      const randomValue = Math.random();
      let selectedGrade;
      let cumulativeProbability = 0;
      for (const grade in probabilities) {
        cumulativeProbability += probabilities[grade];
        if (randomValue <= cumulativeProbability) {
          selectedGrade = grade;
          break;
        }
      }
      return selectedGrade;
    },
    // 构建任务表
    createMissionList() {
      let res = []; // 存储最终任务列表

      for (let i = 1; i < 5; i++) {
        let grade_result = this.selectMissionType(); // 获取任务类型

        // 筛选符合任务类型的任务
        let resultArr = this.taskList.filter(item => item.task_grade === grade_result);

        // 如果筛选出的任务数量不足以保证唯一性，抛出错误或警告
        if (resultArr.length === 0) {
          throw new Error(`任务类型为 ${grade_result} 的任务不足，无法生成唯一任务`);
        }

        // 排除已选中的任务
        resultArr = resultArr.filter(item => !res.some(existing => existing.task_id === item._id));

        // 如果经过排除后没有可用任务，抛出错误
        if (resultArr.length === 0) {
          throw new Error(`任务类型为 ${grade_result} 的剩余任务已用尽，无法生成唯一任务`);
        }

        // 随机选择一个任务
        let random = Math.floor(Math.random() * resultArr.length);
        let task = resultArr[random];

        // 添加到结果列表
        res.push({
          finish_time: null, // 完成时间
          complete_type: 1, // 完成状态：1未完成 2已完成 3已放弃
          npc_id: null, // NPC ID
          score: task.score, // 任务分数
          task_id: task._id, // 任务 ID
          task_info: task, // 任务详细信息
          user_id: this.user_id, // 用户 ID
          ser_info: this.userInfo, // 用户信息
          create_time: new Date().getTime(), // 创建时间戳
        });
      }

      return res;
    },

    refreshMission(){
      uni.setStorageSync('first_refresh',false)
      // 建立新任务表
      const newMissionList=this.createMissionList

    }
  },

}
</script>

<style lang='scss' scoped>

.mission-info{
  text-align: right;
  font-family: alm;
  flex:1;
  font-size: 20px;
  display: -webkit-box !important;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical !important;
}
.item{
  background: #fff;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 5px 10px;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
</style>
