<template>
  <div class="article-list">
    <van-pull-refresh
      :success-duration="1500"
      :success-text="refreshSuccessText"
      @refresh="onRefresh"
      v-model="isLoading"
    >
      <van-list
        :error.sync="error"
        :finished="finished"
        @load="onLoad"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        v-model="loading"
      >
        <ArticleItem
          :article="article"
          :key="index"
          :title="article.title"
          v-for="(article,index) in list"
        ></ArticleItem>
        <!-- <van-cell :key="index" :title="article.title" v-for="(article,index) in list" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item/article-item.vue'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: { ArticleItem },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 请求下一页数据的时间戳
      error: false, // 是否加载失败
      isLoading: false,
      refreshSuccessText: ''
    }
  },
  created () {
    // this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        // 1.请求数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // 2.请求数据放到list数组中
        const { results } = data.data
        this.list.push(...results)
        // 3.加载状态结束把加载状态设置为结束
        this.loading = false
        // 4.数据是否全部加载完成
        if (results.length) {
          // 更新获取数据时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('请求数据失败，请稍后重试')
        this.loading = false
        this.error = true
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.isLoading = false
        this.refreshSuccessText('刷新失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
