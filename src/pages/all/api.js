import {ajax} from 'src/utils/ajax'

export const getIndexList = (obj, hideLoading) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'good/list',
      method: 'GET',
      query: {
        ...obj
      },
      hideLoading
    }).then(res => {
      resolve(res)
    })
  })
}
