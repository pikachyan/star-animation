const db = wx.cloud.database()
const _=db.command
export {
    getActivityInfo,
    removeActivity,
    checkEffectActivity,
    getActivityList,
    createActivity,
    updateActivity,
    createTask,
    updateTask,
    deleteTask,
    getTaskList,
    getTaskDetail,
    getOwnMission,
    hasMission,
    updateMission,
    addMission
}
function createActivity(data){
    return db.collection('activity').add({
        data: data
    })
}

// 更新任务的状态
function updateMission(id,data){
    return db.collection('user-mission-2025').doc(id).update({
        data:data
    })
}

// 添加一个任务
function addMission(data) {
    return db.collection('user-mission-2025').add({
        data:data
    })
}

//  检查一个任务是否存在
function hasMission(id){
    return db.collection('user-mission-2025').doc(id).get()
}

function getActivityInfo(id){
    return db.collection('activity').doc(id).get()
}

// 更新一个活动配置
function updateActivity(id,data){
    return db.collection('activity').doc(id).update({
        data: data
    })
}
// 切换某个活动配置的启用状态，并关闭其他配置的启用状态
function checkEffectActivity(id){
    uni.showLoading()
    db.collection('activity') .where({
        _id:_.neq(id)
    }).update({
        data:{
            effectActive:false,
        },
        success:res=>{
            console.log(res)
            console.log('切换配置成功，即时生效')
            db.collection('activity')
                .where({
                    _id:_.eq(id)
                }).update({
                data:{
                    effectActive:true,
                },
                success:res=>{
                    uni.hideLoading()
                    console.log(res)
                    console.log('已经关闭其他配置')
                }
            })
        },
        error:res=>{
            uni.showLoading()
        },fail:res=>{
            uni.showLoading()
        }
    })

}

// 获取活动配置列表
function getActivityList(){
    return db.collection('activity').get()
}
function removeActivity(id){
    return db.collection('activity').doc(id).remove()
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
