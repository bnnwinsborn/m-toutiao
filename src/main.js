import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import './styles/index.less'
import './styles/iconfont.less'
// 加载动态REM基准值
import 'amfe-flexible'
import './utils/require'
import './utils/dayjs'

Vue.config.productionTip = false
// Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
