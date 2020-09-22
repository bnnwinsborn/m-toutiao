<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$emit('close')"
      @click-right="onConfrim"
      left-text="取消"
      right-text="确定"
      title="编辑昵称"
    />
    <!-- 输入框 -->
    <div class="failed-warp">
      <van-field
        autosize
        maxlength="7"
        placeholder="请输入新昵称"
        rows="2"
        show-word-limit
        type="textarea"
        v-model="localName"
      />
    </div>
  </div>
</template>

<script>
import { updateUserName } from '@/api/user.js'
export default {
  name: '',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  created () {
    this.localName = this.value
  },
  mounted () { },
  methods: {
    async onConfrim () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.lenght) {
          this.$toast('非空的')
        }
        await updateUserName({ name: localName })
        // 更新视图
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.failed-warp {
  padding: 20px;
}
</style>
