// user/info
import {ajax} from 'src/utils/ajax'
import store from 'src/store'

const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'user/info',
      method: 'POST',
      hideLoading: true,
      noLogin: true// 无需登陆
    }).then(res => {
      resolve(res)
    })
  })
}
export const base = {
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.updateUserStatus()
  },
  methods: {
    updateUserStatus () {
      getUserInfo().then(res => {
        store.commit('setUserStatus', res)
      })
    }
  }
}
