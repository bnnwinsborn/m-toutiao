<template>
  <div>
    <!-- currentDate双向绑定了日期选择器设置默认值，同步选择的日期 -->
    <van-datetime-picker
      :max-date="maxDate"
      :min-date="minDate"
      @cancel="$emit('close')"
      @confirm="onConfrim"
      type="date"
      v-model="currentDate"
    />
  </div>
</template>

<script>
import { updateUserName } from '@/api/user.js'
import dayjs from 'dayjs'
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
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onConfrim () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserName({ birthday: currentDate })
        // 更新视图
        this.$emit('input', currentDate)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
