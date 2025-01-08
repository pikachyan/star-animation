<template>
  <view>

    <template >
      <u-grid
          col="1"
          @click="click"
      >
        <u-grid-item  v-for="(item,index) in menuList" :key="index">
          <u-icon
              :customStyle="{paddingTop:40+'rpx'}"
              :name="item.icon"
              :size="52"
          ></u-icon>
          <text class="grid-text">{{item.name}}</text>
        </u-grid-item>
      </u-grid>
    </template>
    <u-grid
        col="1"
    >
      <u-grid-item>
        <u-icon
            :customStyle="{paddingTop:40+'rpx'}"
            name="scan"
            :size="52"
        ></u-icon>
        <text class="grid-text">奖励快速验证</text>
      </u-grid-item>
    </u-grid>
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
