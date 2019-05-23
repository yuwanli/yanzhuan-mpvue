// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    getUserStatus: (state) => {
      return state.user
    },
    setUserStatus: (state, obj) => {
      state.user = obj
    }
  }
})

export default store
