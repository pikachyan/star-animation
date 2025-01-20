<template>
  <view style="display: flex;flex-direction: column;padding: 0 15px"
    :style="{marginTop:mgTop}"
  >
    <u-overlay :show="loading" opacity="0"></u-overlay>
    <text style="line-height:50px;text-align: center;font-family: alm;color: #fff;font-size: 25px"> 任务中心</text>
    <text style="margin-bottom:20px;line-height:18px;text-align: center;font-family: alm;color: #fff;font-size: 14px">
      点击对应项目查看详情，前往任务对应的区域
      寻找对应的NPC进行任务，NPC扫码确认即可完成任务
      任务完成可获取等级，完成4个任务即可刷新一批任务
    </text>
    <view style="position: relative;">
      <view
          class="item"
          :class="{'animate':loading,'item_loading':loading}"
          @click="openDialog(index)" v-for="(item,index) in missionList"
          :key="index"
      >
        <template v-if="!loading">
          <text style="margin-right:5px;font-family: alm;font-size: 60rpx" :style="{color:gradeColor(item.task_info.task_grade)}">
            {{item.task_info.task_grade||''}}
          </text>
          <text class="mission-info">{{item.task_info.task_name||''}}</text>
          <view style="width:50px;">
            <view class="complete" v-if="item.complete_type==2">已经完成</view>
          </view>
        </template>
      </view>
    </view>
    <view style="padding:0 15px;align-items:center;margin-top:5px;display: flex;justify-content: space-between">
      <text style="font-size:11px;color:#fff;font-family: alm">
        每批任务完成任意一个
        可获得一次刷新列表的机会（不计数）
      </text>
      <view>
        <u-button
            @click="refreshMission"
            throttleTime="2000"
            :disabled="userActivityFile.hasMissionRefresh==0"
            text="刷新"
            size="mini"
            :type="userActivityFile.hasMissionRefresh==0?'info':'warning'"
        ></u-button>
      </view>
    </view>

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
    this.marginTop=uni.getWindowInfo().statusBarHeight
  },
  mounted() {

  },

  watch: {
    pageIndex(){
      this.closeDialog()
    },
    async activityType(){

      // 活动开始构建任务表
      if(this.activityType==='start'&&this.isLogin){
        this.loading=true
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
          this.loading=false
        }else{
          // 获取任务表与处理结算
          this.userMissionHandler= db.collection('user-mission-2025').where({
                // 任务完成情况 1未完成2已完成3已结算
                complete_type:db.command.eq(1).or(db.command.eq(2)),
                user_id: db.command.eq(this.user_id),
              }).watch({
                onChange:async snapshot => {
                  console.log('用户任务表变化', snapshot)
                  // 在这里处理任务完成
                  if (snapshot.docChanges[0].dataType === 'update' && snapshot.docChanges[0].doc.complete_type === 2) {
                    uni.$u.toast('等级+' + snapshot.docChanges[0].doc.score)
                    if (!uni.getStorageSync('first_fresh'))
                      uni.setStorageSync('first_fresh', true)
                    try {
                      const refreshUpdateRes = await db.collection('user-activity-2025').doc(this.userActivityFile._id).update({
                        data:{
                          hasMissionRefresh:1
                        }
                      })
                      console.log(refreshUpdateRes)
                    } catch (e) {
                      console.log('更改可刷新状态出问题'+e)
                    }
                  }
                  //
                  this.$store.commit('updateMissionList', snapshot.docs)
                  // this.closeDialog()
                  this.loading=false
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
  props: ['mgTop'],
  data() {
    return {
      marginTop:0,
      userMissionHandler:null,
      showCodeDialog:false,
      selectMissionIndex:-1,
      loading:true,
    }
  },

  methods: {
    gradeColor(grade){
      return {
        '简单':'#7ad2ff',
        '普通':'#61e797',
        '困难':'#fd7fb7',
        '超难':'#ddc64d',
      }[grade]
    },
    openDialog(index){
      this.selectMissionIndex=index
      setTimeout(()=>{
        this.showCodeDialog=true
      },100)
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
        let res = [];
        const maxAttempts = 5; // 每次任务生成的最大尝试次数

        for (let i = 1; i < 5; i++) {
          let generatedTask = null;
          let attempts = 0;

          while (!generatedTask && attempts < maxAttempts) {
            attempts++;

            let grade_result = this.selectMissionType();
            /* 筛选该类型的任务 */
            let resultArr = this.taskList.filter(item => item.task_grade === grade_result);

            if (resultArr.length === 0) {
              console.warn(`未找到任务类型为 ${grade_result} 的任务，重新尝试`);
              continue; // 如果筛选结果为空，重新尝试
            }

            let randomIndex = Math.floor(Math.random() * resultArr.length);

            // 判断生成的任务是否已经存在于列表中
            if (res.some(task => task.task_id === resultArr[randomIndex]._id)) {
              console.warn(`任务 ${resultArr[randomIndex]._id} 已存在，重新尝试`);
              continue; // 如果任务重复，重新尝试
            }

            // 成功生成任务
            generatedTask = {
              finish_time: null,
              complete_type: 1, // 完成状态 1未完成 2已完成 3已放弃
              npc_id: null,
              score: resultArr[randomIndex].score,
              task_id: resultArr[randomIndex]._id,
              task_info: resultArr[randomIndex],
              user_id: this.user_id,
              ser_info: this.userInfo,
              create_time: new Date().getTime(),
            };
          }

          if (!generatedTask) {
            console.error(`无法生成任务类型为 ${grade_result} 的任务`);
            continue; // 如果超过最大尝试次数仍未成功生成，跳过本次任务
          }

          res.push(generatedTask);
        }

        return res;
    },

    async refreshMission(){
      this.loading=true;
      uni.removeStorageSync('first_fresh')
      const refreshUpdateRes = await db.collection('user-activity-2025').doc(this.userActivityFile._id).update({
        data:{
          hasMissionRefresh:0
        }
      })
      console.log(refreshUpdateRes)
      // 修改当前任务表状态，已完成的跳过 未完成的标记为状态3，然后提交，使用云函数操作
      try{


      }catch (e) {
        uni.$u.toast('变更旧的任务状态出现问题')
        return
      }

      // 建立新任务表
      // const newMissionList=this.createMissionList

    }
  },
  options: {
    styleIsolation: 'shared'
  },
}
</script>

<style lang="scss" scoped>
::v-deep .skeleton--u-skeleton__wrapper__content__rows{
    width: 100%!important;
    border-radius: 15px;
}
@mixin background {
  background: linear-gradient(90deg, #F1F2F4 25%, #dddbdb 37%, #F1F2F4 50%);
  background-size: 400% 100%;
}
.mission-info{
  text-align: center;
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
.animate {
  animation: skeleton 1.8s ease infinite
}

@keyframes skeleton {
  0% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0 50%
  }
}
.item{
  background: #fff;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 5px 10px;
  width: 100%;
  height: 160rpx;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  &_loading{
    @include background;
  }
}
.complete{
  font-family: alm;
  background-color: #009fe7;
  color: #fff;
  border-radius: 8px;
  height: 35px;
  width: 35px;
  font-size: 17px;
  text-align: center;
  white-space: wrap;
  padding: 3px;
  box-sizing: content-box;
}
</style>
