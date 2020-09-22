<template>
  <div class="search-suggestion">
    <van-cell
      :key="index"
      @click="$emit('search',text)"
      icon="search"
      v-for="(text,index) in suggestion"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getOptions } from '@/api/search.js'
import { debounce } from 'loadsh'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestion: []
    }
  },
  created () {

  },
  watch: {
    searchText: {
      // 参数一：函数
      // 参数二：防抖时间
      // 返回值：防抖之后的函数，和参数1功能是一样的
      handler: debounce(function (value) {
        console.log(value)
        this.getSuggestions(value)
      }, 500),
      immediate: true
    }
  },
  methods: {
    async getSuggestions (q) {
      try {
        const { data } = await getOptions(q)
        this.suggestion = data.data.options
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试')
      }
    },
    highlight (text) {
      const htmlStr = `<span class="active">${this.searchText}</span>`
      var reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, htmlStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #07c160;
  }
}
</style>
