
export const getWxData = (mid) => {
  wx.login({
    success (res) {
      if (res.code) {
        wx.setStorageSync('sono_code', res.code)
        // if (!wx.getStorageSync('sono_token')) {

        // }
        wx.navigateTo({
          url: `/pages/login/main?mid=${mid}`
        })
      }
    }
  })
}
