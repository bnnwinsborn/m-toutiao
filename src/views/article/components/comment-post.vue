<template>
  <div class="comment-post">
    <van-field
      autosize
      class="post-field"
      maxlength="50"
      placeholder="请输入留言"
      rows="2"
      show-word-limit
      type="textarea"
      v-model.trim="message"
    />
    <van-button :disabled="!message.length" @click="onPost" class="post-btn">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/commit.js'
export default {
  name: 'CommentPost',
  components: {},
  inject: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onPost () {
      // this.$toast.loading({
      //   message: '发布中...',
      //   forbidClick: true,
      //   duration: 0
      // })
      try {
        const { data } = await addComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId
        })
        // 关闭弹出层
        // 清空文本框
        this.message = ''
        this.$emit('post-success', data.data)
        this.$toast('成功')
      } catch (error) {
        this.$toast('失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
