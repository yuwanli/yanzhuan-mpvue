import {ajax} from 'src/utils/ajax'

export const getOrderDetail = (id) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'order/detail',
      method: 'POST',
      data: {
        id
      }
    }).then(res => {
      resolve(res)
    })
  })
}

export const getOrderJssdk = (id) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'order/jssdkOrder',
      method: 'POST',
      data: {
        id: id
      }
    }).then(res => {
      resolve(res)
    })
  })
}
