import {ajax} from 'src/utils/ajax'

export const getCartList = (hideLoading) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'cart/list',
      method: 'POST',
      hideLoading
    }).then(res => {
      resolve(res)
    })
  })
}

export const addOrder = (data) => ajax({
  sono: 'order/add',
  method: 'POST',
  data: {
    ...data
  },
  cancelDefaultHandler: true
})

export const deleteCart = (id) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'cart/del',
      method: 'POST',
      data: {
        id
      }
    }).then(res => {
      resolve(res)
    })
  })
}
