<template>
  <div class="search-result">
    <van-list
      :error.sync="error"
      :finished="finished"
      @load="onLoad"
      class="article-list"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      v-model="loading"
    >
      <!-- <van-cell :key="item" :title="item" v-for="item in list" /> -->
      <van-cell :key="index" :title="article.title" v-for="(article,index) in list" />
    </van-list>
  </div>
</template>

<script>
import { getResult } from '@/api/search.js'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  created () {

  },
  methods: {
    async onLoad () {
      try {
        // 异步更新数据
        const { data } = await getResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        // 将数据添加到数组列表中
        const { results } = data.data
        this.list.push(...results)
        // 将本次加载的loading关闭
        this.loading = false
        // 判断是否有数据
        if (results.length) {
          // 如果有更新下一页数据
          this.page++
        } else {
          // 如果没有将finished关闭
          this.finished = false
        }
      } catch (error) {
        this.$toast('请求数据失败，请稍后重试')
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  .article-list {
    height: 92vh;
    overflow-y: auto;
  }
}
</style>
