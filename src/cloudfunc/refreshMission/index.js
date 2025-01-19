// 云函数入口文件
const cloud = require('wx-server-sdk')
const db=cloud.database(),_=db.command
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {

  return await db.collection('user-mission-2025').where({
    _id: _.eq(event._id),
    complete_type:2
  }).update({
    data:{
      complete_type:3
    }
  })
}
