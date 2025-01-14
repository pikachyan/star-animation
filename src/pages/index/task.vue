<template>
  <view>


    <u-popup
      :show="showCodeDialog"
      mode="center"
      round="16"
      @close=""
    >
      <view style="display: flex;flex-direction: column;margin: 10px;width: 80vw">
        <u-text text="*请向工作人员出示二维码结算任务" align="center"></u-text>
        <canvas canvas-id="qrcode" id="qrcode" style="width: 150px;height:150px;align-self: center;margin:20px 0" />
        <u-button shape="circle" text="关闭"></u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
import UQRCode from '@uqrcode/js';
import UButton from "../../components/uview-ui/components/u-button/u-button.vue";
import {mapState} from "vuex";

export default {
  components: {UButton},
  created() {
    const db=wx.cloud.database()
    const _=db.command

  },
  mounted() {
    this.showCodeDialog=true
    console.log('当前生效的活动配置',this.activeActivityConfig)
  },

  watch: {
    showCodeDialog(){
        if(this.showCodeDialog){
          this.$nextTick(()=>{
            const qr = new UQRCode();
            qr.data = "https://uqrcode.cn/doc";
            qr.size = 150;
            qr.make();
            const canvasContext = uni.createCanvasContext('qrcode', this);
            qr.canvasContext = canvasContext;
            qr.drawCanvas();
          })
        }
    },

  },
  computed: {
    ...mapState(['activeActivityConfig','isLogin','user_id']),
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
    openDialog(index){
      this.selectMissionIndex=index
    },
    dialogClose(){

    }
  },

}
</script>

<style lang='scss' scoped>

</style>
