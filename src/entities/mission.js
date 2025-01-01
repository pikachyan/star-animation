export default class mission{
  /**
   * @param {*} finish_time 任务完成时间
   * @param {*} npc_id 核销人id
   * @param {*} task_score 任务分数
   * @param {*} task_id 任务id
   * @param {*} create_time 创建时间
   * @param {*} team_id 阵营id
   * @param {*} user_id 用户id
   * @param {*} mission_status 任务状态(0已接取/1已完成/2已放弃)
   */
  constructor(finish_time='',mission_status,npc_id,task_score,task_id,create_time,team_id,user_id){
    this.finish_time=finish_time
    this.mission_status=mission_status
    this.npc_id=npc_id
    this.create_time=create_time
    this.team_id=team_id
    this.user_id=user_id
    this.npc_id=npc_id
    this.task_score=task_score
    this.task_id=task_id
  }
}
