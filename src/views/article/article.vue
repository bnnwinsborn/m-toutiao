<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <van-icon @click="$router.back()" name="arrow-left" slot="left" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell :border="false" center class="user-info">
          <van-image :src="article.aut_photo" class="avatar" fit="cover" round slot="icon" />
          <div class="user-name" slot="title">{{article.aut_name}}</div>
          <div class="publish-date" slot="label">{{article.pubdate | relativeTime}}</div>
          <!-- :is_followed="article.is_followed"
          @update-follow="article.is_followed = $event"-->
          <FollowUser :user_id="article.aut_id" v-model="article.is_followed"></FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" ref="article-content" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论 -->
        <ArticleComment
          :list="commentlist"
          :source="article.art_id"
          @onload-success="totalCounts = $event.total_count"
          @replay-click="onReplayClick"
        />
        <!-- @replay-click="onReplayClick" -->
        <!--/文章评论 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            @click="isComment = true"
            class="comment-btn"
            round
            size="small"
            type="default"
          >写评论</van-button>
          <van-icon :info="totalCounts" color="#777" name="comment-o" />
          <!-- 收藏 -->
          <ShouCang :article-id="article.art_id" class="btn-item" v-model="article.is_collected"></ShouCang>
          <!-- 点赞 -->
          <DianZan :article-id="article.art_id" class="btn-item" v-model="article.attitude"></DianZan>
          <van-icon color="#777777" name="share"></van-icon>
        </div>
        <!-- 弹出层 -->
        <van-popup position="bottom" v-model="isComment">
          <CommentPost :target="article.art_id" @post-success="onPostSuccess" />
        </van-popup>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="status === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="loadArticleList" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup position="bottom" style="height:100%;" v-model="isReplay">
      <CommentReplay
        :commient="currentComment"
        @close="isReplay = false"
        ref="commentRef"
        v-if="isReplay"
      />
    </van-popup>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow.vue'
import ShouCang from '@/components/shoucang.vue'
import DianZan from '@/components/dianzan.vue'
import ArticleComment from '@/views/article/components/article-comment.vue'
import CommentPost from '@/views/article/components/comment-post.vue'
import CommentReplay from '@/views/article/components/comment-replay.vue'
export default {
  name: 'ArticleIndex',
  components: { FollowUser, ShouCang, DianZan, ArticleComment, CommentPost, CommentReplay },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  data () {
    return {
      article: {},
      loading: false,
      status: 0,
      isFollowLoading: false,
      isDialog: false,
      totalCounts: 0,
      isComment: false,
      commentlist: [],
      isReplay: false,
      currentComment: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticleList()
    // this.$bus.$on('replay-click', (obj) => {
    //   this.currentComment = obj
    //   this.isReplay = true
    // })
  },
  mounted () { },
  methods: {
    async loadArticleList () {
      try {
        this.loading = true
        const { data } = await getArticleList(this.articleId)
        this.article = data.data
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (error) {
        if (error && error.response && error.response.status === 404) {
          this.status = 404
        }
        this.$toast('获取失败，请稍后重试')
      }
      this.loading = false
    },
    previewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images: images,
            // 预览图片的起始位置
            startPosition: index
          })
        }
      })
    },
    onPostSuccess (data) {
      this.isComment = false
      this.commentlist.unshift(data.new_obj)
    },
    onReplayClick (comment) {
      this.isReplay = true
      this.currentComment = comment
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .van-icon-arrow-left {
    color: #fff;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
