<template>
  <div class="container no-header">
    <button class="login" open-type="getUserInfo" lang="zh_CN" @getuserinfo='onGotUserInfo'>授权登陆</button>
  </div>
</template>

<script>
import { ajax } from 'src/utils/ajax'
import {base} from 'src/mixins/base.js'
export default {
  data () {
    return {
      mid: ''
    }
  },
  mixins: [base],
  computed: {
  },
  onLoad (options) {
    this.mid = options.mid
  },
  methods: {
    onGotUserInfo (res) {
      if (res.target.userInfo) {
        this.updateUserStatus()
        let data = {
          encryptedData: res.target.encryptedData,
          iv: res.target.iv,
          code: wx.getStorageSync('sono_code')
        }
        ajax({
          sono: 'app/auth',
          method: 'POST',
          data
        }).then(resp => {
          wx.setStorageSync('sono_token', resp.token)
          wx.navigateBack()
          if (wx.callbacks[this.mid]) {
            wx.callbacks[this.mid]()
            delete wx.callbacks[this.mid]
          }
        })
      }
    }

  },

  created () {

  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.login{
  margin: 180/@bs auto;
  width: 380/@bs;
  height: 50/@bs;
  border: none;
  border-radius: 20/@bs;
  background-color: #ff434c;
  color: #fff;
  font-size: 24/@bs;
  line-height: 50/@bs;
}
</style>
