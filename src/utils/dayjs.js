import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 全局使用中文
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')

dayjs.extend(dayjs.extend(relativeTime))
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
