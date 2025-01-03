const db=wx.cloud.database()
const _=db.command
export {
  getSuppliesList,
  addSuppliers,
  changeSupplierStatus,
}
// 用户--获得礼物
function getGift(){
  // 往赠品领取表加一条数据
  return db.collection('').set({
    data:obj
  })
}
// 添加物资
function addSuppliers(obj){
  return db.collection('').set({
    data:obj
  })
}
// 分页获取列表
function getSuppliesList(page){
  return db.collection('').limit(20).skip((page-1)*20).get()
}
// 变更启用状态
function changeSupplierStatus(id,type){
  return db.collection('').doc(id).update({
    data:{

    }
  })
}
