<template>
  <view>
    <view class="user-box">

    </view>
    <u-image :showMenuByLongpress="false" :lazyLoad="false" width="100vw" duration="400" mode="widthFix" src="@/static/GotPoints01-024.svg"></u-image>
  </view>
</template>

<script>
import {mapState} from "vuex";

export default {
  components: {},
  created() {

  },
  mounted() {

  },
  watch: {},
  computed: {
    ...mapState(['user_id','isLogin',''])
  },
  props: [],
  data() {
    return {}
  },

  methods: {},

}
</script>

<style lang='scss' scoped>

</style>
