<template>
  <view>
    <u-button @click="openDialog"></u-button>
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
import weappQRcode from "@/utils/weapp.qrcode.esm";
import {mapState} from "vuex";
export default {
  components: {},
  created() {

  },
  mounted() {
    this.showCodeDialog=true
    console.log('当前生效的活动配置',this.activeActivityConfig)

  },

  watch: {
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
      this.showCodeDialog=true

    },
    closeDialog(){
      this.showCodeDialog=false
      setTimeout(()=>{
        this.selectMissionIndex=-1
      },500)
    }
  },

}
</script>

<style lang='scss' scoped>

</style>
