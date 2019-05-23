import {ajax} from 'src/utils/ajax'

export const getUserInfo = (hideLoading) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'user/info',
      method: 'POST',
      hideLoading
    }).then(res => {
      resolve(res)
    })
  })
}
export const getOrderList = (data, hideLoading) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'order/list',
      method: 'POST',
      data: {
        ...data
      },
      hideLoading
    }).then(res => {
      resolve(res)
    })
  })
}
