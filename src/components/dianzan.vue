<template>
  <van-button
    :class="{liked:value === 1}"
    :icon="value === 1 ? 'good-job':'good-job-o'"
    :loading="loading"
    @click="onLike"
  />
</template>

<script>
import { deleteLike, addLike } from '@/api/user.js'
export default {
  name: '',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLike () {
      this.loading = true
      // 两个作用：1、交互提示 2、防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        let status = -1
        // 如果已经点赞，则取消点赞
        if (this.value === 1) {
          await deleteLike(this.articleId)
          status = -1
          this.$emit('input', status)
          this.$toast.success('取消点赞')
        } else {
          // 否则添加点赞
          await addLike(this.articleId)
          status = 1
          this.$emit('input', status)
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
