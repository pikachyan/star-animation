<template>
  <view  style="padding:0 10px;">
      <u-form
          label-position="top"
          label-width="auto"
      >
        <u-divider text="基础配置"></u-divider>
        <u-form-item label="活动名称">
          <u-input v-model="activity_name" clearable></u-input>
        </u-form-item>
        <u-form-item label="开始时间">
          <view @click="openDate(1)">
            <u-input :value="startTimeStr" disabled disabled-color="#fff"></u-input>
          </view>
        </u-form-item>
        <u-form-item label="结束时间">
          <view @click="openDate(2)">
            <u-input :value="endTimeStr" disabled disabled-color="#fff"></u-input>
          </view>
        </u-form-item>
        <u-form-item label="解锁每一段故事所需分数">
          <u-input v-model="unlockStoryValue" placeholder="例：1,2,3,4,5··· 英文逗号隔开"></u-input>
        </u-form-item>
        <u-form-item label="配置立即生效">
          <u-switch v-model="effectActive"></u-switch>
        </u-form-item>

        <u-divider text="礼品配置"></u-divider>
        <view style="display: flex;justify-content: flex-end;margin-bottom: 10px">
          <view>
            <u-button @click="addGiftItem" type="primary" text="添加" size="small"></u-button>
          </view>
        </view>
        <view v-if="giftsList.length>0" style="display: flex">
          <u-text text="礼品类型" align="left"></u-text>
          <u-text text="解锁分数" align="left"></u-text>
        </view>
        <view v-for="(item,index) in giftsList" :key="index" style="display: flex;margin-bottom: 10px">
          <u-input v-model="item.giftType"></u-input>
          <view style="width: 15px"></view>
          <u-number-box v-model="item.score" min="1"></u-number-box>
          <view style="margin-left: 5px;display: flex;align-items: center">
            <u-button @click="removeGiftItem(index)" size="small" type="error" icon="trash" text="移除"></u-button>
          </view>
        </view>
      </u-form>
    <view style="padding: 10px">
      <u-button @click="subMitActivity" type="primary" text="提交" shape="circle"></u-button>
    </view>
    <view style="height: 50px"></view>
    <u-datetime-picker
        :show="showDate"
        mode="datetime"
        @confirm="onDateConfirm"
        @cancel="onDateCancel"
        @close="onDateCancel"
        :minDate="new Date().getTime()"
    ></u-datetime-picker>


  </view>

</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import {createActivity} from "@/api/activityApi";


export default {
  mixins: [],
  onLoad(ctx) {
    this.isEdit=ctx.isEdit
    uni.setNavigationBarTitle({
      title:this.isEdit?'修改活动配置':'新建活动配置'
    })
  },
  mounted() {

  },
  watch: {},
  computed: {
    ...mapGetters([]),
  },
  data() {
    return {
      showGiftEditDialog:false,
      isEdit:false,
      showDate: false,
      activity_name: '',
      startTime: 0,
      startTimeStr: '',
      endTime: 0,
      endTimeStr: '',
      currentDate: -1,
      effectActive: false,
      giftsList: [],
      unlockStoryValue:''
    }
  },

  methods: {
    onDateConfirm(e) {
      console.log(e)
      let {value} = e
      this[this.currentDate == 1 ? 'startTime' : 'endTime'] = value
      this[this.currentDate == 1 ? 'startTimeStr' : 'endTimeStr'] = this.$u.timeFormat(value, 'yyyy年mm月dd日 hh时MM分')
      this.onDateCancel()
    },
    onDateCancel() {
      this.showDate = false
      this.currentDate = -1
    },
    openDate(i) {
      this.showDate = true
      this.currentDate = i
    },
    addGiftItem(){
      this.giftsList.push({
        giftType:'',
        score:1
      })
    },
    removeGiftItem(id){
      this.giftsList.splice(id,1)
    },
    subMitActivity(){
      if(this.isEdit){

      }else{
        createActivity({
          unlockStoryArr:this.unlockStoryValue.trim().split(',').map(item=>parseInt(item)),
          activityName:this.activity_name,
          startTime:this.startTime,
          endTime:this.endTime,
          effectActive:this.effectActive,
          giftsList:this.giftsList
        }).then(res=>{
          console.log(res)
          if(res.errMsg.includes('add:ok')){
            uni.showToast({
              mask:true,
              title:'提交成功，返回上页',
              duration:2000
            })
            setTimeout(()=>{
              uni.navigateBack({})
            },1000)

          }else{
            uni.showToast({
              title:'提交异常',
              icon:'error'
            })
          }
        })
      }
    }
  },

}
</script>

<style lang='scss' scoped>

</style>
