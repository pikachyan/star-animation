// 入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database(),_=db.command

let popList=[]
function selectMissionType(){
    // 基础抽取概率
    const probabilities ={
        '简单':0.5,
        "普通":0.3,
        "困难":0.15,
        "超难":0.05
    }
    const randomValue = Math.random();
    let selectedGrade;
    let cumulativeProbability = 0;
    for (const grade in probabilities) {
        cumulativeProbability += probabilities[grade];
        if (randomValue <= cumulativeProbability) {
            selectedGrade = grade;
            break;
        }
    }
    return selectedGrade;
}

function createOneMission(list){
    let cate=selectMissionType()
    let cateMissionList=list.filter(item=>item.task_grade===cate)
    // 如果这个类型的任务抽完了
    if(cateMissionList.length===0){
        console.log('抽完了')
        createOneMission(list)
    }else{
        let randomIndex = Math.floor(Math.random() * cateMissionList.length)
        let res=cateMissionList[randomIndex],indexInOriginList=list.indexOf(item=>item._id===res._id)
        if(indexInOriginList!==-1){
            popList.concat(list.splice(indexInOriginList,1))
        }
        console.log(res)
        console.log(popList)
        return res
    }
}
// 入口函数
exports.main =(event, context) => {
    return new Promise(async (resolve, reject)=>{
        // 抽取类型
        const missionRef = await db.collection('task').get()
        console.log(missionRef)
        const allMissionList=missionRef.data
        const user_id=event.user_id
        let taskList=[]
        for(let i=1;i<=4;i++){
            let mission = createOneMission(allMissionList)
            console.log('mission',mission)
            taskList.push(db.collection('user-mission-2025').add({
                    data:{
                        finish_time:0,
                        complete_type: 1, // 完成状态 1未完成 2已完成 3已放弃
                        npc_id: '',
                        score:  mission.score,
                        task_id:  mission._id,
                        task_info:  mission,
                        user_id: user_id,
                        create_time: new Date().getTime(),
                    }
                }))
        }
        Promise.all(taskList).then(allRes=>{
            console.log(allRes)
        })
    })

}
