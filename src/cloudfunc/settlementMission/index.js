// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database(),_=db.command,$ = db.command.aggregate;

// 结算一条任务
// 云函数入口函数
exports.main = (event, context) => {
    return new Promise(async (resolve, reject)=>{
        const missionId=event.missionId
        const missionInfo=await db.collection('user-mission-2025').doc(missionId).get().catch(e=>{
            console.log(e)
            reject(e)
        })
        console.log(missionInfo)
        const user_id=missionInfo.data.user_id
        const passMissionRes=await db.collection('user-mission-2025').doc(missionId).update({
            data:{
                npc_id:event.npc_id,
                complete_type:4,
                finish_time:new Date().getTime()
            },
        }).catch(e=>{
            console.log(e)
            reject(e)
        })

        console.log(passMissionRes)
        if(passMissionRes.errMsg.includes('update:ok')&&passMissionRes.stats.updated==1){
            const scorePlus =await db.collection('user-activity-2025').where({
                user_id:_.eq(user_id)
            }).update({
                data:{
                    score_total:_.inc(missionInfo.data.score)
                }
            }).catch(e=>{
                console.log(e)
                reject(e)
            })
            resolve(scorePlus)
        }
    })

}
