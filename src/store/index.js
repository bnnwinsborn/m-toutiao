import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/stroage'

const token = 'token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(token)
  },
  mutations: {
    setUser (state, data) {
      console.log(data)
      state.user = data
      setItem(token, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
