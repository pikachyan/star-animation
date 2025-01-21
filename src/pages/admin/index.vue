<template>
  <view style="display: flex;justify-content: center;align-items: center;height: 100vh">

    <template >
      <u-grid
          col="3"
          @click="click"
      >
        <template  v-for="(item,index) in menuList">
          <u-grid-item v-if="item.permission.includes(userInfo.permission)" :key="index">
            <u-icon
                :customStyle="{paddingTop:40+'rpx'}"
                :name="item.icon"
                :size="52"
            ></u-icon>
            <text class="grid-text">{{item.name}}</text>
          </u-grid-item>
        </template>

      </u-grid>
    </template>
  </view>
</template>

<script>
import {mapGetters, mapActions, mapMutations, mapState} from 'vuex';
import {hasMission} from "@/api/activityApi";
import {updateMission} from "../../api/activityApi";

export default {
  computed: {
    ...mapState(['userInfo'])
  },
  props: [],
  data() {
    return {
      menuList:[
        {
          name:'活动配置',
          icon:'setting',
          path:'/pages/admin/activity-config',
          permission:[1,2]
        },
        {
          name:'管理员列表',
          icon:'file-text',
          path:'/pages/admin/admin-list',
          permission:[1,2]
        },
        {
          name:'任务验证',
          icon:'scan',
          permission:[1,2,3]
        }
      ]
    }
  },

  methods: {
    click(i){
      console.log(i)
      if(i!==2){
        uni.navigateTo({
          url:this.menuList[i].path
        })
      }else{
        uni.scanCode({
          scanType:['qrCode'],
          onlyFromCamera:false,
          success:r=>{
            uni.showModal({
              title:'提示',
              content:'是否确认任务已完成',
              success:async i=>{
                if(i.confirm){
                  //  验证是否存在任务
                  const missionId=r.result
                  const has=await hasMission(missionId).catch(e=>{
                    return  uni.$u.toast('该任务不存在或异常')
                  })
                  console.log(has)
                  const passMissionRes=await updateMission(missionId,{
                    npc_id:this.userInfo._id,
                    complete_type:2,
                    finish_time:new Date().getTime()
                  }).catch(e=>{
                    console.log(e)
                    return  uni.$u.toast('验证任务异常')
                  })
                  console.log(passMissionRes)
                  if(passMissionRes.errMsg.includes('update:ok')&&passMissionRes.stats.updated==1){
                    uni.$u.toast('已通过')
                  }
                }
              }
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
