import {ajax} from 'src/utils/ajax'

export const getMessageList = (obj, hideLoading) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'message/list',
      method: 'POST',
      data: {
        ...obj
      },
      hideLoading
    }).then(res => {
      resolve(res)
    })
  })
}

export const readMessage = (id) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'message/read',
      method: 'POST',
      data: {
        id
      }
    }).then(res => {
      resolve(res)
    })
  })
}
