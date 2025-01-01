// 首页横向轮播图构造器
class Swiper{
    /**
     * @param src 图片地址
     * @param title 图片描述
     * @param sort 排序值 数字越大越靠前
     */
    constructor(src,title,sort=1) {
        this.src=src;
        this.title=title;
        this.sort=sort
    }
}
