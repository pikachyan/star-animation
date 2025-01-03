<template>
  <view>
    <u-divider text="游客管理"></u-divider>
    <u-grid
        :border="false"
        col="2"
    >
      <u-grid-item>
        <u-icon
            :customStyle="{paddingTop:20+'rpx'}"
            name="scan"
            :size="52"
        ></u-icon>
        <text class="grid-text">奖励快速验证</text>
      </u-grid-item>
    </u-grid>
    <template >
      <u-divider text="基础功能"></u-divider>
      <u-grid
          :border="false"
          col="2"
          @click="click"
      >
        <u-grid-item  v-for="(item,index) in menuList" :key="index">
          <u-icon
              :customStyle="{paddingTop:20+'rpx'}"
              :name="item.icon"
              :size="52"
          ></u-icon>
          <text class="grid-text">{{item.name}}</text>
        </u-grid-item>
      </u-grid>
    </template>

  </view>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  components: {},
  mixins: [],
  created() {

  },
  mounted() {

  },
  onLoad(ctx) {

  },
  onReady() {

  },
  onShow() {

  },
  watch: {},
  computed: {
    ...mapGetters([])
  },
  props: [],
  data() {
    return {
      menuList:[
        {
          name:'活动配置',
          icon:'setting',
          path:'/pages/admin/activity-config'
        },
        {
          name:'管理员列表',
          icon:'file-text',
          path:'/pages/admin/admin-list'
        },
      ]
    }
  },

  methods: {
    click(i){
      console.log(i)
      uni.navigateTo({
        url:this.menuList[i].path
      })
    }
  },

}
</script>

<style lang='scss' scoped>

</style>
