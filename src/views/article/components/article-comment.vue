<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      :error.sync="error"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
      error-text="加载失败，点击重试"
      finished-text="没有更多了"
      v-model="loading"
    >
      <!-- <CommitItem :key="item.art_id" :title="item.content" v-for="item in list"></CommitItem> -->
      <CommitItem
        :commient="item"
        :key="index"
        @replay-click="$emit('replay-click',$event)"
        v-for="(item, index) in list"
      />
      <!--  @replay-click="$emit('replay-click',$event)" -->
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/commit.js'
import CommitItem from '@/views/article/components/commit-item.vue'
export default {
  name: 'ArticleComment',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validate (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  components: { CommitItem },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 请求下一页数据的页码
      // totalCount: 0, // 总数据条数
      error: false
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad () {
      // 获取文章
      try {
        // 1. 请求获取数据
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: 10
        })
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        this.$emit('onload-success', data.data)
        // 更新总数据条数
        this.totalCount = data.data.total_count
        // 3. 将加载更多的 loading 设置为 false
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，关闭加载更多
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
