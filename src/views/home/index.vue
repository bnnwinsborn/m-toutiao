<template>
  <div class="home-container">
    <!-- 导航 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        icon="search"
        round
        size="small"
        slot="title"
        to="/search"
        type="info"
      >搜索</van-button>
    </van-nav-bar>
    <!-- 标签 -->
    <van-tabs animated class="channel-tabs" swipeable v-model="active">
      <van-tab :key="item.id" :title="item.name" v-for="item in channel">
        <AticleList :channel="item" />
      </van-tab>
      <div class="placeholder" slot="nav-right"></div>
      <div @click="isChannelDialog = true" class="hamburger-btn" slot="nav-right">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      :style="{ height: '100%' }"
      close-icon-position="top-left"
      closeable
      position="bottom"
      round
      v-model="isChannelDialog"
    >
      <ChannelEdit :active="active" :myChannels="channel" @change-channel="onchangeChannel"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/user.js'
import AticleList from '@/components/article-list.vue'
import ChannelEdit from '@/components/channel-edit.vue'
import { getItem } from '@/utils/stroage.js'
import { mapState } from 'vuex'
export default {
  name: 'homepage',
  props: [],
  components: { AticleList, ChannelEdit },
  data () {
    return {
      active: 0,
      channel: [],
      isChannelDialog: false
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels () {
      if (this.user || !getItem('addChannels')) {
        try {
          const { data } = await getUserChannel()
          this.channel = data.data.channels
        } catch (error) {
          this.$toast('获取数据失败，请稍后重试')
        }
      } else {
        this.channel = getItem('addChannels')
      }
    },
    onchangeChannel (index, isChannelDialog) {
      this.active = index
      this.isChannelDialog = isChannelDialog
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  // padding-bottom: 100px;
  padding-top: 174px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #07df6f;
    border: none;
    font-size: 28px;
  }
  .van-icon {
    font-size: 32px;
    color: #fff;
  }
  /deep/.channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      left: 0;
      right: 0;
      z-index: 1;
      top: 92px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: #07c160;
      border-radius: 3px;
      bottom: 8px;
      z-index: 99999;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
