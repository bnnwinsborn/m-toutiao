<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div class="all-span" v-if="isDialog">
        <span @click="$emit('clear-history')" class="all-delete">全部删除</span>
        <span @click="isDialog = false">完成</span>
      </div>
      <van-icon @click="isDialog = true" name="delete" v-else />
    </van-cell>
    <van-cell
      :key="index"
      :title="item"
      @click="onDeleteHistory(item,index)"
      v-for="(item,index) in Historylist"
    >
      <van-icon name="close" v-show="isDialog" />
    </van-cell>
  </div>
</template>

<script>

export default {
  props: {
    Historylist:
    {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDialog: false
    }
  },
  created () {

  },
  methods: {
    onDeleteHistory (item, index) {
      if (this.isDialog) {
        this.Historylist.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-history {
  .all-span {
    .all-delete {
      margin-right: 12px;
    }
  }
}
</style>
