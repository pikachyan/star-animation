<template>
  <view>
    <view style="display: flex;padding: 10px;justify-content: flex-end">
      <view>
        <u-button icon="scan" size="small" text="加NPC" type="primary" @click="addAdm(3)"></u-button>
      </view>
      <view style="margin-left: 10px">
        <u-button icon="scan" size="small" text="加管理员" type="primary" @click="addAdm(2)"></u-button>
      </view>
    </view>
    <u-cell-group>
      <u-cell
          v-for="(item,index) in list"
          :key="index"
          size="large"
          :title="item.name"
          :label="item._id"
          @click="removeAdm(item._id)"
      >
        <template  v-slot:icon>
            <u-image radius="8" width="40px" :src="item.avatarImg" height="40px"></u-image>
        </template>
      </u-cell>
    </u-cell-group>
  </view>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import {getAdmList, updatePermission} from "../../api/userApi";

export default {
  components: {},
  mixins: [],
  created() {
    this.getList()
  },
  watch: {},
  computed: {
    ...mapGetters([])
  },
  props: [],
  data() {
    return {
      list:[]
    }
  },

  methods: {
    getList(){
      getAdmList().then(res=>{
        console.log(res)
        this.list=res.data
      })
    },
    addAdm(role){
      uni.scanCode({
        onlyFromCamera:true,
        scanType:['qrCode'],
        success:r => {
          const {result}=r
          updatePermission(result,role).then(res=>{
            console.log(res)
            if(res.stats.updated===1){
              uni.$u.toast('已添加')
              this.getList()
            }else{
              uni.$u.toast('已经在列表里或没有用户')
            }

          })
        }
      })
    },
    removeAdm(id){
      if(id==='80e3bed0656b9158021d95e52513c5fc')return
      uni.showModal({
        title:'提示',
        content:'移除权限？',
        success:o=>{
          if(o.confirm){
            updatePermission(id,4).then(res=>{
              console.log(res)
              uni.$u.toast('已移除')
              this.getList()
            })
          }
        }
      })
    }
  },

}
</script>

<style lang='scss' scoped>

</style>
