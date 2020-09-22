<template>
  <div class="update-gender">
    <van-picker
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @change="onChange"
      @confirm="onConfirm"
      show-toolbar
      title="请选择性别"
    />
  </div>
</template>

<script>
import { updateUserName } from '@/api/user.js'
export default {
  name: '',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const localGender = this.localGender
        await updateUserName({ gender: localGender })
        // 更新视图
        this.$emit('input', localGender)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (error) {
        this.$toast('更新失败')
      }
    },
    onChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style scoped lang="less"></style>
