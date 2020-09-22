<template>
  <van-cell :to="routerurl" class="article-item">
    <div class="title van-multi-ellipsis--l2" slot="title">{{article.title}}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type ===3">
        <div :key="index" class="cover-item" v-for="(img,index) in article.cover.images">
          <van-image :src="img" class="cover-item-img" fit="cover" height="100" width="100" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
      :src="article.cover.images[0]"
      class="right-cover"
      fit="cover"
      height="100"
      slot="default"
      v-if="article.cover.type ===1"
      width="100"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      routerurl: {
        // 根据路由名称进行跳转
        name: 'article',
        // 传递路由动态参数
        params: {
          // 属性名：路由路径中设计的动态参数
          articleId: this.article.art_id
        }
      }
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    width: 232px;
    height: 146px;
    flex: unset;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      // height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
