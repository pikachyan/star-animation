<template>
  <view style="padding: 0 10px">
<!--    <u-divider text="活动配置" ></u-divider>-->
    <view style="display: flex;justify-content: flex-end;margin: 10px 0">
      <view>
        <u-button size="small" @click="toCreateActive" text="新建活动" type="primary"></u-button>
      </view>
    </view>
    <view :key="ac_index" v-for="(ac_item,ac_index) in activityList" class="act-item" :class="ac_item.effectActive?'act-item-active':''">
      <view class="left" @click="toCreateActive(ac_item._id)">
        <text
            style="line-height: 60px"
          :style="{fontSize:ac_item.effectActive?'25px':'20px',color:ac_item.effectActive?'#fff':'#000'}"
        >
          {{ac_item.activityName}}
        </text>
        <text style="font-size: 11px;color:#666">
          {{`${$u.timeFormat(ac_item.startTime, 'yyyy/mm/dd hh:MM:ss')} ~ ${$u.timeFormat(ac_item.endTime, 'yyyy/mm/dd hh:MM:ss')}` }}
        </text>
      </view>
      <view class="right">
        <u-switch v-model="ac_item.effectActive"  asyncChange @change="asyncChange(ac_item._id)" ></u-switch>
      </view>
    </view>
    <u-divider text="任务表"></u-divider>
    <view style="display: flex;justify-content: flex-end">
      <view>
        <u-button size="small" text="刷新" @click="getTask(1)" type="primary"></u-button>
      </view>
      <view style="margin-left: 10px">
        <u-button size="small" text="新建任务" @click="openDialog()" type="primary"></u-button>
      </view>
    </view>
    <u-cell-group :border="false">
      <u-cell clickable v-for="(item,index) in taskList" :key="index"
              :title="`${item.task_name}(${item.score}分)${item.active_type?'(已启用)':''}`"
              :label="item.task_info"
              @click="openDialog(index)">
      >
        <template v-slot:icon>
          <view style="width: 40px">
            <u-text align="center" :text="item.task_grade"></u-text>
          </view>

        </template>
      </u-cell>
    </u-cell-group>
    <view style="height: 50px"></view>

<!--  任务添加修改弹窗  -->
    <u-popup
      :show="showTaskEdit"
      @close="onDialogClose"
      @cancel="onDialogClose"
      mode="center"
      closeable
      round="18"
    >
      <scroll-view scroll-y style="max-height:80vh;width: 80vw;padding: 20px">
        <u-form  :model="taskInfo" label-position="top" label-width="auto">
          <u-form-item  label="任务名">
            <u-textarea confirm-type="return" v-model="taskInfo.task_name" ></u-textarea>
          </u-form-item>
          <u-form-item  label="任务等级（影响抽取概率）">
            <u-radio-group
                v-model="taskInfo.task_grade"
            >
              <u-radio
                  :customStyle="{marginRight: '8px'}"
                  v-for="(item, index) in rateList"
                  :key="index"
                  :label="item"
                  :name="item"
              >
              </u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="任务类型">
            <u-input clearable v-model="taskInfo.task_type"></u-input>
          </u-form-item>
          <u-form-item label="任务描述">
            <u-textarea autoHeight v-model="taskInfo.task_info"></u-textarea>
          </u-form-item>
          <u-form-item label-width="100px" label-position="left" label="分数">
            <u-number-box v-model="taskInfo.score" min="1"></u-number-box>
          </u-form-item>
          <u-form-item label-width="100px" label-position="left" label="启用状态">
            <u-switch v-model="taskInfo.active_type"></u-switch>
          </u-form-item>
        </u-form>

          <view v-if="editType">
            <u-button @click="deleteTask" type="error" shape="circle" text="删除任务"></u-button>
          </view>
          <view  style="margin-top: 10px">
            <u-button @click="subMitTask" type="primary" shape="circle" :text="editType?'保存修改':'创建任务'"></u-button>
          </view>


      </scroll-view>

    </u-popup>
  </view>
</template>

<script>
import {mapState,mapGetters, mapActions, mapMutations} from 'vuex';
import {createTask, deleteTask, getTaskList, updateTask} from "@/api/activityApi";
import {checkEffectActivity} from "../../api/activityApi";
export default {
  components: {},
  mixins: [],
  created() {
    this.getTask()
  },
  mounted() {

  },
  onLoad(ctx) {

  },
  onReady() {

  },
  onShow() {

  },
  watch: {},
  computed: {
    ...mapState(['activityList'])
  },
  props: [],
  data() {
    return {
      val:false,
      showTaskEdit:false,
      taskInfo:{
        task_type:'',
        task_name:'',
        task_info:'',
        task_grade:'',
        score:1,
        active_type:false,
        id:''
      },
      editType:false,
      taskList: [],
      rateList:['简单','普通','困难','超难'],
    }
  },

  methods: {

    getTask(i){
      getTaskList().then(res=>{
        console.log(res)
        this.taskList=res.data;
        // if(i)uni.$u.toast('已刷新')
      })
    },
    openDialog(index){
      console.log(index)
      if(index>=0){
      //   Add mode
        this.editType=true
        const item=this.taskList[index]
        this.taskInfo={
          task_type:item.task_type,
          task_name:item.task_name,
          task_info:item.task_info,
          task_grade:item.task_grade,
          score:item.score,
          active_type:item.active_type,
          id:item._id
        }
      }
      setTimeout(()=>{
        this.showTaskEdit=true;

      },1)
    },
    onDialogClose(){
      this.showTaskEdit=false
      setTimeout(()=>{
        this.editType=false
        this.taskInfo={
          task_type:'',
              task_name:'',
              task_info:'',
              task_grade:'',
              score:1,
              active_type:false,
              id:''
        }
      },400)
    },
    deleteTask(){
      uni.showModal({
        title:'提示',
        content:'确定移除任务：'+this.taskInfo.task_name,
        success:a=>{
          if(a.confirm){
            deleteTask(this.taskInfo.id).then(res=>{
              console.log(res)
              uni.$u.toast('已移除')
              this.getTask(1)
            })
            this.onDialogClose()
          }
        }
      })
    },
    subMitTask(){
      let form=this.taskInfo,id=form.id
      if(this.editType){
        delete form.id;
        updateTask(id,form).then(res=>{
          console.log(res)
          uni.$u.toast('修改成功')
          this.getTask(1)
          this.onDialogClose()
        })
      }else{
        createTask(form).then(res=>{
          console.log(res)
          uni.$u.toast('创建成功')
          this.getTask(1)
          this.onDialogClose()
        })
      }

    },
    toCreateActive(id){
      uni.navigateTo({
        url:`/pages/admin/create-edit-active${id?'?info_id='+id:''}`
      })
    },
    asyncChange(id){
      checkEffectActivity(id)

    }
  },


}
</script>

<style lang='scss' scoped>
.act-item{
  display: flex;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 5px;
  height: 90px;
  width: 100%;
  box-shadow: 0 0  7px 0 #a1a1a1;
  background-color: #efefef;
  margin-bottom: 10px;
  transition: all 1s ease-in-out;
  &-active{
    background-color: #54e66c;
  }
  .left{
    flex-basis: 75%;
    display: flex;
    flex-direction: column;
  }
  .right{
    flex-basis: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
