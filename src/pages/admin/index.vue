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
          permission:[1,2,3],
          type:'func'
        },
        {
          name:'奖励验证',
          icon:'gift',
          permission:[1,2,3],
          type:'func1'
        }
      ]
    }
  },

  methods: {
    click(i){
      console.log(i)
      if(!this.menuList[i].type){
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
              content:this.menuList[i].type==='func'?'是否确认任务已完成':'是否兑换用户奖励',
              success:d=>{
                if(d.confirm){
                  if(this.menuList[i].type==='func'){
                    wx.cloud.callFunction({
                      name:'settlementMission',
                      data:{
                        missionId:r.result,
                        npc_id:this.userInfo._id
                      }
                    }).then(res=>{
                      console.log(res)
                      if(res.stats.updated==1){
                        uni.$u.toast('任务验证成功')
                      }
                    }).catch(e=>{
                      console.log(e)
                      uni.$u.toast('任务验证异常')
                    })
                  }else{
                    const db = wx.cloud.database()
                    const _=db.command
                    db.collection('user_activity_2025').where({
                      _id:_.eq(r.result)
                    }).update({
                      data:{
                        getGiftType:1
                      }
                    }).then(res=>{
                      console.log(res)
                      if(res.result.stats.updated==1){
                        uni.$u.toast('礼品已核销')
                      }
                    }).catch(e=>{
                      uni.$u.toast('更新礼品核销状态异常')
                    })
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
