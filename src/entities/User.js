export default class User {
    constructor(
        name,
        avatarImg,
    ) {
        //阵容 0未选1星光2黑夜
        this.team=0;
        this.lastLoginTime='';
        this.name = name;
        this.avatarImg = avatarImg;
        this.createTime = '';
        // 0保密1女2男
        this.gender = '';
        // 传YYYY-MM-DD
        this.birth = '';
        // 权限组 1超级管理员 2管理员 3npc 4群众
        this.permission = 4;
        this.isBanned = false;
    }
}
