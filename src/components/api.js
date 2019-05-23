import {ajax} from 'src/utils/ajax'
export const cartAdd = (data) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'cart/add',
      method: 'POST',
      data: {
        ...data
      }
    }).then(res => {
      resolve(res)
    })
  })
}
export const cartEdit = (data) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'cart/edit',
      method: 'POST',
      data: {
        ...data
      }
    }).then(res => {
      resolve(res)
    })
  })
}
