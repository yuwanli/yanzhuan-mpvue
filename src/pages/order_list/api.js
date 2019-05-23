import {ajax} from 'src/utils/ajax'

export const getOrderList = () => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'order/list',
      method: 'POST',
      data: {
        page: 1,
        num: 10
      }
    }).then(res => {
      resolve(res)
    })
  })
}
