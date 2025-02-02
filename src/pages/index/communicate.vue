<template>
  <view style="width:100%;height:100%;display: flex;flex-direction: column">
    <top-placeholder id="pdheight">
      <view @click="onExit" style="margin-top: 15px">
        <u-icon name="arrow-left" label="退出剧情" color="#fff" label-color="#fff"></u-icon>
      </view>
    </top-placeholder>
    <scroll-view
        scroll-with-animation
        :scroll-top="scrollTop"
        @click="$u.throttle(storyStep,600,true)"
        scroll-y
        style="padding: 0 10px;box-sizing: border-box"
        :style="{height:scrollHeight+'px'}"
    >
      <view id="com-container">
        <view v-if="showTitle" :style="{height:scrollHeight+'px'}" class="chapter-title" :class="showTitle?'chapter-title_in':'chapter-title_out'">
          <text style="text-align: center;font-family: alm;line-height: 50px">
            {{storyTitle}}
          </text>
          <view style="font-size:12px;margin-top: 60px;color: #fff;font-family: alm">
            - 点击开启剧情 -
          </view>
        </view>
        <template v-else >
          <view v-for="(item,index) in communicateList">
            <view :key="index">
              <view  class="center" v-if="item.position==='center'">
                {{item.text}}
              </view>
              <view v-else :class="item.position">
                <view style="height: 45px;width: 45px;margin: 0 5px">
                  <u-avatar size="45px" :src="item.avatar"></u-avatar>
                </view>
                <view :style="item.position==='right'?'align-items:flex-end;':''" style="display: flex;flex-direction: column;justify-content: flex-end">
                  <view style="font-family: alm;color: #fff;margin-bottom: 5px;font-size: 12px;">{{item.name}}</view>
                  <view style="max-width:400rpx;font-family: alm;background: #fff;padding:10px;border-radius: 8px;font-size: 14px;">
                    {{item.text}}
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view style="display:flex;flex-direction: column;align-items:center;justify-content: center" v-if="lineIndex>storyInfo.length" >
            <text style="font-size: 22px;font-family: alm;width: 100%;text-align: center;color: #fff">
              {{storyIndex!==9&&lineIndex>storyInfo.length?'- 本章完 -':'梦界绮旅 - 终 -'}}
            </text>
            <view style="margin-top: 15px;width: 150px">
              <u-button shape="circle" @click.stop="onExit" text="返回主会场"></u-button>
            </view>
          </view>
          <view id="bottom" style="height: 50px"></view>
        </template>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import TopPlaceholder from "@/components/top-placeholder.vue";
import {mapState} from "vuex";
const imageUrl='cloud://find-star-0gi8dl41091136d1.6669-find-star-0gi8dl41091136d1-1316449395/storyAvatar/'
export default {
  components: {TopPlaceholder},
  created() {

  },
  mounted() {
    uni.createSelectorQuery().in(this).select('#pdheight').boundingClientRect(res=>{
      console.log(res)
      this.scrollHeight=uni.getWindowInfo().screenHeight-res.height
    }).exec()
    let name=uni.getStorageSync("user_name"),avatar=uni.getStorageSync("user_avatar");
    this.storyList=[
      [
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'我带的高三班上的一对小孩有早恋倾向,女孩因为这事,愁的请假在家调整心情，唉，弄得我头好大。'
        },
        {
          name:'朋友',
          position:'left',
          avatar:imageUrl+'friend.png',
          text:'这么严重？你直接叫家长来聊聊，把这事掐了呗。'
        },
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'不行!先开导开导，如果他们能把这事化作动力，那对学习也是有帮助的。'
        },
        {
          name:'朋友',
          position:'left',
          avatar:imageUrl+'friend.png',
          text:'你还是刚上岗太心软，高三生只管好学习就行了啊，你这么搞，人家长还不乐意呢!'
        },
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'高三生也只是少年而已啊，谁还没个春心萌动的时候?喜欢谁不是错，只是……不能因为喜欢而做了错事。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'打扰啦！您们点的炒粉加蛋来咯。'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'还有小肆特调果酒。'
        },
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'谢谢！这里的店员都这么漂亮呀~'
        },
      ],
      [
        {
          name:'',
          position:'center',
          avatar:imageUrl+'',
          text:'两道倩影在街道上、房顶上穿梭，宛如两道流光落在一栋四层小楼上，其中一名绿蓝渐变发色的少女敲了敲耳机上的天线，看向一旁的黑红发色少女。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'夜穹，我们到了，你来开门，我发信号。'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'好，姐姐拉住我的手吧，要穿进去了。'
        },
        {
          position:'center',
          text:'两人身形渐渐消隐，再显现在一名少女的房间内。少女躺在床上紧闭双眼，眉头紧皱，看起来正被噩梦困扰着。'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'姐姐，她很痛苦……'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'我感受到她从梦中传来的纠结、难过、焦虑。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'梦魇已经入侵了，开门吧，我们先行一步！'
        },
        {
          position:'center',
          text:'星浔和夜穹同时在各自的耳机上，揪出一道光芒。星浔手中的光芒飞出窗外，化作无数光点散向四面八方。'
        },
        {
          position:'center',
          text:'夜穹手中的光芒则点在睡眠少女的眉心，张开一道一人高的漩涡。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'入梦使们……请快点赶来……'
        },
      ],
      [
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'坏了夜穹！'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'我这题不会，你快教我，要交作业了!'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'……姐姐，这题就写在教科书里。'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'你翻到讲细胞器那页，直接对着书本填就行了。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'啊……你扮演高中生好熟练啊……'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'明明就是姐姐太笨了!'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'哪有？！不行我得先做作业……'
        },
        {
          name:'梦主-刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'星浔，你好了没啊？再不交就来不及了！'
        },
        {
          position:'center',
          text:'扎着马尾辫的少女捧着一沓作业本，眼睛不时偷瞄隔壁组收作业的进度。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'啊！要不萱萱你先走吧？我马上写完，一会儿跑过去交给你！'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'宋尤好像先收完作业了诶。'
        },
        {
          name:'梦主-刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'什么……！'
        },
        {
          name:'梦主-刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'他、他收完作业关我什么事？老师催了，星浔你快点噢！'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'她跑了……'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'姐姐，难道你是故意拖着的？'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'!'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'对、对哦！'
        },
      ],
      [
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'啊！你喜欢他！'
        },
        {
          name:'梦主-刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'嘘！不要说！！！'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'你脸好红哦……错了错了，别掐我！'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'哈哈哈哈……可是，我们已经高三了。'
        },
        {
          name:'梦主-刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'唉，是啊。'
        },
        {
          name:'梦主-刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'他想考的大学我没把握，如果错过这个学期，以后各奔东西怎么办呢？'
        },
        {
          name:'梦主-刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'可这是早恋啊！而且下学期就要高考，我不能拖累学业！'
        },
        {
          name:'梦主-刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'但我好想知道他对我到底是什么想法？'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'梦境在震动？萱萱！先别想这些了……'
        },
        {
          name:'梦主-刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'直接告白吧！不行……这是早恋，老师和爸妈都会失望的……？'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'萱萱！停下来！'
        },
        {
          name:'梦主-刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'……我到底该怎么办才好？'
        },
        {
          position:'center',
          text:'天色不知道什么时候被染成黑紫，刘萱趴在栏杆旁双眼无神，魔怔了一样自言自语。忽地一只大爪从栏杆外伸出，一把抓住刘萱，拽向楼下！'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'梦魇！'
        },
      ],
      [
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'我靠着身形虚幻的能力在教室外面走了一圈……'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'操场长满了黑紫色的梦魇树，梦里的学生也都变成蜥蜴人形的怪物了。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'刘萱的心树呢？'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'在操场中心，周围全是怪物，如果她不解开心结，我们很难强行救出她。'
        },
        {
          name:'梦魇',
          position:'left',
          avatar:imageUrl+'monster.png',
          text:'嘶……又是你们，龙宫的小姑娘。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'!!'
        },
        {
          name:'梦魇',
          position:'left',
          avatar:imageUrl+'monster.png',
          text:'我们好不容易找到的好苗子，你们又来掺一脚，可惜，这次你们没那么好运了。'
        },
        {
          name:'梦魇',
          position:'left',
          avatar:imageUrl+'monster.png',
          text:'杀了她们！'
        },
        {
          position:'center',
          text:'无数梦魇怪物一拥而上。'
        },
        {
          position:'center',
          text:'星浔指尖划过空气，带起道道雷光，顺着她剑指方向，将众多怪物劈做焦炭。'
        },
        {
          position:'center',
          text:'没被雷光消灭的怪物还没来得及庆幸，就已经身首分离，临死前只能在眼角余光瞥见一道红黑色身影。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'不对劲……'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'怪物们在复活！'
        },
      ],
      [
        {
          name:'宋尤',
          position:'left',
          avatar:imageUrl+'sy.png',
          text:'不是，五把游戏我输四把，你让让我行不？'
        },
        {
          name:name,
          position:'right',
          avatar:avatar,
          text:'这不是让了一把？'
        },
        {
          position: "center",
          text: "作为入梦使的你进入了宋尤的梦——他就是刘萱的暗恋对象。"
        },
        {
          name:'宋尤',
          position:'left',
          avatar:imageUrl+'sy.png',
          text:'最近……我有个在意的女生。'
        },
        {
          name:'宋尤',
          position:'left',
          avatar:imageUrl+'sy.png',
          text:'从初中到高中，一转眼都高三了，我们都只是朋友。'
        },
        {
          name:'宋尤',
          position:'left',
          avatar:imageUrl+'sy.png',
          text:'……这就是早恋吧。如果被家里人知道，怕是要把我腿打折！'
        },
        {
          name:'宋尤',
          position:'left',
          avatar:imageUrl+'sy.png',
          text:'但我……喜欢她，我到底该怎么办？'
        },
        {
          position: "center",
          text: "说着说着，他身上竟也冒出袅袅黑烟，这是梦魇入侵的征兆。"
        },
        {
          name:name,
          position:'right',
          avatar:avatar,
          text:'刘萱的梦情况不佳，梦魇已经蔓延扩散，你的情况也危在旦夕。'
        },
        {
          name:'宋尤',
          position:'left',
          avatar:imageUrl+'sy.png',
          text:'什么意思？'
        },
        {
          name:name,
          position:'right',
          avatar:avatar,
          text:'走吧，我们去学校，那里有你的答案。'
        },
        {
          position: "center",
          text: "你们走到宋尤的学校门口，你福至灵心地掀开眼前的景象，拽着梦主宋尤，毫不犹豫地跳进去。"
        },
        {
          position: "center",
          text: "天时地利已到，就差人了。"
        },
      ],
      [
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'此水几时休，此恨何时已。只愿君心似我心，定不负相思意。'
        },
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'这里的意思是，两人被长江相隔，作者希望自己的爱人能同样的深爱、思念自己。'
        },
        {
          name:'刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'可是老师，长江水源源不休，他们岂不是一直分隔了？'
        },
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'是呀，既然改变不了江水，那就搭桥、划船。'
        },
        {
          name:'宋尤',
          position:'left',
          avatar:imageUrl+'sy.png',
          text:'长江水汹涌，在古代渡江应该不容易吧？'
        },
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'所以就要选择江流平稳的时节，搭最好的桥和船，安安稳稳的渡河。'
        },
        {
          name:'刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'那……对方如果等不了了呢？'
        },
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'如果君心似我心，怎么会等不了呢！'
        },
      ],
      [
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'没想到梦里不仅要写作业，还要上课……'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'没想到解开恋情心结的钥匙，居然是老师。'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'姐姐你看！是心斧，凝聚出来了！'
        },
        {
          name:name,
          position:'right',
          avatar:avatar,
          text:'因为自我意志凝聚的心斧……真是美轮美奂。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'成了！只要维持住这间教室，刘萱一定能劈开梦魇之树！'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'多亏鲨师姐撕开梦魇结界的口子，把这位老师的梦送了进来。'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'还有入梦使，谢谢你把宋尤的梦带过来，刘萱的心斧才得以成形。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'快看，心树在发光，刘萱要劈树了！'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'等等，好巨大的蛇怪缠上了树干，它在绞紧心树！'
        },
      ],
      [
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'糟糕！我来阻止那条大蛇！'
        },
        {
          position: 'center',
          text:'星浔飞身踏出，挟雷霆重重落在蛇怪身上，让蛇怪稍稍松开了心树。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'夜穹，我们还需要一把心斧！'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'我来让宋尤由虚转实，让他完全进入刘萱的梦。'
        },
        {
          position: 'center',
          text:'夜穹向着宋尤背后一拍，将他的身形由虚转实，操场上里突兀地横亘了一条汹涌的大江。'
        },
        {
          name:name,
          position:'right',
          avatar:avatar,
          text:'宋尤，你找到答案了吗？'
        },
        {
          name:'宋尤',
          position:'left',
          avatar:imageUrl+'sy.png',
          text:'我……知道了。'
        },
        {
          name:'宋尤',
          position:'left',
          avatar:imageUrl+'sy.png',
          text:'我们能做的，只有努力在当下，搭好桥和船。然后一起等待最合适的那个“时节“。'
        },
        {
          name:name,
          position:'right',
          avatar:avatar,
          text:'我看到了你熠熠生辉的心斧，用它去劈开阻碍吧！'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'夜穹！就是现在！'
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'好！'
        },
        {
          position: 'center',
          text:'星浔与夜穹合力一击打在蛇眼上，蛇怪发出哀嚎，巨大的声浪与江流相撞，竟刚好让波涛平稳下来'
        },
        {
          position: 'center',
          text:'两道光芒遥遥相望，同时劈下，一斧开树，一斧断流。'
        },
        {
          name:'梦魇',
          position:'left',
          avatar:imageUrl+'monster.png',
          text:'龙宫！！！'
        },
        {
          name:'梦魇',
          position:'left',
          avatar:imageUrl+'monster.png',
          text:'该死！幻界一定会取代真界的，尊上即将归来！'
        },
        {
          name:'梦魇',
          position:'left',
          avatar:imageUrl+'monster.png',
          text:'你们所做的一切，都不过是无用挣扎！'
        },
        {
          name:'神秘鲨影',
          position:'left',
          avatar:imageUrl+'shark.png',
          text:'吵耳！'
        },
        {
          position: 'center',
          text:'一道鲨影突然出现将蛇头咬下，鲨尾驱散漫天黑气，带着星浔夜穹和你，悠悠离去。'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'梦……醒了！！'
        },
      ],
      [
        {
          name:'刘萱妈妈',
          position:'left',
          avatar:imageUrl+'mon.png',
          text:'老师，听说我家刘萱有点那个……早恋？是真的吗？'
        },
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'没有啊！刘萱最近成绩进步很好，怎么会早恋呢。'
        },
        {
          name:'刘萱妈妈',
          position:'left',
          avatar:imageUrl+'mon.png',
          text:'呃……这不是听说嘛……'
        },
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'家长要多关心、支持孩子，别给她太多压力。'
        },
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'现在的时期很关键，她近期表现也优异。'
        },
        {
          name:'实习教师',
          position:'left',
          avatar:imageUrl+'js.png',
          text:'咱们应该多信任她，您说是不？'
        },
        {
          name:'刘萱妈妈',
          position:'left',
          avatar:imageUrl+'mon.png',
          text:'是了，谢谢老师。祝您春节快乐哈！'
        },
        {
          text:'江边桥底下，一对少年少女并肩散步。',
          position: "center"
        },
        {
          name:'宋尤',
          position:'left',
          avatar:imageUrl+'sy.png',
          text:'你想好考哪里了吗？'
        },
        {
          name:'刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'我啊？听说有个学校的会在特定时节开满鲜花，我想考那里。'
        },
        {
          name:'宋尤',
          position:'left',
          avatar:imageUrl+'sy.png',
          text:'可以啊老同学，我也想考那个。到时候校门口吃面走。'
        },
        {
          name:'刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'……那里没有米粉吗？'
        },
        {
          text:'两人有一搭没一搭的闲聊着，都没提起其他事情，只约定好在未来开花的时节，不见不散。',
          position: "center"
        },
        {
          name:'夜穹',
          position:'right',
          avatar:imageUrl+'yq.png',
          text:'姐姐你看，烟花！'
        },
        {
          name:'星浔',
          position:'right',
          avatar:imageUrl+'xx.png',
          text:'哇！好漂亮！'
        },
        {
          name:'刘萱',
          position:'left',
          avatar:imageUrl+'lx.png',
          text:'咦？这两个女生……有点眼熟？'
        },
      ]
    ]
  },
  onLoad(context) {

  },
  onShow() {

  },
  watch: {
    communicateList(){
      this.$nextTick(() => {
        const query = uni.createSelectorQuery().in(this);
        query.select("#com-container").boundingClientRect(res => {
          this.scrollTop = res.height; // 让滚动区域的高度增加
        }).exec();
      });
    }
  },
  computed: {
    ...mapState(['userInfo','storyIndex','storyTitle']),
    storyInfo(){
      return this.storyList[this.$store.state.storyIndex]
    }
  },
  props: ['title'],
  data() {
    return {
      scrollTop: 0,
      scrollHeight:0,
      showTitle:true,
      // 剧本列表
      storyList:[],
      lineIndex:-1,
      // 阅读对话的列表
      communicateList:[]
    }
  },

  methods: {
    scrollToBottom(){
      this.$nextTick(()=>{
        uni.createSelectorQuery().in(this).select('#com-container').boundingClientRect((res)=>{
          console.log(res)
          let top = res.height-this.scrollHeight;
          if(top>0){
            this.scrollTop=top;
          }
        }).exec()
      })
    },
    onExit(){
      this.$store.state.storyReading=false
      this.$store.state.storyIndex=-1
      this.$store.state.showTitle=''
    },
    storyStep(){
      if(this.showTitle){
        this.showTitle=false
      }
      this.lineIndex++
      if(this.lineIndex<this.storyInfo.length){
        this. communicateList.push(this.storyInfo[this.lineIndex])
      }
      this.scrollToBottom()
    }
  },

}
</script>

<style lang='scss' scoped>
@keyframes fadeInLeft {
  0%{
    opacity: 0;
    padding-right: 20px;
  }
  100%{
    opacity: 1;
    padding-right: 0;
  }
}
@keyframes fadeInRight {
  0%{
    opacity: 1;
    padding-left: 20px;
  }
  100%{
    opacity: 0;
    padding-left: 0;
  }
}
@keyframes fadeInUp {
  0%{
    opacity: 0;
   //margin-bottom: 5px;
  }
  100%{
    opacity: 1;
    //margin-bottom: 0;
  }
}
.chapter-title{

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: alm;
  font-size: 35px;
  color: #fff;
  &_in{
    animation: fadeInLeft linear 1s;
  }
  &_out{
    animation:  fadeInRight linear 1s;
  }
}
.center{
  color:#fff;
  font-family: alm;
  background: rgba(0,0,0,0.3);
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  line-height: 20px;
  margin-bottom: 10px;
  animation: fadeInUp linear 500ms;
  font-size: 12px;
}
.left{
  animation: fadeInUp linear 500ms;
  display: flex;
  margin-bottom: 15px;

}
.right{
  animation: fadeInUp linear 500ms;
  display: flex;
  margin-bottom: 15px;
  flex-direction: row-reverse;
}
</style>
