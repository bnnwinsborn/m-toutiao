<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 标签导航栏 -->
    <van-tabbar route>
      <!-- route开启路由模式 -->
      <van-tabbar-item to="/">
        <i class="toutiao toutiao-shouye" slot="icon"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i class="toutiao toutiao-wenda" slot="icon"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i class="toutiao toutiao-shipin" slot="icon"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i class="toutiao toutiao-wode" slot="icon"></i>
        <span class="text">{{$store.state.user?'我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  props: [],
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.layout-container {
  i.toutiao {
    font-size: 40px;
  }
  span.text {
    font-size: 26px;
  }
}
</style>
