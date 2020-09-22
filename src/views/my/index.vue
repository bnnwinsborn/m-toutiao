<template>
  <div class="my-container">
    <!-- 登录后的头部 -->
    <div class="header user-info" v-if="user">
      <!-- 基本资料 -->
      <div class="base">
        <div class="left">
          <!-- <van-image :src="img[0]" class="avatar" fit="cover" round /> -->
          <van-image :src="userInfo.photo" class="avatar" fit="cover" round />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button round size="mini" to="/user/profile" type="default">编辑资料</van-button>
        </div>
      </div>
      <!-- 基本数据 -->
      <div class="data">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录头部 -->
    <div class="header not-login" v-else>
      <div @click="$router.push('/login')" class="login-btn">
        <img class="mobile-img" src="~@/assets/mobile.png" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 通知 -->
    <van-notice-bar left-icon="volume-o" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i class="toutiao toutiao-shoucang" slot="icon"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i class="toutiao toutiao-lishi" slot="icon"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 单元格 -->
    <van-cell is-link title="消息通知" />
    <van-cell is-link title="小智同学" />
    <van-cell @click="Logout" center class="logout-cell" title="退出登录" v-if="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'mypage',
  props: [],
  data () {
    return {
      userInfo: {}, // 用户信息,
      img: [require('../../assets/avatar.jpg')]
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    } else {
      this.nottoken()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    Logout () {
      // 退出提示
      // 清楚仓库user+本地user
      // 用this.$dialog
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(() => {
        this.$store.commit('setUser', null)
      }).catch(() => {
      })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试')
      }
    },
    nottoken () {
      this.$toast('您还未登录，登录后继续操作')
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  > .header {
    height: 361px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
  }
  .not-login {
    display: flex;
    flex-direction: center;
    justify-content: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        color: #fff;
        font-size: 28px;
      }
    }
  }
  .user-info {
    .base {
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 29px;
          margin-left: 22px;
        }
      }
    }
    .data {
      height: 130px;
      display: flex;
      justify-content: space-around;
      .data-item {
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    height: 100px;
    text-align: center;
    color: #eb5253;
    margin: 10px 0;
    font-size: 30px;
  }
}
</style>
