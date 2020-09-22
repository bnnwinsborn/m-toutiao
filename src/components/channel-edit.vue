<template>
  <div class="channel-edit">
    <!-- 频道列表 -->
    <van-cell :border="false" class="title-text">
      <div slot="title">我的频道</div>
      <van-button
        @click="isEdit = !isEdit"
        class="edit-btn"
        plain
        round
        size="mini"
        type="danger"
      >{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid :column-num="3" :gutter="10" class="my-grid">
      <van-grid-item
        :key="index"
        @click="changeChanell(item,index)"
        class="channel-item"
        v-for="(item,index) in myChannels"
      >
        <van-icon name="close" slot="icon" v-show="isEdit&&item.id!==0"></van-icon>
        <span :class="{active:index === active}" class="text" slot="text">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :column-num="3" :gutter="10" class="recommend-grid">
      <van-grid-item
        :key="index"
        :text="item.name"
        @click="Addchannel(item)"
        class="channel-item"
        icon="plus"
        v-for="(item,index) in recommindChannels"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, getAddChannels, getDeleteChannels } from '@/api/channels.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/stroage.js'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allchannels: [],
      isEdit: false
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user']),
    recommindChannels () {
      return this.allchannels.filter(channel => {
        return !this.myChannels.find(mychannel => mychannel.id === channel.id)
      })
    }
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getAllChannels()
        this.allchannels = data.data.channels
      } catch (error) {
        this.$toast('获取频道列表失败，请稍后重试')
      }
    },
    async Addchannel (item) {
      // 调用了计算属性
      this.myChannels.push(item)
      if (this.user) {
        try {
          await getAddChannels({
            id: item.id,
            seq: this.myChannels.length
          })
          this.$toast('添加成功')
        } catch (error) {
          this.$toast('添加失败，请稍后重试')
        }
      } else {
        this.$toast('添加成功')
        setItem('addChannels', this.myChannels)
      }
    },
    changeChanell (item, index) {
      if (!this.isEdit) {
        this.$emit('change-channel', index, false)
      } else {
        if (index === 0) return
        if (index <= this.active) {
          this.$emit('change-channel', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        this.deleteChannel(item)
      }
    },
    async deleteChannel (item) {
      try {
        if (this.user) {
          await getDeleteChannels(item.id)
        } else {
          setItem('addChannels', this.myChannels)
        }
      } catch (error) {
        this.$toast('删除失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 85px;
  .channel-item {
    height: 86px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        white-space: nowrap;
        color: #222;
        font-size: 28px;
        margin-top: 0;
      }
    }
  }
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      // width: 150px;
      flex-direction: row;
      color: #222;
      .van-icon-plus {
        font-size: 24px;
        padding-right: 2px;
      }
    }
  }
  /deep/ .my-grid {
    .active {
      color: red;
    }
    .text {
      font-size: 28px;
      white-space: nowrap;
    }
    .van-icon-close {
      position: absolute;
      right: -14px;
      top: -14px;
      font-size: 36px;
      color: #ccc;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }
}
</style>
