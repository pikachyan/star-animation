<template>
  <view style="display: flex;flex-direction: column;padding: 0 15px">
    <view style="height: 150rpx"></view>
    <view style="height: 400px">
      <view class="item" v-for="(item,index) in missionList" :key="index">

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
      overlayOpacity="0"
    >
      <view style="display: flex;flex-direction: column;margin: 10px;width: 80vw">
        <canvas type="2d"  id="qrcode" canvas-id="qrcode" style="width: 150px;height:150px;align-self: center;margin:5px 0" />
        <u-text size="12" color="#ddd" text="*请向工作人员出示二维码结算任务" align="center"></u-text>

        <u-button @click="closeDialog" shape="circle" text="关闭"></u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
const db=wx.cloud.database();
const _=db.command;
import weappQRcode from "@/utils/weapp.qrcode.esm";
import {mapState} from "vuex";
export default {
  components: {},
  created() {

  },
  mounted() {

  },

  watch: {
    activityType(){
      // 活动开始构建任务表
      if(this.activityType==='start'&&this.missionList.length===0){
        console.log(11111)
          let missionList=this.createMissionList()
        missionList.forEach(async  (item,index)=>{
          const res= await db.collection('user-activity-2025').add({
            data:item
          })
          console.log(res)
        })
        this.$store.commit('updateMissionList',missionList)

      }
    },
    showCodeDialog(){
        if(this.showCodeDialog){
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
                    text: new Date().getTime().toString(),
                  })
                })
          })

        }
    },

  },
  computed: {
    ...mapState(['activityType','taskList','missionList','isLogin','user_id']),
    currentMissionInfo(){

    }
  },
  props: [],
  data() {
    return {
      showCodeDialog:false,
      selectMissionIndex:-1,
    }
  },

  methods: {
    initMission(){

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
    createMissionList(){
      let res=[]
      for(let i =1;i<5;i++){
        let grade_result=this.selectMissionType()
        /*筛选该类型的任务*/
        let resultArr=this.taskList.filter(item=>item.task_grade===grade_result)
        // console.log(arr)
        let random=Math.ceil(Math.random()*resultArr.length-1)
        // console.log(arr[random])
        res.push({
          finish_time:null,
          // 完成状态 1未完成 2已完成
          complete_type:1,
          npc_id:null,
          score:resultArr[random].score,
          task_id:resultArr[random]._id,
          task_info:resultArr[random],
          user_id:this.user_id,
          ser_info:this.userInfo,
          create_time:new Date().getTime()
        })
      }
      return res
    },
  },

}
</script>

<style lang='scss' scoped>
.item{
  background: #ddd;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 5px;
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
}
</style>
