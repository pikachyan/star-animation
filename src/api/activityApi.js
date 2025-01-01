const db = wx.cloud.database()

module.exports= {
    createTask:createTask,
    updateTask:updateTask,
    deleteTask:deleteTask,
    getTaskList:getTaskList,
    getTaskDetail:getTaskDetail,
    getOwnMission:getOwnMission
}
// 获取自己未完成的任务
function getOwnMission(userid){
    return db.collection('user-mission-list_2025')
        .where({
            mission_status:0,
            user_id:userid
        })
        .get()
}
//查询任务列表
function getTaskList(skip){
    return db.collection('task').skip(skip).get()
}
function createTask(data){
    return db.collection('task').add({
        // data 字段表示需新增的 JSON 数据
        data: data
    })
}
function getTaskDetail(id){
    return db.collection('task').doc(id).get()
}
function updateTask(id,data){
    return db.collection('task').doc(id).update({data:data})
}
function deleteTask(id){
    return db.collection('task').doc(id).remove()
}
