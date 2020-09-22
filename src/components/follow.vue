<template>
  <van-button
    :loading="isFollowLoading"
    @click="follow"
    class="follow-btn"
    color="#3296fa"
    icon="plus"
    round
    size="small"
    type="info"
    v-if="!is_followed"
  >关注</van-button>
  <van-button
    :loading="isFollowLoading"
    @click="follow"
    class="follow-btn"
    round
    size="small"
    v-else
  >已关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'follow-user',
  model: {
    prop: 'is_followed',
    event: 'update-follow'
  },
  data () {
    return {
      isFollowLoading: false
    }
  },

  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    user_id: {
      type: [Number, String, Object],
      required: true
    }
  },

  created () {

  },

  methods: {
    // 关注用户
    async follow () {
      this.isFollowLoading = true
      try {
        // 如果已关注，则取消关注
        const authorId = this.user_id
        if (this.is_followed) {
          await deleteFollow(authorId)
        } else {
          // 否则添加关注
          await addFollow(authorId)
        }

        // 更新视图
        this.$emit('update-follow', !this.is_followed)
      } catch (err) {
        if (err && err.response && err.response.status === 400) {
          return this.$toast.fail('不能关注自己')
        }
        this.$toast.fail('操作失败')
      }

      // 关闭按钮的 loading 状态
      this.isFollowLoading = false
    }
  }
}
</script>

<style scoped lang='less'>
</style>
