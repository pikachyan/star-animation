// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database(),_=db.command,$ = db.command.aggregate;

// 活动开始时记得去开触发器，平时不开 跑流量的

// 云函数入口函数
exports.main = async (event, context) => {

  return await db.collection('user-activity-2025')
      .aggregate()
      .lookup({
        from:'user',
        localField: 'user_id',
        foreignField: '_id',
        as: 'user_info'
      })
      .project({
          _id: 0,
          userName:$.arrayElemAt(['$user_info.name', 0]),
          user_id:1,
          avatarImg:$.arrayElemAt(['$user_info.avatarImg', 0]),
          score:1
      })
      .sort({
        score:-1
      })
      .limit(50)
      .end()
}
