import User from 'src/entities/User'
import dayjs from "dayjs"
const db = wx.cloud.database()

module.exports={
    getUserInfo:getUserInfo,
    createUser:createUser,
    updateUser:updateUser,
    deleteUser:deleteUser,
    resetUserInfo:resetUserInfo,
    updatePermission:updatePermission,
    getAdmList:getAdmList

}
// 获取管理员列表
function getAdmList(query,total=0){
    return  db.collection('user').skip(total).where(query).get()
}

// 升级用户权限
function  updatePermission(id,role){
    return db.collection('user').doc(id).update({
        data:{
            permission:role
        }
    })
}

/**
 * 创建用户
 * @param params {Object} 用户名 头像
 */
function createUser(name,avatar){
        let user=new User(name,avatar)
        user.createTime=dayjs().format('YYYY-MM-DD HH:mm:ss')
        return  db.collection('user').add({
            data:user
        })
}

// 使用唯一id获取用户信息
function getUserInfo(id) {
   return  db.collection('user').doc(id).get()
}

// 更新用户信息
function updateUser(id,obj) {
    return db.collection('user').doc(id).update({
        data:obj
    })
}

// 删除用户
function deleteUser(id) {

}

// 重置用户名和头像：用于后台管理
function resetUserInfo(type,id){
    switch (type) {
        // 重置头像
        case 0:
            return db.collection('user').doc(id).update({
                data:{
                    avatarImg:'cloud://find-star-4g2x0r1he0d02ba9.6669-find-star-4g2x0r1he0d02ba9-1316449395/user-avatars/sys-avatar/default.png'
                }
            })
        // 重置用户名
        case 1:
            return db.collection('user').doc(id).update({
                data:{
                    // 重置时按时间戳
                    name:'user'+Date.now()
                }
            })
    }
}
