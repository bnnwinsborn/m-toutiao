<template>
  <div class="comment-replay">
    <van-nav-bar :title="`${commient.reply_count}条回复`">
      <van-icon @click="$emit('close')" name="cross" slot="left" />
    </van-nav-bar>
    <div class="scroll-warp">
      <CommitItem :commient="commient" />
      <van-cell title="全部回复" />
      <ArticleComment :list="commentlist" :source="commient.com_id" type="c" />
    </div>
    <div class="post-warp">
      <van-button @click="isDialog = true" class="post-btn" round size="small">写评论</van-button>
    </div>
    <van-popup position="bottom" v-model="isDialog">
      <CommentPost :target="commient.com_id" @post-success="onPost" v-if="isDialog" />
    </van-popup>
  </div>
</template>

<script>
import CommitItem from '@/views/article/components/commit-item.vue'
import ArticleComment from '@/views/article/components/article-comment.vue'
import CommentPost from '@/views/article/components/comment-post.vue'
export default {
  name: '',
  components: { CommitItem, ArticleComment, CommentPost },
  props: {
    commient: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isDialog: false,
      commentlist: []
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onPost (data) {
      this.commient.replay_count++
      this.isDialog = false
      this.commentlist.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.comment-replay {
  .van-nav-bar {
    background-color: #07c160;
  }
  /deep/ .van-nav-bar__title,
  .van-icon-cross {
    color: #fff;
  }
  .post-warp {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    .post-btn {
      width: 60%;
    }
  }
  .scroll-warp {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
  }
}
</style>
