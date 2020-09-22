<template>
  <van-cell class="comment-item">
    <van-image :src="commient.aut_photo" class="avatar" fit="cover" round slot="icon" />
    <div class="title-wrap" slot="title">
      <div class="user-name">{{commient.aut_name}}</div>
      <van-button
        :class="{
          liked:commient.is_liking
        }"
        :icon="commient.is_liking?'good-job':'good-job-o'"
        :loading="isloading"
        @click="oncommentLike"
        class="like-btn"
      >{{commient.like_count || '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{commient.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{commient.pubdate | relativeTime}}</span>
        <van-button
          @click="$emit('replay-click',commient)"
          class="reply-btn"
          round
        >回复 {{commient.reply_count}}</van-button>
        <!--  @click.stop="$bus.$emit('replay-click',commient)"-->
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/commit.js'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    commient: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isloading: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async oncommentLike () {
      this.isloading = true
      try {
        if (this.commient.is_liking) {
          await deleteCommentLike(this.commient.com_id)
          this.commient.like_count--
        } else {
          await addCommentLike(this.commient.com_id)
          this.commient.like_count++
        }
        this.commient.is_liking = !this.commient.is_liking
      } catch (error) {
        this.$toast('请求失败')
      }
      this.isloading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 20px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
