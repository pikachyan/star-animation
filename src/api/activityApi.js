const db = wx.cloud.database()

export {
    checkEffectActivity,
    getActivityList,
    createActivity,
    updateActivity,
    createTask,
    updateTask,
    deleteTask,
    getTaskList,
    getTaskDetail,
    getOwnMission
}
function createActivity(data){
    return db.collection('activity').add({
        data: data
    })
}

function updateActivity(id,data){
    return db.collection('activity').doc(id).update({
        data: data
    })
}
// 切换启用状态，关闭其他配置的启用状态
function checkEffectActivity(id){

}

// 获取活动配置列表
function getActivityList(){
    return db.collection('activity').get()
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
function getTaskList(skip=0){
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
