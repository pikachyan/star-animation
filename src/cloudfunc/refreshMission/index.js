// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database(),_=db.command


exports.main = async (event, context) => {
   //  变更档案的可刷新状态
   const checkRes = await db.collection('user-activity-2025').where({
    user_id:_.eq(event.user_id)
    }).update({
      data:{
        hasMissionRefresh:0
      }
    })
  console.log(checkRes)

    //     放弃列表中未完成的任务 completetype状态1的标记为状态3  状态4的标记状态2
    const abandonMissionRes = await db.collection('user-mission-2025').where({
          user_id: _.eq(event.user_id),
          complete_type:_.eq(1)
      }).update({
          data:{
              complete_type:3,
              finish_time:new Date().getTime()
          }
      })
    const abandonMissionRes2 = await db.collection('user-mission-2025').where({
        user_id: _.eq(event.user_id),
        complete_type:_.eq(4)
    }).update({
        data:{
            complete_type:2,
            finish_time:new Date().getTime()
        }
    })
    await Promise.all([abandonMissionRes,abandonMissionRes2]).then(res=>{
        console.log(res)
        if(res.every(item=>item.errMsg.includes('ok'))){
            return new Promise((resolve, reject)=>{
                cloud.callFunction({
                    name:'createMissionList',
                    data:{
                        user_id:event.user_id,
                    }
                }).then(res=>{
                    console.log(res)
                })
            })
        }
    })

}
