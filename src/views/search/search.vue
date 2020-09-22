<template>
  <div class="search-container">
    <!-- 导航 -->
    <van-search
      @cancel="onCancel"
      @input="isResultShow = false"
      @search="onSearch"
      background="#07c160"
      class="van-search"
      placeholder="请输入搜索关键词"
      show-action
      v-model="searchText"
    />
    <!-- 结果 -->
    <Results :searchText="searchText" v-if="isResultShow"></Results>
    <!-- 联想 -->
    <Suggestion :searchText="searchText" @search="search" v-else-if="searchText"></Suggestion>
    <!-- 历史 -->
    <History :Historylist="histories" @clear-history="histories = []" @search="onSearch" v-else></History>
  </div>
</template>

<script>
import History from '@/views/search/components/history.vue'
import Suggestion from '@/views/search/components/suggestion.vue'
import Results from '@/views/search/components/results.vue'
import { getItem, setItem } from '@/utils/stroage.js'
export default {
  props: [],
  data () {
    return {
      searchText: '',
      isResultShow: false,
      histories: getItem('history-list') || []
    }
  },
  components: {
    History,
    Suggestion,
    Results
  },
  watch: {
    histories (val) {
      setItem('history-list', val)
    }
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      // 存储搜索历史记录
      // 数组去重，添加到最前面
      const index = this.histories.indexOf(val)
      if (index !== -1) {
        this.histories.splice(index, 1)
      }
      this.histories.unshift(val)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    },
    search (value) {
      this.onSearch(value)
    }
  },
  created () {

  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 106px;
  .van-search__action {
    color: #fff;
  }
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
