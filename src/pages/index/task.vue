<template>
  <view style="display: flex;flex-direction: column;padding: 0 15px"
    :style="{marginTop:mgTop}"
  >
    <template v-if="activityType!=='end'">
      <u-overlay :show="loading" opacity="0"></u-overlay>
      <text style="line-height:50px;text-align: center;font-family: alm;color: #fff;font-size: 25px"> 任务中心</text>
      <text style="margin-bottom:20px;line-height:18px;text-align: center;font-family: alm;color: #fff;font-size: 14px">
        点击对应项目查看详情，前往任务对应区域
        寻找对应NPC进行任务，NPC扫码确认即可完成任务
      </text>
      <view style="position: relative;min-height: calc(640rpx + 48px)">
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
              <view class="complete" v-if="item.complete_type==4">已经完成</view>
            </view>
          </template>
        </view>
      </view>
      <view style="padding:0 15px;align-items:center;margin-top:5px;display: flex;justify-content: space-between">
        <text style="font-size:11px;color:#fff;font-family: alm">
          完成任意一个任务
          获得一次更换任务的机会（不累计）
        </text>
        <view>
          <u-button
              @click="onRefresh"
              throttleTime="2000"
              :disabled="userActivityFile.hasMissionRefresh===0"
              text="更换任务"
              size="mini"
              type="warning"
          ></u-button>
        </view>
      </view>
      <view style="height: 90px"></view>
    </template>
    <view class="end-box" v-else>
      <text style="color:#fff;font-family: alm;margin-bottom: 30px;font-size: 100rpx">活动结束了</text>
      <text style="color:#fff;font-family: alm;font-size: 40rpx">任务中心已关闭</text>
    </view>

    <u-popup
      :show="showCodeDialog"
      mode="center"
      round="16"
      @close="closeDialog"
      @cancel="closeDialog"
      :start="false"
      overlay-opacity="0.4"
    >
      <view style="display: flex;flex-direction: column;margin: 10px;width: 90vw">
        <text style="font-family: alm;font-size: 18px;font-weight: bold">{{currentMissionInfo.task_info.task_name}}</text>
        <text style="font-family: alm;font-size: 13px;margin: 10px 0">任务玩法：{{currentMissionInfo.task_info.task_info}}</text>
        <text style="font-family: alm">完成该任务可获得{{currentMissionInfo.score}}分</text>
        <template v-if="currentMissionInfo.complete_type==1">
          <canvas type="2d"  id="qrcode" canvas-id="qrcode" style="width: 150px;height:150px;align-self: center;margin:5px 0" />
          <u-text size="12" color="#ddd" text="*请向工作人员出示二维码结算任务" align="center"></u-text>
        </template>
        <view style="width: 100%;height:150px;display: flex;align-items: center;justify-content: center" v-if="currentMissionInfo.complete_type==4">
          <u-text size="24px" type="success" align="center" text="你已完成该任务"></u-text>
        </view>
        <u-button @click="closeDialog" shape="circle" text="关闭"></u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
import UserGradeTag from "@/components/user-grade-tag.vue";

const db=wx.cloud.database();
const _=db.command;
import weappQRcode from "@/utils/weapp.qrcode.esm";
import {mapGetters, mapState} from "vuex";
import {addMission} from "@/api/activityApi";
export default {
  components: { UserGradeTag},
  created() {

    this.marginTop=uni.getWindowInfo().statusBarHeight
    // uni.navigateTo({
    //   url:'/pages/admin/index'
    // })
    // 获取任务表与处理结算

  },
  mounted() {
  },

  watch: {
    pageIndex(){
      this.closeDialog()
    },
    _activityType:{
      immediate: true,  //刷新加载 立马触发一次handler
      deep: true,  // 可以深度检测到 obj 对象的属性值的变化
      async handler(o,v){
          console.log(o+'111111111111111111111111111111111')
          // 活动开始构建任务表
          if(this.activityType==='start'&&this.isLogin){
            this.loading=true
            console.log('检查是否生成了任务')
            await db.collection('user-mission-2025').where({
              user_id:db.command.eq(this.user_id),
              // 未完成数量不为零即有任务表
              complete_type:db.command.eq(1),
            }).get().then(res=>{
              console.log(res)
              if(res.data.length===0){
                this.createMission()
              }
              if(!this.userMissionHandler){
                this.userMissionHandler= db.collection('user-mission-2025').where({
                  // 任务完成情况 1未完成2已完成3已结算
                  complete_type:db.command.eq(1).or(db.command.eq(4)),
                  user_id: db.command.eq(this.user_id),
                }).watch({
                  onChange:async snapshot => {
                    console.log('用户任务表变化', snapshot)
                    // 在这里处理任务完成
                    if (snapshot.type !== 'init') {
                      // uni.$u.toast('等级+' + snapshot.docChanges[0].doc.score)
                      // 处理任务完成
                      if(snapshot.docChanges[0].dataType==='update'){
                        // 完成一个任务给刷新
                        console.log('给一次刷新')
                        await db.collection('user-activity-2025').where({
                          user_id: _.eq(this.user_id),
                        }).update({
                          data:{
                            hasMissionRefresh:1
                          }
                        })
                        // 云端任务完成后...
                        let completeMissionIndex=this.$store.state.missionList.findIndex(item=>item._id===snapshot.docChanges[0].docId)
                        console.log(completeMissionIndex)
                        if(completeMissionIndex!==-1){
                          this.$store.state.missionList[completeMissionIndex].complete_type=4
                        }
                        if(this.$store.state.missionList.length===4&&this.$store.state.missionList.every(item=>item.complete_type===4)){
                          console.log('所有任务已完成')
                          await this.refreshMission()
                        }
                      }
                    }else{
                      // 初始化
                      this.$store.state.missionList=snapshot.docs
                    }
                    // this.$store.state.missionList=snapshot.docs
                    //
                    // 做完四个触发一次更新
                    // const completeMissionCount=snapshot.docs.filter(item => item.complete_type === 4).length
                    // if(completeMissionCount===4){
                    //   this.loading=true
                    //   this.$store.state.missionList=[]
                    //   await this.refreshMission()
                    // }
                    this.closeDialog()
                    setTimeout(()=>{
                      this.loading=false
                    },1000)
                  },
                  onError: err=> {
                    console.error('用户任务表变化监听出错', err)
                  }
                })
              }
            })

          }else{
            this.userMissionHandler.close()
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
    if(this.userMissionHandler)
    this.userMissionHandler.close()
  },
  computed: {
    ...mapGetters(['getActivityType']),
    ...mapState(['pageIndex','userActivityFile','activityType','taskList','missionList','isLogin','user_id']),
    currentMissionInfo(){
      return this.missionList[this.selectMissionIndex]
    },
    _activityType(){
      return this.$store.state.activityType
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
    getMissionList(){
      db.collection('user-mission-2025').where({
        // 任务完成情况 1未完成2已完成3已结算
        complete_type:db.command.eq(1).or(db.command.eq(4)),
        user_id: db.command.eq(this.user_id),
      }).get().then(res=>{
        this.$store.state.missionList=res.data;
      })

    },
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

    // type  传值表示是刷新按钮触发的
    async refreshMission(type) {
      this.loading = true;
      this.$store.state.missionList=[]
      try {
          //  放弃列表中未完成的任务 completetype状态1的标记为状态3  状态4的标记状态2
          const abandonMissionRes = db.collection('user-mission-2025').where({
            user_id: _.eq(this.user_id),
            complete_type: _.eq(1)
          }).update({
            data: {
              complete_type: 3,
              finish_time: new Date().getTime()
            }
          })
          const abandonMissionRes2 = db.collection('user-mission-2025').where({
            user_id: _.eq(this.user_id),
            complete_type: _.eq(4)
          }).update({
            data: {
              complete_type: 2,
              finish_time: new Date().getTime()
            }
          })
          await Promise.all([abandonMissionRes, abandonMissionRes2]).then(res => {
            console.log(res)
            if (res.every(item => item.errMsg.includes('ok'))) {
              this.createMission()
            }
          })
        // const taskList=this.missionList.map(item=>{
        //   return db.collection('user-mission-2025').doc(item._id).update({
        //       data: {
        //         complete_type: item.complete_type===4?2:3,
        //         finish_time: new Date().getTime()
        //       }
        //     })
        // })
        // await Promise.all(taskList).then(res => {
        //   console.log(res)
        //   if (res.every(item => item.errMsg.includes('ok'))) {
        //     this.createMission()
        //   }
        // })
        this.$forceUpdate()
        if(type){
          //  变更档案的可刷新状态
          const checkRes = await db.collection('user-activity-2025').where({
            user_id: _.eq(this.user_id)
          }).update({
            data: {
              hasMissionRefresh: 0
            }
          })
          console.log(checkRes)
        }




      } catch (e) {
        // uni.$u.toast('变更旧的任务状态出现问题')
      }

      // const newMissionList=this.createMissionList

    },
    async createMission(){
      try{
        const missionListRes=await db.collection('user-mission-2025').where({
          user_id: _.eq(this.user_id),
          complete_type: _.eq(1).or(_.eq(4))
        }).get()
        console.log('构建任务表')
        console.log(this.taskList)
        // 需要抽的任务数
        console.log('missionListRes',missionListRes)
        const count=4-missionListRes.data.length;
        // 根据用户任务表过滤出未抽取的任务
        const availableTasks = this.taskList.filter(task => !missionListRes.data.includes(task.task_id));
        console.log('availableTasks ',availableTasks )
        const probabilities ={
          '简单':0.5,
          "普通":0.3,
          "困难":0.15,
          "超难":0.05
        }

        // 创建加权任务池
        const weightedPool = [];
        availableTasks.forEach((task, index) => {
          const weight = probabilities[task.task_grade] || 0; // 获取对应 task_grade 的概率
          const weightCount = Math.round(weight * 100); // 放大概率
          for (let i = 0; i < weightCount; i++) {
            weightedPool.push(task);
          }
        });
        // 使用 Set 保证抽取任务不重复
        console.log("ids",missionListRes.data.map(task => task._id))
        const selectedTaskIds = new Set(missionListRes.data.map(task => task._id).filter(id => id !== undefined))
        const selectedTasks = [];
        while (selectedTasks.length < count && weightedPool.length > 0) {
          const randomIndex = Math.floor(Math.random() * weightedPool.length);
          const randomTask = weightedPool[randomIndex];

          if (!selectedTaskIds.has(randomTask._id)) {
            selectedTasks.push(randomTask);
            selectedTaskIds.add(randomTask._id);
          }
        }
        const updateTaskArr=selectedTasks.map(item=>{
          return addMission({
            finish_time:0,
            complete_type: 1, // 完成状态 1未完成 2真正的已完成 3已放弃 4待结算，在列表中显示已完成
            npc_id: '',
            score:  item.score,
            task_id:  item._id,
            task_info:  item,
            user_id: this.user_id,
            create_time: new Date().getTime(),
          })
        })
        console.log(updateTaskArr)
        Promise.all(updateTaskArr).then(res=>{
          console.log(res)
          this.getMissionList()
          this.loading=false
        }).catch(err=>{
          console.log('生成任务失败',err)
          this.getMissionList()
          this.loading=false
        })
      }catch (e) {
        console.log(e)
      }

    },
    onRefresh(){
      db.collection('user-activity-2025').where({
        user_id: _.eq(this.user_id),
      }).update({
        data:{
          hasMissionRefresh:0
        }
      }).then(res=>{
        console.log(res)
        if(res.stats.updated===1){
          uni.removeStorageSync('first_fresh')
          this.refreshMission(11111)
        }
      }).catch(e=>{
        uni.$u.toast('哎呀，刷新出现了问题')
      })

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
.end-box{
  width: 80vw;
  height: 300px;
  border-radius: 16px;
  border: 5px solid  #dddddd;
  position: fixed;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
