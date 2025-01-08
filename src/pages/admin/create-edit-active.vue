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
        <u-form-item label="立即生效(提交后推送到所有在线设备)">
          <u-switch v-model="effectActive"></u-switch>
        </u-form-item>
        <u-divider text="礼品配置"></u-divider>
        <view style="display: flex">
          <u-text text="礼品类型" align="left"></u-text>
          <u-text text="解锁分数" align="right"></u-text>
        </view>
        <view style="display: flex;margin-bottom: 10px">
          <u-input></u-input>
          <view style="width: 15px"></view>
          <u-number-box min="1"></u-number-box>
        </view>
        <view style="display: flex;margin-bottom: 10px">
          <u-input></u-input>
          <view style="width: 15px"></view>
          <u-number-box min="1"></u-number-box>
        </view>
      </u-form>
    <view style="padding: 10px">
      <u-button type="primary" text="提交" shape="circle"></u-button>
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
import UInput from "../../components/uview-ui/components/u--input/u--input.vue";


export default {
  components: {UInput},
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
      giftsList: []

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

    }
  },

}
</script>

<style lang='scss' scoped>

</style>
